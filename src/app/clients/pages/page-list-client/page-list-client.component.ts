import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-list-client',
  templateUrl: './page-list-client.component.html',
  styleUrls: ['./page-list-client.component.scss'],
})
export class PageListClientComponent implements OnInit {
  public clientsList: Client[];
  constructor(private clientService: ClientsService) {}

  ngOnInit(): void {
    this.clientService.collection.subscribe(
      (datas) => {
        this.clientsList = datas;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
