import { PluginObject } from 'vue';
import { QADirectiveFactory } from './qa-directive';
import { MQAPanel } from './qa-panel';
import { MQAService, QAData } from './qa-service';

declare module 'vue/types/vue' {
    interface Vue {
        $qa: MQAService;
    }
}

const element = document.createElement('div');
element.setAttribute('id', 'qa-container');
document.body.appendChild(element);

export const QAPlugin: PluginObject<any> = {
    install(v): void {
        const panelInstance = new MQAPanel();
        const service = new MQAService('modul', v.prototype.$http, (data: { [id: string]: QAData }) => v.prototype.$set(panelInstance, 'data', data));

        v.prototype.$qa = service;

        v.directive('qa', QADirectiveFactory(v.prototype.$qa, panelInstance));

        panelInstance.$mount('#qa-container');
    }
}

export default QAPlugin;
