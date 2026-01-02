import { UserDocument } from '@/model/user.model';
export const mapUser = (user: UserDocument) => {
	return {
		id: user._id,
		email: user.email,
		registeredAt: user.createdAt,
	};
};
