import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Client } from 'src/app/shared/models/client';
import { StateClient } from '../../enums/state-client.enum';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-list-client',
  templateUrl: './page-list-client.component.html',
  styleUrls: ['./page-list-client.component.scss'],
})
export class PageListClientComponent implements OnInit {
  /* public clientsList: Client[]; */
  public clients: Client[];
  public collectionClients$: Observable<Client[]>;
  public tableHeaders: string[];
  public destroy$: Subject<boolean>= new Subject();
  public states = Object.values(StateClient);

  constructor(private clientService: ClientsService,
    private router: Router) {}

  ngOnInit(): void {
    /* this.clientService.collection.subscribe(
      (datas) => {
        this.clientsList = datas;
      },
      (err) => {
        console.log(err);
      }
    ); */
    this.collectionClients$ = this.clientService.collection;
    this.tableHeaders = [
      'Nom',
      "Chiffre d'affaire",
      'commentaire',
      'Etat'
    ];

    this.clientService.refresh$.next(true);
  }

  ngOnDestroy(){
    this.destroy$.next(true);
  }

  public changeState(item: Client, event) {
    this.clientService.changeState(item, event.target.value)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (result) => {
        item.state = result.state;
      },
      (error) => {
        event.target.value = item.state;
      }
    );
  }

  public edit(item : Client){
    this.router.navigate(['clients','edit',item.id])
  }

  public deleteClient(item: Client){
    this.clientService.deleteItem(item)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (result)=>{
        this.clientService.refresh$.next(true);
      }
    );
  }
}
