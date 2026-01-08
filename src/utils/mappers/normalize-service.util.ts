export const normalizeService = (body: any) => {
	const { category, ...rest } = body;

	return {
		...rest,
		categoryId: category?.id,
	};
};
