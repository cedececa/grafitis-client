export class PageResponse<T> {
    items: T[];
    itemCount: number;
    meta:{
        currentPage: string
        itemCount: number,
        itemsPerPage: string,
        totalItems: number,
        totalPages: number
    }
}
