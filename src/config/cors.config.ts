type Cors = {
	origin: string;
	credentials: boolean;
};

export const cors = Object.freeze<Cors>({
	origin: process.env.FRONTEND_URL || 'http://localhost:3000',
	credentials: true,
});
