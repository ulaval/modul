import FileUploadPlugin from '@ulaval/modul-components/dist/components/file-upload/file-upload';
import I18nPlugin from '@ulaval/modul-components/dist/components/i18n/i18n';
import InputStylePlugin from '@ulaval/modul-components/dist/components/input-style/input-style';
import ValidationMessagePlugin from '@ulaval/modul-components/dist/components/validation-message/validation-message';
import { ENGLISH, FRENCH, Messages } from '@ulaval/modul-components/dist/utils/i18n/i18n';
import LicensePlugin from '@ulaval/modul-components/dist/utils/license/license';
import { ModulVue } from '@ulaval/modul-components/dist/utils/vue/vue';
import { PluginObject } from 'vue';

export interface RichTextLicensePluginOptions {
    key: string;
    curlang: string;
}

const RICH_TEXT_LICENSE_KEY: string = 'm-rich-text-license-key';

export const RichTextEditorModulPlugin: PluginObject<RichTextLicensePluginOptions | undefined> = {
    install(v, options: RichTextLicensePluginOptions | undefined = { key: '', curlang: FRENCH }): void {
        v.use(FileUploadPlugin);
        v.use(InputStylePlugin);
        v.use(ValidationMessagePlugin);

        v.use(I18nPlugin);
        const i18n: Messages = (v.prototype).$i18n;
        if (i18n && options.curlang === ENGLISH) {
            i18n.addMessages(FRENCH, require('./components/rich-text-editor/rich-text-editor.lang.fr.json'));
        } else {
            i18n.addMessages(ENGLISH, require('./components/rich-text-editor/rich-text-editor.lang.en.json'));
        }

        v.use(LicensePlugin);

        if (options.key) {
            (v.prototype as ModulVue).$license.addLicense(RICH_TEXT_LICENSE_KEY, options.key);
        }
    }
};
