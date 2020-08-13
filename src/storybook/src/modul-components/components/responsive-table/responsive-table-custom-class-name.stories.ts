import { select } from '@storybook/addon-knobs';
import { RESPONSIVE_TABLE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MTableGroupHeaderStyle, MTableRowsStyle } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { Enums } from '@ulaval/modul-components/dist/utils/enums/enums';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';
import './group-header-custom-class-name.css';
import { DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE, DEFAULT_TABLE_ROW_1, DEFAULT_TABLE_ROW_2, DEFAULT_TABLE_ROW_3 } from './responsive-table-data';

export default {
    title: `${modulComponentsHierarchyRootSeparator}${RESPONSIVE_TABLE_NAME}/Custom class-name`,
    parameters: { fileName: __filename }
};

export const GroupHeader = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rowGroups: [
            {
                name: 'CustomStyle',
                header: {
                    title: 'Group #1',
                    className: 'test-group-header-custom-class-name'
                },
                accordion: {
                    open: true,
                    iconClassName: 'test-icon-accordion-custom-class-name'
                },
                rows: [
                    DEFAULT_TABLE_ROW_1,
                    DEFAULT_TABLE_ROW_2,
                    DEFAULT_TABLE_ROW_3
                ]
            }
        ]
    }),
    props: {
        groupHeaderStyle: {
            default: select(
                'Prop group-header-style',
                Enums.toValueArray(MTableGroupHeaderStyle),
                MTableGroupHeaderStyle.Any
            )
        },
        rowsStyle: {
            default: select(
                'Prop rows-style',
                Enums.toValueArray(MTableRowsStyle),
                MTableRowsStyle.Borders
            )
        }
    },
    template: `<${RESPONSIVE_TABLE_NAME}
        id="GroupHeader"
        :columns="columns"
        :row-groups="rowGroups"
        :group-header-style="groupHeaderStyle"
        :rows-style="rowsStyle"
    />`
});

export const Cells = () => ({
    data: () => ({
        columns: DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE,
        rows: [
            {
                cells: {
                    name: {
                        value: 'Vincent Guilmette',
                        className: 'add-custom-class-cell',
                        isHeader: true
                    },
                    id: {
                        value: '111 222 333',
                        className: 'test-cell-custom-class-name'
                    },
                    email: {
                        value: 'vincent.gui@gmail.com'
                    },
                    dateOfBirth: {
                        value: '1976-12-05'
                    },
                    phoneNumber: {
                        value: '819 232-3754'
                    }
                }
            }
        ]
    }),
    props: {
        rowsStyle: {
            default: select(
                'Prop rows-style',
                Enums.toValueArray(MTableRowsStyle),
                MTableRowsStyle.Borders
            )
        }
    },
    template: `<${RESPONSIVE_TABLE_NAME}
        id="Cells"
        :columns="columns"
        :rows="rows"
        :rows-style="rowsStyle"
    />`
});
