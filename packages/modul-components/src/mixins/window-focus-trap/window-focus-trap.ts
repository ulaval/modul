import { createFocusTrap, FocusTrap, Options } from 'focus-trap';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ModulVue } from '../../utils/vue/vue';
@Component
export class MFocusTrap extends ModulVue {
    @Prop({ default: () => ({}) })
    public options!: Options;

    public focusTrap?: FocusTrap;

    public setFocusTrap(el: HTMLElement, options: Options = {}): void {
        options.allowOutsideClick = options.allowOutsideClick ?? true;
        options.escapeDeactivates = options.escapeDeactivates ?? false;
        options.initialFocus = options.initialFocus ?? el;
        options.preventScroll = options.preventScroll ?? true;

        options = { ...options, ...this.options };

        this.focusTrap = createFocusTrap(el, options);
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
