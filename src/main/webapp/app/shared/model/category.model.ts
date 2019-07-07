import { IProduct } from 'app/shared/model/product.model';

export interface ICategory {
  id?: number;
  categoryDescription?: string;
  categoryName?: string;
  products?: IProduct[];
}

export class Category implements ICategory {
  constructor(public id?: number, public categoryDescription?: string, public categoryName?: string, public products?: IProduct[]) {}
}
