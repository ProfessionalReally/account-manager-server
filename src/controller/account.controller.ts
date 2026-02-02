import { Account } from '@/model/account.model';
import { mapAccount, sendError } from '@/utils';
import { Request, Response } from 'express';

export const addAccount = async (req: Request, res: Response) => {
	try {
		const body = {
			serviceId: req.body.serviceId,
			username: req.body.username,
			comment: req.body.comment,
			cipherText: req.body.cipherText,
			iv: req.body.iv,
		};

		await Account.create({
			...body,
			userId: req.user._id,
		});

		res.sendStatus(201);
	} catch (error) {
		sendError(res, error);
	}
};

export const getAccounts = async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const serviceId = req.query.serviceId;
		const skip = (page - 1) * limit;

		const filter: Record<string, unknown> = {
			userId: req.user._id,
		};

		if (serviceId) {
			filter.serviceId = serviceId;
		}

		const [accounts, total] = await Promise.all([
			Account.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit),
			Account.countDocuments(filter),
		]);

		res.status(200).json({
			data: {
				data: accounts.map(mapAccount),
				pagination: {
					page,
					limit,
					total,
					lastPage: Math.ceil(total / limit),
				},
			},
		});
	} catch (error) {
		sendError(res, error);
	}
};

export const getAccount = async (req: Request, res: Response) => {
	try {
		const account = await Account.findOne({
			_id: req.params.id,
			userId: req.user._id,
		});

		if (!account) {
			return res.status(404).json({ error: 'Account not found' });
		}

		res.status(200).json({
			data: mapAccount(account),
		});
	} catch (error) {
		sendError(res, error);
	}
};

export const updateAccount = async (req: Request, res: Response) => {
	try {
		const updateData: Record<string, unknown> = {};

		if (req.body.username !== undefined) {
			updateData.username = req.body.username;
		}

		if (req.body.comment !== undefined) {
			updateData.comment = req.body.comment;
		}

		if (req.body.cipherText !== undefined) {
			updateData.cipherText = req.body.cipherText;
		}

		if (req.body.iv !== undefined) {
			updateData.iv = req.body.iv;
		}

		const account = await Account.findOneAndUpdate(
			{
				_id: req.params.id,
				userId: req.user._id,
			},
			updateData,
			{ returnDocument: 'after' },
		);

		if (!account) {
			return res.status(404).json({ error: 'Account not found' });
		}

		res.sendStatus(200);
	} catch (error) {
		sendError(res, error);
	}
};

export const deleteAccount = async (req: Request, res: Response) => {
	try {
		const result = await Account.findOneAndDelete({
			_id: req.params.id,
			userId: req.user._id,
		});

		if (!result) {
			return res.status(404).json({ error: 'Account not found' });
		}

		res.sendStatus(200);
	} catch (error) {
		sendError(res, error);
	}
};
