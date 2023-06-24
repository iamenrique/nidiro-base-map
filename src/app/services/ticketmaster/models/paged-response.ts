export interface PagedResponse<T> {
  page: {number: number; totalPages: number; totalElements: number; size: number};
  _links: {[k: string]: {href: string}};
  _embedded: T;
}
