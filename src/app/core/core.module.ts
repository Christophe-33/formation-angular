import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [NavComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule],
  exports: [NavComponent, HeaderComponent, FooterComponent],
})
export class CoreModule {}
