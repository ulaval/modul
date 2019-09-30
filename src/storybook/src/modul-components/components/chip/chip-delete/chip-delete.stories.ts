import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { CHIP_DELETE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../../utils';



storiesOf(`${modulComponentsHierarchyRootSeparator}${CHIP_DELETE_NAME}`, module)

    .add('default', () => ({
        props: {
            text: {
                default: text('Text', 'Chip delete')
            }
        },
        methods: {
            onDelete(): void {
                alert('@Emit(\'delete\')');
            },
            onClick(): void {
                alert('@Emit(\'click\')');
            }
        },
        template: '<m-chip-delete @delete="onDelete()" @click="onClick()">{{text}}</m-chip-delete>'
    }))
    .add('disabled', () => ({
        methods: {
            onDelete(): void {
                alert('@Emit(\'delete\')');
            },
            onClick(): void {
                alert('@Emit(\'click\')');
            }
        },
        template: '<m-chip-delete disabled="true" @delete="onDelete()" @click="onClick()">Disabled</m-chip-delete>'
    }))
    .add('small', () => ({
        props: {
            text: {
                default: text('Text', 'Chip delete')
            }
        },
        methods: {
            onDelete(): void {
                alert('@Emit(\'delete\')');
            },
            onClick(): void {
                alert('@Emit(\'click\')');
            }
        },
        template: '<m-chip-delete size="small" @delete="onDelete()" @click="onClick()">{{text}}</m-chip-delete>'
    }));
