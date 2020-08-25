import { ActionContext, Store } from 'vuex';
import { MQAElement } from './qa-def';
import { MQAService } from './qa-service';

export class MQAState {
    elements: MQAElement[] = [];
}

export function QAStoreFactory(service: MQAService): Store<MQAState> {
    return new Store({
        state: new MQAState(),
        getters: {
            elements: (state: MQAState) => state.elements
        },
        mutations: {
            elements: (state: MQAState, elements: MQAElement[]) => {
                state.elements = [...elements];
            }
        },
        actions: {
            fetch: (context: ActionContext<MQAState, MQAState>): void => {
                service.fetch().then((elements: MQAElement[]) => context.commit('elements', elements));
            },
            register: (context: ActionContext<MQAState, MQAState>, payload: { id: string }): void => {
                service.register(payload.id).then((elements: MQAElement[]) => context.commit('elements', elements));
            }
        }
    });
};
