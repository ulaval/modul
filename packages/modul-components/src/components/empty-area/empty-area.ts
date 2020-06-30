import { PluginObject } from 'vue';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import { Enums } from '../../utils/enums/enums';
import { ModulIconName } from '../../utils/modul-icons/modul-icons';
import { EMPTY_AREA_NAME } from '../component-names';
import { MAdd } from './../add/add';
import {
    MButton,
    MButtonSkin
} from './../button/button';
import { MSvg } from './../svg/svg';
import WithRender from './empty-area.html?style=./empty-area.scss';

export enum MEmptyAreaButtonType {
    Button = 'button',
    AddButton = 'add-button'
}

@WithRender
@Component({
    components: { MButton, MAdd, MSvg }
})
default class MEmptyArea extends Vue {
    @Prop()
    public readonly text?: string;

    @Prop()
    public readonly textButton?: string;

    @Prop({
        default: MEmptyAreaButtonType.AddButton,
        validator: (value: MEmptyAreaButtonType) =>
            Enums.toValueArray(MEmptyAreaButtonType).includes(value),
    })
    public readonly buttonType!: MEmptyAreaButtonType;

    @Prop()
    public svgName?: string;

    public readonly buttonSkin: MButtonSkin = MButtonSkin.Secondary;

    @Emit('button-click')
    public emitButtonClick(): void { }

    public get isButtonTypeAdd(): boolean {
        this.$svgSprite.addSvg(ModulIconName.Calendar, require('./../../assets/icons/svg/calendar.svg'));
        return this.buttonType === MEmptyAreaButtonType.AddButton;
    }
}


const EmptyAreaPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(EMPTY_AREA_NAME, 'plugin.install');
        v.component(EMPTY_AREA_NAME, MEmptyArea);
    }
};

export default EmptyAreaPlugin;
