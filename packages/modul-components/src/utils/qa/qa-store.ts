import { ActionContext, Store } from 'vuex';
import { QAElement, QAElementLog, QAElementLogReply, QAState, QAUser } from './qa-def';
import { MQAService } from './qa-service';

export function QAStoreFactory(service: MQAService): Store<QAState> {
    return new Store({
        state: new QAState(),
        getters: {
            user: (state: QAState) => state.user,
            elements: (state: QAState) => state.elements,
            selectedElement: (state: QAState) => state.selectedElement,
            selectedElementLog: (state: QAState) => state.selectedElementLog,
            editedElement: (state: QAState) => state.editedElement,
            editedElementLog: (state: QAState) => state.editedElementLog
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
            updateElementLog: (state: QAState, payload: { elementId: string, elementLog: QAElementLog }) => {
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
            editedElement: (state: QAState, element: QAElement | null) => {
                state.editedElement = element;
            },
            editedElementLog: (state: QAState, elementLog: QAElementLog | null) => {
                state.editedElementLog = elementLog;
            },
            updateElementLogReplies: (state: QAState, payload: { elementId: string, elementLogId: string, elementLogReply: QAElementLogReply }) => {
                const element = state.elements.find(e => e.id === payload.elementId)!;
                const elementLog = element.logs.find(l => l.id === payload.elementLogId);

                if (elementLog!.replies!.map(r => r.id).indexOf(payload.elementLogReply.id) === -1) {
                    elementLog!.replies!.push(payload.elementLogReply);
                    return;
                }

                elementLog!.replies!.splice(
                    elementLog!.replies!.map(r => r.id).indexOf(payload.elementLogReply.id),
                    1,
                    payload.elementLogReply
                );
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
                    .then((elementLog: QAElementLog) =>
                        context.commit('updateElementLog', { elementId: payload.elementId, elementLog }));
            },
            deleteElementLog: (context: ActionContext<QAState, QAState>, payload: { elementId: string, elementLogId: string }) => {
                service
                    .deleteElementLog(payload.elementId, payload.elementLogId)
                    .then(() =>
                        context.commit('deleteLog', { elementId: payload.elementId, elementLogId: payload.elementLogId }));
            },
            updateSelectedElement: (context: ActionContext<QAState, QAState>, payload: { element: QAElement | null }) => {
                context.commit('selectedElement', payload.element);
            },
            updateSelectedElementLog: (context: ActionContext<QAState, QAState>, payload: { elementLog: QAElementLog | null }) => {
                context.commit('selectedElementLog', payload.elementLog);
            },
            updateEditedElement: (context: ActionContext<QAState, QAState>, payload: { element: QAElement | null }) => {
                context.commit('editedElement', payload.element);
            },
            updateEditedElementLog: (context: ActionContext<QAState, QAState>, payload: { elementLog: QAElementLog | null }) => {
                context.commit('editedElementLog', payload.elementLog);
            },
            updateElementLogReplies: (context: ActionContext<QAState, QAState>, payload: { elementId: string, elementLogId: string, elementLogReply: QAElementLogReply }) => {
                service
                    .updateElementLogReplies(payload.elementId, payload.elementLogId, payload.elementLogReply)
                    .then((elementLogReply: QAElementLogReply) =>
                        context.commit('updateElementLogReplies', { elementId: payload.elementId, elementLogId: payload.elementLogId, elementLogReply: payload.elementLogReply }));
            }
        }
    });
};
