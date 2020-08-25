import { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import { Store } from 'vuex';
import uuid from '../uuid/uuid';
import { MQAState } from './qa-store';

export function QADirectiveFactory(store: Store<MQAState>): DirectiveOptions {
    return {
        bind(
            el: HTMLElement,
            binding: VNodeDirective,
            vnode: VNode
        ): void {
            const id: string = uuid.generate();
            el.setAttribute('data-qa', id);
            store.dispatch('register', { id });
        }
    }
};
