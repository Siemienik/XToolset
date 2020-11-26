import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { TableComponent } from './table/table.component';
import { XlsxImportLogoComponent } from './xlsx-import-logo/xlsx-import-logo.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent, TableComponent, XlsxImportLogoComponent, InvoiceComponent],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        app.invoice = {
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
        fixture.detectChanges();
        expect(app).toBeTruthy();
    });
});
