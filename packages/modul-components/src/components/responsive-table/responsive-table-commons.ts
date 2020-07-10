
export enum MTableSortDirection {
    None = 0,
    Asc = 1,
    Dsc = -1
}

export enum MTableTextAlign {
    Center = 'center',
    Left = 'left',
    Right = 'right'
}

export interface MTableStyle {
    [CSSProperty: string]: string;
}

export interface MTableColumn {
    name: string;
    value: string;
    data?: any;
    colspan?: number | MTableColspan;
    rowspan?: number;
    visible?: boolean;
    order?: number;
    sortable?: boolean;
    enableUnsort?: boolean;
    sortDirection?: MTableSortDirection;
    defaultSortDirection?: MTableSortDirection;
    width?: string;
    className?: string;
    style?: MTableStyle;
    textAlign?: MTableTextAlign;
}

export interface MTableHeadRow {
    order?: number;
    className?: string;
    columns: MTableColumn[];
    mainColumns?: boolean;
}

export interface MTableHeadRows {
    [row: string]: MTableHeadRow;
}

export interface MTableRowsGroup {
    name: string;
    header?: MTableHeader;
    accordion?: MTableAccordion;
    rows?: MTableRow[];
    emptyArea?: MTableEmptyArea;
}

export interface MTableHeader {
    title?: string;
    className?: string;
    style?: MTableStyle;
    cells?: MTableCells;
}

export interface MTableAccordion {
    open: boolean;
    disabled?: boolean;
    displayIcon?: boolean;
    iconPosition?: MTableAccordionIconPosition;
    iconClassName?: string;
}

export interface MTableRow {
    cells: MTableCells;
    className?: string;
    style?: MTableStyle;
}

export interface MTableCells {
    [columnName: string]: MTableCell;
}

export interface MTableCell {
    value: any;
    isHeader?: boolean;
    className?: string;
    colspan?: number | MTableColspan;
    rowspan?: number;
    data?: any;
}

export interface MTableEmptyArea {
    headerText?: string;
    text?: string;
    svgName?: string;
}

export enum MTableColspan {
    AllColumns = 'all-columns'
}

export enum MTableAccordionIconPosition {
    Left = 'left',
    Right = 'right'
}

export enum MTableHeadStyle {
    Dark = 'dark',
    Light = 'light',
    Lightest = 'lightest',
    Any = 'any'
}

export enum MTableRowsStyle {
    AlternateBackground = 'alternate-background',
    RowBorders = 'borders',
    CellBorders = 'cell-borders'
}

export enum MTableHeaderStyle {
    Dark = 'dark',
    Light = 'light',
    Any = 'any'
}

export const getCellAlignmentClass: (column: MTableColumn) => string = (
    column: MTableColumn
) => {
    return `m--is-text-align-${column.textAlign}`;
};

export const getCellWidthStyle: (column: MTableColumn) => string = (
    column: MTableColumn
) => {
    const width: string | undefined = column.width;
    return width ? `width: ${width}` : '';
};

export const getHeadRowsFilterAndSort: (headRows: MTableHeadRows) => MTableHeadRows = (
    headRows: MTableHeadRows
) => {
    const headRowsClone: MTableHeadRows = Object.assign({}, headRows);
    const headRowKeys: string[] = Object.keys(headRowsClone).sort((a, b) =>
        headRowsClone
        && headRowsClone[a]
        && headRowsClone[b]
        && headRowsClone[a].order
        && headRowsClone[b].order
        ? headRowsClone[a].order! - headRowsClone[b].order!
        : 1
    );
    headRows = {};
    headRowKeys.forEach(key => {
        headRows[key] = headRowsClone[key];

        if (headRows[key].columns) {
            headRows[key].columns = getColumnFilterAndSorted(headRows[key].columns);
        }
    });
    return headRows;
};

export const getTotalColumnsLength: (columns: MTableColumn[]) => number = (
    columns: MTableColumn[]
) => {
    return columns.reduce(
        (
            acc,
            curr
        ) => curr.colspan
            && curr.colspan > 0
            && curr.colspan !== MTableColspan.AllColumns
                ? acc + curr.colspan
                : acc + 1
        , 0);
};

const getColumnFilterAndSorted: (columns: MTableColumn[]) => MTableColumn[] = (
    columns: MTableColumn[]
) => {
    return columns
        .filter((c: MTableColumn) => c.visible === undefined || c.visible)
        .sort((a, b) => {
            if (a.order && b.order) {
                return a.order - b.order;
            }
            return 1;
        });
};
