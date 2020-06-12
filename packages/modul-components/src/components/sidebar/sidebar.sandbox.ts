import Vue, { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import { MButton } from '../button/button';
import { BUTTON_NAME, SIDEBAR_NAME } from '../component-names';
import SidebarPlugin from './sidebar';
import WithRender from './sidebar.sandbox.html';


@WithRender
@Component({
    [BUTTON_NAME]: MButton
})
export class MSidebarSandbox extends Vue {
}

const SidebarSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(SidebarPlugin);
        v.component(`${SIDEBAR_NAME}-sandbox`, MSidebarSandbox);
    }
};

export default SidebarSandboxPlugin;
