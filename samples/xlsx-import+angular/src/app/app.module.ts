import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
import { XlsxImportLogoComponent } from './xlsx-import-logo/xlsx-import-logo.component';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
    declarations: [AppComponent, TableComponent, XlsxImportLogoComponent, InvoiceComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
