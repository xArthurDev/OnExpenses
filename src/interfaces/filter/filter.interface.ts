import { IPagination } from './pagination.interface';
import { IQuery } from './query.interface';
import { ISortOptions } from './sorting.interface';

export interface IFilterList {
  pagination: IPagination;
  query?: IQuery;
  sorting?: ISortOptions;
}

export interface IFilterQuery {
  page: number;
  limit: number;
  filterBy?: string;
  filterValue?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IFilterData {
  pagination: IPagination;
  query?: IQuery;
  sorting?: ISortOptions;
}
