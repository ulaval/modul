import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/vue';
import { TABLE_NAME } from '@ulaval/modul-components/dist/components/component-names';
import { MColumnSortDirection, MColumnTable, MColumnTextAlign } from '@ulaval/modul-components/dist/components/table/table';
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

storiesOf(`${modulComponentsHierarchyRootSeparator}${TABLE_NAME}`, module)
    .add('Default', () => ({
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name' },
                    { id: 'age', title: 'Age', dataProp: 'age' },
                    { id: 'username', title: 'Username', dataProp: 'username' }
                ]
            },
            rows: {
                default: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' },
                    { id: '5', name: 'Manon', age: '28', username: 'manon.28' }
                ]
            }
        },
        template: '<m-table :columns="columns" :rows="rows" width="100%"></m-table>'
    }))
    .add('Custom Header', () => ({
        props: {
            columns: {
                default: [
                    { id: 'check', title: '', dataProp: 'check', width: '16px' },
                    { id: 'name', title: 'Name', dataProp: 'name' },
                    { id: 'age', title: 'Age', dataProp: 'age' },
                    { id: 'username', title: 'Username', dataProp: 'username' },
                    { id: 'menu', title: '', dataProp: 'menu', width: '33px' }
                ]
            },
            rows: {
                default: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' },
                    { id: '5', name: 'Manon', age: '28', username: 'manon.34' }
                ]
            }
        },
        template: `<m-table :columns="columns" :rows="rows" width="100%">
                        <thead slot="header">
                            <tr>
                                <th colspan="2">NAME, USERNAME</th>
                                <th>AGE</th>
                            </tr>
                        </thead>

                        <tbody slot="body">
                            <tr v-for="(row, index) in rows"
                                :key="index">
                                <td colspan="2">{{ row.name }} - {{ row.username }}</td>
                                <td>{{ row.age }}</td>
                            </tr>
                        </tbody>
                   </m-table>`
    }))
    .add('Custom cell', () => ({
        props: {
            columns: {
                default: [
                    { id: 'check', title: '', dataProp: 'check', width: '16px' },
                    { id: 'name', title: 'Name', dataProp: 'name' },
                    { id: 'age', title: 'Age', dataProp: 'age' },
                    { id: 'username', title: 'Username', dataProp: 'username' },
                    { id: 'menu', title: '', dataProp: 'menu', width: '33px' }
                ]
            },
            rows: {
                default: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' },
                    { id: '5', name: 'Manon', age: '28', username: 'manon.28' }
                ]
            }
        },
        template: `<m-table :columns="columns" :rows="rows" width="100%">
                        <template slot="header.age"> AGE </template>
                        <template slot="body.age" slot-scope="{data}"> {{ data.age }} ans </template>
                        <template slot="body.check" slot-scope="{data}">
                            <m-checkbox></m-checkbox>
                        </template>
                        <template slot="body.menu" slot-scope="{data}">
                            <m-option size="33px">
                                <m-option-item-edit"></m-option-item-edit>
                                <m-option-item-delete"></m-option-item-delete>
                            </m-option>
                        </template>
                        <template slot="footer">
                            <td class="m-table-sandbox__show-more" colspan="4" style="text-align: center;">
                                <m-button class="m-table-sandbox__show-more-button">
                                    <p class="m-u--no-margin">Show more results</p>
                                    <span>1-5 of 45</span>
                                </m-button>
                            </td>
                        </template>
                   </m-table>`
    }))
    .add('Custom row', () => ({
        props: {
            columns: {
                default: [
                    { id: 'check', title: '', dataProp: 'check', width: '16px' },
                    { id: 'name', title: 'Name', dataProp: 'name' },
                    { id: 'age', title: 'Age', dataProp: 'age' },
                    { id: 'username', title: 'Username', dataProp: 'username' },
                    { id: 'menu', title: '', dataProp: 'menu', width: '33px' }
                ]
            },
            rows: {
                default: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' },
                    { id: '5', name: 'Manon', age: '28', username: 'manon.28' }
                ]
            }
        },
        template: `<m-table :columns="columns" :rows="rows" width="100%">
                        <template slot="row" slot-scope="{data}">
                            <td> </td>
                            <td> {{ data.name }}</td>
                            <td colspan="2">
                                {{ data.age }} ans - {{ data.username }}
                            </td>
                            <td>
                                <m-option size="33px">
                                    <m-option-item-edit></m-option-item-edit>
                                    <m-option-item-delete></m-option-item-delete>
                                </m-option>
                            </td>
                        </template>
                        <template slot="footer">
                            <td class="m-table-sandbox__show-more" colspan="4" style="text-align: center;">
                                <m-button class="m-table-sandbox__show-more-button">
                                    <p class="m-u--no-margin">Show more results</p>
                                    <span>1-5 of 45</span>
                                </m-button>
                            </td>
                        </template>
                   </m-table>`
    }))
    .add('Text align center', () => ({
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name', textAlign: MColumnTextAlign.Center },
                    { id: 'age', title: 'Age', dataProp: 'age', textAlign: MColumnTextAlign.Center },
                    { id: 'username', title: 'Username', dataProp: 'username', textAlign: MColumnTextAlign.Center }
                ]
            },
            rows: {
                default: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' },
                    { id: '5', name: 'Manon', age: '28', username: 'manon.28' }
                ]
            }
        },
        template: '<m-table :columns="columns" :rows="rows" width="100%"></m-table>'
    }))
    .add('Text align left', () => ({
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name', textAlign: MColumnTextAlign.Left },
                    { id: 'age', title: 'Age', dataProp: 'age', textAlign: MColumnTextAlign.Left },
                    { id: 'username', title: 'Username', dataProp: 'username', textAlign: MColumnTextAlign.Left }
                ]
            },
            rows: {
                default: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' },
                    { id: '5', name: 'Manon', age: '28', username: 'manon.28' }
                ]
            }
        },
        template: '<m-table :columns="columns" :rows="rows" width="100%"></m-table>'
    }))
    .add('Text align right', () => ({
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name', textAlign: MColumnTextAlign.Right },
                    { id: 'age', title: 'Age', dataProp: 'age', textAlign: MColumnTextAlign.Right },
                    { id: 'username', title: 'Username', dataProp: 'username', textAlign: MColumnTextAlign.Right }
                ]
            },
            rows: {
                default: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' },
                    { id: '5', name: 'Manon', age: '28', username: 'manon.28' }
                ]
            }
        },
        template: '<m-table :columns="columns" :rows="rows" width="100%"></m-table>'
    }))
    .add('Text align center - Sortable', () => ({
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name', textAlign: MColumnTextAlign.Center, sortable: true },
                    { id: 'age', title: 'Age', dataProp: 'age', textAlign: MColumnTextAlign.Center, sortable: true },
                    { id: 'username', title: 'Username', dataProp: 'username', textAlign: MColumnTextAlign.Center, sortable: true }
                ]
            },
            rows: {
                default: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' },
                    { id: '5', name: 'Manon', age: '28', username: 'manon.28' }
                ]
            }
        },
        template: '<m-table :columns="columns" :rows="rows" width="100%"></m-table>'
    }))
    .add('Text align left - Sortable', () => ({
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name', textAlign: MColumnTextAlign.Left, sortable: true },
                    { id: 'age', title: 'Age', dataProp: 'age', textAlign: MColumnTextAlign.Left, sortable: true },
                    { id: 'username', title: 'Username', dataProp: 'username', textAlign: MColumnTextAlign.Left, sortable: true }
                ]
            },
            rows: {
                default: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' },
                    { id: '5', name: 'Manon', age: '28', username: 'manon.28' }
                ]
            }
        },
        template: '<m-table :columns="columns" :rows="rows" width="100%"></m-table>'
    }))
    .add('Text align right - Sortable', () => ({
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name', textAlign: MColumnTextAlign.Right, sortable: true },
                    { id: 'age', title: 'Age', dataProp: 'age', textAlign: MColumnTextAlign.Right, sortable: true },
                    { id: 'username', title: 'Username', dataProp: 'username', textAlign: MColumnTextAlign.Right, sortable: true }
                ]
            },
            rows: {
                default: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' },
                    { id: '5', name: 'Manon', age: '28', username: 'manon.28' }
                ]
            }
        },
        template: '<m-table :columns="columns" :rows="rows" width="100%"></m-table>'
    }))
    .add('Empty table - default slot', () => ({
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name' },
                    { id: 'age', title: 'Age', dataProp: 'age' },
                    { id: 'username', title: 'Username', dataProp: 'username' }
                ]
            },
            rows: {
                default: []
            }
        },
        template: '<m-table :columns="columns" :rows="rows" width="100%"></m-table>'
    }))
    .add('Empty table - custom slot', () => ({
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name' },
                    { id: 'age', title: 'Age', dataProp: 'age' },
                    { id: 'username', title: 'Username', dataProp: 'username' }
                ]
            },
            rows: {
                default: []
            }
        },
        template: `<m-table :columns="columns" :rows="rows" width="100%">
                        <template slot="empty">
                            <td class="m-table-sandbox__empty__cell"
                                :colspan="columns.length">
                                Empty table
                            </td>
                        </template>
                    </m-table>`
    }))
    .add('Loading', () => ({
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name' },
                    { id: 'age', title: 'Age', dataProp: 'age' },
                    { id: 'username', title: 'Username', dataProp: 'username' }
                ]
            },
            rows: {
                default: []
            }
        },
        template: `<m-table :columns="columns" :rows="rows" :loading="true" width="100%"></m-table>`
    }))
    .add('Width placeholer', () => ({
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name' },
                    { id: 'age', title: 'Age', dataProp: 'age' },
                    { id: 'username', title: 'Username', dataProp: 'username' }
                ]
            },
            rows: {
                default: []
            },
            widthPlaceholder: {
                default: text('Prop width-placeholder', '500px')
            },
            divWidth: {
                default: text('Parent div width', '500px')
            },
            tableWidth: {
                default: text('Table width', '1000px')
            }
        },
        template: `<div style="overflow: auto;"
        :style="{ width: divWidth }"
        >
            <m-table :columns="columns"
                :rows="rows"
                :style="{ width: tableWidth }"
                :width-placeholder="widthPlaceholder"></m-table>
        </div>`
    }))
    .add('Sortable', () => ({
        data: function(): any {
            return {
                rows: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' },
                    { id: '5', name: 'Manon', age: '28', username: 'manon.28' }
                ]
            };
        },
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name', sortable: true },
                    { id: 'age', title: 'Age', dataProp: 'age', sortable: true, defaultSortDirection: MColumnSortDirection.Dsc },
                    { id: 'username', title: 'Username', dataProp: 'username', sortable: true }
                ]
            }
        },
        template: `<m-table :columns="columns" :rows="rows" width="100%" @sort-applied="onSortApplied($event)" />`,
        methods: {
            onSortApplied: defaultOnSortApplied
        }
    }))
    .add('Sortable width custom header cell', () => ({
        data: function(): any {
            return {
                rows: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' }
                ]
            };
        },
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name', sortable: true },
                    { id: 'age', title: 'Age', dataProp: 'age', sortable: true, defaultSortDirection: MColumnSortDirection.Dsc },
                    { id: 'username', title: 'Username', dataProp: 'username', sortable: true }
                ]
            }
        },
        template: `<m-table :columns="columns" :rows="rows" width="100%" @sort-applied="onSortApplied($event)">
            <template slot="header.name">NAME (custom)</template>
            <template slot="header.age">AGE (custom)</template>
            <template slot="header.username">USERNAME (custom)</template>
        </m-table>`,
        methods: {
            onSortApplied: defaultOnSortApplied
        }
    }))
    .add('Sortable with unsorting', () => ({
        data: function(): any {
            return {
                rows: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' },
                    { id: '5', name: 'Manon', age: '28', username: 'manon.28' }
                ]
            };
        },
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name', dataProp: 'name', sortable: true, enableUnsort: true },
                    { id: 'age', title: 'Age', dataProp: 'age', sortable: true, enableUnsort: true, defaultSortDirection: MColumnSortDirection.Dsc },
                    { id: 'username', title: 'Username', dataProp: 'username', sortable: true, enableUnsort: true }
                ]
            }
        },
        template: '<m-table :columns="columns" :rows="rows" width="100%" @sort-applied="onSortApplied($event)" />',
        methods: {
            onSortApplied: defaultOnSortApplied
        }
    }))
    .add('skin="simple"', () => ({
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name, Username', dataProp: 'name' },
                    { id: 'age', title: 'Age', dataProp: 'age', width: '80px' }
                ]
            },
            rows: {
                default: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' }
                ]
            }
        },
        template: `<m-table skin="simple" :columns="columns" width="100%">
                    <tbody slot="body">
                        <tr v-for="(row, index) in rows"
                            :key="index">
                            <td>{{ row.name }} - {{ row.username }}</td>
                            <td>{{ row.age }}</td>
                        </tr>
                    </tbody>
                </m-table>`
    }))
    .add('Custom columns class', () => ({
        props: {
            columns: {
                default: [
                    { id: 'name', title: 'Name, Username', dataProp: 'name', class: 'm--custom-class' },
                    { id: 'age', title: 'Age', dataProp: 'age', width: '80px' }
                ]
            },
            rows: {
                default: [
                    { id: '1', name: 'Jonathan', age: '25', username: 'jonathan.25' },
                    { id: '2', name: 'Carl', age: '30', username: 'carl.30' },
                    { id: '3', name: 'Jacob', age: '26', username: 'jacob.26' },
                    { id: '4', name: 'Vincent', age: '34', username: 'vincent.34' }
                ]
            }
        },
        template: `<m-table skin="simple" :columns="columns" :rows="rows" width="100%"></m-table>`
    }));
