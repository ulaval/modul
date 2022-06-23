import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { InputLabel } from '../../mixins/input-label/input-label';
import { InputManagement } from '../../mixins/input-management/input-management';
import { InputState } from '../../mixins/input-state/input-state';
import { InputWidth } from '../../mixins/input-width/input-width';
import uuid from '../../utils/uuid/uuid';
import { ModulVue } from '../../utils/vue/vue';
import { POSTALCODEFIELD_NAME } from '../component-names';
import { InputMaskOptions } from '../input-mask/input-mask';
import { MMaskedfield } from '../maskedfield/maskedfield';
import WithRender from './postalcodefield.html';

export enum MPostalCodeCountry {
    CA = 'ca',
    FR = 'fr',
    Other = 'other',
    US = 'us'
}

@WithRender
@Component({
    components: {
        MMaskedfield
    },
    mixins: [
        InputState,
        InputWidth,
        InputLabel,
        InputManagement
    ]
})
export class MPostalcodefield extends ModulVue {

    @Prop({ default: MPostalCodeCountry.CA })
    public readonly postalCodeFormat: MPostalCodeCountry;

    protected id: string = `mPostalcodefield-${uuid.generate()}`;

    get maskOptions(): InputMaskOptions {
        switch (this.postalCodeFormat.toLowerCase()) {
            case MPostalCodeCountry.CA:
                return {
                    blocks: [3, 3],
                    delimiter: ' ',
                    delimiterLazyShow: true,
                    uppercase: true
                };
            case MPostalCodeCountry.FR:
                return {
                    blocks: [5],
                    numericOnly: true,
                    uppercase: true
                };
            case MPostalCodeCountry.US:
                return {
                    blocks: [5, 4],
                    delimiter: '-',
                    delimiterLazyShow: true,
                    numericOnly: true,
                    uppercase: true
                };
            case MPostalCodeCountry.Other:
            default:
                // Infinite value to display normally with no space the default values, if value is other or invalid!
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
        v.component(POSTALCODEFIELD_NAME, MPostalcodefield);
    }
};

export default PostalcodefieldPlugin;
