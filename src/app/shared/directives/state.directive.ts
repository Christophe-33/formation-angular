import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appState]',
})
export class StateDirective implements OnChanges {
  @Input() state: string;
  @HostBinding('class') className: string;

  constructor() {}

  ngOnChanges() {
    this.className = this.formatClass(this.state);
    console.log(this.className);
  }

  private formatClass(state: string): string {
    return `state-${state.trim().toLowerCase().replace(' ', '-')}`;
  }
}
