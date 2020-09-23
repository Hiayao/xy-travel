import * as axios from 'axios';

declare module 'axios' {
    interface AxiosResponse<T> {
        reason: string,
        error_code: number,
        result: T
    }
}