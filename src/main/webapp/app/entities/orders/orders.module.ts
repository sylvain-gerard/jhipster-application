import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterApplicationSharedModule } from 'app/shared';
import {
  OrdersComponent,
  OrdersDetailComponent,
  OrdersUpdateComponent,
  OrdersDeletePopupComponent,
  OrdersDeleteDialogComponent,
  ordersRoute,
  ordersPopupRoute
} from './';

const ENTITY_STATES = [...ordersRoute, ...ordersPopupRoute];

@NgModule({
  imports: [JhipsterApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [OrdersComponent, OrdersDetailComponent, OrdersUpdateComponent, OrdersDeleteDialogComponent, OrdersDeletePopupComponent],
  entryComponents: [OrdersComponent, OrdersUpdateComponent, OrdersDeleteDialogComponent, OrdersDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterApplicationOrdersModule {}
