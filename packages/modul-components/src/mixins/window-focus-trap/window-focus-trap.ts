import { createFocusTrap, FocusTrap, Options } from 'focus-trap';
import { Component, Prop } from 'vue-property-decorator';
import { ModulVue } from '../../utils/vue/vue';
@Component
export class MFocusTrap extends ModulVue {
    @Prop({ default: false })
    public readonly focusTrapDisabled: boolean;

    public focusTrap?: FocusTrap;

    public setFocusTrap(el: HTMLElement, options: Options = {}): void {
        if (this.focusTrapDisabled) { return; }

        options.allowOutsideClick = options.allowOutsideClick ?? true;
        options.escapeDeactivates = options.escapeDeactivates ?? false;
        options.initialFocus = options.initialFocus ?? el;
        options.preventScroll = options.preventScroll ?? true;

        this.focusTrap = createFocusTrap(el, options);
        this.focusTrap.activate();
    }
    public removeFocusTrap(): void {
        if (!this.focusTrap || this.focusTrapDisabled) { return; }

        this.focusTrap.deactivate();
    }

    protected beforeDestroy(): void {
        if (!this.focusTrap || this.focusTrapDisabled) { return; }

        if (!this.focusTrap) { return; }
        this.focusTrap.deactivate();
    }
}
