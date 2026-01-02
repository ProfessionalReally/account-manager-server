type Config = {
	port: string;
	host: string;
	jwtSecret: string;
};

export const config: Config = Object.freeze({
	port: process.env.PORT || '3000',
	host: process.env.HOST || 'localhost',
	jwtSecret: process.env.JWT_SECRET || 'secret',
});
