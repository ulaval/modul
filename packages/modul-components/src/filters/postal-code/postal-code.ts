import { PluginObject } from 'vue';
import { MPostalCodeCountry } from '../../components/postalcodefield/postalcodefield';
import { PHONE_NAME } from '../filter-names';

export class PostalCodeFilter {
    static format(text: string, isoCountry: string): string {
        switch (isoCountry) {
            case MPostalCodeCountry.CA: {
                return [text.slice(0, 2), text.slice(3, 5)].join(' ');
                break;
            }
            default: {
                return text;
            }
        }
    }
}

const PostalCodeFilterPlugin: PluginObject<any> = {
    install(v): void {
        v.filter(PHONE_NAME, PostalCodeFilter.format);
    }
};

export default PhoneFilterPlugin;
