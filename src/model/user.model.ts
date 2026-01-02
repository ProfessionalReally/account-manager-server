import mongoose, { HydratedDocument, InferSchemaType } from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

export const User = mongoose.model('User', UserSchema);

export type UserType = InferSchemaType<typeof UserSchema>;

export type UserDocument = HydratedDocument<UserType>;
