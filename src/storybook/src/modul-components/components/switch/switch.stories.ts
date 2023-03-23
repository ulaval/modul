import { storiesOf } from '@storybook/vue';
import { SWITCH_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';


storiesOf(`${modulComponentsHierarchyRootSeparator}${SWITCH_NAME}`, module)
    .add('default true', () => ({
        template: '<div style="padding:16px; max-width:320px"><m-switch :value="true">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas porta dignissim.</m-switch><div>'
    }))
    .add('default false', () => ({
        template: '<div style="padding:16px; max-width:320px"><m-switch :value="false">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas porta dignissim.</m-switch><div>'
    }));
