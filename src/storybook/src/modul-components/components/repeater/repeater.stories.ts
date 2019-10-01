import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { REPEATER_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MRepeater } from '@ulaval/modul-components/dist/components/repeater/repeater';
import uuid from '@ulaval/modul-components/dist/utils/uuid/uuid';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';


storiesOf(`${modulComponentsHierarchyRootSeparator}${REPEATER_NAME}`, module)

    .add('Empty', () => ({
        components: { MRepeater },
        template: `
            <${REPEATER_NAME}
                :empty-message="'The list is empty'"
                :list="list"
                :operations="operations">
                <template slot="item" slot-scope="{}">
                </template>
            </${REPEATER_NAME}>
        `,
        data: () => ({
            list: [],
            operations: {
                canAdd: false,
                cadDelete: false
            }
        }),
        methods: {
            onAdd(): void {
                (this as any).list.push({ id: uuid.generate() });
            },
            onDelete(index): void {
                (this as any).list.splice(index, 1);
            }
        }
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${REPEATER_NAME}`, module)

    .add('With items (Custom item template)', () => ({
        components: { MRepeater },
        template: `
            <${REPEATER_NAME}
                :item-key="'id'"
                :empty-message="'The list is empty'"
                :min-item-count="minItemCount"
                :max-item-count="maxItemCount"
                :list="list"
                @add="onAdd"
                @delete="onDelete">
                <template slot="item" slot-scope="{ props }">
                    Item # {{ props.index }} {{ props.item.id }}
                </template>
            </${REPEATER_NAME}>
        `,
        data: () => ({
            list: [{ id: uuid.generate() }, { id: uuid.generate() }]
        }),
        props: {
            minItemCount: {
                default: number('minItemCount', 0)
            },
            maxItemCount: {
                default: number('maxItemCount', Infinity)
            }
        },
        methods: {
            onAdd(): void {
                (this as any).list.push({ id: uuid.generate() });
            },
            onDelete(index): void {
                (this as any).list.splice(index, 1);
            }
        }
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${REPEATER_NAME}`, module)

    .add('With items (Custom row template)', () => ({
        components: { MRepeater },
        template: `
            <${REPEATER_NAME}
                :min-item-count="minItemCount"
                :max-item-count="maxItemCount"
                :list="list"
                @add="onAdd"
                @delete="onDelete">
                <li slot="row" slot-scope="{ props, listeners }" :key="props.item.id">
                    <button @click="listeners.onDelete" :disabled="!props.canDelete">Delete</button>
                    Item # {{ props.index }} {{ props.item.id }}
                </li>
            </${REPEATER_NAME}>
        `,
        data: () => ({
            list: [{ id: uuid.generate() }, { id: uuid.generate() }]
        }),
        props: {
            minItemCount: {
                default: number('minItemCount', 0)
            },
            maxItemCount: {
                default: number('maxItemCount', Infinity)
            }
        },
        methods: {
            onAdd(): void {
                (this as any).list.push({ id: uuid.generate() });
            },
            onDelete(index): void {
                (this as any).list.splice(index, 1);
            }
        }
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${REPEATER_NAME}`, module)

    .add('Operations', () => ({
        components: { MRepeater },
        template: `
            <${REPEATER_NAME}
                :item-key="'id'"
                :list="list"
                :operations="operations">
                <template slot="item" slot-scope="{ props }">
                    #{{ props.index }} Custom template for item (id: {{ props.item.id }} name: {{ props.item.name }})
                </template>
            </${REPEATER_NAME}>
        `,
        data: () => ({
            list: [{ id: 324525, name: 'Albert Einstein' }, { id: 64564556, name: 'Nikola Tesla' }],
            operations: {
                canAdd: false,
                cadDelete: false
            }
        })
    }));
