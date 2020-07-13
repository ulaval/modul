import { MTableAccordion, MTableAccordionIconPosition, MTableColspan, MTableColumn, MTableHeader, MTableHeadRows, MTableRow, MTableRowsGroup, MTableSortDirection, MTableTextAlign } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';

export const getTableColumn: (
    name: string,
    value: string,
    sortable?: boolean,
    sortDirection?: MTableSortDirection,
    defaultSortDirection?: MTableSortDirection,
    textAlign?: MTableTextAlign
) => MTableColumn = (
    name: string,
    value: string,
    sortable: boolean = true,
    sortDirection: MTableSortDirection | undefined = undefined,
    defaultSortDirection: MTableSortDirection = MTableSortDirection.Asc,
    textAlign: MTableTextAlign = MTableTextAlign.Left

) => {
    return {
        name,
        value,
        sortable,
        enableUnsort: true,
        textAlign,
        sortDirection,
        defaultSortDirection
    };
};

export const getScopeSlotTemplate = (
    textHtml: string
) => {
    return `<div
            style="background: blue; color: #fff; padding: 8px; border-radius: 4px;">
            ${ textHtml}
        </div>`;
};

export const MAIN_ROW: string = 'mainRow';

const getDefaultTableColumns = (isSortable: boolean = true) => {
    return [
        getTableColumn('name', 'Name', isSortable, MTableSortDirection.Asc),
        getTableColumn('id', 'Id', isSortable, MTableSortDirection.None, MTableSortDirection.None, MTableTextAlign.Center),
        getTableColumn('email', 'Email', isSortable),
        getTableColumn('dateOfBirth', 'Date of birth', isSortable, MTableSortDirection.None, MTableSortDirection.Dsc),
        getTableColumn('phoneNumber', 'Phone number', isSortable)
    ];
};

export const DEFAULT_TABLE_COLUMNS: MTableColumn[] = getDefaultTableColumns(true);
export const DEFAULT_TABLE_COLUMNS_DISABLED_SORTABLE: MTableColumn[] = getDefaultTableColumns(false);

export const DEFAULT_TABLE_ROW_1: MTableRow = {
    cells: {
        name: {
            value: 'Vincent Guilmette',
            className: 'add-custom-class-cell',
            isHeader: true
        },
        id: {
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
        id: {
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
        id: {
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
        id: {
            value: 'Advanced English I',
            colspan: 4,
            textAlign: MTableTextAlign.Right
        }
    }
};

export const DEFAULT_TABLE_GROUP_HEADER_2: MTableHeader = {
    title: 'Title',
    cells: {
        name: {
            value: 'Professor\'s name',
            colspan: MTableColspan.AllColumns
        }
    }
};

export const DEFAULT_TABLE_GROUP_HEADER_3: MTableHeader = {
    cells: {
        name: {
            value: 'ANI-1101'
        },
        id: {
            value: 'Motion design',
            colspan: 4,
            textAlign: MTableTextAlign.Left
        }
    }
};

export const DEFAULT_TABLE_GROUP_HEADER_4: MTableHeader = {
    cells: {
        name: {
            value: 'DES-1103'
        },
        id: {
            value: 'User experience design I',
            colspan: 4,
            textAlign: MTableTextAlign.Left
        }
    }
};

export const DEFAULT_TABLE_GROUP_HEADER_5: MTableHeader = {
    cells: {
        name: {
            value: 'DES-1104'
        },
        id: {
            value: 'User experience design II',
            colspan: 4,
            textAlign: MTableTextAlign.Left
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

export const DEFAULT_TABLE_GROUP_ACCORDION_2: MTableAccordion = {
    open: false,
    disabled: true
};

export const DEFAULT_TABLE_GROUP_ACCORDION_3: MTableAccordion = {
    open: true,
    displayIcon: false
};

export const DEFAULT_TABLE_ROWS_GROUP_1: MTableRowsGroup = {
    name: 'group1',
    accordion: DEFAULT_TABLE_GROUP_ACCORDION_1,
    header: DEFAULT_TABLE_GROUP_HEADER_1,
    rows: [
        DEFAULT_TABLE_ROW_1,
        DEFAULT_TABLE_ROW_2,
        DEFAULT_TABLE_ROW_3
    ]
};

export const DEFAULT_TABLE_ROWS_GROUP_2: MTableRowsGroup = {
    name: 'group2',
    header: DEFAULT_TABLE_GROUP_HEADER_2,
    accordion: DEFAULT_TABLE_GROUP_ACCORDION_3,
    rows: [
        DEFAULT_TABLE_ROW_1
    ]
};

export const DEFAULT_TABLE_ROWS_GROUP_3: MTableRowsGroup = {
    name: 'group3',
    header: DEFAULT_TABLE_GROUP_HEADER_3,
    accordion: DEFAULT_TABLE_GROUP_ACCORDION_1,
    rows: [
        DEFAULT_TABLE_ROW_1,
        DEFAULT_TABLE_ROW_2,
        DEFAULT_TABLE_ROW_3
    ]
};

export const DEFAULT_TABLE_ROWS_GROUP_4: MTableRowsGroup = {
    name: 'group4',
    header: DEFAULT_TABLE_GROUP_HEADER_4,
    accordion: DEFAULT_TABLE_GROUP_ACCORDION_2,
    rows: [
        DEFAULT_TABLE_ROW_1,
        DEFAULT_TABLE_ROW_2,
        DEFAULT_TABLE_ROW_3
    ]
};

export const DEFAULT_TABLE_ROWS_GROUP_5: MTableRowsGroup = {
    name: 'group5',
    header: DEFAULT_TABLE_GROUP_HEADER_5,
    rows: [
        DEFAULT_TABLE_ROW_1,
        DEFAULT_TABLE_ROW_2
    ]
};

export const DEFAULT_TABLE_ROWS_GROUP_6: MTableRowsGroup = {
    name: 'group6',
    rows: [
        DEFAULT_TABLE_ROW_1,
        DEFAULT_TABLE_ROW_2,
        DEFAULT_TABLE_ROW_2
    ]
};

export const DEFAULT_TABLE_ROWS: MTableRow[] = [
    DEFAULT_TABLE_ROW_1,
    DEFAULT_TABLE_ROW_2,
    DEFAULT_TABLE_ROW_3
];

export const DEFAULT_TABLE_ROW_GROUPS: MTableRowsGroup[] = [
    DEFAULT_TABLE_ROWS_GROUP_1,
    DEFAULT_TABLE_ROWS_GROUP_2
];

export const DEFAULT_TABLE_ROW_GROUPS_2: MTableRowsGroup[] = [
    DEFAULT_TABLE_ROWS_GROUP_2,
    DEFAULT_TABLE_ROWS_GROUP_3,
    DEFAULT_TABLE_ROWS_GROUP_4,
    DEFAULT_TABLE_ROWS_GROUP_5,
    DEFAULT_TABLE_ROWS_GROUP_6
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
        colspan: 4,
        textAlign: MTableTextAlign.Center
    },
    {
        name: 'forlderAColumn',
        value: 'Folder A',
        order: 2,
        colspan: 4,
        textAlign: MTableTextAlign.Center
    }
];

export const COMPLEX_TABLE_AFTER_BEFORE_COLUMNS: MTableColumn[] = [
    {
        name: 'beforeForlderAColumn',
        value: 'Before',
        colspan: 2,
        textAlign: MTableTextAlign.Center
    },
    {
        name: 'afterForlderAColumn',
        value: 'After',
        colspan: 2,
        textAlign: MTableTextAlign.Center
    },
    {
        name: 'beforeForlderBColumn',
        value: 'Before',
        colspan: 2,
        textAlign: MTableTextAlign.Center
    },
    {
        name: 'afterForlderBColumn',
        value: 'After',
        colspan: 2,
        textAlign: MTableTextAlign.Center
    }
];

export const COMPLEX_TABLE_ID_COLUMN: string = 'userNaimeBeforeFolderA';
export const COMPLEX_TABLE_USER_NAME_BEFORE_FOLDER_A_COLUMN_NAME: string = 'userNameBeforeFolderA';
export const COMPLEX_TABLE_NAME_BEFORE_FOLDER_A_COLUMN_NAME: string = 'userBeforeFolderA';
export const COMPLEX_TABLE_USER_NAME_AFTER_FOLDER_A_COLUMN_NAME: string = 'userNameAfterFolderA';
export const COMPLEX_TABLE_NAME_AFTER_FOLDER_A_COLUMN_NAME: string = 'userAfterFolderA';
export const COMPLEX_TABLE_USER_NAME_BEFORE_FOLDER_B_COLUMN_NAME: string = 'userNameBeforeFolderB';
export const COMPLEX_TABLE_NAME_BEFORE_FOLDER_B_COLUMN_NAME: string = 'userBeforeFolderB';
export const COMPLEX_TABLE_USER_NAME_AFTER_FOLDER_B_COLUMN_NAME: string = 'userNameAfterFolderB';
export const COMPLEX_TABLE_NAME_AFTER_FOLDER_B_COLUMN_NAME: string = 'userAfterFolderB';


export const COMPLEX_TABLE_MAIN_COLUMNS: MTableColumn[] = [
    {
        name: COMPLEX_TABLE_ID_COLUMN,
        value: 'Id',
        width: '120px',
        textAlign: MTableTextAlign.Center
    },
    getTableColumn(COMPLEX_TABLE_USER_NAME_BEFORE_FOLDER_A_COLUMN_NAME, 'User Name'),
    getTableColumn(COMPLEX_TABLE_NAME_BEFORE_FOLDER_A_COLUMN_NAME, 'Name'),
    getTableColumn(COMPLEX_TABLE_USER_NAME_AFTER_FOLDER_A_COLUMN_NAME, 'User Name'),
    getTableColumn(COMPLEX_TABLE_NAME_AFTER_FOLDER_A_COLUMN_NAME, 'Name'),
    getTableColumn(COMPLEX_TABLE_USER_NAME_BEFORE_FOLDER_B_COLUMN_NAME, 'User Name'),
    getTableColumn(COMPLEX_TABLE_NAME_BEFORE_FOLDER_B_COLUMN_NAME, 'Name'),
    getTableColumn(COMPLEX_TABLE_USER_NAME_AFTER_FOLDER_B_COLUMN_NAME, 'User Name'),
    getTableColumn(COMPLEX_TABLE_NAME_AFTER_FOLDER_B_COLUMN_NAME, 'Name')
];

export const getComplexTableRow = (
    id: string,
    userNameBeforeFolderA: string,
    nameBeforeFolderA: string,
    userNameAfterFolderA: string,
    nameAfterFolderA: string,
    userNameBeforeFolderB: string,
    nameBeforeFolderB: string,
    userNameAfterFolderB: string,
    nameAfterFolderB: string
) => {
    return {
        [COMPLEX_TABLE_ID_COLUMN]: {
            value: id,
            isHeader: true
        },
        [COMPLEX_TABLE_USER_NAME_BEFORE_FOLDER_A_COLUMN_NAME]: {
            value: userNameBeforeFolderA
        },
        [COMPLEX_TABLE_NAME_BEFORE_FOLDER_A_COLUMN_NAME]: {
            value: nameBeforeFolderA
        },
        [COMPLEX_TABLE_USER_NAME_AFTER_FOLDER_A_COLUMN_NAME]: {
            value: userNameAfterFolderA
        },
        [COMPLEX_TABLE_NAME_AFTER_FOLDER_A_COLUMN_NAME]: {
            value: nameAfterFolderA
        },
        [COMPLEX_TABLE_USER_NAME_BEFORE_FOLDER_B_COLUMN_NAME]: {
            value: userNameBeforeFolderB
        },
        [COMPLEX_TABLE_NAME_BEFORE_FOLDER_B_COLUMN_NAME]: {
            value: nameBeforeFolderB
        },
        [COMPLEX_TABLE_USER_NAME_AFTER_FOLDER_B_COLUMN_NAME]: {
            value: userNameAfterFolderB

        },
        [COMPLEX_TABLE_NAME_AFTER_FOLDER_B_COLUMN_NAME]: {
            value: nameAfterFolderB
        }
    };
};

export const COMPLEX_TABLE_ROWS: MTableRow[] = [
    {
        cells: getComplexTableRow('01', 'simon-test', 'Simons', 'simon.ca', 'Simon', 'test.simon', 'Simone', 'simon-com', 'Simon')
    },
    {
        cells: getComplexTableRow('02', '20-100', 'Vincen', '_vincent', 'Vincent', 'test.vincent', 'VINcent', 'vincent_g', 'Vincent')
    },
    {
        cells: getComplexTableRow('03', 'maxime-ber', 'maxime', 'maxim.ca', 'Maxim', 'max.max', 'MAXime', 'maxim.ber', 'Maxime')
    },
    {
        cells: getComplexTableRow('04', 'frankD', 'Frank', 'frank.ca', 'Francois', 'JF', 'Jean', 'JFrancois', 'Francois')
    },
    {
        cells: getComplexTableRow('05', 'Will.B', 'Will', 'simon.ca', 'William', 'b.will', 'willy', 'william.b', 'William')
    },
    {
        cells: getComplexTableRow('06', 'johny_02', 'john', 'john-02', 'John', '02.jo', 'John', 'jo.02', 'John')
    }
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
        defaultSortDirection: MTableSortDirection.None
    },
    {
        name: 'id',
        value: 'Id',
        sortable: true,
        textAlign: MTableTextAlign.Left,
        className: 'add-class-id',
        sortDirection: MTableSortDirection.None,
        defaultSortDirection: MTableSortDirection.None
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
        defaultSortDirection: MTableSortDirection.None
    },
    {
        name: 'date',
        value: 'Date',
        sortable: true,
        enableUnsort: false,
        textAlign: MTableTextAlign.Right,
        sortDirection: MTableSortDirection.None,
        defaultSortDirection: MTableSortDirection.None
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
            id: {
                value: 'id'
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
                id: {
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
                id: {
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
            id: {
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
                id: {
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
                id: {
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
                id: {
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
                id: {
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
            id: {
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
            id: {
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
