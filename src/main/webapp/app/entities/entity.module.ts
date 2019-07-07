import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'location',
        loadChildren: './location/location.module#JhipsterApplicationLocationModule'
      },
      {
        path: 'department',
        loadChildren: './department/department.module#JhipsterApplicationDepartmentModule'
      },
      {
        path: 'supplier',
        loadChildren: './supplier/supplier.module#JhipsterApplicationSupplierModule'
      },
      {
        path: 'employee',
        loadChildren: './employee/employee.module#JhipsterApplicationEmployeeModule'
      },
      {
        path: 'orders',
        loadChildren: './orders/orders.module#JhipsterApplicationOrdersModule'
      },
      {
        path: 'order-item',
        loadChildren: './order-item/order-item.module#JhipsterApplicationOrderItemModule'
      },
      {
        path: 'product',
        loadChildren: './product/product.module#JhipsterApplicationProductModule'
      },
      {
        path: 'category',
        loadChildren: './category/category.module#JhipsterApplicationCategoryModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApplicationEntityModule {}
