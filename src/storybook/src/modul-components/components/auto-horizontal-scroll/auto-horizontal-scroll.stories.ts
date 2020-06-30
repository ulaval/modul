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

const TEMPLATE = (
    _previousButtonActive: boolean,
    _nextButtonActive: boolean,
    _leftGradientActive: boolean,
    _rightGradientActive: boolean,
    _textPreviousButton: string = 'Previous',
    _textNextButton: string = 'Next',
    _dragActive: boolean = true,
    _displayHorizontalScrollbar: boolean = true,
) => ({
    props: {
        minWidth: {
            default: text('Prop min-width', '1900px')
        },
        dragActive: {
            default: boolean('Prop drag-active', _dragActive)
        },
        previousButtonActive: {
            default: boolean('Prop previous-button-active', _previousButtonActive)
        },
        nextButtonActive: {
            default: boolean('Prop next-button-active', _nextButtonActive)
        },
        textPreviousButton: {
            default: text('Prop text-previous-button', _textPreviousButton)
        },
        textNextButton: {
            default: text('Prop text-next-button', _textNextButton)
        },
        leftGradientActive: {
            default: boolean('Prop left-gradient-active', _leftGradientActive)
        },
        rightGradientActive: {
            default: boolean('Prop right-gradient-active', _rightGradientActive)
        },
        gradientSkin: {
            default: select(
                'Prop gradient-skin',
                Enums.toValueArray(
                    MAutoHorizontalScrollGradientSkin
                ),
                MAutoHorizontalScrollGradientSkin.WhiteBackground
            )
        },
        displayHorizontalScrollbar: {
            default: boolean('Prop display-horizontal-scrollbar', _displayHorizontalScrollbar)
        },
        slotDefault: {
            default: boolean('Slot default', true)
        }
    },
    methods: actions('emitPreviousButtonClick', 'emitNextButtonClick'),
    data: () => ({
        currentScrollLeft: 60
    }),
    template: `<${AUTO_HORIZONTAL_SCROLL}
        :min-width="minWidth"
        :drag-active="dragActive"
        :left-gradient-active="leftGradientActive"
        :right-gradient-active="rightGradientActive"
        :previous-button-active="previousButtonActive"
        :next-button-active="nextButtonActive"
        :text-previous-button="textPreviousButton"
        :text-next-button="textNextButton"
        :current-scroll-left.sync="currentScrollLeft"
        :gradient-skin="gradientSkin"
        :display-horizontal-scrollbar="displayHorizontalScrollbar"
        @previous-button-click="emitPreviousButtonClick"
        @next-button-click="emitNextButtonClick"
    >
        <div v-if="slotDefault"
            style="background: #1f1f1f; padding: 32px; color: #fff; width: 100%;"
        >
            <p class="m-u--no-margin">Adjust the width of your browser to <strong>{{ parseInt(minWidth, 10) - 80 }}px</strong> to be able to test the component.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </${AUTO_HORIZONTAL_SCROLL}>`
});

export const defaultStory = () => TEMPLATE(true, true, true, true);

defaultStory.story = {
    name: 'Sandbox'
};

export const PreviousButtonActive = () => TEMPLATE(true, false, false, false);
export const NextButtonActive = () => TEMPLATE(false, true, false, false);

export const LeftGradientActive = () => TEMPLATE(false, false, true, false);
export const RightGradientActive = () => TEMPLATE(false, false, false, true);

export const TextPreviousButton = () => TEMPLATE(true, false, false, false, 'Custom Previous');
export const TextNextButton = () => TEMPLATE(false, true, false, false, 'Previous', 'Custom Next');

export const DragDisabled = () => TEMPLATE(true, true, false, false, 'Previous', 'Next', false);
export const HideHorizontalScrollbar = () => TEMPLATE(true, true, false, false, 'Previous', 'Next', true, false);


