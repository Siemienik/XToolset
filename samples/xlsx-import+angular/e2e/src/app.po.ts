import { browser, by, element } from 'protractor';
import { Invoice } from '../../src/app/invoice/invoiceConfig';

type Modify<T, R> = Omit<T, keyof R> & R;

interface InvoiceTest
    extends Modify<
        Invoice,
        {
            date: string;
            dueDate: string;
        }
    > {}

export class AppPage {
    async navigateTo(): Promise<unknown> {
        return browser.get(browser.baseUrl);
    }

    async downloadInvoice(): Promise<void> {
        return element(by.css('button[type="button"]')).click();
    }

    getInvoice(): InvoiceTest {
        return {
            buyer: {
                name: 'Bigos INC.',
                taxIdNumber: '987654321',
                address: 'ul. Agiede 2020, MiastoNaK',
            },
            date: '2020-10-08T00:00:00.000Z',
            dueDate: '2020-10-29T00:00:00.000Z',
            items: [
                {
                    item: 'Mleczko do prania',
                    unitPrice: 16.45,
                    quantity: 2,
                    price: 32.9,
                },
                {
                    item: 'Płyn do płukania',
                    unitPrice: 14.55,
                    quantity: 1,
                    price: 14.55,
                },
                {
                    item: 'Pokarm dla smoka',
                    unitPrice: 79.99,
                    quantity: 10,
                    price: 799.9,
                },
                {
                    item: 'Instrukcja jak latać na smoku',
                    unitPrice: 19.89,
                    quantity: 1,
                    price: 19.89,
                },
            ],
            seller: {
                name: 'Krupnik LTD.',
                taxIdNumber: '123456789',
                address: 'ul. Usbewifi 5/G, MiastoNaK',
                accountNo: 'PL 12 1234 1234 1234 1234 1234 1234',
            },
            total: 867.24,
        };
    }
}
