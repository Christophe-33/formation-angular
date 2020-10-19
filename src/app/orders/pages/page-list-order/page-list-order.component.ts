import { Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Order } from 'src/app/shared/models/order';
import { AlertService } from 'src/app/shared/services/alert.service';
import { StateOrder } from '../../enums/state-order.enum';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-order',
  templateUrl: './page-list-order.component.html',
  styleUrls: ['./page-list-order.component.scss'],
})
export class PageListOrderComponent implements OnInit {

  @ViewChild('confirmSuppModal') private confirmSuppModal: TemplateRef<any>;
  private currentActiveModal: NgbModalRef;
  public modalValues: Order;

  /* public ordersList: Order[]; */
  public orders: Order[];
  public collectionOrders$: Observable<Order[]>;
  public tableHearders: string[];
  public destroy$: Subject<boolean>= new Subject();
  public states = Object.values(StateOrder);

  constructor(
    private orderService: OrdersService,
    private router: Router,
    private alertService: AlertService,
    private renderer: Renderer2,
    private modalService: NgbModal,
    ) {}

    public successMsg(){
      this.alertService.success("un message success")
    }

    public errorMsg(){
      this.alertService.error("un message error")
    }

    public warningMsg(){
      this.alertService.warning("un message warning")
    }

    public infoMsg(){
      this.alertService.info("un message info")
    }

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
        this.dissmissModal();
        this.orderService.refresh$.next(true);
      }
    );
  }

  @ViewChild('abcd',{static: true})
  private abcd : ElementRef;
  public onClick(){
    const li= this.renderer.createElement('li');
    const text=this.renderer.createText('Cliquer pour ajouter');
    this.renderer.appendChild(li,text);
    this.renderer.appendChild(this.abcd.nativeElement, li);
  }

  public openSuppModal(values:any){
    this.modalValues=values;
    this.currentActiveModal = this.modalService.open(this.confirmSuppModal);
  }

  public dissmissModal(){
    this.currentActiveModal.dismiss();
  }

}
