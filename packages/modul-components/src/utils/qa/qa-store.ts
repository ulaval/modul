import { ActionContext, Store } from 'vuex';
import { MQAElement, MQAElementLog, MQAUser } from './qa-def';
import { MQAService } from './qa-service';

export class MQAState {
    public user: MQAUser | null = {
        username: 'test'
    };
    public elements: MQAElement[] = [];

    constructor(
        public project: string
    ) { }
}

export function QAStoreFactory(service: MQAService, options: { project: string, token: string }): Store<MQAState> {
    return new Store({
        state: new MQAState(options.project),
        getters: {
            user: (state: MQAState) => state.user,
            elements: (state: MQAState) => state.elements
        },
        mutations: {
            user: (state: MQAState, user: MQAUser) => {
                state.user = user;
            },
            elements: (state: MQAState, elements: MQAElement[]) => {
                state.elements = [...elements];
            },
            updateElement: (state: MQAState, element: MQAElement) => {
                state.elements.splice(
                    state.elements.map(e => e.id).indexOf(element.id),
                    1,
                    element
                );
            },
            updateLog: (state: MQAState, payload: { elementId: string, log: MQAElementLog }) => {
                const logs = state.elements.find(e => e.id === payload.elementId)!.logs!;

                if (logs.map(l => l.id).indexOf(payload.log.id) === -1) {
                    logs.push(payload.log);
                    return;
                }

                logs.splice(
                    logs.map(l => l.id).indexOf(payload.log.id),
                    1,
                    payload.log
                );
            }

        },
        actions: {
            login: (context: ActionContext<MQAState, MQAState>, payload: {
                username: string,
                password: string
            }): void => {
                service.login(payload.username, payload.password).then((user: MQAUser) => context.commit('user', user));
            },
            fetch: (context: ActionContext<MQAState, MQAState>): void => {
                service.fetch(context.state.project).then((elements: MQAElement[]) => context.commit('elements', elements));
            },
            register: (context: ActionContext<MQAState, MQAState>, payload: { id: string }): void => {
                service.register(context.state.project, payload.id).then((elements: MQAElement[]) => context.commit('elements', elements));
            },
            update: (context: ActionContext<MQAState, MQAState>, payload: { element: MQAElement }): void => {
                service.update(context.state.project, payload.element).then((element: MQAElement) => context.commit('updateElement', element));
            },
            updateLog: (context: ActionContext<MQAState, MQAState>, payload: { elementId: string, log: MQAElementLog }): void => {
                service.updateLog(context.state.project, payload.elementId, payload.log).then((log: MQAElementLog) => context.commit('updateLog', { elementId: payload.elementId, log }));
            },
        }
    });
};
