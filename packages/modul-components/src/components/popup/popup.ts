import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
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

    @Emit('update:open')
    public emitUpdateOpen(open: boolean): void { }

    @Emit('open')
    public emitOpen(): void { }

    @Emit('close')
    public emitClose(): void { }

    @Emit('portal-mounted')
    public emitPortalMounted(): void { }

    @Emit('portal-after-open')
    public emitPortalAfterOpen(): void { }

    @Emit('portal-after-close')
    public emitPortalAfterClose(): void { }

    @Watch('open', { immediate: true })
    public onOpenChange(open: boolean): void {
        if (this.disabled) {
            return;
        }
        this.internalOpen = open;
    }

    public get popupBody(): Element {
        return (this.$children[0] as any).popupBody;
    }

    public get propOpenTrigger(): MOpenTrigger {
        return this.openTrigger; // todo: mobile + hover ??
    }

    public get propTrigger(): HTMLElement {
        return this.trigger || this.as<OpenTriggerMixin>().triggerHook || undefined;
    }

    public set popperOpen(open: boolean) {
        if (this.isSidebarUsed) {
            return;
        }
        this.setOpen(open);
    }

    public get popperOpen(): boolean {
        return !this.isSidebarUsed ? this.internalOpen : false;
    }

    public set sideBarOpen(open: boolean) {
        if (!this.isSidebarUsed) {
            return;
        }
        this.setOpen(open);
    }

    public get sideBarOpen(): boolean {
        return this.isSidebarUsed ? this.internalOpen : false;
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

    private setOpen(open: boolean): void {
        if (this.disabled) {
            return;
        }
        this.internalOpen = open;
        this.emitUpdateOpen(open);
    }

}

const PopupPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(POPUP_NAME, MPopup);
    }
};

export default PopupPlugin;
