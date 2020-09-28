import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [IconComponent],
})
export class IconsModule {}
