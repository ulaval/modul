import { createFocusTrap, FocusTrap } from 'focus-trap';
import Component from 'vue-class-component';
import { ModulVue } from '../../utils/vue/vue';

@Component
export class MFocusTrap extends ModulVue {
    private focusTrap?: FocusTrap;

    public setFocusTrap(el: HTMLElement, options: {
        initialFocus?: HTMLElement,
        returnFocusOnDeactivate?: boolean
    } = {}): void {
        this.focusTrap = createFocusTrap(el, {
            escapeDeactivates: true,
            allowOutsideClick: true,
            initialFocus: options.initialFocus || el,
            returnFocusOnDeactivate: options.returnFocusOnDeactivate === undefined ? true : options.returnFocusOnDeactivate,
            preventScroll: true
        });
        this.focusTrap.activate();
    }

    public removeFocusTrap(): void {
        if (!this.focusTrap) { return; }
        this.focusTrap.deactivate();
    }

    protected beforeDestroy(): void {
        if (!this.focusTrap) { return; }
        this.focusTrap.deactivate();
    }
}
