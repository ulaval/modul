import { A11yTabTrap, A11yTabTrapOptions, createTabTrap } from 'a11y-tab-trap';
import { Component, Prop } from 'vue-property-decorator';
import { ModulVue } from '../../utils/vue/vue';
@Component
export class MFocusTrap extends ModulVue {
    @Prop({ default: false })
    public readonly focusTrapDisabled: boolean;

    public focusTrap?: A11yTabTrap;

    public setFocusTrap(
        el: HTMLElement,
        options: Partial<A11yTabTrapOptions> = {}
    ): void {
        if (this.focusTrapDisabled) {
            return;
        }

        if (options.initialFocus instanceof HTMLElement) {
            this.focusTrap = createTabTrap(el, {
                initialFocus: options.initialFocus
            });

            return;
        }

        this.focusTrap = createTabTrap(el);
    }
    public removeFocusTrap(): void {
        if (!this.focusTrap || this.focusTrapDisabled) {
            return;
        }

        this.focusTrap.remove();
    }

    protected beforeDestroy(): void {
        if (!this.focusTrap || this.focusTrapDisabled) {
            return;
        }

        this.focusTrap.destroy();
    }
}
