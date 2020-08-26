
export interface QAUser {
    id: string;
    username: string;
}

export interface QAElementLog {
    id?: string;
    author?: QAUser;
    date?: Date;
    body?: string;
    type?: 'error' | 'question' | 'comments' | 'todo';
    needResolve?: boolean;
    resolved?: boolean;
    jiraUrl?: string;
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
    // public user: QAUser | null = {
    //     id: '1', username: 'test'
    // };
    public user: QAUser | null = null;
    public elements: QAElement[] = [];
    public selectedElement: QAElement | null = null;
    public selectedElementLog: QAElementLog | null = null;
    public editedElement: QAElement | null = null;
    public editedElementLog: QAElementLog | null = null;
}
