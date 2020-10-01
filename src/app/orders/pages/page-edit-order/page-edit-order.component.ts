import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-edit-order',
  templateUrl: './page-edit-order.component.html',
  styleUrls: ['./page-edit-order.component.scss']
})
export class PageEditOrderComponent implements OnInit {

  public item$:Observable<Order>;

  private updateSub: Subscription;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private orderService: OrdersService
    ) { }

  ngOnInit(): void {

    /* this.currentRoute.paramMap.subscribe(
      (params)=>{
        console.log(params.get("id"));
      }
    ) */

    this.item$= this.currentRoute.paramMap.pipe(
      switchMap((params: ParamMap)=>{
       return this.orderService.getItemById(params.get("id"))
      })
    )
  }

  public updateOrder(item: Order) {
    this.updateSub = this.orderService.updateItem(item).subscribe(
      (result)=>{
        this.router.navigate(["orders"]);
      }
    );


  }

}
