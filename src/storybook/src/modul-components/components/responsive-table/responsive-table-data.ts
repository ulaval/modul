import { MTableGroup, MTableGroupAccordionIconPosition, MTableRow } from '@ulaval/modul-components/dist/components/responsive-table/responsive-table-commons';
import { MColumnSortDirection, MColumnTable, MColumnTextAlign } from '@ulaval/modul-components/dist/components/table/table';

export const COLUMNS: MColumnTable[] = [
    {
        id: '001',
        title: 'Name',
        dataProp: 'name',
        sortable: true,
        width: '300px',
        textAlign: MColumnTextAlign.Left,
        sortDirection: MColumnSortDirection.None,
        defaultSortDirection: MColumnSortDirection.None
    },
    {
        id: '002',
        title: 'NI',
        dataProp: 'ni',
        sortable: true,
        textAlign: MColumnTextAlign.Left,
        class: 'add-class-ni',
        sortDirection: MColumnSortDirection.None,
        defaultSortDirection: MColumnSortDirection.None
    },
    {
        id: '003',
        title: 'NRC',
        dataProp: 'nrc',
        sortable: true,
        enableUnsort: false,
        textAlign: MColumnTextAlign.Center,
        sortDirection: MColumnSortDirection.None,
        defaultSortDirection: MColumnSortDirection.None
    },
    {
        id: '004',
        title: 'Program',
        dataProp: 'program',
        sortable: true,
        enableUnsort: false,
        textAlign: MColumnTextAlign.Left,
        class: 'add-class-program',
        sortDirection: MColumnSortDirection.None,
        defaultSortDirection: MColumnSortDirection.None
    },
    {
        id: '005',
        title: 'Date',
        dataProp: 'date',
        sortable: true,
        enableUnsort: false,
        textAlign: MColumnTextAlign.Right,
        sortDirection: MColumnSortDirection.None,
        defaultSortDirection: MColumnSortDirection.None
    }
];

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
