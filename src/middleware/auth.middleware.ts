import { User } from '@/model';
import { verifyToken } from '@/utils';
import { NextFunction, Request, Response } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tokenData = verifyToken(req.cookies.token);

		if (!tokenData) {
			return res.status(401).json({ error: 'Unauthorized' });
		}

		const user = await User.findById(tokenData.userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Invalid or expired token' });
		console.log(error);
	}
};
