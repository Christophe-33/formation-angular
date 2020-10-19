import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, ControlContainer, FormGroupDirective } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Directive({
  selector: '[appInvalidMessage]'
})
export class InvalidMessageDirective implements OnInit, OnDestroy {

  @Input() invalidRow: string;
  public control:AbstractControl;
  public controlValues$: Observable<any>;
  public controlSubscription: Subscription;

  constructor(

    private fg: ControlContainer,
    private renderer: Renderer2,
    private el: ElementRef,
  ) { }

  ngOnInit(){
    this.control = this.form.get(this.invalidRow);
    this.controlValues$ = this.control.valueChanges;
    this.controlSubscription = this.controlValues$.subscribe(
      (newValue) => {
        this.setVisible();
      }
    )
  }

  private setVisible(){
    if(this.control.invalid && this.control.dirty){
      this.renderer.removeStyle(this.el.nativeElement, 'display');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'dispaly', 'none');
    }
  }

  public match(error : string) {
    if(this.control?.errors){
      if(Object.keys(this.control.errors).indexOf(error) > -1) {
        return true;
      }
    }
    return false;
  }

  get form(){
    return this.fg.formDirective ? (this.fg.formDirective as FormGroupDirective).form : null;
  }

  ngOnDestroy(){
    this.controlSubscription.unsubscribe();
  }

}
