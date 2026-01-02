import chalk from 'chalk';
import mongoose from 'mongoose';
export const connectDB = async () => {
	try {
		if (!process.env.MONGO_URL) {
			throw new Error('MONGO_URL is not defined');
		}
		await mongoose.connect(process.env.MONGO_URL);
		console.log(chalk.green('Database connected'));
	} catch (error) {
		console.log(chalk.red(error));
		process.exit(1);
	}
};
