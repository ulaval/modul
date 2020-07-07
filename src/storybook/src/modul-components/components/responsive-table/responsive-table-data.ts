import { MTableColumn, MTableColumns, MTableColumnSortDirection, MTableGroup, MTableGroupAccordionIconPosition, MTableHeadRows, MTableRow, MTableTextAlign } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';

export const getTableColumn: (
    id: string,
    value: string,
    sortable?: boolean
) => MTableColumn = (
    id: string,
    value: string,
    sortable: boolean = true
) => {
        return {
            id,
            value,
            sortable,
            textAlign: MTableTextAlign.Left,
            sortDirection: MTableColumnSortDirection.None,
            defaultSortDirection: MTableColumnSortDirection.None
        }
    };

export const MAIN_ROW: string = 'mainRow';

export const DEFAULT_COLUMNS: MTableColumns = [
    getTableColumn('name', 'Name'),
    getTableColumn('ni', 'NI'),
    getTableColumn('EmailColumn', 'Email'),
    getTableColumn('dateOfBirth', 'Date of birth'),
    getTableColumn('Phone number', 'Phone number')
];

export const DEFAULT_HEAD_ROWS: MTableHeadRows = {
    [MAIN_ROW]: {
        columns: DEFAULT_COLUMNS,
        mainColumns: true
    }
};

export const COMPLEX_TABLE_FOLDER_COLUMNS: MTableColumns = [
    {
        id: 'forlderSpacingColumn',
        value: '',
        order: 1
    },
    {
        id: 'forlderBColumn',
        value: 'Folder B',
        order: 3,
        colspan: 4
    },
    {
        id: 'forlderAColumn',
        value: 'Folder A',
        order: 2,
        colspan: 4
    }
];

export const COMPLEX_TABLE_AFTER_BEFORE_COLUMNS: MTableColumns = [
    {
        id: 'beforeAfterSpacing',
        value: ''
    },
    {
        id: 'beforeForlderAColumn',
        value: 'Before',
        colspan: 2
    },
    {
        id: 'afterForlderAColumn',
        value: 'After',
        colspan: 2
    },
    {
        id: 'beforeForlderBColumn',
        value: 'Before',
        colspan: 2
    },
    {
        id: 'afterForlderBColumn',
        value: 'After',
        colspan: 2
    }
];


export const COMPLEX_TABLE_MAIN_COLUMNS: MTableColumns = [
    {
        id: 'idColumn',
        value: 'id',
        width: '120px'
    },
    getTableColumn('niBeforeFolderAColumn', 'NI'),
    getTableColumn('nameBeforeFolderAColumn', 'Name'),
    getTableColumn('niAfterFolderAColumn', 'NI'),
    getTableColumn('nameAfterFolderAColumn', 'Name'),
    getTableColumn('niBeforeFolderBColumn', 'NI'),
    getTableColumn('nameBeforeFolderBColumn', 'Name'),
    getTableColumn('niAfterFolderBColumn', 'NI'),
    getTableColumn('nameAfterFolderBColumn', 'Name')
];

export const COMPLEX_TABLE_HEAD_ROWS: MTableHeadRows = {
    'folderRow': {
        columns: COMPLEX_TABLE_FOLDER_COLUMNS
    },
    'beforeAfterRow': {
        columns: COMPLEX_TABLE_AFTER_BEFORE_COLUMNS
    },
    [MAIN_ROW]: {
        columns: COMPLEX_TABLE_MAIN_COLUMNS,
        mainColumns: true
    }
};


export const COLUMNS: MTableColumn[] = [
    {
        id: 'name',
        value: 'Name',
        sortable: true,
        width: '300px',
        textAlign: MTableTextAlign.Left,
        sortDirection: MTableColumnSortDirection.None,
        defaultSortDirection: MTableColumnSortDirection.None,
    },
    {
        id: 'ni',
        value: 'NI',
        sortable: true,
        textAlign: MTableTextAlign.Left,
        class: 'add-class-ni',
        sortDirection: MTableColumnSortDirection.None,
        defaultSortDirection: MTableColumnSortDirection.None,
    },
    {
        id: 'nrc',
        value: 'NRC',
        sortable: true,
        enableUnsort: false,
        textAlign: MTableTextAlign.Center,
        sortDirection: MTableColumnSortDirection.None,
        defaultSortDirection: MTableColumnSortDirection.None
    },
    {
        id: 'program',
        value: 'Program',
        sortable: true,
        enableUnsort: false,
        textAlign: MTableTextAlign.Left,
        class: 'add-class-program',
        sortDirection: MTableColumnSortDirection.None,
        defaultSortDirection: MTableColumnSortDirection.None,
    },
    {
        id: 'date',
        value: 'Date',
        sortable: true,
        enableUnsort: false,
        textAlign: MTableTextAlign.Right,
        sortDirection: MTableColumnSortDirection.None,
        defaultSortDirection: MTableColumnSortDirection.None,
    }
];

export const HEAD_ROW: MTableHeadRows = {
    'row1': {
        order: 3,
        columns: COLUMNS
    },
    'row2': {
        order: 1,
        columns: [
            {
                id: 'full-name',
                value: 'name',
                order: 5
            },
            {
                id: 'other-info',
                value: 'Other infos',
                colspan: 4,
                order: 1
            }
        ]
    }
};

export const ROWS_GROUP: MTableGroup = {
    accordion: {
        open: true,
        disabled: false,
        iconPosition: MTableGroupAccordionIconPosition.Left
    },
    header: {
        title: 'Nom du cours 2',
        cells: {
            name: {
                value: 'name'
            },
            ni: {
                value: 'ni'
            },
            nrc: {
                value: 'nrc',
                colspan: 3
            }
        }
    },
    rows: [
        {
            cells: {
                name: {
                    value: 'Vincent',
                    className: 'ajouter-une-class-test'
                },
                ni: {
                    value: '111 222 333'
                },
                nrc: {
                    value: '84 533'
                },
                program: {
                    value: 'Baccalauréat en design graphique'
                },
                date: {
                    value: '2020-06-05'
                }
            }
        },
        {
            cells: {
                name: {
                    value: 'Maxime'
                },
                ni: {
                    value: '111 222 333'
                },
                nrc: {
                    value: '84 533'
                },
                program: {
                    value: 'Baccalauréat en design graphique'
                },
                date: {
                    value: '2020-06-05'
                }
            }
        }
    ],
    emptyArea: {
        // headerText: 'Message header contenu vide',
        text: 'Message corps empty-area'
        // iconName: 'm-svg__clock',
    }
};

export const ROWS_GROUP_2: MTableGroup = {
    accordion: {
        open: true,
        disabled: false,
        iconPosition: MTableGroupAccordionIconPosition.Left
    },
    header: {
        title: 'Entete 2',
        cells: {
            name: {
                value: 'Entete 2 Martin'
            },
            ni: {
                value: '111 222 333',
                colspan: 4
            }
        }
    },
    rows: [
        {
            cells: {
                name: {
                    value: 'Simard, Martin',
                    className: 'ajouter-une-class-test'
                },
                ni: {
                    value: '111 222 333'
                },
                nrc: {
                    value: '84 533'
                },
                program: {
                    value: 'Baccalauréat en design graphique'
                },
                date: {
                    value: '2020-06-05'
                }
            }
        },
        {
            cells: {
                name: {
                    value: 'Alex',
                    className: 'ajouter-une-class-test'
                },
                ni: {
                    value: '111 222 333'
                },
                nrc: {
                    value: '84 533'
                },
                program: {
                    value: 'Baccalauréat en design graphique'
                },
                date: {
                    value: '2020-06-05'
                }
            }
        },
        {
            cells: {
                name: {
                    value: 'Simon',
                    className: 'ajouter-une-class-test'
                },
                ni: {
                    value: '111 222 333'
                },
                nrc: {
                    value: '84 533'
                },
                program: {
                    value: 'Baccalauréat en design graphique'
                },
                date: {
                    value: '2020-06-05'
                }
            }
        },
        {
            cells: {
                name: {
                    value: 'Vincent',
                    className: 'ajouter-une-class-test'
                },
                ni: {
                    value: '111 222 333'
                },
                nrc: {
                    value: '84 533'
                },
                program: {
                    value: 'Baccalauréat en design graphique'
                },
                date: {
                    value: '2020-06-05'
                }
            }
        }
    ]
};

export const ROW_GROUPS: MTableGroup[] = [ROWS_GROUP, ROWS_GROUP_2];

export const ROWS: MTableRow[] = [
    {
        cells: {
            name: {
                value: 'Titi',
                className: 'add-class'
            },
            ni: {
                value: '111 222 333'
            },
            nrc: {
                value: '1234'
            },
            programme: {
                value: 'Baccalauréat en design graphique'
            },
            dateDerniereModification: {
                value: '2020-06-05'
            }
        }
    },
    {
        cells: {
            name: {
                value: 'Alex',
                className: 'ajouter-une-class-test'
            },
            ni: {
                value: '111 222 333'
            },
            nrc: {
                value: '1234'
            },
            programme: {
                value: 'Baccalauréat en design graphique'
            },
            dateDerniereModification: {
                value: '2020-06-05'
            }
        }
    }
];
