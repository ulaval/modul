import { actions } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';
import { EMPTY_AREA_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MEmptyAreaBackgroundStyle, MEmptyAreaButtonType, MEmptyAreaDisplayMode } from '@ulaval/modul-components/dist/components/empty-area/empty-area';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { ModulIconName } from '@ulaval/modul-components/dist/utils/modul-icons/modul-icons';
import { Component } from 'vue';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { importAllSvg } from '../svg/svg-importation';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${EMPTY_AREA_NAME}`,
    parameters: { fileName: __filename }
};

export const Sandbox = () => ({
    methods: actions('emitButtonClick'),
    beforeCreate() {
        importAllSvg();
    },
    props: {
        title: {
            default: text('Prop title', 'No content available')
        },
        subtitle: {
            default: text('Prop subtitle', '')
        },
        buttonText: {
            default: text('Prop button-text', 'Add')
        },
        buttonType: {
            default: select(
                'Prop button-type',
                Enums.toValueArray(MEmptyAreaButtonType),
                MEmptyAreaButtonType.AddButton
            )
        },
        backgroundStyle: {
            default: select(
                'Prop backgroun-style',
                Enums.toValueArray(MEmptyAreaBackgroundStyle),
                MEmptyAreaBackgroundStyle.Light
            )
        },
        displayMode: {
            default: select(
                'Prop display-mode',
                Enums.toValueArray(MEmptyAreaDisplayMode),
                MEmptyAreaDisplayMode.Block
            )
        },
        minHeight: {
            default: text('Prop min-height', '280px')
        },
        svgName: {
            default: select<ModulIconName>(
                'Prop name',
                Enums.toValueArray(ModulIconName) as ModulIconName[],
                ModulIconName.Folder
            )
        },
        svgSize: {
            default: text('Prop svg-size', '60px')
        }
    },
    template: `<${EMPTY_AREA_NAME}
        :title="title"
        :subtitle="subtitle"
        :button-text="buttonText"
        :background-style="backgroundStyle"
        :display-mode="displayMode"
        :button-type="buttonType"
        :min-height="minHeight"
        :svg-name="svgName"
        :svg-size="svgSize"
        @button-click="emitButtonClick"
    />`
});

export const PropSvgName: () => Component = (): Component => ({
    beforeCreate() {
        importAllSvg();
    },
    props: {
        svgName: {
            default: select<ModulIconName>(
                'Prop name',
                Enums.toValueArray(ModulIconName) as ModulIconName[],
                ModulIconName.Calendar
            )
        }
    },
    template: `<${EMPTY_AREA_NAME}
        :svg-name="svgName"
    />`
});

export const PropTitle: () => Component = (): Component => ({
    props: {
        title: {
            default: text('Prop title', 'Prop title')
        }
    },
    template: `<${EMPTY_AREA_NAME}
        :title="title"
    />`
});

export const PropSubtitle: () => Component = (): Component => ({
    props: {
        subtitle: {
            default: text('Prop subtitle', 'Prop subtitle')
        }
    },
    template: `<${EMPTY_AREA_NAME}
        :subtitle="subtitle"
    />`
});

export const PropButtonText: () => Component = (): Component => ({
    beforeCreate() {
        importAllSvg();
    },
    props: {
        buttonText: {
            default: text('Prop button-text', 'Prop button-text')
        }
    },
    methods: actions('emitButtonClick'),
    template: `<${EMPTY_AREA_NAME}
        :button-text="buttonText"
        @button-click="emitButtonClick"
    />`
});

export const PropButtonType: () => Component = (): Component => ({
    methods: actions('emitButtonClick'),
    template: `<div>
        <${EMPTY_AREA_NAME}
            button-text="Prop button-type = ${MEmptyAreaButtonType.Button}"
            button-type="${MEmptyAreaButtonType.Button}"
            @button-click="emitButtonClick"
        />
        <${EMPTY_AREA_NAME}
            class="mu-mt-lg"
            button-text="Prop button-type = ${MEmptyAreaButtonType.AddButton}"
            button-type="${MEmptyAreaButtonType.AddButton}"
            @button-click="emitButtonClick"
        />
    </div>`
});


export const PropDisplayMode: () => Component = (): Component => ({
    template: `<div>
        <${EMPTY_AREA_NAME}
            title="Prop display-mode = '${MEmptyAreaDisplayMode.Inline}'"
            svg-name="${ModulIconName.FolderOpen}"
            display-mode="${MEmptyAreaDisplayMode.Inline}"
            button-text="Add"
        />
        <${EMPTY_AREA_NAME}
            class="mu-mt-lg"
            title="Prop display-mode = '${MEmptyAreaDisplayMode.Block}'"
            svg-name="${ModulIconName.Folder}"
            display-mode="${MEmptyAreaDisplayMode.Block}"
            button-text="Add"
        />
    </div>`
});

export const PropMinHeight: () => Component = (): Component => ({
    template: `<div>
        <${EMPTY_AREA_NAME}
            title="Prop min-height = 'auto'"
            min-height="auto"
            svg-name="${ModulIconName.Folder}"
            button-text="Add"
        />
        <${EMPTY_AREA_NAME}
            class="mu-mt-lg"
            title="Prop min-height = '400px'"
            min-height="400px"
            svg-name="${ModulIconName.Folder}"
            button-text="Add"
        />
    </div>`
});

export const PropSvgSize: () => Component = (): Component => ({
    template: `<div>
        <${EMPTY_AREA_NAME}
            title="Prop svg-size = '30px'"
            svg-name="${ModulIconName.Folder}"
            svg-size="30px"
        />
        <${EMPTY_AREA_NAME}
            class="mu-mt-lg"
            title="Prop svg-size = '80px'"
            svg-name="${ModulIconName.Folder}"
            svg-size="80px"
        />
        <${EMPTY_AREA_NAME}
            class="mu-mt-lg"
            title="Prop svg-size = '1em'"
            svg-name="${ModulIconName.Folder}"
            svg-size="1em"
        />
    </div>`
});


export const PropBackgrounStyle: () => Component = (): Component => ({
    template: `<div>
        <${EMPTY_AREA_NAME}
            title="Prop background-style = '${MEmptyAreaBackgroundStyle.Any}'"
            svg-name="${ModulIconName.Folder}"
            background-style="${MEmptyAreaBackgroundStyle.Any}"
        />
        <${EMPTY_AREA_NAME}
        title="Prop background-style = '${MEmptyAreaBackgroundStyle.Light}'"
        svg-name="${ModulIconName.Folder}"
        background-style="${MEmptyAreaBackgroundStyle.Light}"
    />
    </div>`
});
