import DynamicTemplate from '@ulaval/modul-components/dist/components/dynamic-template/dynamic-template';
import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import WithRender from './preview.html';

const enum Tabs {
    HTML = 'html',
    CSS = 'css',
    JS = 'js'
}

@WithRender
@Component
export class MPreview extends Vue {
    public htmlHl: string = '';
    public jsHl: string = '';
    public cssHl: string = '';

    public isOpened: boolean = false;
    public activeTab: Tabs = Tabs.HTML;

    $refs: {
        demoContent: HTMLElement;
    };

    protected async mounted(): Promise<void> {
        const html = this.extractContent('hlhtml');
        const js = this.extractContent('hljavascript');
        const css = this.extractContent('hlcss');

        this.appendStyle(css);
        await this.activateDemo(js, html);
    }

    private appendStyle(cssText: string): void {
        let style: HTMLStyleElement = document.createElement('style');
        style.innerHTML = cssText;
        this.$el.appendChild(style);
    }

    private async activateDemo(
        jsText: string,
        htmlText: string
    ): Promise<void> {
        let options = {};

        if (jsText && jsText.trim().length > 0) {
            // tslint:disable-next-line:no-eval
            options = eval(`'use strict'; var opt = ${jsText}; opt;`);
        }

        const vueExports = await import('vue');
        new vueExports.default({
            template: `<div>${htmlText}</div>`,
            ...options,
            el: this.$refs.demoContent
        }).$mount();
    }

    private extractContent(className: string): string {
        let text = '';

        const els = this.$el.getElementsByClassName(className);
        if (els.length > 0) {
            text = (els[0] as HTMLElement).innerText;
        }

        return '\n\r' + text;
    }

    private get hasJs(): boolean {
        return this.jsHl.trim().length > 0;
    }

    private get hasCss(): boolean {
        return this.cssHl.trim().length > 0;
    }

    private get htmlActive(): boolean {
        return this.activeTab === Tabs.HTML;
    }

    private get jsActive(): boolean {
        return this.activeTab === Tabs.JS;
    }

    private get cssActive(): boolean {
        return this.activeTab === Tabs.CSS;
    }

    private switchTab(tab: Tabs): void {
        this.activeTab = tab;
    }

}
export const PREVIEW_NAME: string = 'modul-preview';

const PreviewPlugin: PluginObject<any> = {
    install(v, options) {
        v.use(DynamicTemplate);
        v.component(PREVIEW_NAME, MPreview);
    }
};

export default PreviewPlugin;
