import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TemplatesModule } from '../templates/templates.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { FormClientComponent } from './components/form-client/form-client.component';
import { PageAddClientComponent } from './pages/page-add-client/page-add-client.component';
import { PageListClientComponent } from './pages/page-list-client/page-list-client.component';

@NgModule({
  declarations: [PageListClientComponent, FormClientComponent, PageAddClientComponent,PageAddClientComponent],
  imports: [CommonModule, ClientsRoutingModule, SharedModule, TemplatesModule,ReactiveFormsModule],
})
export class ClientsModule {}
