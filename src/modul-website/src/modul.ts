import ModulComponentPlugin from '@ulaval/modul-components/dist/lib';
import Vue, { PluginObject } from 'vue';

const ModulPlugin: PluginObject<any> = {
    install(v, options): void {

        // tslint:disable-next-line: deprecation
        Vue.use(ModulComponentPlugin, { curLang: options.curLang });
    }
};

export default ModulPlugin;
