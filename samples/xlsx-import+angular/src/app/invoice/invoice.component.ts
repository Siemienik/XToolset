import { Component, Input, OnInit } from '@angular/core';
import { Invoice } from './invoiceConfig';
import { Table } from '../table/table.component';

@Component({
    selector: 'app-invoice[invoice]',
    templateUrl: './invoice.component.html',
})
export class InvoiceComponent implements OnInit {
    @Input() invoice: Invoice;
    buyers: Table;
    items: Table;
    seller: Table;

    ngOnInit(): void {
        if (!this.invoice) {
            throw new TypeError('Invoice is required');
        }
        this.buyers = {
            headers: ['Name', 'Tax ID', 'Address'],
            rows: [
                {
                    items: [
                        {
                            dataQaName: 'buyer-name',
                            content: this.invoice.buyer.name,
                        },
                        {
                            dataQaName: 'buyer-tax-id',
                            content: this.invoice.buyer.taxIdNumber,
                        },
                        {
                            dataQaName: 'buyer-address',
                            content: this.invoice.buyer.address,
                        },
                    ],
                },
            ],
        };
        this.items = {
            headers: ['Title', 'Price', 'Qty', 'Unit Price'],
            rows: this.invoice.items.map((item, idx) => ({
                dataQaName: `invoice-${idx}`,
                items: [
                    {
                        dataQaName: 'invoice-item',
                        content: item.item,
                    },
                    {
                        dataQaName: 'invoice-price',
                        content: item.price,
                    },
                    {
                        dataQaName: 'invoice-quantity',
                        content: item.quantity,
                    },
                    {
                        dataQaName: 'invoice-unit-price',
                        content: item.unitPrice,
                    },
                ],
            })),
        };
        this.seller = {
            headers: ['Name', 'Tax ID', 'Address', 'Account Number'],
            rows: [
                {
                    items: [
                        {
                            dataQaName: 'seller-name',
                            content: this.invoice.seller.name,
                        },
                        {
                            dataQaName: 'seller-tax-id',
                            content: this.invoice.seller.taxIdNumber,
                        },
                        {
                            dataQaName: 'seller-address',
                            content: this.invoice.seller.address,
                        },
                        {
                            dataQaName: 'seller-account',
                            content: this.invoice.seller.accountNo,
                        },
                    ],
                },
            ],
        };
    }
}
