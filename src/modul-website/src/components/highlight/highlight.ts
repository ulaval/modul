import * as hljs from 'highlight.js';
import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WithRender from './highlight.html?style=./highlight.scss';

@WithRender
@Component
export class MHighlight extends Vue {

    @Prop()
    public lang!: string;
    @Prop()
    public template!: string;
    public languageSubset = ['js', 'html', 'xml', 'css', 'json'];
    public language: string = '';

    private get highlightedTemplate(): string {
        let result: any = '';
        if (this.template) {
            if (this.lang) {
                result = hljs.highlight(this.lang, this.template);
            } else if (!this.lang) {
                result = hljs.highlightAuto(this.template, this.languageSubset);
            }
        } else if (this.$slots) {
            if (this.lang) {
                result = hljs.highlight(this.lang, this.$slots.default[0].text ? this.$slots.default[0].text : '');
            } else if (!this.lang) {
                result = hljs.highlightAuto(this.$slots.default[0].text ? this.$slots.default[0].text : '', this.languageSubset);
            }
        }
        return result.value;
    }

}

export const HIGHLIGHT_NAME: string = 'modul-highlight';

const HighlightPlugin: PluginObject<any> = {
    install(v, options) {
        v.component(HIGHLIGHT_NAME, MHighlight);
    }
};

export default HighlightPlugin;
