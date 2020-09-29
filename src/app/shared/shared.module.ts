import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableLightComponent } from './components/table-light/table-light.component';
import { StateDirective } from './directives/state.directive';

@NgModule({
  declarations: [TableLightComponent, StateDirective],
  imports: [CommonModule],
  exports: [TableLightComponent, StateDirective],
})
export class SharedModule {}
