import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IEmployee, Employee } from 'app/shared/model/employee.model';
import { EmployeeService } from './employee.service';
import { IDepartment } from 'app/shared/model/department.model';
import { DepartmentService } from 'app/entities/department';

@Component({
  selector: 'jhi-employee-update',
  templateUrl: './employee-update.component.html'
})
export class EmployeeUpdateComponent implements OnInit {
  isSaving: boolean;

  departments: IDepartment[];

  employees: IEmployee[];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required]],
    phoneNumber: [],
    hireDate: [],
    grade: [null, [Validators.required]],
    jobTitle: [null, [Validators.required]],
    departmentId: [],
    managerId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected employeeService: EmployeeService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.updateForm(employee);
    });
    this.departmentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartment[]>) => response.body)
      )
      .subscribe((res: IDepartment[]) => (this.departments = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.employeeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployee[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployee[]>) => response.body)
      )
      .subscribe((res: IEmployee[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(employee: IEmployee) {
    this.editForm.patchValue({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phoneNumber: employee.phoneNumber,
      hireDate: employee.hireDate != null ? employee.hireDate.format(DATE_TIME_FORMAT) : null,
      grade: employee.grade,
      jobTitle: employee.jobTitle,
      departmentId: employee.departmentId,
      managerId: employee.managerId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const employee = this.createFromForm();
    if (employee.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  private createFromForm(): IEmployee {
    return {
      ...new Employee(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      email: this.editForm.get(['email']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      hireDate: this.editForm.get(['hireDate']).value != null ? moment(this.editForm.get(['hireDate']).value, DATE_TIME_FORMAT) : undefined,
      grade: this.editForm.get(['grade']).value,
      jobTitle: this.editForm.get(['jobTitle']).value,
      departmentId: this.editForm.get(['departmentId']).value,
      managerId: this.editForm.get(['managerId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployee>>) {
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

  trackDepartmentById(index: number, item: IDepartment) {
    return item.id;
  }

  trackEmployeeById(index: number, item: IEmployee) {
    return item.id;
  }
}
