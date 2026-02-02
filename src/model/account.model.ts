import mongoose, { HydratedDocument, InferSchemaType, Types } from 'mongoose';

const AccountSchema = new mongoose.Schema(
	{
		userId: {
			type: Types.ObjectId,
			ref: 'User',
			required: true,
			index: true,
		},

		serviceId: {
			type: Types.ObjectId,
			ref: 'Service',
			required: true,
			index: true,
		},

		username: {
			type: String,
			required: true,
			minlength: 1,
			maxlength: 255,
		},

		comment: {
			type: String,
			maxlength: 1000,
		},

		cipherText: {
			type: String,
			required: true,
		},

		iv: {
			type: [Number],
			required: true,
		},
	},
	{ timestamps: true },
);

AccountSchema.index({ userId: 1, serviceId: 1 });

export const Account = mongoose.model('Account', AccountSchema);

export type AccountType = InferSchemaType<typeof AccountSchema>;
export type AccountDocument = HydratedDocument<AccountType>;
