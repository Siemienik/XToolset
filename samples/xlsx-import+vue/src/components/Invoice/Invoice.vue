<template>
    <div class="tl mt4 mb4">
        <div class="fw6">Buyer</div>
        <Table :headers="buyers.headers" :rows="buyers.rows">
            <template v-slot:items="{ row, className }">
                <td :data-qa-name="row.name.dataQaName" :class="className">
                    {{ row.name.content }}
                </td>
                <td :data-qa-name="row.taxIdNumber.dataQaName" :class="className">{{ row.taxIdNumber.content }}</td>
                <td :data-qa-name="row.address.dataQaName" :class="className">
                    {{ row.address.content }}
                </td>
            </template>
        </Table>

        <div class="fw6">Invoices</div>
        <Table :headers="items.headers" :rows="items.rows" data-qa-name="invoice">
            <template v-slot:items="{ row, className }">
                <td :data-qa-name="row.item.dataQaName" :class="className">
                    {{ row.item.content }}
                </td>
                <td :data-qa-name="row.price.dataQaName" :class="className">
                    {{ row.price.content }}
                </td>
                <td :data-qa-name="row.qty.dataQaName" :class="className">
                    {{ row.qty.content }}
                </td>
                <td :data-qa-name="row.unitPrice.dataQaName" :class="className">
                    {{ row.unitPrice.content }}
                </td>
            </template>
        </Table>

        <div class="fw6">Seller</div>
        <Table :headers="seller.headers" :rows="seller.rows">
            <template v-slot:items="{ row, className }">
                <td :data-qa-name="row.name.dataQaName" :class="className">
                    {{ row.name.content }}
                </td>
                <td :data-qa-name="row.taxIdNumber.dataQaName" :class="className">
                    {{ row.taxIdNumber.content }}
                </td>
                <td :data-qa-name="row.address.dataQaName" :class="className">
                    {{ row.address.content }}
                </td>
                <td :data-qa-name="row.accountNo.dataQaName" :class="className">
                    {{ row.accountNo.content }}
                </td>
            </template>
        </Table>

        <div class="fw6" data-qa-name="date">Date: {{ invoice.date.toISOString() }}</div>
        <div class="fw6 mt2" data-qa-name="due-date">Due date: {{ invoice.dueDate.toISOString() }}</div>
        <div class="fw6 mt2" data-qa-name="total">Total: {{ invoice.total }}</div>
    </div>
</template>

<script>
import { Table } from '@/components/Table';

export default {
    name: 'Invoice',
    components: {
        Table,
    },
    props: {
        invoice: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            buyers: {
                headers: ['Name', 'Tax ID', 'Address'],
                rows: [
                    {
                        name: {
                            dataQaName: 'buyer-name',
                            content: this.invoice.buyer.name,
                        },
                        taxIdNumber: {
                            dataQaName: 'buyer-tax-id',
                            content: this.invoice.buyer.taxIdNumber,
                        },
                        address: {
                            dataQaName: 'buyer-address',
                            content: this.invoice.buyer.address,
                        },
                    },
                ],
            },
            items: {
                headers: ['Title', 'Price', 'Qty', 'Unit Price'],
                rows: this.invoice.items.map(item => ({
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
            },
            seller: {
                headers: ['Name', 'Tax ID', 'Address', 'Account Number'],
                rows: [
                    {
                        name: {
                            dataQaName: 'seller-name',
                            content: this.invoice.seller.name,
                        },
                        taxIdNumber: {
                            dataQaName: 'seller-tax-id',
                            content: this.invoice.seller.taxIdNumber,
                        },
                        address: {
                            dataQaName: 'seller-address',
                            content: this.invoice.seller.address,
                        },
                        accountNo: {
                            dataQaName: 'seller-account',
                            content: this.invoice.seller.accountNo,
                        },
                    },
                ],
            },
        };
    },
};
</script>
