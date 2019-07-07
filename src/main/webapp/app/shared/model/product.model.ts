export interface IProduct {
  id?: number;
  description?: string;
  disabled?: boolean;
  model?: string;
  productcode?: string;
  productname?: string;
  productPrice?: number;
  size?: string;
  sizeDescription?: string;
  inStock?: number;
  categoryId?: number;
  supplierId?: number;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public description?: string,
    public disabled?: boolean,
    public model?: string,
    public productcode?: string,
    public productname?: string,
    public productPrice?: number,
    public size?: string,
    public sizeDescription?: string,
    public inStock?: number,
    public categoryId?: number,
    public supplierId?: number
  ) {
    this.disabled = this.disabled || false;
  }
}
