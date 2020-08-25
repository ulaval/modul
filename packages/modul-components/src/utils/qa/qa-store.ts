import { ActionContext, Store } from 'vuex';
import { MQAElement, MQAUser } from './qa-def';
import { MQAService } from './qa-service';

export class MQAState {
    public user: MQAUser | null = null;
    public elements: MQAElement[] = [];

    constructor(
        public project: string
    ) { }
}

export function QAStoreFactory(service: MQAService, options: { project: string }): Store<MQAState> {
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
            }
        }
    });
};
