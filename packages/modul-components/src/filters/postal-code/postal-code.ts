import { PluginObject } from 'vue';
import { MPostalCodeCountry } from '../../components/postalcodefield/postalcodefield';
import { POSTAL_CODE_NAME } from '../filter-names';

export class PostalCodeFilter {

    /**
     * Available formats:
     * CA (6 characters) — Example: "X1X 1X1"
     * US (5 or less characters) — Example: "11111" (Only 5 first characters are kept)
     * US (more than 5 characters, up to 9) — Example: "11111-1111" (Only 9 first characters are kept)
     * FR (5 characters) — Example: "11111" (Only 5 first characters are kept)
     * Other — Example: "11111-1111" (string stays the same)
     */
    static format(text: string, isoCountry: string): string {
        switch (isoCountry) {
            case MPostalCodeCountry.CA: {
                return [text.slice(0, 3), text.slice(3, 6)].join(' ');
            }
            case MPostalCodeCountry.US: {
                if (text.length <= 5) {
                    return text;
                } else {
                    return [text.slice(0, 5), text.slice(5, 9)].join('-');
                }
            }
            case MPostalCodeCountry.FR: {
                return text.substring(0, 5);
            }
            default: {
                return text;
            }
        }
    }
}

const PostalCodeFilterPlugin: PluginObject<any> = {
    install(v): void {
        v.filter(POSTAL_CODE_NAME, PostalCodeFilter.format);
    }
};

export default PostalCodeFilterPlugin;
