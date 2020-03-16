import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import L10nPlugin from '../../utils/l10n/l10n';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { POSTALCODEFIELD_NAME } from '../component-names';
import { InputMaskOptions } from '../input-mask/input-mask';
import MaskedfieldPlugin from '../maskedfield/maskedfield';
import WithRender from './postalcodefield.html';

export enum MPostalCodeCountry {
    CA = 'CA',
    FR = 'FR',
    Other = 'other',
    US = 'US'
}

@WithRender
@Component({
    mixins: [
        InputState,
        InputWidth,
        InputLabel,
        InputManagement
    ]
})
export class MPostalcodefield extends ModulVue {

    @Prop({ default: MPostalCodeCountry.CA })
    public postalCodeFormat: MPostalCodeCountry;

    protected id: string = `mPostalcodefield-${uuid.generate()}`;

    get maskOptions(): InputMaskOptions {
        switch (this.postalCodeFormat) {
            case MPostalCodeCountry.CA:
                return {
                    blocks: [3, 3],
                    delimiter: ' ',
                    delimiterLazyShow: true,
                    uppercase: true
                };
            case MPostalCodeCountry.FR:
                return {
                    blocks: [2, 3],
                    delimiter: ' ',
                    delimiterLazyShow: true,
                    numericOnly: true,
                    uppercase: true
                };
            case MPostalCodeCountry.US:
                return {
                    blocks: [5],
                    delimiter: ' ',
                    delimiterLazyShow: true,
                    numericOnly: true,
                    uppercase: true
                };
            case MPostalCodeCountry.Other:
            default:
                // Infinite value to display normaly with no space the default values if value is orther or invalid!
                return {
                    blocks: [1e+23],
                    uppercase: true
                };
        }
    }

    get bindData(): any {
        return Object.assign({}, this.$props || {}, this.$attrs || {});
    }
}

const PostalcodefieldPlugin: PluginObject<any> = {
    install(v): void {
        v.use(L10nPlugin);
        v.use(MaskedfieldPlugin);
        v.component(POSTALCODEFIELD_NAME, MPostalcodefield);
    }
};

export default PostalcodefieldPlugin;
