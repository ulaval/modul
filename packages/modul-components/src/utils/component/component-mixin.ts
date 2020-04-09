import Vue, { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { BundleMessagesMap, ENGLISH, FRENCH } from '../i18n/i18n';

export interface ModulComponentOptions {
    i18n?: I18nComponentOptions;
    sprites?: SpritesComponentOptions;
}

declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        modul?: ModulComponentOptions;
    }
}

type I18nComponentOptions = { [key: string]: BundleMessagesMap | BundleMessagesMap[] };
type SpritesComponentOptions = { internalSprites: string | string[] };


@Component
export class MComponentMixin extends Vue {

    beforeCreate(): void {
        if (this.$options.modul) {

            if (this.$options.modul.i18n) {
                if (!this.$i18n) {
                    throw new Error('You must install I18nPlugin to use the i18n option');
                }
                this.setupI18nComponentOptions(this.$options.modul.i18n);
            }

            if (this.$options.modul.sprites) {
                if (!this.$svg) {
                    throw new Error('You must install SpritesPlugin to use the sprites option');
                }
                this.setupSvgComponentOptions(this.$options.modul.sprites);
            }
        }

    }
    private setupSvgComponentOptions(svgComponentOptions: SpritesComponentOptions): void {
        if (svgComponentOptions.internalSprites) {
            if (Array.isArray(svgComponentOptions.internalSprites)) {
                svgComponentOptions.internalSprites.forEach(sprite => {
                    this.$svg.addInternalSprites(sprite);
                });
            } else {
                this.$svg.addInternalSprites(svgComponentOptions.internalSprites);
            }
        } else {
            throw new Error(`You must provide an internalSprites option`);
        }
    }

    private setupI18nComponentOptions(i18nComponentOptions: I18nComponentOptions): void {
        for (let key in i18nComponentOptions) {
            if ([FRENCH, ENGLISH].includes(key)) {
                let msgs: BundleMessagesMap | BundleMessagesMap[] = i18nComponentOptions[key];
                if (Array.isArray(msgs)) {
                    msgs.forEach(msg => {
                        this.$i18n.addMessages(key, msg);
                    });
                } else {
                    this.$i18n.addMessages(key, msgs);
                }
            } else {
                throw new Error(`Unknown lang ${key}`);
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
