import mongoose, { HydratedDocument, InferSchemaType, Types } from 'mongoose';
import validator from 'validator';

const ServiceSchema = new mongoose.Schema(
	{
		categoryId: {
			type: Types.ObjectId,
			required: true,
			ref: 'Category',
		},

		userId: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},

		name: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 100,
		},

		description: {
			type: String,
			maxlength: 500,
		},

		icon: {
			type: String,
			validate: {
				validator: (value: string) => !value || validator.isURL(value),
				message: 'Icon URL should be a valid',
			},
		},

		url: {
			type: String,
			required: true,
			validate: {
				validator: (value: string) => validator.isURL(value),
				message: 'Service URL should be a valid',
			},
		},
	},
	{ timestamps: true },
);

ServiceSchema.index({ userId: 1, name: 1 });

export const Service = mongoose.model('Service', ServiceSchema);

export type ServiceType = InferSchemaType<typeof ServiceSchema>;
export type ServiceDocument = HydratedDocument<ServiceType>;
