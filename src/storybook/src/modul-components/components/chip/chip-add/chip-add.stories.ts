import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { CHIP_ADD_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';



storiesOf(`${modulComponentsHierarchyRootSeparator}${CHIP_ADD_NAME}`, module)

    .add('default', () => ({
        props: {
            text: {
                default: text('Text', 'Chip add')
            }
        },
        methods: {
            onAdd(): void {
                alert('@Emit(\'add\')');
            },
            onClick(): void {
                alert('@Emit(\'click\')');
            }
        },
        template: '<m-chip-add @add="onAdd()" @click="onClick()">{{text}}</m-chip-add>'
    }))
    .add('disabled', () => ({
        methods: {
            onAdd(): void {
                alert('@Emit(\'add\')');
            },
            onClick(): void {
                alert('@Emit(\'click\')');
            }
        },
        template: '<m-chip-add disabled="true" @add="onAdd()" @click="onClick()">Disabled</m-chip-add>'
    }))
    .add('icon=false', () => ({
        template: '<m-chip-add :icon="false">Chip</m-chip-add>'
    }))
    .add('small', () => ({
        props: {
            text: {
                default: text('Text', 'Chip add')
            }
        },
        methods: {
            onAdd(): void {
                alert('@Emit(\'add\')');
            },
            onClick(): void {
                alert('@Emit(\'click\')');
            }
        },
        template: '<m-chip-add size="small" @add="onAdd()" @click="onClick()">{{text}}</m-chip-add>'
    }));
