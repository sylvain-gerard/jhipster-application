export interface IOrderItem {
  id?: number;
  quantity?: number;
  totalPrice?: number;
  productId?: number;
  orderId?: number;
}

export class OrderItem implements IOrderItem {
  constructor(
    public id?: number,
    public quantity?: number,
    public totalPrice?: number,
    public productId?: number,
    public orderId?: number
  ) {}
}
