import { IProduct } from 'app/shared/model/product.model';

export interface ISupplier {
  id?: number;
  supplierName?: string;
  locationId?: number;
  products?: IProduct[];
}

export class Supplier implements ISupplier {
  constructor(public id?: number, public supplierName?: string, public locationId?: number, public products?: IProduct[]) {}
}
