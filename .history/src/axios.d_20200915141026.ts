import * as axios from 'axios';

declare module 'axios' {
    interface AxiosResponse<T> {
        token: string;
        user: T;
    }
}