import { select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { TOAST } from '@ulaval/modul-components/dist/components/component-names';
import { MToastPosition, MToastState, MToastTimeout } from '@ulaval/modul-components/dist/components/toast/toast';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';



storiesOf(`${modulComponentsHierarchyRootSeparator}${TOAST}`, module)

    .add('default', () => ({
        props: {
            text: {
                default: text('Text', 'A Toast')
            }
        },
        template: '<m-toast>{{ text }}</m-toast>'
    }))
    .add('open', () => ({
        data: () => ({
            openProp: true
        }),
        methods: {
            onClick(): void {
                (this as any).$data.openProp = !(this as any).$data.openProp;
            }
        },
        template: `<div>
                        <m-button @click="onClick">Toggle the toast</m-button>
                        <m-toast :open.sync="openProp">prop open="{{openProp}}"</m-toast>
                   </div>`
    }))
    .add('icon="false"', () => ({
        template: '<m-toast :icon="false">A Toast without an icon</m-toast>'
    }))
    .add('closeButton="false"', () => ({
        template: '<m-toast :close-button="false">A Toast without close button</m-toast>'
    }))
    .add('action-label', () => ({
        props: {
            actionLabel: {
                default: text('action-label', 'A custom action Label')
            }
        },
        template: '<m-toast :action-label="actionLabel">A Toast with an Action Label</m-toast>'
    }))
    .add('offset=40px"', () => ({
        template: '<m-toast offset="40px">A Toast with an offset of 40px</m-toast>'
    }));


storiesOf(`${modulComponentsHierarchyRootSeparator}${TOAST}/timeout`, module)
    .add('timeout="long"', () => ({
        template: '<m-toast timeout="long">A toast with a long timeout</m-toast>'
    }))
    .add('timeout="short"', () => ({
        template: '<m-toast timeout="short">A toast with a short timeout</m-toast>'
    }))
    .add('timeout="none"', () => ({
        template: '<m-toast timeout="none">A toast without a timeout</m-toast>'
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${TOAST}/state`, module)

    .add('all states (knob)', () => ({
        props: {
            state: {
                default: select('state', Object.values(MToastState), MToastState.Confirmation)
            }
        },
        template: '<m-toast :state="state">A toast with state="{{state}}"</m-toast>'
    }))
    .add('state="confirmation"', () => ({
        template: '<m-toast state="confirmation">A toast with state="confirmation"</m-toast>'
    }))
    .add('state="information"', () => ({
        template: '<m-toast state="information">A toast with state="information"</m-toast>'
    }))
    .add('state="warning"', () => ({
        template: '<m-toast state="warning">A toast with state="warning"</m-toast>'
    }))
    .add('state="error"', () => ({
        template: '<m-toast state="error">A toast with state="error"</m-toast>'
    }));

storiesOf(`${modulComponentsHierarchyRootSeparator}${TOAST}/position`, module)

    .add('all positions (knob)', () => ({
        props: {
            position: {
                default: select('position', Object.values(MToastPosition), MToastPosition.TopLeft)
            }
        },
        template: '<m-toast :position="position">A toast with position="{{position}}"</m-toast>'
    }))
    .add('position="top-left"', () => ({
        template: '<m-toast position="top-left">A toast with a top-left position</m-toast>'
    }))
    .add('position="top-center"', () => ({
        template: '<m-toast position="top-center">A toast with a top-center position</m-toast>'
    }))
    .add('position="top-right"', () => ({
        template: '<m-toast position="top-right">A toast with a top-right position</m-toast>'
    }))
    .add('position="bottom-left"', () => ({
        template: '<m-toast position="bottom-left">A toast with a bottom-left position</m-toast>'
    }))
    .add('position="bottom-center"', () => ({
        template: '<m-toast position="bottom-center">A toast with a bottom-center position</m-toast>'
    }))
    .add('position="bottom-right"', () => ({
        template: '<m-toast position="bottom-right">A toast with a bottom-right position</m-toast>'
    }));


storiesOf(`${modulComponentsHierarchyRootSeparator}${TOAST}/toast-service`, module)
    .add('Text with HTML', () => ({
        methods: {
            onClick(): void {
                (this as any).$toast.show({
                    text: `Texte <strong>strong</strong>`,
                    state: MToastState.Confirmation,
                    position: MToastPosition.BottomRight,
                    timeout: MToastTimeout.long
                });
            }
        },
        template: `<m-button @click="onClick">Open toast</m-button>`
    }))
    .add('Text starts and ends with the same HTML tag', () => ({
        methods: {
            onClick(): void {
                (this as any).$toast.show({
                    text: `<em><strong>Texte strong</strong> and other text</em>`,
                    state: MToastState.Confirmation,
                    position: MToastPosition.BottomRight,
                    timeout: MToastTimeout.long
                });
            }
        },
        template: `<m-button @click="onClick">Open toast</m-button>`
    }));
