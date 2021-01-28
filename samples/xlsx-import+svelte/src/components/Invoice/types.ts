export interface Item {
    item: string;
    price: number;
    quantity: number;
    unitPrice: number;
}

export interface Seller {
    name: string;
    taxIdNumber: string;
    address: string;
    accountNo: string;
}

export interface Buyer {
    name: string;
    taxIdNumber: string;
    address: string;
}

export interface Dates {
    date: Date;
    dueDate: Date;
}

export interface InvoiceProp extends Dates {
    buyer: Buyer;
    items: Item[];
    seller: Seller;
    total: number;
}
