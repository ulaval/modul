import { MAutoHorizontalScrollGradientSkin } from '@ulaval/modul-components/dist/components/auto-horizontal-scroll/auto-horizontal-scroll';
import { AUTO_HORIZONTAL_SCROLL } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${AUTO_HORIZONTAL_SCROLL}/GradientSkin`,
    parameters: { fileName: __filename }
};

const GRADIENT_SKIN_TEMPLATE = (gradienSkin: MAutoHorizontalScrollGradientSkin) => ({
    template: `<${AUTO_HORIZONTAL_SCROLL}
        min-width="2200px"
        :previous-button-active="true"
        :next-button-active="true"
        gradient-skin="${ gradienSkin}"
    >
        <div style="background: #1f1f1f; padding: 32px; color: #fff; width: 100%;">
            <p class="m-u--no-margin">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </${AUTO_HORIZONTAL_SCROLL}>`
});

export const defaultStory = () => GRADIENT_SKIN_TEMPLATE(MAutoHorizontalScrollGradientSkin.WhiteBackground);

defaultStory.story = {
    name: 'WhiteBackground'
};

export const DarkBackground = () => GRADIENT_SKIN_TEMPLATE(MAutoHorizontalScrollGradientSkin.DarkBackground);
export const LightBackground = () => GRADIENT_SKIN_TEMPLATE(MAutoHorizontalScrollGradientSkin.LightBackground);
export const InteractiveBackground = () => GRADIENT_SKIN_TEMPLATE(MAutoHorizontalScrollGradientSkin.InteractiveBackground);
