const invoice = {
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

describe('The App', () => {
    it('successfully loads', () => {
        cy.visit('/');
    });

    it('renders parsed invoice file', () => {
        cy.visit('/');
        cy.get('button')
            .click()
            .should('be.disabled');
        cy.get('[data-qa-name="buyer-name"]').contains(invoice.buyer.name);
        cy.get('[data-qa-name="buyer-tax-id"]').contains(invoice.buyer.taxIdNumber);
        cy.get('[data-qa-name="buyer-address"]').contains(invoice.buyer.address);
        invoice.items.forEach((inv, idx) => {
            const parent = cy.get(`[data-qa-name="invoice-${idx}"]`);
            parent.get('[data-qa-name="invoice-item"]').contains(inv.item);
            parent.get('[data-qa-name="invoice-price"]').contains(inv.price);
            parent.get('[data-qa-name="invoice-quantity"]').contains(inv.quantity);
            parent.get('[data-qa-name="invoice-unit-price"]').contains(inv.unitPrice);
        });
        cy.get('[data-qa-name="seller-name"]').contains(invoice.seller.name);
        cy.get('[data-qa-name="seller-tax-id"]').contains(invoice.seller.taxIdNumber);
        cy.get('[data-qa-name="seller-address"]').contains(invoice.seller.address);
        cy.get('[data-qa-name="seller-account"]').contains(invoice.seller.accountNo);
        cy.get('[data-qa-name="date"]').contains(invoice.date);
        cy.get('[data-qa-name="due-date"]').contains(invoice.dueDate);
        cy.get('[data-qa-name="total"]').contains(invoice.total);
    });
});
