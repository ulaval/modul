import { PluginObject } from 'vue';
import { MPostalCodeCountry } from '../../components/postalcodefield/postalcodefield';
import { POSTAL_CODE_NAME } from '../filter-names';

export class PostalCodeFilter {
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
                return [text.slice(0, 2), text.slice(2, 5)].join(' ');
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
