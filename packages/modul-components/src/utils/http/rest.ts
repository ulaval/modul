import { AxiosResponse, Method } from 'axios';

export interface RequestConfig {
    method?: Method;
    rawUrl?: string;
    pathParams?: any;
    params?: any;
    headers?: any;
    formParams?: any;
    data?: any;
    timeout?: number;
}

export interface RestAdapter {
    execute<T>(config: RequestConfig): Promise<AxiosResponse<T>>;
}
