import { config } from '@/config';
import { JwtPayload } from '@/types';
import jwt from 'jsonwebtoken';

export const generateToken = (payload: JwtPayload) => {
	return jwt.sign(payload, config.jwtSecret, {
		expiresIn: '1h',
	});
};
