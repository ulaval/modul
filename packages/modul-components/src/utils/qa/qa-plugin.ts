import { PluginObject } from 'vue';
import Vuex from 'vuex';
import { MQAlogin } from './components/qa-login';
import { QADirectiveFactory } from './qa-directive';
import { MQAPanel } from './qa-panel';
import { MQAServiceMock } from './qa-service';
import { QAStoreFactory } from './qa-store';
const element = document.createElement('div');
element.setAttribute('id', 'qa-container');
document.body.appendChild(element);

export const QAPlugin: PluginObject<any> = {
    install(v, options: { project: string }): void {
        v.use(Vuex);
        v.component('m-qa-login', MQAlogin);
        const store = QAStoreFactory(new MQAServiceMock(), { project: options.project });

        v.directive('qa', QADirectiveFactory(store));

        const panelInstance = new MQAPanel({
            store
        });

        panelInstance.$mount('#qa-container');
    }
}

export default QAPlugin;
