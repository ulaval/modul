import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { BundleMessagesMap, ENGLISH, FRENCH } from '../i18n/i18n';

export interface ModulComponentOptions {
    i18n?: I18nComponentOptions;
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        modul?: ModulComponentOptions;
    }
}

type I18nComponentOptions = { [key: string]: BundleMessagesMap };


@Component
export class MComponentMixin extends Vue {

    beforeCreate(): void {
        if (this.$options.modul) {

            if (this.$options.modul.i18n) {

                if (!this.$i18n) {
                    throw new Error('You must install I18nPlugin to use the i18n option');
                }

                for (let key in this.$options.modul.i18n) {
                    if ([FRENCH, ENGLISH].includes(key)) {
                        let msgs: BundleMessagesMap = this.$options.modul.i18n[key];
                        this.$i18n.addMessages(key, msgs);
                    } else {
                        throw new Error(`Unknown lang ${key}`);
                    }

                }
            }
        }

    }

}

const ComponentMixinPlugin: PluginObject<any> = {
    install(v, options): void {
        Vue.mixin(MComponentMixin);
    }
};

export default ComponentMixinPlugin;
