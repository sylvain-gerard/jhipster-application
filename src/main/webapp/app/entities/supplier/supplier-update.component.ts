import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISupplier, Supplier } from 'app/shared/model/supplier.model';
import { SupplierService } from './supplier.service';
import { ILocation } from 'app/shared/model/location.model';
import { LocationService } from 'app/entities/location';

@Component({
  selector: 'jhi-supplier-update',
  templateUrl: './supplier-update.component.html'
})
export class SupplierUpdateComponent implements OnInit {
  isSaving: boolean;

  locations: ILocation[];

  editForm = this.fb.group({
    id: [],
    supplierName: [null, [Validators.required]],
    locationId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected supplierService: SupplierService,
    protected locationService: LocationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ supplier }) => {
      this.updateForm(supplier);
    });
    this.locationService
      .query({ filter: 'supplier-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ILocation[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILocation[]>) => response.body)
      )
      .subscribe(
        (res: ILocation[]) => {
          if (!!this.editForm.get('locationId').value) {
            this.locations = res;
          } else {
            this.locationService
              .find(this.editForm.get('locationId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ILocation>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ILocation>) => subResponse.body)
              )
              .subscribe(
                (subRes: ILocation) => (this.locations = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(supplier: ISupplier) {
    this.editForm.patchValue({
      id: supplier.id,
      supplierName: supplier.supplierName,
      locationId: supplier.locationId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const supplier = this.createFromForm();
    if (supplier.id !== undefined) {
      this.subscribeToSaveResponse(this.supplierService.update(supplier));
    } else {
      this.subscribeToSaveResponse(this.supplierService.create(supplier));
    }
  }

  private createFromForm(): ISupplier {
    return {
      ...new Supplier(),
      id: this.editForm.get(['id']).value,
      supplierName: this.editForm.get(['supplierName']).value,
      locationId: this.editForm.get(['locationId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupplier>>) {
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

  trackLocationById(index: number, item: ILocation) {
    return item.id;
  }
}
