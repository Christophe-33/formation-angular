import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ClientsService } from 'src/app/clients/services/clients.service';
import { Order } from 'src/app/shared/models/order';
import { StateOrder } from '../../enums/state-order.enum';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-recap-order',
  templateUrl: './page-recap-order.component.html',
  styleUrls: ['./page-recap-order.component.scss']
})
export class PageRecapOrderComponent implements OnInit {

  public orders: Order[];
  public collectionOrders$: Observable<Order[]>;
  public tableHearders: string[];
  public destroy$: Subject<boolean>= new Subject();
  public states = Object.values(StateOrder);

  constructor(
    private orderService: OrdersService,
    private currentRoute: ActivatedRoute,
    private clientService: ClientsService,
  ) { }

  ngOnInit(): void {
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
    this.collectionOrders$ = this.currentRoute.paramMap.pipe(
      switchMap((param:ParamMap)=>{
        return this.clientService.getItemById(param.get("id")).pipe(
          switchMap((client)=>{
            return this.orderService.getAllItemByClientName(client.name)
          })
        )
      })
    )
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

  ngOnDestroy(){
    this.destroy$.next(true);
  }

}
