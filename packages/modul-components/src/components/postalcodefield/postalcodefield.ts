import { PluginObject } from 'vue';
import Component from 'vue-class-component';
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

    protected id: string = `mPostalcodefield-${uuid.generate()}`;

    get maskOptions(): InputMaskOptions {
        return {
            blocks: [3, 3],
            uppercase: true
        };
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
