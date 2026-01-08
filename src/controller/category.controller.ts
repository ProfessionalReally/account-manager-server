import { mapCategory } from './../utils/mappers/map-category.util';
import { Category } from '@/model';
import { sendError } from '@/utils';
import { Request, Response } from 'express';

export const addCategory = async (req: Request, res: Response) => {
	try {
		await Category.create(req.body);

		res.sendStatus(201);
	} catch (error) {
		sendError(res, error);
	}
};

export const getCategories = async (req: Request, res: Response) => {
	try {
		const categories = await Category.find();

		res.status(200).json({ data: categories.map(mapCategory) });
	} catch (error) {
		sendError(res, error);
	}
};

export const deleteCategory = async (req: Request, res: Response) => {
	try {
		await Category.findByIdAndDelete(req.params.id);
		res.sendStatus(200);
	} catch (error) {
		sendError(res, error);
	}
};

export const updateCategory = async (req: Request, res: Response) => {
	try {
		const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
			returnDocument: 'after',
		});

		if (!category) {
			return res.status(404).json({ error: 'Category not found' });
		}

		res.sendStatus(200);
	} catch (error) {
		sendError(res, error);
	}
};
