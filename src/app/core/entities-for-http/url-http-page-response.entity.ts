import { PageResponse } from './page-response.entity';

export class URLHttpPageResponse<T> {
    code: number;
    message: string;
    data?: PageResponse<T> ;
}
