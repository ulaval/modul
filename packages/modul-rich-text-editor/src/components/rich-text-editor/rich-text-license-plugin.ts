import FileUploadPlugin from '@ulaval/modul-components/dist/components/file-upload/file-upload';
import I18nPlugin from '@ulaval/modul-components/dist/components/i18n/i18n';
import InputStylePlugin from '@ulaval/modul-components/dist/components/input-style/input-style';
import ValidationMessagePlugin from '@ulaval/modul-components/dist/components/validation-message/validation-message';
import { ENGLISH, FRENCH, Messages } from '@ulaval/modul-components/dist/utils/i18n/i18n';
import LicensePlugin from '@ulaval/modul-components/dist/utils/license/license';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';
import '../../styles/main.scss';
export interface RichTextLicensePluginOptions {
    key: string;
}

const RICH_TEXT_LICENSE_KEY: string = 'm-rich-text-license-key';

export const RichTextLicensePlugin: PluginObject<RichTextLicensePluginOptions | undefined> = {
    install(v, options: RichTextLicensePluginOptions | undefined = { key: '' }): void {
        v.use(FileUploadPlugin);
        v.use(LicensePlugin);
        v.use(InputStylePlugin);
        v.use(ValidationMessagePlugin);

        v.use(I18nPlugin);
        const i18n: Messages = (v.prototype).$i18n;
        if (i18n) {
            i18n.addMessages(FRENCH, require('./rich-text-editor.lang.fr.json'));
            i18n.addMessages(ENGLISH, require('./rich-text-editor.lang.en.json'));
        }

        v.use(LicensePlugin);

        if (options.key) {
            (v.prototype as ModulVue).$license.addLicense(RICH_TEXT_LICENSE_KEY, options.key);
        }
    }
};

export default RichTextLicensePlugin;

