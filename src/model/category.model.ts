import mongoose, { HydratedDocument, InferSchemaType } from 'mongoose';
import validator from 'validator';

const CategorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 50,
		},
		color: {
			type: String,
			required: true,
			validate: {
				validator: (value: string) => validator.isHexColor(value),
				message: 'Color must be a valid hex color',
			},
		},
	},
	{
		timestamps: true,
	},
);

export const Category = mongoose.model('Category', CategorySchema);

export type CategoryType = InferSchemaType<typeof CategorySchema>;

export type CategoryDocument = HydratedDocument<CategoryType>;
