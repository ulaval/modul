import { actions } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/vue';
import { ORGANIZE_TABLE_COLUMNS_MODAL_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MColumnSortDirection, MColumnTable } from '@ulaval/modul-components/dist/components/table/table';
import { modulComponentsHierarchyRootSeparator } from '../../../utils';

function defaultOnSortApplied(columnTable: MColumnTable): void {
    if (columnTable.sortDirection === MColumnSortDirection.None) {
        this.$data.rows.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
        return;
    }

    this.$data.rows.sort((a, b) => {
        if (a[columnTable.dataProp] < b[columnTable.dataProp]) {
            return -1 * columnTable.sortDirection!;
        } else if (a[columnTable.dataProp] > b[columnTable.dataProp]) {
            return 1 * columnTable.sortDirection!;
        }
        return 0;
    });
}

storiesOf(`${modulComponentsHierarchyRootSeparator}${ORGANIZE_TABLE_COLUMNS_MODAL_NAME}`, module)
    .add('Default', () => ({
        props: {
            columns: {
                default: [
                    { id: 'check', title: 'Action', dataProp: 'check', width: '16px' },
                    { id: 'name', title: 'Name', dataProp: 'name' },
                    { id: 'age', title: 'Age', dataProp: 'age' },
                    { id: 'username', title: 'Username', dataProp: 'username' },
                    { id: 'menu', title: 'Menu', dataProp: 'menu', width: '33px' }
                ]
            }

        },
        methods: actions(
            'reorganize',
            'reset'
        ),
        template: `<m-organize-table-columns-modal @reorganize="reorganize" @reset=reset :columns="columns"></m-organize-table-columns-modal>`
    }))
    .add('Trigger button secondary skin', () => ({
        props: {
            columns: {
                default: [
                    { id: 'check', title: 'Action', dataProp: 'check', width: '16px' },
                    { id: 'name', title: 'Name', dataProp: 'name' },
                    { id: 'age', title: 'Age', dataProp: 'age' },
                    { id: 'username', title: 'Username', dataProp: 'username' },
                    { id: 'menu', title: 'Menu', dataProp: 'menu', width: '33px' }
                ]
            }

        },
        methods: actions(
            'reorganize',
            'reset'
        ),
        template: `<m-organize-table-columns-modal @reorganize="reorganize" @reset=reset :columns="columns" button-skin="secondary"></m-organize-table-columns-modal>`
    }))
    .add('Fixed columns', () => ({
        props: {
            columns: {
                default: [
                    { id: 'check', title: 'Action', dataProp: 'check', width: '16px', fixed: true },
                    { id: 'name', title: 'Name', dataProp: 'name', fixed: true },
                    { id: 'age', title: 'Age', dataProp: 'age' },
                    { id: 'username', title: 'Username', dataProp: 'username' },
                    { id: 'menu', title: 'Menu', dataProp: 'menu', width: '33px' }
                ]
            }
        },
        methods: actions(
            'reorganize',
            'reset'
        ),
        template: `<m-organize-table-columns-modal @reorganize="reorganize" @reset=reset :columns="columns"></m-organize-table-columns-modal>`
    }))
    .add('Hidden columns', () => ({
        props: {
            columns: {
                default: [
                    { id: 'check', title: 'Action', dataProp: 'check', width: '16px' },
                    { id: 'name', title: 'Name', dataProp: 'name' },
                    { id: 'age', title: 'Age', dataProp: 'age', visible: false },
                    { id: 'username', title: 'Username', dataProp: 'username' },
                    { id: 'menu', title: 'Menu', dataProp: 'menu', width: '33px' }
                ]
            }
        },
        methods: actions(
            'reorganize',
            'reset'
        ),
        template: `<m-organize-table-columns-modal @reorganize="reorganize" @reset=reset :columns="columns"></m-organize-table-columns-modal>`
    }))
    .add('Ignore columns', () => ({
        props: {
            columns: {
                default: [
                    { id: 'check', title: 'Action', dataProp: 'check', width: '16px' },
                    { id: 'name', title: 'Name', dataProp: 'name' },
                    { id: 'age', title: 'Age', dataProp: 'age', ignored: true },
                    { id: 'username', title: 'Username', dataProp: 'username' },
                    { id: 'menu', title: 'Menu', dataProp: 'menu', width: '33px' }
                ]
            }
        },
        methods: actions(
            'reorganize',
            'reset'
        ),
        template: `<m-organize-table-columns-modal @reorganize="reorganize" @reset=reset :columns="columns"></m-organize-table-columns-modal>`
    }));
