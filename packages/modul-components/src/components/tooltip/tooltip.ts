import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { MediaQueries, MediaQueriesMixin } from '../../mixins/media-queries/media-queries';
import { Enums } from '../../utils/enums/enums';
import MediaQueriesPlugin from '../../utils/media-queries/media-queries';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { TOOLTIP_NAME } from '../component-names';
import { MIconButton } from '../icon-button/icon-button';
import { MLink } from '../link/link';
import { MPopperPlacement } from '../popper/popper';
import { MPopup } from '../popup/popup';
import WithRender from './tooltip.html';
import './tooltip.scss';

export enum MTooltipMode {
    Icon = 'icon',
    Link = 'link',
    Definition = 'definition'
}

export enum MTooltipSize {
    Small = 'small',
    Large = 'large'
}

@WithRender
@Component({
    components: {
        MPopup,
        MIconButton,
        MLink
    },
    mixins: [MediaQueries]
})
export class MTooltip extends ModulVue {
    @Prop()
    public readonly open: boolean;

    @Prop({
        default: MTooltipMode.Icon,
        validator: value => Enums.toValueArray(MTooltipMode).includes(value)
    })
    public readonly mode: MTooltipMode;

    @Prop({
        default: MPopperPlacement.Bottom,
        validator: value => Enums.toValueArray(MPopperPlacement).includes(value)
    })
    public readonly placement: MPopperPlacement;

    @Prop({ default: true })
    public readonly closeButton: boolean;

    @Prop()
    public readonly disabled: boolean;

    @Prop()
    public readonly openTitle: string;

    @Prop()
    public readonly closeTitle: string;

    @Prop()
    public readonly className: string;

    @Prop({
        default: MTooltipSize.Small,
        validator: value => Enums.toValueArray(MTooltipSize).includes(value)
    })
    public readonly size: MTooltipSize;

    @Prop({ default: 'm-svg__information' })
    public readonly iconName: string;

    public tooltipId: string = `mTooltip-${uuid.generate()}`;

    private propOpen: boolean = false;

    protected mounted(): void {
        this.propOpen = this.open;
    }

    @Emit('close')
    public onClick(event: Event): void {
    }

    public get isModeIcon(): boolean {
        return this.mode === MTooltipMode.Icon;
    }

    public get isModeLink(): boolean {
        return this.mode === MTooltipMode.Link;
    }

    public get isModeDefinition(): boolean {
        return this.mode === MTooltipMode.Definition;
    }

    public get isSizeLarge(): boolean {
        return this.size === MTooltipSize.Large;
    }

    public get hasCloseButton(): boolean {
        return this.as<MediaQueriesMixin>().isMqMaxS ? false : this.closeButton;
    }

    public get title(): string {
        return this.propOpen ? this.CloseTitle : this.OpenTitle;
    }

    public get OpenTitle(): string {
        return this.openTitle === undefined ? this.$i18n.translate('m-tooltip:open') : this.openTitle;
    }

    public get CloseTitle(): string {
        return this.closeTitle === undefined ? this.$i18n.translate('m-tooltip:close') : this.closeTitle;
    }

    public close(): void {
        this.propOpen = false;
    }

    public get hasDefaultSlot(): boolean {
        return !!this.$slots.default;
    }

    @Watch('open')
    public openChanged(open: boolean): void {
        this.propOpen = open;
    }

    @Emit('open')
    public onOpen(): void {
    }

    @Emit('close')
    public onClose(): void {
    }
}

const TooltipPlugin: PluginObject<any> = {
    install(v, options): void {

        v.use(MediaQueriesPlugin);
        v.component(TOOLTIP_NAME, MTooltip);
    }
};

export default TooltipPlugin;
