import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { MediaQueries } from '../../mixins/media-queries/media-queries';
import { MOpenTrigger, OpenTrigger, OpenTriggerMixin } from '../../mixins/open-trigger/open-trigger';
import { Enums } from '../../utils/enums/enums';
import { REGEX_CSS_NUMBER_VALUE } from '../../utils/props-validation/props-validation';
import { ModulVue } from '../../utils/vue/vue';
import { POPPER_NAME, POPUP_NAME, SIDEBAR_NAME } from '../component-names';
import { MPopper, MPopperPlacement } from '../popper/popper';
import { MSidebar } from '../sidebar/sidebar';
import WithRender from './popup.html?style=./popup.scss';

@WithRender
@Component({
    components: {
        [POPPER_NAME]: MPopper,
        [SIDEBAR_NAME]: MSidebar
    },
    mixins: [MediaQueries, OpenTrigger]
})
export class MPopup extends ModulVue {
    @Prop()
    public readonly open: boolean;

    @Prop({
        default: MPopperPlacement.Bottom,
        validator: value => Enums.toValueArray(MPopperPlacement).includes(value)
    })
    public readonly placement: MPopperPlacement;

    @Prop({ default: MOpenTrigger.Click })
    public readonly openTrigger: MOpenTrigger;

    @Prop()
    public readonly closeOnBackdrop: boolean;

    @Prop({ default: true })
    public readonly focusManagement: boolean;

    @Prop({
        default: 'auto',
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value) || value === 'auto'
    })
    public readonly width: string;

    @Prop()
    public readonly id: string;

    @Prop()
    public readonly disabled: boolean;

    @Prop()
    public readonly shadow: boolean;

    @Prop({ default: true })
    public readonly padding: boolean;

    @Prop({ default: true })
    public readonly paddingHeader: boolean;

    @Prop({ default: true })
    public readonly paddingBody: boolean;

    @Prop({ default: true })
    public readonly paddingFooter: boolean;

    @Prop({ default: true })
    public readonly background: boolean;

    @Prop()
    public readonly beforeEnter: any;

    @Prop()
    public readonly enter: any;

    @Prop()
    public readonly afterEnter: any;

    @Prop()
    public readonly enterCancelled: any;

    @Prop()
    public readonly beforeLeave: any;

    @Prop()
    public readonly leave: any;

    @Prop()
    public readonly afterLeave: any;

    @Prop()
    public readonly leaveCancelled: any;

    @Prop()
    public readonly desktopOnly: boolean;

    @Prop()
    public readonly className: string;

    @Prop()
    public readonly preload: boolean;

    @Prop()
    public readonly trigger: HTMLElement;

    @Prop({ default: true })
    public readonly lazy: boolean;

    @Prop()
    public readonly sidebarFullHeight: boolean;

    public $refs: {
        popper: MPopper;
    };

    private internalOpen: boolean = false;

    @Emit('open')
    public onOpen(): void { }

    @Emit('update:open')
    public emitUpdateOpen(open: boolean): void { }

    @Emit('close')
    public onClose(): void { }

    @Emit('portal-mounted')
    public onPortalMounted(): void { }

    @Emit('portal-after-open')
    public onPortalAfterOpen(): void { }

    public get popupBody(): Element {
        return (this.$children[0] as any).popupBody;
    }

    public get propOpenTrigger(): MOpenTrigger {
        return this.openTrigger; // todo: mobile + hover ??
    }

    public get propTrigger(): HTMLElement {
        return this.trigger || this.as<OpenTriggerMixin>().triggerHook || undefined;
    }

    public onSideBarOpen(value: boolean): void {
        if (!this.disabled && this.isSidebarUsed) {
            this.internalOpen = value;
            this.emitUpdateOpen(value);
        }
    }

    public onPopperOpen(value: boolean): void {
        if (!this.disabled && !this.isSidebarUsed) {
            this.internalOpen = value;
            this.emitUpdateOpen(value);
        }
    }

    public get sideBarOpen(): boolean {
        if (this.isSidebarUsed) {
            return this.open === undefined ? this.internalOpen : this.open;
        } else {
            return false;
        }

    }

    public get popperOpen(): boolean {

        if (!this.isSidebarUsed) {
            return (this.open === undefined ? this.internalOpen : this.open);
        } else {
            return false;
        }

    }

    public update(): void {
        if (!this.isSidebarUsed) { // Pas de popper en mobile
            this.$refs.popper.update();
        }
    }


    public get isSidebarUsed(): boolean {
        // Use a sidebar instead when in mobile
        return this.as<MediaQueries>().isMqMaxS;
    }

}

const PopupPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(POPUP_NAME, MPopup);
    }
};

export default PopupPlugin;
