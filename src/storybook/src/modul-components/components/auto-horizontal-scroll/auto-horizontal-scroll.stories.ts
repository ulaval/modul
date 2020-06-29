import { actions } from '@storybook/addon-actions';
import { boolean, select, text } from '@storybook/addon-knobs';
import { MAutoHorizontalScrollGradientSkin } from '@ulaval/modul-components/dist/components/auto-horizontal-scroll/auto-horizontal-scroll';
import { AUTO_HORIZONTAL_SCROLL } from '@ulaval/modul-components/dist/components/component-names';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${AUTO_HORIZONTAL_SCROLL}`,
    parameters: { fileName: __filename }
};

const SLOT_DEFAULT_CONTENT: (minWidth: string) => string = (
    minWidth: string
) => `<div style="background: #1f1f1f; padding: 32px; color: #fff; width: 100%;">
    <p class="m-u--no-margin">Adjust the width of your browser to <strong>${
    parseInt(minWidth, 10) - 80
    }px</strong> to be able to test the component.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</div>`;

export const defaultStory = () => ({
    template: `<${AUTO_HORIZONTAL_SCROLL}
    min-width="800px">
        ${SLOT_DEFAULT_CONTENT('800px')}
    </${AUTO_HORIZONTAL_SCROLL}>`
});

defaultStory.story = {
    name: 'default'
};

export const Sandbox = () => ({
    props: {
        minWidth: {
            default: text('Prop min-width', '800px')
        },
        previousButtonActive: {
            default: boolean('Prop previous-button-active', true)
        },
        nextButtonActive: {
            default: boolean('Prop next-button-active', true)
        },
        leftGradientActive: {
            default: boolean('Prop left-gradient-active', true)
        },
        rightGradientActive: {
            default: boolean('Prop right-gradient-active', true)
        },
        gradientSkin: {
            default: select(
                'Prop gradient-skin',
                Enums.toValueArray(
                    MAutoHorizontalScrollGradientSkin
                ),
                MAutoHorizontalScrollGradientSkin.WhiteBackground
            ),
        },
        displayHorizontalScrollbar: {
            default: boolean('Prop display-horizontal-scrollbar', true)
        },
        slotDefault: {
            default: boolean('Slot default', true)
        },
    },
    methods: actions('emitClickPreviousButton', 'emitClickNextButton'),
    data: () => ({
        currentScrollLeft: 60
    }),
    template: `<${AUTO_HORIZONTAL_SCROLL}
        :min-width="minWidth"
        :left-gradient-active="leftGradientActive"
        :right-gradient-active="rightGradientActive"
        :previous-button-active="previousButtonActive"
        :next-button-active="nextButtonActive"
        :current-scroll-left.sync="currentScrollLeft"
        :gradient-skin="gradientSkin"
        :display-horizontal-scrollbar="displayHorizontalScrollbar"
        @click-previous-button="emitClickPreviousButton"
        @click-next-button="emitClickNextButton"
    >
        <template v-if="slotDefault">${SLOT_DEFAULT_CONTENT('800px')}</template>
    </${AUTO_HORIZONTAL_SCROLL}>`
});

