import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtnComponent } from './components/btn/btn.component';
import { TableLightComponent } from './components/table-light/table-light.component';
import { StateDirective } from './directives/state.directive';

@NgModule({
  declarations: [TableLightComponent, StateDirective, BtnComponent],
  imports: [CommonModule, RouterModule],
  exports: [TableLightComponent, StateDirective, BtnComponent],
})
export class SharedModule {}
