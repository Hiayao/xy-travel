import * as axios from 'axios';

declare module 'axios' {
    interface AxiosResponse<T> {
        token: string;
        user: T;
        data: T;
        total: number;
        info: T;
        flights: T;
        options: T;
    }
}