import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { MChip, MChipMode, MChipSize } from '@ulaval/modul-components/dist/components/chip/chip';
import { CHIP_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';



storiesOf(`${modulComponentsHierarchyRootSeparator}${CHIP_NAME}`, module)
    .add('default', () => ({
        components: {
            MChip
        },
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
        components: {
            MChip
        },
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
        components: {
            MChip
        },
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
        components: {
            MChip
        },
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
    .add('size="medium" - add', () => ({
        components: {
            MChip
        },
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
        template: `<m-chip :mode="mode" size="${MChipSize.Medium}" @add="onAdd()" @click="onClick()">Add mode</m-chip>`
    }))
    .add('size="small" - add', () => ({
        components: {
            MChip
        },
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
        template: `<m-chip :mode="mode" size="${MChipSize.Small}" @add="onAdd()" @click="onClick()">Add mode</m-chip>`
    }))
    .add('size="medium" - delete', () => ({
        components: {
            MChip
        },
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
        template: `<m-chip :mode="mode" size="${MChipSize.Medium}" @delete="onDelete()" @click="onClick()">Delete mode</m-chip>`
    }))
    .add('size="small" - delete', () => ({
        components: {
            MChip
        },
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
        template: `<m-chip :mode="mode" size="${MChipSize.Small}" @delete="onDelete()" @click="onClick()">Delete mode</m-chip>`
    }));
