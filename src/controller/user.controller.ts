import { cookieOptions } from '@/config';
import { User } from '@/model';
import { generateToken, mapUser, sendError } from '@/utils';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(400).json({ error: 'User already exists' });
		}

		const hash = await bcrypt.hash(password, 10);
		const user = new User({ email, password: hash });

		await user.save();

		const token = generateToken({ userId: user._id.toString() });

		res.cookie('token', token, cookieOptions);

		res.status(201).json({
			data: mapUser(user),
		});
	} catch (error) {
		sendError(res, error);
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({
				error: 'Invalid email or password',
			});
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({
				error: 'Invalid email or password',
			});
		}

		const token = generateToken({ userId: user._id.toString() });

		res.cookie('token', token, cookieOptions);

		res.status(200).json({
			data: mapUser(user),
		});
	} catch (error) {
		sendError(res, error);
	}
};

export const logoutUser = (req: Request, res: Response) => {
	res.clearCookie('token', cookieOptions);
	res.sendStatus(200);
};

export const getCurrentUser = (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		res.status(200).json({
			data: mapUser(req.user),
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};

export const setupCrypto = async (req: Request, res: Response) => {
	try {
		if (!req.user) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const { masterKeySalt, keyCheck } = req.body;

		const isValidNumberArray = (value: unknown): value is number[] =>
			Array.isArray(value) &&
			value.length > 0 &&
			value.every((item) => typeof item === 'number');

		if (
			!isValidNumberArray(masterKeySalt) ||
			!keyCheck ||
			typeof keyCheck.cipherText !== 'string' ||
			keyCheck.cipherText.length === 0 ||
			!isValidNumberArray(keyCheck.iv)
		) {
			return res.status(400).json({ error: 'Invalid crypto setup payload' });
		}
		const hasMasterKey =
			Array.isArray(req.user.masterKeySalt) &&
			req.user.masterKeySalt.length > 0 &&
			req.user.keyCheck?.cipherText &&
			req.user.keyCheck.iv?.length > 0;

		if (hasMasterKey) {
			return res.status(400).json({ error: 'Master password already set' });
		}

		req.user.masterKeySalt = masterKeySalt;
		req.user.keyCheck = keyCheck;

		await req.user.save();

		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error' });
	}
};
