import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-add-order',
  templateUrl: './page-add-order.component.html',
  styleUrls: ['./page-add-order.component.scss']
})
export class PageAddOrderComponent implements OnInit {

  public title: string;
  public subtitle: string

  constructor(
    private orderService : OrdersService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.currentRoute.data.subscribe(
      (datas)=>{
        this.title = datas.title;
        this.subtitle = datas.subtitle;
      }
    )
  }

  public addOrder(item:Order) {
    this.orderService.addItem(item).subscribe(
      (result)=>{
        //this.router.navigate(["orders"]);
        this.router.navigate(['../'],{relativeTo: this.currentRoute})
      }
    )
  }

}
