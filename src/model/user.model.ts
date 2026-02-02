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

		// Stores the salt used to derive the client's master encryption key.
		// This is cryptographic material for client-side encryption and must be treated as sensitive
		// (e.g. avoid logging or exposing it unnecessarily).
		masterKeySalt: {
			type: [Number],
			default: undefined,
		},

		// Stores an encrypted value and IV used to verify the correctness of the client-side master key.
		// This is cryptographic material for client-side encryption and must be handled carefully
		// (e.g. avoid logging or exposing it unnecessarily).
		keyCheck: {
			type: {
				cipherText: {
					type: String,
					required: true,
				},
				iv: {
					type: [Number],
					required: true,
				},
			},
			default: undefined,
		},
	},
	{ timestamps: true },
);

export const User = mongoose.model('User', UserSchema);

export type UserType = InferSchemaType<typeof UserSchema>;
export type UserDocument = HydratedDocument<UserType>;
