import type { Response } from 'express';

export const sendError = (res: Response, error: unknown) => {
	if (error instanceof Error) {
		return res.send({ error: error.message });
	}

	return res.send({ error: 'Something went wrong' });
};
