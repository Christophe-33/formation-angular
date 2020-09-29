import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { PageListOrderComponent } from './pages/page-list-order/page-list-order.component';
import { TotalPipe } from './pipes/total.pipe';

@NgModule({
  declarations: [PageListOrderComponent, TotalPipe],
  imports: [CommonModule, OrdersRoutingModule, SharedModule],
})
export class OrdersModule {}
