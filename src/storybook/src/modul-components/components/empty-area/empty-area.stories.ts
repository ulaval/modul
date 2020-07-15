import { actions } from '@storybook/addon-actions';
import { select, text } from '@storybook/addon-knobs';
import { EMPTY_AREA_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MEmptyAreaButtonType } from '@ulaval/modul-components/dist/components/empty-area/empty-area';
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
        text: {
            default: text('Prop text', 'No content available')
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
        svgName: {
            default: select<ModulIconName>(
                'Prop name',
                Enums.toValueArray(ModulIconName) as ModulIconName[],
                ModulIconName.Folder
            )
        }
    },
    template: `<${EMPTY_AREA_NAME}
        :text="text"
        :button-text="buttonText"
        :button-type="buttonType"
        :svg-name="svgName"
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

export const PropText: () => Component = (): Component => ({
    methods: actions('emitButtonClick'),
    props: {
        text: {
            default: text('Prop text', 'Prop text')
        }
    },
    template: `<${EMPTY_AREA_NAME}
        :text="text"
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
            class="m-u--margin-top--l"
            button-text="Prop button-type = ${MEmptyAreaButtonType.AddButton}"
            button-type="${MEmptyAreaButtonType.AddButton}"
            @button-click="emitButtonClick"
        />
    </div>`
});
