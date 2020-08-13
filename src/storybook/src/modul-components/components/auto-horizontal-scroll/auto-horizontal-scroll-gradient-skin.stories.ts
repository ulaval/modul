import { MAutoHorizontalScrollGradientStyle } from '@ulaval/modul-components/dist/components/auto-horizontal-scroll/auto-horizontal-scroll';
import { AUTO_HORIZONTAL_SCROLL } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${AUTO_HORIZONTAL_SCROLL}/GradientStyle`,
    parameters: { fileName: __filename }
};

const getGradientSkinTemplate = (gradientStyle: MAutoHorizontalScrollGradientStyle) => ({
    template: `<${AUTO_HORIZONTAL_SCROLL}
        min-width="2200px"
        :previous-button-active="true"
        :next-button-active="true"
        gradient-style="${ gradientStyle}"
    >
        <div style="background: #1f1f1f; padding: 32px; color: #fff; width: 100%;">
            <p class="m-u--no-margin">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </${AUTO_HORIZONTAL_SCROLL}>`
});

export const WhiteBackground = () => getGradientSkinTemplate(MAutoHorizontalScrollGradientStyle.White);
export const Dark = () => getGradientSkinTemplate(MAutoHorizontalScrollGradientStyle.Dark);
export const Light = () => getGradientSkinTemplate(MAutoHorizontalScrollGradientStyle.Light);
export const Interactive = () => getGradientSkinTemplate(MAutoHorizontalScrollGradientStyle.Interactive);
