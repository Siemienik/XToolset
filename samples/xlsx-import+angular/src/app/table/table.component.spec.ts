import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Table, TableComponent } from './table.component';

describe('TableComponent', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent, TableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        hostComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(hostComponent).toBeTruthy();
    });
});

@Component({
    selector: 'app-host-component',
    template: `<app-table [headers]="table.headers" [rows]="table.rows"></app-table>`,
})
class TestHostComponent {
    @ViewChild(TableComponent)
    public table: Table = {
        headers: ['title'],
        rows: [
            {
                items: [{ content: 'item' }],
            },
        ],
    };
}
