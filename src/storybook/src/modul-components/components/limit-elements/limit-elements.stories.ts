import { storiesOf } from '@storybook/vue';
import { LIMIT_ELEMENTS } from '@ulaval/modul-components/dist/components/component-names';
import LimitElementsPlugin from '@ulaval/modul-components/dist/components/limit-elements/limit-elements';
import Vue from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

Vue.use(LimitElementsPlugin);

storiesOf(`${modulComponentsHierarchyRootSeparator}${LIMIT_ELEMENTS}`, module)

    .add('1 element, limit of 2', () => ({
        props: {
            elements: {
                default: ['Element 1']
            }
        },
        template: '<m-limit-elements :elements="elements"></m-limit-elements>'
    }))
    .add('2 elements, limit of 2', () => ({
        props: {
            elements: {
                default: ['Element 1', 'Element 2']
            }
        },
        template: '<m-limit-elements :elements="elements"></m-limit-elements>'
    }))
    .add('3 elements, limit of 2', () => ({
        props: {
            elements: {
                default: ['Element 1', 'Element 2', 'Element 3']
            }
        },
        template: '<m-limit-elements :elements="elements"></m-limit-elements>'
    }))
    .add('4 elements, limit of 2', () => ({
        props: {
            elements: {
                default: ['Element 1', 'Element 2', 'Element 3', 'Element 4']
            }
        },
        template: '<m-limit-elements :elements="elements"></m-limit-elements>'
    }))
    .add('5 elements, limit of 2', () => ({
        props: {
            elements: {
                default: ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5']
            }
        },
        template: '<m-limit-elements :elements="elements"></m-limit-elements>'
    }))
    .add('open sync', () => ({
        data: () => ({
            openProp: false
        }),
        props: {
            elements: {
                default: ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5']
            }
        },
        methods: {
            onClick(): void {
                (this as any).$data.openProp = !(this as any).$data.openProp;
            }
        },
        template: `<div>
                        <m-button @click="onClick">Toggle open</m-button>
                        <m-limit-elements :elements="elements" :open.sync="openProp"></m-limit-elements>
                   </div>`
    }))
    .add('Slot element', () => ({
        data: () => ({
            openProp: false
        }),
        props: {
            elements: {
                default: [{ id: 'id1', texte: 'texte1' }, { id: 'id2', texte: 'texte2' }, { id: 'id3', texte: 'texte3' }, { id: 'id4', texte: 'texte4' }, { id: 'id5', texte: 'texte5' }]
            }
        },
        methods: {
            onClick(): void {
                (this as any).$data.openProp = !(this as any).$data.openProp;
            }
        },
        template: `<m-limit-elements :elements="elements">
                        <template #limited-element="{item, index}">
                            <m-message style="margin-top: 4px;">id: {{ item.id }} ­~ texte: {{ item.texte }} ­~ index: {{ index }}</m-message>
                        </template>
                        <template #element="{item, index}">
                            <m-message style="margin-top: 4px;">id: {{ item.id }} ­~ texte: {{ item.texte }} ­­~ index: {{ index }}</m-message>
                        </template>
                    </m-limit-elements>`
    }));
storiesOf(`${modulComponentsHierarchyRootSeparator}${LIMIT_ELEMENTS}/open="false"`, module)
    .add('default', () => ({
        props: {
            elements: {
                default: ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5']
            }
        },
        template: '<m-limit-elements :elements="elements" :open="false"></m-limit-elements>'
    }))
    .add('true', () => ({
        props: {
            elements: {
                default: ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5']
            }
        },
        template: '<m-limit-elements :elements="elements" :open="true"></m-limit-elements>'
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${LIMIT_ELEMENTS}/limit="2"`, module)
    .add('default', () => ({
        props: {
            elements: {
                default: ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5']
            }
        },
        template: '<m-limit-elements :elements="elements" :limit="2"></m-limit-elements>'
    }))
    .add('limit of 3', () => ({
        props: {
            elements: {
                default: ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5']
            }
        },
        template: '<m-limit-elements :elements="elements" :limit="3"></m-limit-elements>'
    }))
    .add('limit of 4', () => ({
        props: {
            elements: {
                default: ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5']
            }
        },
        template: '<m-limit-elements :elements="elements" :limit="4"></m-limit-elements>'
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${LIMIT_ELEMENTS}/openLabel="Custom show more"`, module)
    .add('default', () => ({
        props: {
            elements: {
                default: ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5']
            }
        },
        template: '<m-limit-elements :elements="elements" :limit="2" open-label="Custom show more"></m-limit-elements>'
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${LIMIT_ELEMENTS}/closeLabel="Custom close"`, module)
    .add('default', () => ({
        props: {
            elements: {
                default: ['Element 1', 'Element 2', 'Element 3', 'Element 4', 'Element 5']
            }
        },
        template: '<m-limit-elements :elements="elements" :open="true" :limit="2" close-label="Custom close"></m-limit-elements>'
    }));
