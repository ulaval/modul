import uuid from '../uuid/uuid';
import { QAElement, QAElementLog, QAElementLogReply, QAUser } from './qa-def';

export interface MQAService {
    login(username: string, password: string): Promise<QAUser>;
    fetchElements(): Promise<QAElement[]>;
    registerElement(elementId: string): Promise<QAElement[]>;
    updateElement(element: QAElement): Promise<QAElement>;
    updateElementLog(elementId: string, elementLog: QAElementLog): Promise<QAElementLog>;
    deleteElementLog(elementId: string, elementLogId: string): Promise<void>;
    updateElementLogReplies(elementId: string, elementLogId: string, elementLogReply: QAElementLogReply): Promise<QAElementLogReply>;
}

export class MQAServiceHttp implements MQAService {
    public login(username: string, password: string): Promise<QAUser> {
        return Promise.resolve({} as any);
    }
    public fetchElements(): Promise<QAElement[]> {
        return Promise.resolve([]);
    }
    public registerElement(elementId: string): Promise<QAElement[]> {
        return Promise.resolve([]);
    }
    public updateElement(element: QAElement): Promise<QAElement> {
        return Promise.resolve({} as any);
    }
    public updateElementLog(elementId: string, elementLog: QAElementLog): Promise<QAElementLog> {
        return Promise.resolve({} as any);
    }
    public deleteElementLog(elementId: string, elementLogId: string): Promise<void> {
        return Promise.resolve();
    }
    public updateElementLogReplies(elementId: string, elementLogId: string, elementLogReply: QAElementLogReply): Promise<QAElementLogReply> {
        return Promise.resolve({} as any);
    }
}

export class MQAServiceMock implements MQAService {
    private elements: QAElement[] = [];

    public constructor(private project: string, private token: string) { }

    public login(username: string, password: string): Promise<QAUser> {
        return Promise.resolve({ id: '1', username });
    }

    public fetchElements(): Promise<QAElement[]> {
        return Promise.resolve(this.elements);
    }

    public registerElement(elementId: string): Promise<QAElement[]> {
        if (this.elements.map(e => e.id).indexOf(elementId) === -1) {
            this.elements.push({ id: elementId, name: elementId, stable: false, logs: [] });
        }

        return Promise.resolve(this.elements);
    }

    public updateElement(element: QAElement): Promise<QAElement> {
        return Promise.resolve(element);
    }

    public updateElementLog(elementId: string, elementLog: QAElementLog): Promise<QAElementLog> {
        if (
            !elementLog.id
        ) {
            elementLog.id = uuid.generate();
            elementLog.date = new Date();
            elementLog.replies = [];
        };

        return Promise.resolve(elementLog);
    }

    public deleteElementLog(elementId: string, elementLogId: string): Promise<void> {
        return Promise.resolve();
    }

    public updateElementLogReplies(elementId: string, elementLogId: string, elementLogReply: QAElementLogReply): Promise<QAElementLogReply> {
        if (
            !elementLogReply.id
        ) {
            elementLogReply.id = uuid.generate();
            elementLogReply.date = new Date();
        }

        return Promise.resolve(elementLogReply);
    }
}
