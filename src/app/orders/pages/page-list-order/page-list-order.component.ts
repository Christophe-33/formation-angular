import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-order',
  templateUrl: './page-list-order.component.html',
  styleUrls: ['./page-list-order.component.scss'],
})
export class PageListOrderComponent implements OnInit {
  public ordersList: Order[];
  public tableHearders: string[];

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService.collection.subscribe(
      (datas) => {
        this.ordersList = datas;
      },
      (err) => {
        console.log(err);
      }
    );
    this.tableHearders = [
      'Type',
      'Client',
      'Nb. Jours',
      'Tjm HT',
      'Total HT',
      'Total TTC',
      'state',
    ];
  }
}
