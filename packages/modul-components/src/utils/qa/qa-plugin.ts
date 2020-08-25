import { PluginObject } from 'vue';
import Vuex from 'vuex';
import { MQAElementDetails } from './components/element-details/qa-element-details';
import { MQAElementForm } from './components/element-form/qa-element-form';
import { MQAElements } from './components/elements/qa-elements';
import { MQAElementLogForm } from './components/log-form/qa-element-log-form';
import { MQALogin } from './components/login/qa-login';
import { MQAElementLogs } from './components/logs/qa-element-logs';
import { QADirectiveFactory } from './qa-directive';
import { MQAPanel } from './qa-panel';
import { MQAServiceMock } from './qa-service';
import { QAStoreFactory } from './qa-store';

const element = document.createElement('div');
element.setAttribute('id', 'qa-container');
document.body.appendChild(element);

export const QAPlugin: PluginObject<any> = {
    install(v, options: { project: string, token: string }): void {
        v.use(Vuex);

        v.component('m-qa-login', MQALogin);
        v.component('m-qa-elements', MQAElements);
        v.component('m-qa-element-logs', MQAElementLogs);
        v.component('m-qa-element-details', MQAElementDetails);
        v.component('m-qa-element-form', MQAElementForm);
        v.component('m-qa-element-log-form', MQAElementLogForm);

        const store = QAStoreFactory(new MQAServiceMock(), { project: options.project, token: options.token });

        v.directive('qa', QADirectiveFactory(store));

        const panelInstance = new MQAPanel({
            store
        });

        panelInstance.$mount('#qa-container');
    }
}

export default QAPlugin;
