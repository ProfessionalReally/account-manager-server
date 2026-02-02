import { AccountDocument } from '@/model';

export const mapAccount = (account: AccountDocument) => ({
	id: account._id.toString(),
	serviceId: account.serviceId.toString(),
	username: account.username,
	comment: account.comment,
	cipherText: account.cipherText,
	iv: account.iv,
	updatedAt: account.updatedAt,
	createdAt: account.createdAt,
});
