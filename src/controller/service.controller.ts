import { Service } from '@/model';
import { mapService, normalizeService, sendError } from '@/utils';
import { Request, Response } from 'express';

export const addService = async (req: Request, res: Response) => {
	try {
		const payload = normalizeService(req.body);

		await Service.create({ ...payload, userId: req.user._id });

		res.sendStatus(201);
	} catch (error) {
		sendError(res, error);
	}
};

export const getServices = async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const search = (req.query.search as string) || '';
		const skip = (page - 1) * limit;

		const filter: Record<string, unknown> = {
			userId: req.user._id,
		};

		if (search) {
			filter.name = {
				$regex: search,
				$options: 'i',
			};
		}

		const [services, total] = await Promise.all([
			Service.find(filter)
				.populate('categoryId')
				.sort({ createdAt: -1 })
				.skip(skip)
				.limit(limit),
			Service.countDocuments(filter),
		]);

		res.status(200).json({
			data: {
				data: services.map(mapService),
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

export const getService = async (req: Request, res: Response) => {
	try {
		const service = await Service.findOne({
			_id: req.params.id,
			userId: req.user._id,
		}).populate('categoryId');

		if (!service) {
			return res.status(404).json({ error: 'Service not found' });
		}

		res.status(200).json({ data: mapService(service) });
	} catch (error) {
		sendError(res, error);
	}
};

export const deleteService = async (req: Request, res: Response) => {
	try {
		const result = await Service.findOneAndDelete({
			_id: req.params.id,
			userId: req.user._id,
		});

		if (!result) {
			return res.status(404).json({ error: 'Service not found' });
		}

		res.sendStatus(200);
	} catch (error) {
		sendError(res, error);
	}
};

export const updateService = async (req: Request, res: Response) => {
	try {
		const payload = normalizeService(req.body);

		const service = await Service.findOneAndUpdate(
			{ _id: req.params.id, userId: req.user._id },
			payload,
			{ returnDocument: 'after' },
		);

		if (!service) {
			return res.status(404).json({ error: 'Service not found' });
		}

		res.sendStatus(200);
	} catch (error) {
		sendError(res, error);
	}
};
