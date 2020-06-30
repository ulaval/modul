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

export const defaultStory = () => ({
    template: `<${EMPTY_AREA_NAME} />`
});

defaultStory.story = {
    name: 'default'
};

export const Sandbox: () => Component = (): Component => ({
    methods: actions('emitButtonClick'),
    beforeCreate() {
        importAllSvg();
    },
    props: {
        text: {
            default: text('Prop text', 'Aucun contenu disponible')
        },
        textButton: {
            default: text('Prop text-button', 'Ajouter')
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
        :text-button="textButton"
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

export const PropTextButton: () => Component = (): Component => ({
    beforeCreate() {
        importAllSvg();
    },
    props: {
        textButton: {
            default: text('Prop text-button', 'Prop text-button')
        }
    },
    methods: actions('emitButtonClick'),
    template: `<${EMPTY_AREA_NAME}
        :text-button="textButton"
        @button-click="emitButtonClick"
    />`
});

export const PropButtonType: () => Component = (): Component => ({
    methods: actions('emitButtonClick'),
    template: `<div>
        <${EMPTY_AREA_NAME}
            text-button="Prop button-type = ${MEmptyAreaButtonType.Button}"
            button-type="${MEmptyAreaButtonType.Button}"
            @button-click="emitButtonClick"
        />
        <${EMPTY_AREA_NAME}
            class="m-u--margin-top--l"
            text-button="Prop button-type = ${MEmptyAreaButtonType.AddButton}"
            button-type="${MEmptyAreaButtonType.AddButton}"
            @button-click="emitButtonClick"
        />
    </div>`
});
