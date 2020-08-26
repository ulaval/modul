import { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import { Store } from 'vuex';
import { QAState } from './qa-store';

export function QADirectiveFactory(store: Store<QAState>): DirectiveOptions {
    return {
        bind(
            el: HTMLElement,
            binding: VNodeDirective,
            vnode: VNode
        ): void {
            const id: string = binding.value;
            el.setAttribute('data-qa', id);
            store.dispatch('registerElement', { elementId: id });
        }
    }
};
