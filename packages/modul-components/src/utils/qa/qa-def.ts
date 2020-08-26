
export interface QAUser {
    id: string;
    username: string;
}

export interface QAElementLog {
    id?: string;
    author?: QAUser;
    date?: Date;
    body?: string;
    type?: 'error' | 'question' | 'comments';
    needResolve?: boolean;
    resolved?: boolean;
    replies?: QAElementLogReply[];
}

export interface QAElementLogReply {
    id?: string;
    author?: QAUser;
    date?: Date;
    body?: string;
}

export interface QAElement {
    id: string;
    name?: string;
    docUrl?: string;
    logs: QAElementLog[];
    stable: boolean;
}

export class QAState {
    public user: QAUser | null = null;
    public elements: QAElement[] = [];
    public selectedElement: QAElement | null;
    public selectedElementLog: QAElementLog | null;
    public editingElement: QAElement | null;
    public editingElementLog: QAElementLog | null;
}
