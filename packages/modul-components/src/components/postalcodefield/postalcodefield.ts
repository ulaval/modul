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

export enum MPostalCodeFormat {
    Canada = 'canada',
    France = 'france',
    Other = 'other',
    UnitedStates = 'united-states'
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

    @Prop({ default: MPostalCodeFormat.Canada })
    public postalCodeFormat: MPostalCodeFormat;

    protected id: string = `mPostalcodefield-${uuid.generate()}`;

    get maskOptions(): InputMaskOptions {
        switch (this.postalCodeFormat) {
            case MPostalCodeFormat.Canada:
                return {
                    blocks: [3, 3],
                    uppercase: true
                };
            case MPostalCodeFormat.France:
                return {
                    blocks: [2, 3],
                    uppercase: true
                };
            case MPostalCodeFormat.UnitedStates:
                return {
                    blocks: [5],
                    uppercase: true
                };
            case MPostalCodeFormat.Other:
            default:
                // Infinite value to display normaly with no space the default values if no blocks is specified!
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
