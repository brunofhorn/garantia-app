import { ISODateString, PaginatedQuery, UUID } from './common';

export type Category = {
  id: UUID;
  name: string;
  color?: string | null;
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
  deletedAt?: ISODateString | null;
};

export type CreateCategoryRequest = {
  name: string;
  color?: string;
};

export type UpdateCategoryRequest = Partial<CreateCategoryRequest>;

export type ListCategoriesQuery = PaginatedQuery & {
  search?: string;
};
