import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { StateOrder } from '../../enums/state-order.enum';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-order',
  templateUrl: './page-list-order.component.html',
  styleUrls: ['./page-list-order.component.scss'],
})
export class PageListOrderComponent implements OnInit {
  /* public ordersList: Order[]; */
  public collectionOrders$: Observable<Order[]>;
  public tableHearders: string[];
  public states = Object.values(StateOrder);

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    /*this.orderService.collection.subscribe(
       (datas) => {
        this.ordersList = datas;
      },
      (err) => {
        console.log(err);
      }
    );*/
    this.collectionOrders$ = this.orderService.collection;
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

  public changeState(item: Order, event) {
    this.orderService.changeState(item, event.target.value).subscribe(
      (result) => {
        item.state = result.state;
      },
      (error) => {
        event.target.value = item.state;
      }
    );
  }

  public testButton() {
    alert('Le bouton fonctionne');
  }
}
