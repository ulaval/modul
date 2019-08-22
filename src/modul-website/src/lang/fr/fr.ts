import { loadComponentMeta } from '@/content/components.meta.loader';
import { ModulMeta } from '@/modul-meta';
import ComponentsFrenchPlugin from '@ulaval/modul-components/dist/lang/fr';
import { FRENCH, Messages } from '@ulaval/modul-components/dist/utils/i18n/i18n';
import { Meta } from 'meta-generator/dist';
import { PluginObject } from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $meta: ModulMeta;
    }
}

export const meta: ModulMeta = new ModulMeta(loadComponentMeta(), require('@ulaval/modul-components/dist/modul-meta.fr.json') as Meta);

const FrenchPlugin: PluginObject<any> = {
    install(v, options) {
        v.use(ComponentsFrenchPlugin);
        let i18n: Messages = v.prototype.$i18n;
        i18n.addMessages(FRENCH, require('./website.fr.json'));
        i18n.addMessages(FRENCH, require('./categories.fr.json'));
        i18n.addMessages(FRENCH, require('./modul.fr.json'));
        i18n.addMessages(FRENCH, require('../../router.fr.json'));
        v.prototype.$meta = meta;
    }
};

export default FrenchPlugin;
