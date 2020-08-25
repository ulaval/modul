export interface MQAUser {
    username: string;
}

export interface MQAElementLog {
    id?: string;
    author?: MQAUser;
    date?: Date;
    body?: string;
    type?: 'error' | 'question' | 'comments';
    needResolve?: boolean;
    resolved?: boolean;
}

export interface MQAElement {
    id: string;
    name?: string;
    docUrl?: string;
    logs: MQAElementLog[];
    stable: boolean;
}
