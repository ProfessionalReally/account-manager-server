import dotenv from 'dotenv';

dotenv.config();

import { config, cors as corsConfig } from '@/config';
import { connectDB } from '@/db';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import express from 'express';
import { router } from './router';

const app = express();

app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

connectDB()
	.then(() => {
		app.listen(config.port, () => {
			console.log(chalk.green(`Listening on port ${config.port}`));
		});
	})
	.catch((error) => {
		console.log(chalk.red(error));
		process.exit(1);
	});
