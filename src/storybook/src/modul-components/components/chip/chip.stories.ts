import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { MChipMode } from '@ulaval/modul-components/dist/components/chip/chip';
import { CHIP_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';



storiesOf(`${modulComponentsHierarchyRootSeparator}${CHIP_NAME}`, module)


    .add('default', () => ({
        props: {
            text: {
                default: text('Text', 'Default chip')
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
        template: '<m-chip @add="onAdd()" @click="onClick()">{{text}}</m-chip>'
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
        template: '<m-chip disabled="true" @add="onAdd()" @click="onClick()">Disabled</m-chip>'
    }))
    .add('mode="add"', () => ({
        props: {
            mode: {
                default: text('Text', MChipMode.Add)
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
        template: '<m-chip :mode="mode" @add="onAdd()" @click="onClick()">Add mode</m-chip>'
    }))
    .add('mode="delete"', () => ({
        props: {
            mode: {
                default: text('Text', MChipMode.Delete)
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
        template: '<m-chip :mode="mode" @delete="onDelete()" @click="onClick()">Delete mode</m-chip>'
    }))

    .add('size="small" - add', () => ({
        props: {
            mode: {
                default: text('Text', MChipMode.Add)
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
        template: '<m-chip :mode="mode" size="small" @add="onAdd()" @click="onClick()">Add mode</m-chip>'
    }))
    .add('size="small" - delete', () => ({
        props: {
            mode: {
                default: text('Text', MChipMode.Delete)
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
        template: '<m-chip :mode="mode" size="small" @delete="onDelete()" @click="onClick()">Delete mode</m-chip>'
    }));
