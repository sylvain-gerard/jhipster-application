import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProduct, Product } from 'app/shared/model/product.model';
import { ProductService } from './product.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category';
import { ISupplier } from 'app/shared/model/supplier.model';
import { SupplierService } from 'app/entities/supplier';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html'
})
export class ProductUpdateComponent implements OnInit {
  isSaving: boolean;

  categories: ICategory[];

  suppliers: ISupplier[];

  editForm = this.fb.group({
    id: [],
    description: [],
    disabled: [],
    model: [],
    productcode: [null, [Validators.required]],
    productname: [null, [Validators.required]],
    productPrice: [null, [Validators.required]],
    size: [],
    sizeDescription: [],
    inStock: [],
    categoryId: [],
    supplierId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected productService: ProductService,
    protected categoryService: CategoryService,
    protected supplierService: SupplierService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
    this.categoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICategory[]>) => response.body)
      )
      .subscribe((res: ICategory[]) => (this.categories = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.supplierService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISupplier[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISupplier[]>) => response.body)
      )
      .subscribe((res: ISupplier[]) => (this.suppliers = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(product: IProduct) {
    this.editForm.patchValue({
      id: product.id,
      description: product.description,
      disabled: product.disabled,
      model: product.model,
      productcode: product.productcode,
      productname: product.productname,
      productPrice: product.productPrice,
      size: product.size,
      sizeDescription: product.sizeDescription,
      inStock: product.inStock,
      categoryId: product.categoryId,
      supplierId: product.supplierId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  private createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id']).value,
      description: this.editForm.get(['description']).value,
      disabled: this.editForm.get(['disabled']).value,
      model: this.editForm.get(['model']).value,
      productcode: this.editForm.get(['productcode']).value,
      productname: this.editForm.get(['productname']).value,
      productPrice: this.editForm.get(['productPrice']).value,
      size: this.editForm.get(['size']).value,
      sizeDescription: this.editForm.get(['sizeDescription']).value,
      inStock: this.editForm.get(['inStock']).value,
      categoryId: this.editForm.get(['categoryId']).value,
      supplierId: this.editForm.get(['supplierId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCategoryById(index: number, item: ICategory) {
    return item.id;
  }

  trackSupplierById(index: number, item: ISupplier) {
    return item.id;
  }
}
