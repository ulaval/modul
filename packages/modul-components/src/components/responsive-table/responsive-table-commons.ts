import { MEmptyAreaBackgroundStyle, MEmptyAreaButtonType, MEmptyAreaDisplayMode } from '../empty-area/empty-area';

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
    spacingTop?: string;
    spacingClassName?: string;
}

export interface MTableHeader {
    title?: string;
    className?: string;
    style?: MTableStyle;
    cells?: MTableCells;
    data?: any;
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
    value: string;
    data?: any;
    isHeader?: boolean;
    colspan?: number | MTableColspan;
    rowspan?: number;
    className?: string;
    textAlign?: MTableTextAlign;
}

export interface MTableEmptyArea {
    title?: string;
    subtitle?: string;
    svgName?: string;
    svgSize?: string;
    buttonText?: string;
    buttonType?: MEmptyAreaButtonType;
    backgroundStyle?: MEmptyAreaBackgroundStyle;
    displayMode?: MEmptyAreaDisplayMode;
    minHeight?: string;
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
    Borders = 'borders',
    CellBorders = 'cell-borders'
}

export enum MTableGroupHeaderStyle {
    Dark = 'dark',
    Light = 'light',
    Any = 'any'
}

export const getCellAlignmentClass: (textAlign?: MTableTextAlign) => string = (
    textAlign: MTableTextAlign
) => {
    return textAlign ? `m--is-text-align-${textAlign}` : 'm--is-text-align-left';
};

export const getCellWidthStyle: (column: MTableColumn) => string | undefined = (
    column: MTableColumn
) => {
    const width: string | undefined = column.width || undefined;
    return width ? `width: ${width}` : undefined;
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
            : 0
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
        .sort((a: MTableColumn, b: MTableColumn) => {
            if (a.order && b.order) {
                return a.order - b.order;
            }
            return 0;
        });
};
