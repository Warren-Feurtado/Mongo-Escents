

export interface OrderModel {

    _id: String;
    orderId: string;
    customerName: String;
    orderTotal: number;
    cartItems: Array<any>;
    dateCreated: Date;

}