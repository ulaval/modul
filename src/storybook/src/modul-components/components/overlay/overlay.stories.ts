import { actions } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import { OVERLAY_NAME } from '@ulaval/modul-components/dist/components/component-names';
import OverlayPlugin from '@ulaval/modul-components/dist/components/overlay/overlay';
import TextfieldPlugin from '@ulaval/modul-components/dist/components/textfield/textfield';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

Vue.use(OverlayPlugin);
Vue.use(TextfieldPlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}${OVERLAY_NAME}`, module)
    .add('Default', () => ({
        methods: actions(
            'save',
            'cancel'
        ),
        template: `<div>
            <m-overlay title="Title" @save="save" @cancel="cancel">
                <m-button slot="trigger">Open</m-button>
                <m-textfield></m-textfield>
            </m-overlay>
        </div>`
    }));

