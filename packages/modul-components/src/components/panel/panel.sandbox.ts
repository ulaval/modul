import Vue, { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import { MButtonSkin } from '../button/button';
import { PANEL_NAME } from '../component-names';
import PanelPlugin from './panel';
import WithRender from './panel.sandbox.html';


@WithRender
@Component
export class MPanelSandbox extends Vue {
    public hasHeader: boolean = true;
    public hasBody: boolean = true;
    public hasFooter: boolean = true;

    public getSkinButton(value: boolean): string {
        return value ? MButtonSkin.Primary : MButtonSkin.Secondary;
    }
}

const PanelSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(PanelPlugin);
        v.component(`${PANEL_NAME}-sandbox`, MPanelSandbox);
    }
};

export default PanelSandboxPlugin;
