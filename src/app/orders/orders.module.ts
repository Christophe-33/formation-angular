import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TemplatesModule } from '../templates/templates.module';
import { TextModule } from '../text/text.module';
import { FormOrderComponent } from './components/form-order/form-order.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { PageListOrderComponent } from './pages/page-list-order/page-list-order.component';
import { TotalPipe } from './pipes/total.pipe';
import { PageAddOrderComponent } from './pages/page-add-order/page-add-order.component';

@NgModule({
  declarations: [PageListOrderComponent, TotalPipe, FormOrderComponent, PageAddOrderComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule,
    TemplatesModule,
    TextModule,
    ReactiveFormsModule
  ],
})
export class OrdersModule {}
