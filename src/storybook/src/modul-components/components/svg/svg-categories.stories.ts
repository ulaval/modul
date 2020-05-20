import { actions } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { ModulIcon, ModulIcons, ModulIconsCategory } from '@ulaval/modul-components/dist/assets/icons/modul-icons';
import { SVG_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${SVG_NAME}/categories`,
    parameters: { fileName: __filename }
};

const TEMPLATE_CATEGORY: string = `<div>
    <${SVG_NAME}
        v-for="(name, index) in iconNames"
        :key="index"
        :name="name"
        :width="size"
        :height="size"
        @click="emitClick"
        @keydown="emitKeydown"
        @mouseover="emitMouseover"
        @mouseleave="emitMouseleave"
    />
</div>`;

const getIconNameOfCategory: (modulIconsCategory: ModulIconsCategory) => string[] = (modulIconsCategory: ModulIconsCategory) => {
    return ModulIcons
        .filter(m => m.category && m.category.some(c => c === modulIconsCategory))
        .map((m: ModulIcon) => {
            return m.name;
        });
};

const getSvgCategoryStory = (modulIconsCategory: ModulIconsCategory, customIconName?: string[]) => ({
    data: () => ({
        iconNames: customIconName ? customIconName : getIconNameOfCategory(modulIconsCategory)
    }),
    props: {
        size: {
            default: text('size', '3em')
        }
    },
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
    template: TEMPLATE_CATEGORY
});


export const defaultStory = () => getSvgCategoryStory(ModulIconsCategory.Arrow, ModulIcons.map(m => m.name));

defaultStory.story = {
    name: 'All icons'
};

export const Arrow = () => getSvgCategoryStory(ModulIconsCategory.Arrow);
export const Audio = () => getSvgCategoryStory(ModulIconsCategory.Audio);
export const Control = () => getSvgCategoryStory(ModulIconsCategory.Control);
export const Document = () => getSvgCategoryStory(ModulIconsCategory.Document);
export const File = () => getSvgCategoryStory(ModulIconsCategory.File);
export const Form = () => getSvgCategoryStory(ModulIconsCategory.Form);
export const Image = () => getSvgCategoryStory(ModulIconsCategory.Image);
export const State = () => getSvgCategoryStory(ModulIconsCategory.State);
export const Text = () => getSvgCategoryStory(ModulIconsCategory.Text);
export const Video = () => getSvgCategoryStory(ModulIconsCategory.Video);
