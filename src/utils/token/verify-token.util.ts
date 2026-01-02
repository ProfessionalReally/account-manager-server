import { config } from '@/config';
import jwt from 'jsonwebtoken';

interface TokenPayload extends jwt.JwtPayload {
	userId: string;
}

export const verifyToken = (token: string): TokenPayload | null => {
	try {
		const decoded = jwt.verify(token, config.jwtSecret);

		if (typeof decoded !== 'object' || !decoded || !('userId' in decoded)) {
			return null;
		}

		return decoded as TokenPayload;
	} catch {
		return null;
	}
};
