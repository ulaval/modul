import ModulComponentPlugin from '@ulaval/modul-components/dist/lib';
import Vue, { PluginObject } from 'vue';

const ModulPlugin: PluginObject<any> = {
    install(v, options): void {

        Vue.use(ModulComponentPlugin, { curLang: options.curLang });
    }
};

export default ModulPlugin;
