export interface MQAUser {
    username: string;
}

export interface MQAElementLog {
    author?: MQAUser;
    date?: string;
    body?: string;
    type?: 'error' | 'question' | 'comments';
    needResolve?: boolean;
    resolved?: boolean;
}

export interface MQAElement {
    id: string;
    logs: MQAElementLog[];
    stable: boolean;
}
