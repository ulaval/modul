import { actions } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { SVG_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { ModulIcon, ModulIcons, ModulIconsCategory } from '@ulaval/modul-components/dist/utils/modul-icons/modul-icons';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { importAllSvg } from './svg-importation';


export default {
    title: `${modulComponentsHierarchyRootSeparator}${SVG_NAME}/categories`,
    parameters: { fileName: __filename }
};

const TEMPLATE_CATEGORY: string = `<div>
    <span
        v-for="(name, index) in iconNames"
        :key="index"
        style="display: inline-flex; align-items: center; justify-content: center; flex-direction: column; margin: 0 24px 16px 0;"
        :style="{ width: size }"
    >
        <${SVG_NAME}
            :name="name"
            :width="size"
            :height="size"
            @click="emitClick"
            @keydown="emitKeydown"
            @mouseover="emitMouseover"
            @mouseleave="emitMouseleave"
        />
        <span style="margin: 4px 0 0 0; font-size: 10px; line-height: 1.1; text-align: center;">{{ name }}</span>
    </span>
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
    beforeCreate() {
        importAllSvg();
    },
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
    template: TEMPLATE_CATEGORY
});


export const defaultStory = () => getSvgCategoryStory(ModulIconsCategory.Arrow, ModulIcons.map(m => m.name));

defaultStory.story = {
    name: 'All svg'
};

export const Arrow = () => getSvgCategoryStory(ModulIconsCategory.Arrow);
export const Audio = () => getSvgCategoryStory(ModulIconsCategory.Audio);
export const Control = () => getSvgCategoryStory(ModulIconsCategory.Control);
export const Document = () => getSvgCategoryStory(ModulIconsCategory.Document);
export const File = () => getSvgCategoryStory(ModulIconsCategory.File);
export const Form = () => getSvgCategoryStory(ModulIconsCategory.Form);
export const Image = () => getSvgCategoryStory(ModulIconsCategory.Image);
export const Message = () => getSvgCategoryStory(ModulIconsCategory.Message);
export const State = () => getSvgCategoryStory(ModulIconsCategory.State);
export const Text = () => getSvgCategoryStory(ModulIconsCategory.Text);
export const Video = () => getSvgCategoryStory(ModulIconsCategory.Video);
