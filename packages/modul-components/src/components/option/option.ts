import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Ref } from 'vue-property-decorator';
import { MediaQueries, MediaQueriesMixin } from '../../mixins/media-queries/media-queries';
import { MFocusTrap } from '../../mixins/window-focus-trap/window-focus-trap';
import { Enums } from '../../utils/enums/enums';
import MediaQueriesPlugin from '../../utils/media-queries/media-queries';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { OPTION_ITEM_ADD_NAME, OPTION_ITEM_ARCHIVE_NAME, OPTION_ITEM_DELETE_NAME, OPTION_ITEM_EDIT_NAME, OPTION_ITEM_NAME, OPTION_NAME, OPTION_SEPARATOR, OPTION_TITLE } from '../component-names';
import { MIconButton, MIconButtonSkin } from '../icon-button/icon-button';
import { MIcon } from '../icon/icon';
import { MPopperPlacement } from '../popper/popper';
import { MPopup } from '../popup/popup';
import { MOptionItem } from './option-item/option-item';
import { MOptionItemAdd } from './option-item/option-item-add';
import { MOptionItemArchive } from './option-item/option-item-archive';
import { MOptionItemDelete } from './option-item/option-item-delete';
import { MOptionItemEdit } from './option-item/option-item-edit';
import { MOptionSeparator } from './option-separator/option-separator';
import { MOptionTitle } from './option-title/option-title';
import WithRender from './option.html';
import './option.scss';

export abstract class BaseOption extends ModulVue {
}

export interface MOptionInterface {
    hasIcon: boolean;
    maxWidth: string;
    checkIcon(el: boolean): void;
    close(): void;
}

export enum MOptionsSkin {
    Light = 'over-light',
    Dark = 'over-dark',
    Mixed = 'over-mixed'
}

@WithRender
@Component({
    components: {
        MPopup,
        MIconButton,
        MIcon
    },
    mixins: [
        MediaQueries,
        MFocusTrap
    ]
})
export class MOption extends BaseOption implements MOptionInterface {
    @Prop({
        default: MPopperPlacement.Bottom,
        validator: value => Enums.toValueArray(MPopperPlacement).includes(value)
    })
    public readonly placement: MPopperPlacement;

    @Prop({
        default: MOptionsSkin.Light,
        validator: value => Enums.toValueArray(MOptionsSkin).includes(value)
    })
    public readonly skin: MOptionsSkin;

    @Prop({ default: function(): string { return this.$i18n.translate('m-option:show-more'); } })
    public readonly title: string;

    @Prop()
    public readonly ariaLabel?: string;

    @Prop()
    public readonly disabled: boolean;

    @Prop({ default: '44px' })
    public readonly size: string;

    @Prop({ default: true })
    public readonly scroll: boolean;

    @Prop({ default: '260px' })
    public maxWidth: string;

    @Ref('menu')
    public readonly refMenu?: HTMLElement;

    @Ref('popup')
    public readonly refPopup?: MPopup;

    public hasIcon: boolean = false;
    public isCloseButtonVisible: boolean = false;
    private id: string = `mOption-${uuid.generate()}`;
    private lastItemFocus?: HTMLElement;
    private open = false;
    private isOutsideClickDetected: boolean = false;

    @Emit('open')
    public emitOpen(): void {
        this.isOutsideClickDetected = false;
        this.lastItemFocus = document.activeElement as HTMLElement;

        setTimeout(() => {
            if (this.refMenu) {
                this.as<MFocusTrap>().setFocusTrap(this.refMenu, { returnFocusOnDeactivate: false });
            }
        }, 0);
    }

    @Emit('close')
    public emitClose(): void {
        this.as<MFocusTrap>().removeFocusTrap();
        if (this.lastItemFocus && (!this.isOutsideClickDetected || this.as<MediaQueriesMixin>().isMqMaxS)) {
            this.lastItemFocus.focus();
        }
    }

    @Emit('click')
    public emitClick(event: MouseEvent): void { }

    public checkIcon(icon: boolean): void {
        if (!icon) { return; }
        this.hasIcon = true;
    }

    public close(): void {
        this.open = false;
        this.emitClose();
    }

    public onCloseButtonFocus(): void {
        this.isCloseButtonVisible = true;
    }

    public onCloseButtonBlur(): void {
        this.isCloseButtonVisible = false;
    }

    public onClickOutside(): void {
        this.isOutsideClickDetected = true;
    }

    public get optionMaxWidth(): string {
        return this.as<MediaQueriesMixin>().isMqMinM ? this.maxWidth : 'none';
    }

    public get menuMaxHeight(): string | undefined {
        return this.scroll ? undefined : 'none';
    }

    public get isSkinMixed(): boolean {
        return this.skin === MOptionsSkin.Mixed;
    }

    public get iconButtonSkin(): string | undefined {
        switch (this.skin) {
            case MOptionsSkin.Light:
                return MIconButtonSkin.Light;
            case MOptionsSkin.Dark:
                return MIconButtonSkin.Dark;
            default:
                throw new Error('skin not supported!');
        }
    }

    protected mounted(): void {
        document.addEventListener('keydown', this.closeOnEscape);
    }

    protected beforeDestroy(): void {
        document.removeEventListener('keydown', this.closeOnEscape);
        // if (!this.as<MFocusTrap>().focusTrap) { return; }
        // this.as<MFocusTrap>().focusTrap.deactivate();
    }

    private closeOnEscape(event: KeyboardEvent): void {
        if (!(event.key === 'Escape' && this.open)) { return; }
        this.close();
        event.stopPropagation();
    }
}

const OptionPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(MediaQueriesPlugin);
        v.component(OPTION_ITEM_NAME, MOptionItem);
        v.component(OPTION_ITEM_ARCHIVE_NAME, MOptionItemArchive);
        v.component(OPTION_ITEM_ADD_NAME, MOptionItemAdd);
        v.component(OPTION_ITEM_DELETE_NAME, MOptionItemDelete);
        v.component(OPTION_ITEM_EDIT_NAME, MOptionItemEdit);
        v.component(OPTION_TITLE, MOptionTitle);
        v.component(OPTION_SEPARATOR, MOptionSeparator);
        v.component(OPTION_NAME, MOption);
    }
};

export default OptionPlugin;
