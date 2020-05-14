import { actions } from '@storybook/addon-actions';
import { ModulIcon, ModulIcons, ModulIconsCategory } from '@ulaval/modul-components/dist/assets/icons/modul-icons';
import { SVG_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${SVG_NAME}/category`,
    parameters: { fileName: __filename }
};

const TEMPLATE_CATEGORY: string = `<div>
    <${SVG_NAME}
        v-for="(name, index) in iconNames"
        :key="index"
        :name="name"
        width="3em"
        height="3em"
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

export const defaultStory = () => ({
    data: () => ({
        iconNames: ModulIcons.map((m: ModulIcon) => {
            return m.name;
        })
    }),
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
    template: TEMPLATE_CATEGORY;
});

defaultStory.story = {
    name: 'All icons'
};

export const File = () => ({
    data: () => ({
        iconNames: getIconNameOfCategory(ModulIconsCategory.File)
    }),
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
    template: TEMPLATE_CATEGORY
});

export const Arrow = () => ({
    data: () => ({
        iconNames: getIconNameOfCategory(ModulIconsCategory.Arrow)
    }),
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
    template: TEMPLATE_CATEGORY
});

export const Audio = () => ({
    data: () => ({
        iconNames: getIconNameOfCategory(ModulIconsCategory.Audio)
    }),
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
    template: TEMPLATE_CATEGORY
});

export const Video = () => ({
    data: () => ({
        iconNames: getIconNameOfCategory(ModulIconsCategory.Video)
    }),
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
    template: TEMPLATE_CATEGORY
});

export const Image = () => ({
    data: () => ({
        iconNames: getIconNameOfCategory(ModulIconsCategory.Image)
    }),
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
    template: TEMPLATE_CATEGORY
});

export const Control = () => ({
    data: () => ({
        iconNames: getIconNameOfCategory(ModulIconsCategory.Control)
    }),
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
    template: TEMPLATE_CATEGORY
});


export const Document = () => ({
    data: () => ({
        iconNames: getIconNameOfCategory(ModulIconsCategory.Document)
    }),
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
    template: TEMPLATE_CATEGORY
});

export const Form = () => ({
    data: () => ({
        iconNames: getIconNameOfCategory(ModulIconsCategory.Form)
    }),
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
    template: TEMPLATE_CATEGORY
});

export const State = () => ({
    data: () => ({
        iconNames: getIconNameOfCategory(ModulIconsCategory.Sate)
    }),
    methods: actions('emitClick', 'emitKeydown', 'emitMouseover', 'emitMouseleave'),
    template: TEMPLATE_CATEGORY
});
