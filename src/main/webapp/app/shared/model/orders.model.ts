export const enum OrderStatus {
  CREATED = 'CREATED',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED'
}

export interface IOrders {
  id?: number;
  status?: OrderStatus;
  total?: number;
  employeeId?: number;
}

export class Orders implements IOrders {
  constructor(public id?: number, public status?: OrderStatus, public total?: number, public employeeId?: number) {}
}
