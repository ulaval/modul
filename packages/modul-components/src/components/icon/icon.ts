import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { SpritesService } from '../../utils/svg/sprites';
import { ICON_NAME } from '../component-names';
import WithRender from './icon.html?style=./icon.scss';

@WithRender
@Component
export class MIcon extends Vue {
    @Prop({ required: true })
    public name: string;
    @Prop()
    public svgTitle: string;
    @Prop({ default: '20px' })
    public size: string;

    @Prop({ default: false })
    public showNameAsClass: boolean;

    @Emit('click')
    onClick(event: MouseEvent): void { }

    @Emit('keydown')
    onKeydown(event: KeyboardEvent): void { }

    private get hasSvgTitle(): boolean {
        return !!this.svgTitle;
    }

    private get spriteId(): string | undefined {
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

    private get showNameAsClassInHtml(): string {
        return this.showNameAsClass ? this.name : '';
    }

    @Emit('mouseover')
    public onMouseOver(event: Event): void { }

    @Emit('mouseleave')
    public onMouseLeave(event: Event): void { }
}

const IconPlugin: PluginObject<any> = {
    install(v, options): void {
        v.prototype.$log.debug(ICON_NAME, 'plugin.install');
        v.component(ICON_NAME, MIcon);
    }
};

export default IconPlugin;
