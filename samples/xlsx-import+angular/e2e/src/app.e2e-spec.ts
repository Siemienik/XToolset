import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';

describe('workspace-project App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display invoice', async () => {
        await page.navigateTo();
        await page.downloadInvoice();
        const invoice = page.getInvoice();
        const buyer = {
            name: await element(by.css('[data-qa-name="buyer-name"]')).getText(),
            taxIdNumber: await element(by.css('[data-qa-name="buyer-tax-id"]')).getText(),
            address: await element(by.css('[data-qa-name="buyer-address"]')).getText(),
        };
        expect(buyer.name === invoice.buyer.name);
        expect(buyer.taxIdNumber === invoice.buyer.taxIdNumber);
        expect(buyer.address === invoice.buyer.address);
        await invoice.items.map((inv, idx) => {
            const parent = `[data-qa-name="invoice-${idx}"]`;
            const itemPromise = element(by.css(`${parent} [data-qa-name="invoice-item"]`)).getText();
            const pricePromise = element(by.css(`${parent} [data-qa-name="invoice-price"]`)).getText();
            const qtyPromise = element(by.css(`${parent} [data-qa-name="invoice-quantity"]`)).getText();
            const unitPricePromise = element(by.css(`${parent} [data-qa-name="invoice-unit-price"]`)).getText();
            return Promise.all([itemPromise, pricePromise, qtyPromise, unitPricePromise]).then(
                ([item, price, qty, unitPrice]) => {
                    expect(item === inv.item);
                    expect(Number(price) === inv.price);
                    expect(Number(qty) === inv.quantity);
                    expect(Number(unitPrice) === inv.unitPrice);
                },
            );
        });
        const seller = {
            name: await element(by.css('[data-qa-name="seller-name"]')).getText(),
            taxIdNumber: await element(by.css('[data-qa-name="seller-tax-id"]')).getText(),
            address: await element(by.css('[data-qa-name="seller-address"]')).getText(),
            accountNo: await element(by.css('[data-qa-name="seller-account"]')).getText(),
        };
        expect(seller.name === invoice.seller.name);
        expect(seller.taxIdNumber === invoice.seller.taxIdNumber);
        expect(seller.address === invoice.seller.address);
        expect(seller.accountNo === invoice.seller.accountNo);
        const date = await element(by.css('[data-qa-name="date"]')).getText();
        const dueDate = await element(by.css('[data-qa-name="due-date"]')).getText();
        const total = await element(by.css('[data-qa-name="total"]')).getText();
        expect(date === invoice.date);
        expect(dueDate === invoice.dueDate);
        expect(Number(total) === invoice.total);
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(
            jasmine.objectContaining({
                level: logging.Level.SEVERE,
            } as logging.Entry),
        );
    });
});
