import { DirectiveOptions, VNode, VNodeDirective } from 'vue';
import { MQAService } from './qa-service';

export function QADirectiveFactory(qaService: MQAService, panelInstance: any): DirectiveOptions {
    return {
        bind(
            el: HTMLElement,
            binding: VNodeDirective,
            vnode: VNode
        ): void {
            const id: string = binding.value;
            qaService.register(id, el);
        }
    }
};
