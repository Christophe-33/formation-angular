import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Client } from 'src/app/shared/models/client';
import { ClientsService } from '../../services/clients.service';

@Component({
  selector: 'app-page-edit-client',
  templateUrl: './page-edit-client.component.html',
  styleUrls: ['./page-edit-client.component.scss']
})
export class PageEditClientComponent implements OnInit {

  public item$:Observable<Client>;

  private updateSub: Subscription;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute,
    private clientService: ClientsService
  ) { }

  ngOnInit(): void {

    /* this.currentRoute.paramMap.subscribe(
      (params)=>{
        console.log(params.get("id"));
      }
    ) */

  this.item$= this.currentRoute.paramMap.pipe(
      switchMap((params: ParamMap)=>{
      return this.clientService.getItemById(params.get("id"))
      })
    )
  }

  public updateClient(item: Client) {
    this.updateSub = this.clientService.updateItem(item).subscribe(
      (result)=>{
        this.router.navigate(["clients"]);
      }
    );
  }

}
