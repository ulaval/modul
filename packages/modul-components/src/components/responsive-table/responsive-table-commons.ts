import { MColumnTable } from '../table/table';

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
    [dataProp: string]: MTableCell;
}

export interface MTableCell {
    value: any;
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

export enum MTableHeadSkin {
    DarkBackground = 'dark-background',
    LightBackground = 'light-background',
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

export const getCellAlignmentClass: (column: MColumnTable) => string = (
    column: MColumnTable
) => {
    return `m--is-text-align-${column.textAlign}`;
};

export const getCellWidthStyle: (column: MColumnTable) => string = (
    column: MColumnTable
) => {
    const width: string | undefined = column.width;
    return width ? `width: ${width}` : '';
};
