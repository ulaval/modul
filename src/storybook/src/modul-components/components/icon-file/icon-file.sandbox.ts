import { ICON_FILE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import IconFilePlugin from '@ulaval/modul-components/dist/components/icon-file/icon-file';
import BadgePlugin from '@ulaval/modul-components/dist/directives/badge/badge';
import Vue, { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './icon-file.sandbox.html';


@WithRender
@Component
export class MIconFileSandbox extends Vue {
}

const IconFileSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.use(IconFilePlugin);
        v.use(BadgePlugin);
        v.component(`${ICON_FILE_NAME}-sandbox`, MIconFileSandbox);
    }
};

export default IconFileSandboxPlugin;
