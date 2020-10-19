import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from 'src/app/shared/models/order';
import { DependencyValidator } from 'src/app/shared/validators/dependency-validator';
import { StateOrder } from '../../enums/state-order.enum';

@Component({
  selector: 'app-form-order',
  templateUrl: './form-order.component.html',
  styleUrls: ['./form-order.component.scss']
})
export class FormOrderComponent implements OnInit {

  public form:FormGroup;
  @Input() public order: Order = new Order();
  public states= Object.values(StateOrder);
  @Output() submitted: EventEmitter<Order> = new EventEmitter();

  constructor(private formB : FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formB.group({
      tjmHt: [this.order.tjmHt],
      nbJours:[this.order.nbJours,Validators.compose([Validators.required,Validators.max(100)])],
      tva:[this.order.tva],
      state:[this.order.state],
      typePresta:[this.order.typePresta],
      client:[this.order.client,Validators.compose([Validators.required, Validators.minLength(3)])],
      id:[this.order.id],
      comment:[this.order.comment]
    },{validators: Validators.compose([DependencyValidator("client",["tjmHt","nbJours"])])}
    );
  }

  public onSubmit(){
    this.submitted.emit(this.form.value);
  }

}
