import { ServiceDocument } from '@/model';
import { Types } from 'mongoose';
import { mapCategory } from './map-category.util';
export const mapService = (service: ServiceDocument) => {
	return {
		id: service._id.toString(),
		name: service.name,
		description: service.description,
		category:
			service.categoryId instanceof Types.ObjectId
				? service.categoryId.toString()
				: mapCategory(service.categoryId),
		icon: service.icon,
		url: service.url,
		updatedAt: service.updatedAt,
	};
};
