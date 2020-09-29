import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableLightComponent } from './components/table-light/table-light.component';

@NgModule({
  declarations: [TableLightComponent],
  imports: [CommonModule],
  exports: [TableLightComponent],
})
export class SharedModule {}
