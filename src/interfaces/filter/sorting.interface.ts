export interface ISortOptions {
  sortBy: string;
  sortOrder: SortOrder;
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
