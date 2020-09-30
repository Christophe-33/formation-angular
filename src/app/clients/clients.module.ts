import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TemplatesModule } from '../templates/templates.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { PageListClientComponent } from './pages/page-list-client/page-list-client.component';

@NgModule({
  declarations: [PageListClientComponent],
  imports: [CommonModule, ClientsRoutingModule, SharedModule, TemplatesModule],
})
export class ClientsModule {}
