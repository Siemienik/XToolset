import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Invoice } from './invoiceConfig';
import { InvoiceComponent } from './invoice.component';
import { TableComponent } from '../table/table.component';

describe('InvoiceComponent', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestHostComponent, InvoiceComponent, TableComponent],
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
    template: `<app-invoice [invoice]="invoice"></app-invoice>`,
})
class TestHostComponent {
    @ViewChild(InvoiceComponent)
    invoice: Invoice = {
        seller: {
            name: '',
            taxIdNumber: '',
            accountNo: '',
            address: '',
        },
        items: [],
        buyer: {
            address: '',
            taxIdNumber: '',
            name: '',
        },
        date: new Date(),
        dueDate: new Date(),
        total: 0,
    };
}
