
export enum MTableColumnSortDirection {
    None = 0,
    Asc = 1,
    Dsc = -1
}

export enum MTableTextAlign {
    Center = 'center',
    Left = 'left',
    Right = 'right'
}

export interface MTableColumn {
    id: string;
    class?: string;
    value: string;
    colspan?: number | MTableColspan;
    rowspan?: number;
    data?: any;
    width?: string;
    sortable?: boolean;
    enableUnsort?: boolean;
    textAlign?: MTableTextAlign;
    sortDirection?: MTableColumnSortDirection;
    defaultSortDirection?: MTableColumnSortDirection;
    visible?: boolean;
    order?: number;
}

export type MTableColumns = MTableColumn[];

export interface MTableHeadRow {
    order?: number;
    class?: string;
    columns: MTableColumns;
    mainColumns?: boolean;
}

export interface MTableHeadRows {
    [row: string]: MTableHeadRow;
}


export interface MTableGroup {
    header?: MTableGroupHeader;
    accordion?: MTableGroupAccordion;
    rows?: MTableRow[];
    emptyArea?: MTableEmptyArea;
}

export interface MTableGroupHeader {
    title?: string;
    className?: string;
    cells?: MTableCells;
    skin?: MTableGroupHeaderSkin;
}

export interface MTableGroupAccordion {
    open: boolean;
    disabled?: boolean;
    iconPosition?: MTableGroupAccordionIconPosition;
}

export interface MTableRow {
    cells: MTableCells;
    className?: string;
}

export interface MTableCells {
    [idColumn: string]: MTableCell;
}

export interface MTableCell {
    value: any;
    isHeader?: boolean;
    className?: string;
    colspan?: number | MTableColspan;
    data?: any;
}

export interface MTableEmptyArea {
    headerText?: string;
    text?: string;
    iconName?: string;
}

export enum MTableColspan {
    AllColumns = 'all-columns'
}

export enum MTableGroupAccordionIconPosition {
    Left = 'left',
    Right = 'right'
}

export enum MTableHeadStyle {
    Dark = 'dark',
    Light = 'light',
    NoBackground = 'no-background'
}

export enum MTableBodySkin {
    AlternateBackground = 'alternate-background',
    RowBorders = 'row-borders',
    CellBorders = 'cell-borders'
}

export enum MTableGroupHeaderSkin {
    Any = 'any',
    Light = 'light',
    Dark = 'dark'
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
