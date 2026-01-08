import { CategoryDocument } from '@/model';
export const mapCategory = (category: CategoryDocument) => {
	return {
		id: category._id.toString(),
		name: category.name,
		color: category.color,
	};
};
