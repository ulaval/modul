import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Watch } from 'vue-property-decorator';
import { REGEX_CSS_NUMBER_VALUE } from '../../utils/props-validation/props-validation';
import { SpritesService } from '../../utils/svg/sprites';
import { ICON_NAME } from '../component-names';
import { MSvg } from '../svg/svg';
import WithRender from './icon.html?style=./icon.scss';

@WithRender
@Component({
    components: {
        MSvg
    }
})
export class MIcon extends Vue {
    @Prop({ required: true })
    public name: string;

    @Prop()
    public svgTitle: string;

    @Prop({
        default: '20px',
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public size: string;

    @Prop({ default: true })
    public useSvgSprite: boolean;

    @Prop({ default: false })
    public showNameAsClass: boolean;

    @Prop({ default: '' })
    public customSvg: string;

    @Emit('click')
    public emitClick(event: MouseEvent): void { }

    @Emit('keydown')
    public emitKeydown(event: KeyboardEvent): void { }

    @Emit('mouseover')
    public emitMouseOver(event: MouseEvent): void { }

    @Emit('mouseleave')
    public emitMouseLeave(event: MouseEvent): void { }

    @Watch('customSvg', { immediate: true })
    public onCustomSvgChange(): void {
        if (this.customSvg && this.useSvgSprite) {
            this.$log.warn('Prop use-svg-sprite needs to be false if you want to see custom-svg');
        }
    }

    public get spriteId(): string | undefined {
        const svg: SpritesService = this.$svg;

        if (document.getElementById(this.name)) {
            return '#' + this.name;
        } else if (document.getElementById('m-svg__' + this.name)) {
            return '#m-svg__' + this.name;
        } else if (svg && svg.getExternalSpritesFromSpriteId(this.name)) {
            return svg.getExternalSpritesFromSpriteId(this.name);
        } else if (svg && svg.getExternalSpritesFromSpriteId('m-svg__' + this.name)) {
            return svg.getExternalSpritesFromSpriteId('m-svg__' + this.name);
        } else if (this.name) {
            Vue.prototype.$log.warn('"' + this.name + '" is not a valid svg id. Make sure that the sprite has been loaded via the $svg instance service.');
        }
    }

    public get showNameAsClassInHtml(): string | undefined {
        return this.showNameAsClass ? this.name : undefined;
    }
}

const IconPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(ICON_NAME, 'plugin.install');
        v.component(ICON_NAME, MIcon);
    }
};

export default IconPlugin;
