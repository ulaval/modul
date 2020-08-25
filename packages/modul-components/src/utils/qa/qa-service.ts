import { MQAElement, MQAUser } from './qa-def';

export interface MQAService {
    login(username: string, password: string): Promise<MQAUser>;
    fetch(project: string): Promise<MQAElement[]>;
    register(project: string, id: string): Promise<MQAElement[]>;
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
            this.elements.push({ id, stable: false, logs: [] });
        }

        return Promise.resolve(this.elements);
    }
}
