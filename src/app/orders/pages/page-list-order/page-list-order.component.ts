import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  public orders: Order[];
  public collectionOrders$: Observable<Order[]>;
  public tableHearders: string[];
  public destroy$: Subject<boolean>= new Subject();
  public states = Object.values(StateOrder);

  constructor(private orderService: OrdersService,
    private router: Router) {}

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
      "Actions"
    ];

    this.orderService.refresh$.next(true);
  }

  ngOnDestroy(){
    this.destroy$.next(true);
  }

  public changeState(item: Order, event) {
    this.orderService.changeState(item, event.target.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
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

  public edit(item: Order){
    this.router.navigate(['orders','edit', item.id])
  }

  public deleteOrder(item: Order){
    this.orderService.deleteItem(item)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (result)=>{
        this.orderService.refresh$.next(true);
      }
    );
  }
}
