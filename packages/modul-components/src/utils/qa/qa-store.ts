import { ActionContext, Store } from 'vuex';
import { QAElement, QAElementLog, QAState, QAUser } from './qa-def';
import { MQAService } from './qa-service';

export function QAStoreFactory(service: MQAService): Store<QAState> {
    return new Store({
        state: new QAState(),
        getters: {
            user: (state: QAState) => state.user,
            elements: (state: QAState) => state.elements,
            selectedElement: (state: QAState) => state.selectedElement,
            selectedElementLog: (state: QAState) => state.selectedElementLog,
            editingElement: (state: QAState) => state.editingElement,
            editingElementLog: (state: QAState) => state.editingElementLog
        },
        mutations: {
            user: (state: QAState, user: QAUser) => {
                state.user = user;
            },
            elements: (state: QAState, elements: QAElement[]) => {
                state.elements = [...elements];
            },
            updateElement: (state: QAState, element: QAElement) => {
                state.elements.splice(
                    state.elements.map(e => e.id).indexOf(element.id),
                    1,
                    element
                );
            },
            updateLog: (state: QAState, payload: { elementId: string, elementLog: QAElementLog }) => {
                const logs = state.elements.find(e => e.id === payload.elementId)!.logs!;

                if (logs.map(l => l.id).indexOf(payload.elementLog.id) === -1) {
                    logs.push(payload.elementLog);
                    return;
                }

                logs.splice(
                    logs.map(l => l.id).indexOf(payload.elementLog.id),
                    1,
                    payload.elementLog
                );
            },
            deleteLog: (state: QAState, payload: { elementId: string, elementLogId: string }) => {
                const logs = state.elements.find(e => e.id === payload.elementId)!.logs;
                logs.splice(
                    logs.map(l => l.id).indexOf(payload.elementLogId),
                    1
                );
            },
            selectedElement: (state: QAState, element: QAElement | null) => {
                state.selectedElement = element
            },
            selectedElementLog: (state: QAState, elementLog: QAElement | null) => {
                state.selectedElementLog = elementLog;
            },
            editingElement: (state: QAState, element: QAElement | null) => {
                state.editingElement = element;
            },
            editingElementLog: (state: QAState, elementLog: QAElementLog | null) => {
                state.editingElementLog = elementLog;
            }
        },
        actions: {
            login: (context: ActionContext<QAState, QAState>, payload: {
                username: string,
                password: string
            }): void => {
                service
                    .login(payload.username, payload.password)
                    .then((user: QAUser) =>
                        context.commit('user', user));
            },
            fetchElements: (context: ActionContext<QAState, QAState>): void => {
                service
                    .fetchElements()
                    .then((elements: QAElement[]) =>
                        context.commit('elements', elements));
            },
            registerElement: (context: ActionContext<QAState, QAState>, payload: { elementId: string }): void => {
                service
                    .registerElement(payload.elementId)
                    .then((elements: QAElement[]) =>
                        context.commit('elements', elements));
            },
            updateElement: (context: ActionContext<QAState, QAState>, payload: { element: QAElement }): void => {
                service
                    .updateElement(payload.element)
                    .then((element: QAElement) =>
                        context.commit('updateElement', element));
            },
            updateElementLog: (context: ActionContext<QAState, QAState>, payload: { elementId: string, elementLog: QAElementLog }): void => {
                service
                    .updateElementLog(payload.elementId, payload.elementLog)
                    .then((log: QAElementLog) =>
                        context.commit('updateLog', { elementId: payload.elementId, log }));
            },
            deleteElementLog: (context: ActionContext<QAState, QAState>, payload: { elementId: string, elementLogId: string }) => {
                service
                    .deleteElementLog(payload.elementId, payload.elementLogId)
                    .then(() =>
                        context.commit('deleteLog', { elementId: payload.elementId, elementLogId: payload.elementLogId }));
            },
            updateSelectedElement: (context: ActionContext<QAState, QAState>, payload: { element: QAElement }) => {
                context.commit('selectedElement', payload.element);
            },
            updateSelectedElementLog: (context: ActionContext<QAState, QAState>, payload: { elementLog: QAElementLog }) => {
                context.commit('selectedElementLog', payload.elementLog);
            },
            updateEditingElement: (context: ActionContext<QAState, QAState>, payload: { element: QAElement }) => {
                context.commit('editingElement', payload.element);
            },
            updateEditingElementLog: (context: ActionContext<QAState, QAState>, payload: { elementLog: QAElementLog }) => {
                context.commit('editingElementLog', payload.elementLog);
            }
        }
    });
};
