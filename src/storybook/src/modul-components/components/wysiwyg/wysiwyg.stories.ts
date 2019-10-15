import { storiesOf } from '@storybook/vue';
import { WYSIWYG_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

storiesOf(`${modulComponentsHierarchyRootSeparator}${WYSIWYG_NAME}`, module)
    .add('default', () => ({
        data: () => ({
            value: 'initial value'
        }),
        template: `
        <div>
            <m-wysiwyg v-model="value"></m-wysiwyg>
            <p>raw: {{value}}</p>
            <div class="m-u--margin-top">vhtml: <div v-html="value"></div></div>
        </div>
        `
    }));
