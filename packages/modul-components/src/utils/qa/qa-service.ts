import { MQAElement } from './qa-def';

export interface MQAService {
    fetch(): Promise<MQAElement[]>;
    register(id: string): Promise<MQAElement[]>;
}

export class MQAServiceHttp implements MQAService {
    public fetch(): Promise<MQAElement[]> {
        return Promise.resolve([]);
    }
    public register(id: string): Promise<MQAElement[]> {
        return Promise.resolve([]);
    }
}

export class MQAServiceMock implements MQAService {
    private elements: MQAElement[] = [];

    public fetch(): Promise<MQAElement[]> {
        return Promise.resolve(this.elements);
    }
    public register(id: string): Promise<MQAElement[]> {
        this.elements.push({ id });
        return Promise.resolve(this.elements);
    }
}
