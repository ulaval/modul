import { MTableColspan, MTableColumn, MTableColumnSortDirection, MTableGroup, MTableGroupAccordion, MTableGroupAccordionIconPosition, MTableGroupHeader, MTableHeadRows, MTableRow, MTableTextAlign } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';

export const getTableColumn: (
    id: string,
    value: string,
    sortable?: boolean,
    sortDirection?: MTableColumnSortDirection,
    defaultSortDirection?: MTableColumnSortDirection
) => MTableColumn = (
    id: string,
    value: string,
    sortable: boolean = true,
    sortDirection: MTableColumnSortDirection | undefined = undefined,
    defaultSortDirection: MTableColumnSortDirection = MTableColumnSortDirection.Asc

) => {
    return {
        id,
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
    getTableColumn('name', 'Name', true, MTableColumnSortDirection.Asc),
    getTableColumn('ni', 'NI'),
    getTableColumn('email', 'Email'),
    getTableColumn('dateOfBirth', 'Date of birth', true, MTableColumnSortDirection.None, MTableColumnSortDirection.Dsc),
    getTableColumn('phoneNumber', 'Phone number')
];

export const DEFAULT_TABLE_ROW_1: MTableRow = {
    cells: {
        name: {
            value: 'Vincent Guilmette',
            className: 'add-custom-class-cell'
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
            }
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
            value: 'Pierre Olivier Boulet'
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

export const DEFAULT_TABLE_GROUP_HEADER_1: MTableGroupHeader = {
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

export const DEFAULT_TABLE_GROUP_HEADER_2: MTableGroupHeader = {
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

export const DEFAULT_TABLE_GROUP_ACCORDION_1: MTableGroupAccordion = {
    open: true,
    disabled: false,
    iconPosition: MTableGroupAccordionIconPosition.Left,
    iconClassName: 'add-class-to-icon'
};

export const DEFAULT_TABLE_GROUP_1: MTableGroup = {
    accordion: DEFAULT_TABLE_GROUP_ACCORDION_1,
    header: DEFAULT_TABLE_GROUP_HEADER_1,
    rows: [
        DEFAULT_TABLE_ROW_1,
        DEFAULT_TABLE_ROW_2,
        DEFAULT_TABLE_ROW_3
    ]
};

export const DEFAULT_TABLE_GROUP_2: MTableGroup = {
    header: DEFAULT_TABLE_GROUP_HEADER_2,
    rows: [
        DEFAULT_TABLE_ROW_1,
        DEFAULT_TABLE_ROW_2,
        DEFAULT_TABLE_ROW_3
    ]
};

export const DEFAULT_TABLE_GROUPS: MTableGroup[] = [
    DEFAULT_TABLE_GROUP_1,
    DEFAULT_TABLE_GROUP_2
];


export const COMPLEX_TABLE_FOLDER_COLUMNS: MTableColumn[] = [
    {
        id: 'forlderSpacingColumn',
        value: '',
        order: 1,
        rowspan: 2,
        style: { background: '#fff' }
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

export const COMPLEX_TABLE_AFTER_BEFORE_COLUMNS: MTableColumn[] = [
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


export const COMPLEX_TABLE_MAIN_COLUMNS: MTableColumn[] = [
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
        className: 'add-class-ni',
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
        className: 'add-class-program',
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
        headerText: 'Message header contenu vide',
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
