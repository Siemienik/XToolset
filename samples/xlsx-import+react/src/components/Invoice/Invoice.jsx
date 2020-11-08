import React from 'react';
import { Table, TBody, TBodyItem, TBodyRow, THead, THeadItem } from '../Table';

export default function Invoice(props) {
    const { invoice } = props;
    return (
        <div className="tl mt4 mb4">
            <div className="fw6">Buyer</div>
            <Table>
                <THead>
                    <THeadItem>Name</THeadItem>
                    <THeadItem>Tax ID</THeadItem>
                    <THeadItem>Address</THeadItem>
                </THead>
                <TBody>
                    <TBodyRow>
                        <TBodyItem dataQaName="buyer-name">{invoice.buyer.name}</TBodyItem>
                        <TBodyItem dataQaName="buyer-tax-id">{invoice.buyer.taxIdNumber}</TBodyItem>
                        <TBodyItem dataQaName="buyer-address">{invoice.buyer.address}</TBodyItem>
                    </TBodyRow>
                </TBody>
            </Table>

            <div className="fw6">Invoices</div>
            <Table>
                <THead>
                    <THeadItem>Title</THeadItem>
                    <THeadItem>Price</THeadItem>
                    <THeadItem>Qty</THeadItem>
                    <THeadItem>Unit Price</THeadItem>
                </THead>
                <TBody>
                    {invoice.items.map((item, idx) => (
                        <TBodyRow key={item.item} dataQaName={`invoice-${idx}`}>
                            <TBodyItem dataQaName="invoice-item">{item.item}</TBodyItem>
                            <TBodyItem dataQaName="invoice-price">{item.price}</TBodyItem>
                            <TBodyItem dataQaName="invoice-quantity">{item.quantity}</TBodyItem>
                            <TBodyItem dataQaName="invoice-unit-price">{item.unitPrice}</TBodyItem>
                        </TBodyRow>
                    ))}
                </TBody>
            </Table>

            <div className="fw6">Seller</div>
            <Table>
                <THead>
                    <THeadItem>Name</THeadItem>
                    <THeadItem>Tax ID</THeadItem>
                    <THeadItem>Address</THeadItem>
                    <THeadItem>Account Number</THeadItem>
                </THead>
                <TBody>
                    <TBodyRow>
                        <TBodyItem dataQaName="seller-name">{invoice.seller.name}</TBodyItem>
                        <TBodyItem dataQaName="seller-tax-id">{invoice.seller.taxIdNumber}</TBodyItem>
                        <TBodyItem dataQaName="seller-address">{invoice.seller.address}</TBodyItem>
                        <TBodyItem dataQaName="seller-account">{invoice.seller.accountNo}</TBodyItem>
                    </TBodyRow>
                </TBody>
            </Table>

            <div className="fw6" data-qa-name="date">
                Date: {invoice.date.toISOString()}
            </div>
            <div className="fw6 mt2" data-qa-name="due-date">
                Due date: {invoice.dueDate.toISOString()}
            </div>
            <div className="fw6 mt2" data-qa-name="total">
                Total: {invoice.total}
            </div>
        </div>
    );
}
