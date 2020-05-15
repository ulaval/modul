import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';
import { eraseTag, eraseTagAndAllIsContent } from '../../utils/clean/htmlClean';
import { REGEX_CSS_NUMBER_VALUE } from '../../utils/props-validation/props-validation';
import { ModulVue } from '../../utils/vue/vue';
import { SVG_NAME } from '../component-names';
import WithRender from './svg.html';

@WithRender
@Component
export class MSvg extends ModulVue {
    @Prop({ default: 'erreur' })
    public readonly name: string;

    @Prop({ default: '' })
    public readonly customSvg: string;

    @Prop({
        default: '1em',
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public readonly width: string;

    @Prop({
        default: '1em',
        validator: (value: string) =>
            REGEX_CSS_NUMBER_VALUE.test(value)
    })
    public readonly height: string;

    @Prop()
    public readonly svgTitle: string;

    @Emit('click')
    public emitClick(event: MouseEvent): void { }

    @Emit('keydown')
    public emitKeydown(event: KeyboardEvent): void { }

    @Emit('mouseover')
    public emitMouseOver(event: MouseEvent): void { }

    @Emit('mouseleave')
    public emitMouseLeave(event: MouseEvent): void { }

    @Emit('svg-id')
    public emitSvgId(svgId: string): void { }

    public async onDataSvgIdChange(svgId: string | undefined): Promise<void> {
        if (!svgId) {
            return;
        }
        await this.$nextTick();
        this.emitSvgId(svgId);
    }

    public get svg(): string {
        if (this.customSvg) {
            return this.customSvg;
        }

        if (!this.name) {
            return '';
        }

        try {
            return require(`./../../assets/icons/svg/${this.name}.svg`);
        } catch (e) {
            this.$log.warn(`The file ${e} could not be loaded.`);
            return '';
        }
    }

    public get svgChildrenContent(): string {
        let cleanSvg: string = this.svg ? eraseTagAndAllIsContent('title', eraseTag('svg', this.svg)) : '';
        if (this.svgTitle) {
            cleanSvg = `<title>${this.svgTitle}</title>${cleanSvg}`;
        }
        return cleanSvg;
    }

    public get svgHTML(): SVGElement | undefined {
        const domParser: Document | undefined = new DOMParser().parseFromString(this.svg, 'text/xml');
        return domParser && domParser.querySelector('svg') ? domParser.querySelector('svg') as SVGElement : undefined;
    }

    public get classAttribute(): string | undefined {
        return this.getSvgAttibute('class');
    }

    public get version(): string | undefined {
        return this.getSvgAttibute('version');
    }

    public get xmlns(): string | undefined {
        return this.getSvgAttibute('xmlns');
    }

    public get viewBox(): string | undefined {
        return this.getSvgAttibute('viewBox');
    }

    public get dataSvgId(): string | undefined {
        const svgId: string | undefined = this.getSvgAttibute('id');
        this.onDataSvgIdChange(svgId);
        return svgId;
    }

    public get badgeOrigin(): string | undefined {
        return this.getSvgAttibute('data-badge-origin');
    }

    public getSvgAttibute(attribute: string): string | undefined {
        return this.svgHTML && this.svgHTML.getAttribute(attribute)
            ? this.svgHTML.getAttribute(attribute)!.toString()
            : undefined;
    }
}

const MSvgPlugin: PluginObject<any> = {
    install(v): void {
        v.component(SVG_NAME, MSvg);
    }
};

export default MSvgPlugin;
