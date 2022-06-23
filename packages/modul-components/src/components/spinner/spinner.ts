import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { BackdropMode } from '../../mixins/portal/portal';
import { Enums } from '../../utils/enums/enums';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { SPINNER_NAME } from '../component-names';
import WithRender from './spinner.html?style=./spinner.scss';

export enum MSpinnerStyle {
    Dark = 'dark',
    Regular = 'regular',
    Light = 'light',
    Lighter = 'lighter'
}

export enum MSpinnerSize {
    Large = 'large',
    Small = 'small'
}

export const PROCESSING_WARN: string = 'Change of property "processing" is not supported';
const SPINNER_ID: string = 'MSpinner';

@WithRender
@Component
export class MSpinner extends ModulVue {
    @Prop()
    public readonly title: boolean;

    @Prop()
    public readonly titleMessage: string;

    @Prop()
    public readonly description: boolean;

    @Prop()
    public readonly descriptionMessage: string;

    @Prop({
        default: MSpinnerStyle.Regular,
        validator: value => Enums.toValueArray(MSpinnerStyle).includes(value)
    })
    public readonly skin: MSpinnerStyle;

    @Prop({
        default: MSpinnerSize.Large,
        validator: value => Enums.toValueArray(MSpinnerSize).includes(value)
    })
    public readonly size: MSpinnerSize;

    @Prop()
    public readonly processing: boolean;

    private spinnerId: string = SPINNER_ID + '-' + uuid.generate();
    private portalTargetEl: HTMLElement | undefined = {} as HTMLElement; // initialized to be responsive

    private initialized: boolean = false; // seems to be necessary since $refs are not responsive
    private stackId: string;

    protected created(): void {
        this.portalTargetEl = undefined;
    }

    protected beforeDestroy(): void {
        this.removeBackdrop();
    }

    @Watch('processing')
    public onProcessingChange(value: boolean): void {
        if (value) {
            this.openProcessingPortal();
        } else {
            this.removeBackdrop();
        }
    }

    public get spinnerElement(): HTMLElement | undefined {
        return this.processing ? this.portalTargetEl : this.$refs.spinnerContainer as HTMLElement;
    }

    public openProcessingPortal(): void {
        if (!this.portalTargetEl && this.processing) {
            let element: HTMLElement = document.createElement('div');
            element.setAttribute('id', this.spinnerId);
            document.body.appendChild(element);
            this.portalTargetEl = document.getElementById(this.spinnerId) as HTMLElement;
            this.stackId = this.$modul.pushElement(this.portalTargetEl, BackdropMode.BackdropSlow, false);
            this.portalTargetEl.style.position = 'absolute';
        }
        this.initialized = true;
    }

    private removeBackdrop(): void {
        if (this.portalTargetEl) {
            this.$modul.popElement(this.stackId);
            this.portalTargetEl.style.position = '';
            this.portalTargetEl = undefined;
        }

        const el: HTMLElement = document.getElementById(this.spinnerId) as HTMLElement;
        if (el) {
            document.body.removeChild(el);
        }
    }
}

const SpinnerPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(SPINNER_NAME, MSpinner);
    }
};

export default SpinnerPlugin;
