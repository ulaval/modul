import { actions } from '@storybook/addon-actions';
import { boolean, object, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { ModulIcon, ModulIcons } from '@ulaval/modul-components/dist/assets/icons/modul-icons';
import { ICON_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

const ICONLIST_SHORTHAND: string[] = ModulIcons.map((m: ModulIcon) => {
    return m.name;
});

const ICONLIST_LONGHAND: string[] = ModulIcons.map((m: ModulIcon) => {
    return `m-svg__${m.name}`;
});

const getPropExampleTemplate: (html: string, propName: string) => string = (html: string, propName: string) => `<div style="display: flex; align-items: center;">
    ${html}
    <span style="margin-left: 8px">Prop ${propName}: <strong style="color:blue">{{ ${propName} }}</span></strong>
</div>`;

storiesOf(`${modulComponentsHierarchyRootSeparator}${ICON_NAME}`, module)
    .add('sandbox', () => ({
        props: {
            name: {
                default: select('Prop name', ICONLIST_SHORTHAND, 'error')
            },
            svgTitle: {
                default: text('Prop svg-title', '')
            },
            showNameAsClass: {
                default: boolean('Prop show-name-as-class', true)
            },
            size: {
                default: text('Prop size', '30px')
            },
            useSvgSprite: {
                default: boolean('Prop use-svg-sprite', true)
            },
            showCustomSvg: {
                default: boolean('Show custom svg', false)
            }
        },
        computed: {
            customSvg(): string {
                const _this: any = this;
                return _this.showCustomSvg ? require('./custom-icon.svg') : '';
            }
        },
        methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
        template: `<${ICON_NAME}
            :name="name"
            :svg-title="svgTitle"
            :show-name-as-class="showNameAsClass"
            :size="size"
            :use-svg-sprite="useSvgSprite"
            :custom-svg="customSvg"
            @click="emitClick"
            @keydown="emitKeydown"
            @mouseover="emitMouseover"
            @mouseleave="emitMouseleave"
        />`
    }))
    .add('name (short)', () => ({
        props: {
            name: {
                default: select('Prop name', ICONLIST_SHORTHAND, 'profile')
            }
        },
        template: getPropExampleTemplate(`<${ICON_NAME} :name="name" />`, 'name')
    }))
    .add('name (long)', () => ({
        props: {
            name: {
                default: select('Prop name', ICONLIST_LONGHAND, 'm-svg__profile')
            }
        },
        template: getPropExampleTemplate(`<${ICON_NAME} :name="name" />`, 'name')
    }))
    .add('svgTitle', () => ({
        props: {
            svgTitle: {
                default: text('Prop svg-title', 'Title1')
            }
        },
        template: getPropExampleTemplate(`<${ICON_NAME} :svg-title="svgTitle" name="profile" />`, 'svgTitle')
    }))
    .add('size', () => ({
        props: {
            size: {
                default: text('Prop size', '30px')
            }
        },
        template: getPropExampleTemplate(`<${ICON_NAME} :size="size" name="profile" />`, 'size')
    }))
    .add('showNameAsClass', () => ({
        props: {
            name: {
                default: select('icon name as class', ICONLIST_SHORTHAND, 'profile')
            }
        },
        template: getPropExampleTemplate(`<${ICON_NAME} :show-name-as-class="true" name="profile" />`, 'name')
    }))
    .add('Custom svg', () => ({
        props: {
            name: {
                default: select('Prop name', ICONLIST_SHORTHAND, 'error')
            },
            useSvgSprite: {
                default: boolean('Prop use-svg-sprite', false)
            },
            showCustomSvg: {
                default: boolean('Show custom svg', true)
            }
        },
        computed: {
            customSvg(): string {
                const _this: any = this;
                return _this.showCustomSvg ? require('./custom-icon.svg') : '';
            }
        },
        template: `<div>
            <${ICON_NAME}
                :name="name"
                :use-svg-sprite="useSvgSprite"
                :custom-svg="customSvg"
                size="4em"
            />
            <p>Prop use-svg-sprite needs to be false if you want to see custom-svg</p>
        </div>`
    }))
    .add('UseSvgSprite (false)', () => ({
        props: {
            name: {
                default: select('Prop name', ICONLIST_SHORTHAND, 'profile')
            },
            useSvgSprite: {
                default: boolean('Prop use-svg-sprite', false)
            }
        },
        template: `<${ICON_NAME}
            :name="name"
            size="28px"
            :use-svg-sprite="useSvgSprite"
        />`
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${ICON_NAME}/badge`, module)
    .add('state', () => ({
        props: {
            badge: {
                default: object("{ state: 'completed|error|warning' }", { state: 'completed' })
            },
            size: {
                default: text('Prop size (px)', '30px')
            },
            useSvgSprite: {
                default: boolean('Prop use-svg-sprite', true)
            }
        },
        template: `<${ICON_NAME} :size="size" v-m-badge="badge" name="file-pdf" :use-svg-sprite="useSvgSprite" />`
    }))
    .add('offsetX', () => ({
        props: {
            badge: {
                default: object("{ state: 'completed|error|warning', offsetX: 'valueX' }", {
                    state: 'completed',
                    offsetX: '9px'
                })
            }
        },
        template: `<${ICON_NAME} size="30px" v-m-badge="badge" name="profile"/>`
    }))
    .add('offsetY', () => ({
        props: {
            badge: {
                default: object("{ state: 'completed|error|warning', offsetY: 'valueY' }", {
                    state: 'completed',
                    offsetY: '7px'
                })
            }
        },
        template: `<${ICON_NAME} size="30px" v-m-badge="badge" name="profile" />`
    }))
    .add('state, offsetY, offsetX', () => ({
        props: {
            badge: {
                default: object("{ state: 'completed|error|warning', offsetX: 'valueX', offsetY: 'valueY' }",
                    { state: 'completed', offsetX: '-5px', offsetY: '-8px' })
            },
            size: {
                default: text('size (px)', '30')
            }
        },
        template: `<${ICON_NAME} :size="size" v-m-badge="badge" name="profile" />`
    }));
