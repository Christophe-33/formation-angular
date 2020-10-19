import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/shared/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-add-order',
  templateUrl: './page-add-order.component.html',
  styleUrls: ['./page-add-order.component.scss']
})
export class PageAddOrderComponent implements OnInit {

  @ViewChild('confirmAddModal') private confirmaAddModal: TemplateRef<any>;
  private currentActiveModal : NgbModalRef;
  public modalValues: Order;

  public title: string;
  public subtitle: string

  constructor(
    private orderService : OrdersService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private modalService: NgbModal,
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
        this.dissmissModal();
        this.router.navigate(['../'],{relativeTo: this.currentRoute})
      }
    )
  }

  public openAddModal(values:any){
    this.modalValues=values;
    this.currentActiveModal = this.modalService.open(this.confirmaAddModal);
  }

  public dissmissModal(){
    this.currentActiveModal.dismiss();
  }

}
