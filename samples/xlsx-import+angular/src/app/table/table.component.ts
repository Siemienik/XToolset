import { Component, Input, OnInit } from '@angular/core';

interface TableBodyItem {
    dataQaName?: string;
    content: any;
}

export interface TableRow {
    dataQaName?: string;
    items: TableBodyItem[];
}

export type TableHeader = string;

export interface Table {
    headers: TableHeader[];
    rows: TableRow[];
}

@Component({
    selector: 'app-table[headers][rows]',
    templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
    @Input() headers: TableHeader[];
    @Input() rows: TableRow[];

    ngOnInit(): void {
        if (!this.headers) {
            throw new Error('Headers are required');
        }
        if (!this.rows) {
            throw new Error('Rows are required');
        }
    }
}
