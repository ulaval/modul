import { AxiosResponse } from 'axios';
import { RestAdapter } from '../http/rest';

export interface QAData {
    el: HTMLElement
    messages: string[];
}

export class MQAService {
    public data: { [id: string]: QAData } = {};


    public constructor(private projectName: string, private _restAdapter: RestAdapter, private _updateCb: (data: { [id: string]: QAData }) => void) {
        // this._restAdapter.execute({
        //     method: 'get',
        //     rawUrl: 'http://localhost:3000/data/' + this.projectName
        // })
        //     .then((response: AxiosResponse) => {
        //         this.data = JSON.parse(response.data.data.data);
        //     })
        //     .catch(() => { })
    }

    register(id: string, el: HTMLElement): void {
        this.data[id] = this.data[id] || {
            el: el,
            messages: []
        };

        this._updateCb(this.data);
    }

    addMessage(id: string, message: string): void {
        this.data[id].messages.push(message);
        // this.update();
    }

    removeMessage(id: string, index: number): void {
        this.data[id].messages.splice(index, 1);
        // this.update();
    }

    update(): Promise<void> {
        return this._restAdapter.execute({
            method: 'put',
            rawUrl: 'http://localhost:3000/data/' + this.projectName,
            data: {
                data: this.data
            }
        })
            .then((response: AxiosResponse) => {
                this.data = JSON.parse(response.data.data);
            })
            .catch(() => { });
    }
}

