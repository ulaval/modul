import { PluginObject } from 'vue';
import LicensePlugin from '../../utils/license/license';
import { ModulVue } from '../../utils/vue/vue';
import FileUploadPlugin from '../file-upload/file-upload';

export interface RichTextLicensePluginOptions {
    key: string;
}

const RICH_TEXT_LICENSE_KEY: string = 'm-rich-text-license-key';

export class RichTextLicensePlugin implements PluginObject<RichTextLicensePluginOptions | undefined> {
    install(v, options: RichTextLicensePluginOptions | undefined = { key: '' }): void {
        v.use(LicensePlugin);
        v.use(FileUploadPlugin);
        if (options.key) {
            (v.prototype as ModulVue).$license.addLicense(RICH_TEXT_LICENSE_KEY, options.key);
        }
    }
}

export default new RichTextLicensePlugin();
