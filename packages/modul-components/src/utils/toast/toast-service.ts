import Vue from 'vue';
import { MToast, MToastPosition, MToastState, MToastTimeout } from '../../components/toast/toast';

export interface ToastParams {
    text: string; // Can be html, but must start with a root tag: <p> text of toast </p>
    actionLabel?: string;
    action?: (event: Event) => any;
    state?: MToastState;
    position?: MToastPosition;
    timeout?: MToastTimeout;
    icon?: boolean;
    closeButton?: boolean;
}

const TIME_BEFORE_ANIMATION_IS_OVER: number = 300;

export default class ToastService {
    public activeToast?: MToast;
    public toasts: MToast[] = [];
    public baseTopPosition: string = '0';

    public show(params: ToastParams): void {
        const toast: MToast = this.createToast(params);
        this.toasts.push(toast);

        if (this.activeToast) {
            this.activeToast.open = false;
            this.activeToast = this.toasts[1];
            this.toasts.splice(0, 1);
        } else {
            this.activeToast = this.toasts[0];
        }
    }

    public async clear(): Promise<void> {
        if (this.activeToast) {
            this.activeToast.open = false;
        }
        this.toasts = [];
        this.activeToast = undefined;
        return new Promise<void>(resolve => {
            setTimeout(() => resolve(), TIME_BEFORE_ANIMATION_IS_OVER);
        });
    }

    private createToast(params: ToastParams): MToast {
        const toast: MToast = new MToast({
            el: document.createElement('div'),
            propsData: {
                ['open.sync']: true,
                state: params.state,
                position: params.position,
                timeout: params.timeout,
                actionLabel: params.actionLabel,
                icon: params.icon,
                closeButton: params.closeButton
            }
        });

        toast.$on('close', () => setTimeout(() => toast.$destroy(), TIME_BEFORE_ANIMATION_IS_OVER));
        if (params.action) {
            toast.$on('action-button', (event: Event) => {
                params.action!(event);
            });
        }

        toast.offset = toast.isTop ? this.baseTopPosition : '0';

        // Si c'est déjà du HTML, laisser tel quel, sinon, encapsuler dans un p
        params.text = /^<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>$/.test(params.text) ? params.text : `<p>${params.text}</p>`;

        if (Vue.compile !== undefined) {
            toast.$slots.default = [toast.$createElement(Vue.compile(params.text))];
        } else {
            toast.$slots.default = [toast.$createElement('div', { domProps: { innerHTML: params.text } })];
        }

        return toast;
    }
}
