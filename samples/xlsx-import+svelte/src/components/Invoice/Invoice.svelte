<script lang="ts">
    import Table from '../Table/Table.svelte';
    import type { InvoiceProp } from './types';

    export let invoice: InvoiceProp;
    const buyers = {
        headers: ['Name', 'Tax ID', 'Address'],
        rows: [
            {
                name: {
                    dataQaName: 'buyer-name',
                    content: invoice.buyer.name,
                },
                taxIdNumber: {
                    dataQaName: 'buyer-tax-id',
                    content: invoice.buyer.taxIdNumber,
                },
                address: {
                    dataQaName: 'buyer-address',
                    content: invoice.buyer.address,
                },
            },
        ],
    };
    const items = {
        headers: ['Title', 'Price', 'Qty', 'Unit Price'],
        rows: invoice.items.map((item) => ({
            item: {
                dataQaName: 'invoice-item',
                content: item.item,
            },
            price: {
                dataQaName: 'invoice-price',
                content: item.price,
            },
            qty: {
                dataQaName: 'invoice-quantity',
                content: item.quantity,
            },
            unitPrice: {
                dataQaName: 'invoice-unit-price',
                content: item.unitPrice,
            },
        })),
    };
    const seller = {
        headers: ['Name', 'Tax ID', 'Address', 'Account Number'],
        rows: [
            {
                name: {
                    dataQaName: 'seller-name',
                    content: invoice.seller.name,
                },
                taxIdNumber: {
                    dataQaName: 'seller-tax-id',
                    content: invoice.seller.taxIdNumber,
                },
                address: {
                    dataQaName: 'seller-address',
                    content: invoice.seller.address,
                },
                accountNo: {
                    dataQaName: 'seller-account',
                    content: invoice.seller.accountNo,
                },
            },
        ],
    };
</script>

<div class="tl mt4 mb4">
    <div class="fw6">Buyer</div>
    <Table>
        <thead slot="thead" let:headerClassName>
            {#each buyers.headers as head}
                <th class={headerClassName}>{head}</th>
            {/each}
        </thead>
        <tbody slot="tbody" let:bodyClassName>
            {#each buyers.rows as { name, taxIdNumber, address }}
                <tr>
                    <td data-qa-name={name.dataQaName} class={bodyClassName}>
                        {name.content}
                    </td>
                    <td data-qa-name={taxIdNumber.dataQaName} class={bodyClassName}>
                        {taxIdNumber.content}
                    </td>
                    <td data-qa-name={address.dataQaName} class={bodyClassName}>
                        {address.content}
                    </td>
                </tr>
            {/each}
        </tbody>
    </Table>

    <div class="fw6">Invoices</div>
    <Table>
        <thead slot="thead" let:headerClassName>
            {#each items.headers as head}
                <th class={headerClassName}>{head}</th>
            {/each}
        </thead>
        <tbody slot="tbody" let:bodyClassName>
            {#each items.rows as { item, price, qty, unitPrice }, idx}
                <tr data-qa-name={`invoice-${idx}`}>
                    <td data-qa-name={item.dataQaName} class={bodyClassName}>
                        {item.content}
                    </td>
                    <td data-qa-name={price.dataQaName} class={bodyClassName}>
                        {price.content}
                    </td>
                    <td data-qa-name={qty.dataQaName} class={bodyClassName}>
                        {qty.content}
                    </td>
                    <td data-qa-name={unitPrice.dataQaName} class={bodyClassName}>
                        {unitPrice.content}
                    </td>
                </tr>
            {/each}
        </tbody>
    </Table>

    <div class="fw6">Seller</div>
    <Table>
        <thead slot="thead" let:headerClassName>
            {#each seller.headers as head}
                <th class={headerClassName}>{head}</th>
            {/each}
        </thead>
        <tbody slot="tbody" let:bodyClassName>
            {#each seller.rows as { name, taxIdNumber, address, accountNo }}
                <tr>
                    <td data-qa-name={name.dataQaName} class={bodyClassName}>
                        {name.content}
                    </td>
                    <td data-qa-name={taxIdNumber.dataQaName} class={bodyClassName}>
                        {taxIdNumber.content}
                    </td>
                    <td data-qa-name={address.dataQaName} class={bodyClassName}>
                        {address.content}
                    </td>
                    <td data-qa-name={accountNo.dataQaName} class={bodyClassName}>
                        {accountNo.content}
                    </td>
                </tr>
            {/each}
        </tbody>
    </Table>

    <div class="fw6" data-qa-name="date">
        Date: {invoice.date.toISOString()}
    </div>
    <div class="fw6 mt2" data-qa-name="due-date">Due date: {invoice.dueDate.toISOString()}</div>
    <div class="fw6 mt2" data-qa-name="total">Total: {invoice.total}</div>
</div>
