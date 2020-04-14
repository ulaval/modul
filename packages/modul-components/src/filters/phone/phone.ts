import { parsePhoneNumberFromString, PhoneNumber } from 'libphonenumber-js';
import { PluginObject } from 'vue';
import { PHONE_NAME } from '../filter-names';

/**
 * Available formats:
 * NATIONAL — Example: "(213) 373-4253"
 * INTERNATIONAL — Example: "+1 213 373 4253"
 *
 * A ticket has been opened for Google in order to fix the National format. It shouldn't have parenthesis.
 * https://issuetracker.google.com/issues/153616208)
 */
export enum PhoneNumberFormat {
    INTERNATIONAL = 'INTERNATIONAL',
    NATIONAL = 'NATIONAL'
}

export class PhoneFilter {
    static format(text: string, format: PhoneNumberFormat = PhoneNumberFormat.NATIONAL): string {
        if (text.length > 0) {
            const phoneNumber: PhoneNumber | undefined = parsePhoneNumberFromString(text, 'CA');
            return phoneNumber ? phoneNumber.format(format) : '';
        } else {
            return '';
        }
    }
}

const PhoneFilterPlugin: PluginObject<any> = {
    install(v): void {
        v.filter(PHONE_NAME, PhoneFilter.format);
    }
};

export default PhoneFilterPlugin;
