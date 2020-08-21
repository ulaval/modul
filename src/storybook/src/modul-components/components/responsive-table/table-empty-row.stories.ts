import { actions } from '@storybook/addon-actions';
import { RESPONSIVE_TABLE_NAME, TABLE_EMPTY_ROW_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MEmptyAreaButtonType } from '@ulaval/modul-components/dist/components/empty-area/empty-area';
import { ModulIconName } from '@ulaval/modul-components/dist/utils/modul-icons/modul-icons';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import { importAllSvg } from '../svg/svg-importation';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/${TABLE_EMPTY_ROW_NAME}`,
    parameters: { fileName: __filename }
};

export const Default = () => ({
    data: () => ({
        emptyArea: {
            title: 'Tilte',
            subtitle: 'Subtitle',
            svgName: ModulIconName.Folder,
            buttonText: 'Add content',
            buttonType: MEmptyAreaButtonType.Button
        }
    }),
    methods: actions('emitEmptyButtonClick'),
    beforeCreate() {
        importAllSvg();
    },
    template: `<${TABLE_EMPTY_ROW_NAME}
        :empty-area="emptyArea"
        :table-component-width="'600px'"
        :horizontal-scroll-offset="10"
        :nb-columns="3"
        @empty-button-click="emitEmptyButtonClick"
    />`
});

export const PropWaiting = () => ({
    data: () => ({
        emptyArea: {
            title: 'Text',
            svgName: ModulIconName.Folder,
            buttonText: 'Add content',
            buttonType: MEmptyAreaButtonType.Button
        }
    }),
    methods: actions('emitEmptyButtonClick'),
    beforeCreate() {
        importAllSvg();
    },
    template: `<${TABLE_EMPTY_ROW_NAME}
        :empty-area="emptyArea"
        :table-component-width="'600px'"
        :horizontal-scroll-offset="10"
        :waiting="true"
        @empty-button-click="emitEmptyButtonClick"
    />`
});

export const PropInsideOfTableGroup = () => ({
    data: () => ({
        emptyArea: {
            title: 'Prop inside-of-table-group = true',
            svgName: ModulIconName.Folder
        }
    }),
    beforeCreate() {
        importAllSvg();
    },
    template: `<${TABLE_EMPTY_ROW_NAME}
        :empty-area="emptyArea"
        :table-component-width="'600px'"
        :horizontal-scroll-offset="10"
        :inside-of-table-group="true"
    />`
});
