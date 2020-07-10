import { MTableAccordion, MTableAccordionIconPosition, MTableColspan, MTableColumn, MTableHeader, MTableHeadRows, MTableRow, MTableRowsGroup, MTableSortDirection, MTableTextAlign } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';

export const getTableColumn: (
    name: string,
    value: string,
    sortable?: boolean,
    sortDirection?: MTableSortDirection,
    defaultSortDirection?: MTableSortDirection
) => MTableColumn = (
    name: string,
    value: string,
    sortable: boolean = true,
    sortDirection: MTableSortDirection | undefined = undefined,
    defaultSortDirection: MTableSortDirection = MTableSortDirection.Asc

) => {
    return {
        name,
        value,
        sortable,
        enableUnsort: true,
        textAlign: MTableTextAlign.Left,
        sortDirection,
        defaultSortDirection
    };
};

export const MAIN_ROW: string = 'mainRow';

export const DEFAULT_TABLE_COLUMNS: MTableColumn[] = [
    getTableColumn('name', 'Name', true, MTableSortDirection.Asc),
    getTableColumn('ni', 'NI'),
    getTableColumn('email', 'Email'),
    getTableColumn('dateOfBirth', 'Date of birth', true, MTableSortDirection.None, MTableSortDirection.Dsc),
    getTableColumn('phoneNumber', 'Phone number')
];

export const DEFAULT_TABLE_ROW_1: MTableRow = {
    cells: {
        name: {
            value: 'Vincent Guilmette',
            className: 'add-custom-class-cell',
            isHeader: true
        },
        ni: {
            value: '111 222 333'
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
};

export const DEFAULT_TABLE_ROW_2: MTableRow = {
    cells: {
        name: {
            value: 'Charles Maheu',
            data: {
                nom: 'Maheu',
                prenom: 'Charles'
            },
            isHeader: true
        },
        ni: {
            value: '111 322 344'
        },
        email: {
            value: 'charles.maheu@outlook.com'
        },
        dateOfBirth: {
            value: '1980-06-11'
        },
        phoneNumber: {
            value: '418 233-4744'
        }
    },
    className: 'add-custom-class-row'
};

export const DEFAULT_TABLE_ROW_3: MTableRow = {
    cells: {
        name: {
            value: 'Pierre Olivier Boulet',
            isHeader: true
        },
        ni: {
            value: '112 528 967'
        },
        email: {
            value: 'po.boulet@gmail.com'
        },
        dateOfBirth: {
            value: '1994-04-08'
        },
        phoneNumber: {
            value: '819 135-3460'
        }
    }
};

export const DEFAULT_TABLE_GROUP_HEADER_1: MTableHeader = {
    title: 'English Class',
    cells: {
        name: {
            value: 'ANL-3010'
        },
        ni: {
            value: 'Advanced English I',
            colspan: 4
        }
    }
};

export const DEFAULT_TABLE_GROUP_HEADER_2: MTableHeader = {
    title: 'NUT-1104',
    cells: {
        name: {
            value: 'Éléments de nutrition',
            colspan: MTableColspan.AllColumns
        }
    }
};

export const DEFAULT_TABLE_HEAD_ROWS: MTableHeadRows = {
    [MAIN_ROW]: {
        columns: DEFAULT_TABLE_COLUMNS,
        mainColumns: true
    }
};

export const DEFAULT_TABLE_GROUP_ACCORDION_1: MTableAccordion = {
    open: true,
    disabled: false,
    iconPosition: MTableAccordionIconPosition.Left,
    iconClassName: 'add-class-to-icon'
};

export const DEFAULT_TABLE_GROUP_1: MTableRowsGroup = {
    name: 'TABLE_GROUP_1',
    accordion: DEFAULT_TABLE_GROUP_ACCORDION_1,
    header: DEFAULT_TABLE_GROUP_HEADER_1,
    rows: [
        DEFAULT_TABLE_ROW_1,
        DEFAULT_TABLE_ROW_2,
        DEFAULT_TABLE_ROW_3
    ]
};

export const DEFAULT_TABLE_GROUP_2: MTableRowsGroup = {
    name: 'TABLE_GROUP_2',
    header: DEFAULT_TABLE_GROUP_HEADER_2,
    rows: [
        DEFAULT_TABLE_ROW_1,
        DEFAULT_TABLE_ROW_2,
        DEFAULT_TABLE_ROW_3
    ]
};

export const DEFAULT_TABLE_GROUPS: MTableRowsGroup[] = [
    DEFAULT_TABLE_GROUP_1,
    DEFAULT_TABLE_GROUP_2
];


export const COMPLEX_TABLE_FOLDER_COLUMNS: MTableColumn[] = [
    {
        name: 'forlderSpacingColumn',
        value: '',
        order: 1,
        rowspan: 2,
        style: { background: '#fff' }
    },
    {
        name: 'forlderBColumn',
        value: 'Folder B',
        order: 3,
        colspan: 4
    },
    {
        name: 'forlderAColumn',
        value: 'Folder A',
        order: 2,
        colspan: 4
    }
];

export const COMPLEX_TABLE_AFTER_BEFORE_COLUMNS: MTableColumn[] = [
    {
        name: 'beforeForlderAColumn',
        value: 'Before',
        colspan: 2
    },
    {
        name: 'afterForlderAColumn',
        value: 'After',
        colspan: 2
    },
    {
        name: 'beforeForlderBColumn',
        value: 'Before',
        colspan: 2
    },
    {
        name: 'afterForlderBColumn',
        value: 'After',
        colspan: 2
    }
];


export const COMPLEX_TABLE_MAIN_COLUMNS: MTableColumn[] = [
    {
        name: 'id',
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
        name: 'name',
        value: 'Name',
        sortable: true,
        width: '300px',
        textAlign: MTableTextAlign.Left,
        sortDirection: MTableSortDirection.None,
        defaultSortDirection: MTableSortDirection.None,
    },
    {
        name: 'ni',
        value: 'NI',
        sortable: true,
        textAlign: MTableTextAlign.Left,
        className: 'add-class-ni',
        sortDirection: MTableSortDirection.None,
        defaultSortDirection: MTableSortDirection.None,
    },
    {
        name: 'nrc',
        value: 'NRC',
        sortable: true,
        enableUnsort: false,
        textAlign: MTableTextAlign.Center,
        sortDirection: MTableSortDirection.None,
        defaultSortDirection: MTableSortDirection.None
    },
    {
        name: 'program',
        value: 'Program',
        sortable: true,
        enableUnsort: false,
        textAlign: MTableTextAlign.Left,
        className: 'add-class-program',
        sortDirection: MTableSortDirection.None,
        defaultSortDirection: MTableSortDirection.None,
    },
    {
        name: 'date',
        value: 'Date',
        sortable: true,
        enableUnsort: false,
        textAlign: MTableTextAlign.Right,
        sortDirection: MTableSortDirection.None,
        defaultSortDirection: MTableSortDirection.None,
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
                name: 'full-name',
                value: 'name',
                order: 5
            },
            {
                name: 'other-info',
                value: 'Other infos',
                colspan: 4,
                order: 1
            }
        ]
    }
};

export const ROWS_GROUP: MTableRowsGroup = {
    name: 'ROWS_GROUP',
    accordion: {
        open: true,
        disabled: false,
        iconPosition: MTableAccordionIconPosition.Left
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
        headerText: 'Message header contenu vide',
        text: 'Message corps empty-area'
        // iconName: 'm-svg__clock',
    }
};

export const ROWS_GROUP_2: MTableRowsGroup = {
    name: 'ROWS_GROUP_2',
    accordion: {
        open: true,
        disabled: false,
        iconPosition: MTableAccordionIconPosition.Left
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

export const ROW_GROUPS: MTableRowsGroup[] = [ROWS_GROUP, ROWS_GROUP_2];

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
