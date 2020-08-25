import uuid from '../uuid/uuid';
import { MQAElement, MQAElementLog, MQAUser } from './qa-def';

export interface MQAService {
    login(username: string, password: string): Promise<MQAUser>;
    fetch(project: string): Promise<MQAElement[]>;
    register(project: string, id: string): Promise<MQAElement[]>;
    update(project: string, element: MQAElement): Promise<MQAElement>;
    updateLog(project: string, elementId: string, log: MQAElementLog): Promise<MQAElementLog>;
}

export class MQAServiceHttp implements MQAService {
    public login(username: string, password: string): Promise<MQAUser> {
        return Promise.resolve({ username: '' });
    }
    public fetch(project: string): Promise<MQAElement[]> {
        return Promise.resolve([]);
    }
    public register(project: string, id: string): Promise<MQAElement[]> {
        return Promise.resolve([]);
    }
    public update(project: string, element: MQAElement): Promise<MQAElement> {
        return Promise.resolve({} as any);
    }

    public updateLog(project: string, elementId: string, log: MQAElementLog): Promise<MQAElementLog> {
        return Promise.resolve({} as any);
    }
}

export class MQAServiceMock implements MQAService {
    private elements: MQAElement[] = [];
    private users: MQAUser[] = [
        {
            username: 'John Doe'
        },
        {
            username: 'Jane Doe'
        },
    ];

    public login(username: string, password: string): Promise<MQAUser> {
        return Promise.resolve(this.users[0]);
    }

    public fetch(project: string): Promise<MQAElement[]> {
        return Promise.resolve(this.elements);
    }

    public register(project: string, id: string): Promise<MQAElement[]> {
        if (this.elements.map(e => e.id).indexOf(id) === -1) {
            this.elements.push({ id, name: 'New element', stable: false, logs: [] });
        }

        return Promise.resolve(this.elements);
    }

    public update(project: string, element: MQAElement): Promise<MQAElement> {
        return Promise.resolve(element);
    }

    public updateLog(project: string, elementId: string, log: MQAElementLog): Promise<MQAElementLog> {
        if (
            !log.id
        ) {
            log.id = uuid.generate();
            log.date = new Date();
        };

        return Promise.resolve(log);
    }
}
