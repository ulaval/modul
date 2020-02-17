import { MColumnTable } from '@ulaval/modul-components/dist/components/table/table';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import WithRender from './organize-table-columns.example.html';

@WithRender
@Component
export class MWOrganizeTableColumnsExample extends Vue {
    public columnsOriginal: MColumnTable[] = [
        { id: 'A', title: 'Colonne A', dataProp: 'A', fixed: true },
        { id: 'B', title: 'Colonne B', dataProp: 'B' },
        { id: 'C', title: 'Colonne C', dataProp: 'C' },
        { id: 'D', title: 'Colonne D', dataProp: 'D' },
        { id: 'E', title: 'Colonne E', dataProp: 'E', visible: false },
        { id: 'F', title: 'Colonne F', dataProp: 'F', visible: false }
    ];

    public rows: any[] = [
        { A: 'A1', B: 'B1', C: 'C1', D: 'D1', E: 'E1', F: 'F1' },
        { A: 'A2', B: 'B2', C: 'C2', D: 'D2', E: 'E2', F: 'F2' },
        { A: 'A3', B: 'B3', C: 'C3', D: 'D3', E: 'E3', F: 'F3' },
        { A: 'A4', B: 'B4', C: 'C4', D: 'D4', E: 'E4', F: 'F4' },
        { A: 'A5', B: 'B5', C: 'C5', D: 'D5', E: 'E5', F: 'F5' }
    ];

    public open: boolean = false;
    public organizedColumns: MColumnTable[] = [];

    public get columns(): MColumnTable[] {
        return this.organizedColumns.length > 0 ? this.organizedColumns : this.columnsOriginal;
    }

    public reorganize(columns: MColumnTable[]): void {
        this.organizedColumns = columns;
        this.open = false;
    }

    public reset(): void {
        this.open = false;
    }
}
