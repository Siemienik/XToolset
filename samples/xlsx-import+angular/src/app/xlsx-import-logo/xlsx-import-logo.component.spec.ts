import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XlsxImportLogoComponent } from './xlsx-import-logo.component';

describe('XlsxImportLogoComponent', () => {
    let component: XlsxImportLogoComponent;
    let fixture: ComponentFixture<XlsxImportLogoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [XlsxImportLogoComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(XlsxImportLogoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
