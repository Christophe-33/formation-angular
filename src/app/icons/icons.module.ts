import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDeleteComponent } from './components/icon-delete/icon-delete.component';
import { IconUpdateComponent } from './components/icon-update/icon-update.component';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [IconComponent, IconUpdateComponent, IconDeleteComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [IconComponent,IconDeleteComponent,IconUpdateComponent],
})
export class IconsModule {}
