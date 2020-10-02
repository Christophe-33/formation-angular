import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/shared/models/client';
import { environment } from 'src/environments/environment';
import { StateClient } from '../enums/state-client.enum';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {

  changeStat(item: Client, value: any) {
    throw new Error('Method not implemented.');
  }

  private pCollection: BehaviorSubject<Client[]> = new BehaviorSubject([]);
  private urlApi = environment.urlApi;
  public refresh$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {
    this.refresh$.subscribe(
      (refreshing)=>{
        if(refreshing == true) {
          this.http.get<Client[]>(`${this.urlApi}clients`).pipe(
            map((col) => {
              return col.map((item) => {
                return new Client(item);
              })
            })
          ).subscribe(
            (col) => {
              this.pCollection.next(col);
            }
          )
        }
      }
    )
  }

  get collection(): Observable<Client[]> {
    return this.pCollection;
  }

  public changeState(item: Client, state: StateClient) {
    const obj = new Client({ ...item });
    obj.state = state;
    return this.updateItem(obj);
  }

  public updateItem(item: Client): Observable<Client> {
    return this.http.put<Client>(`${this.urlApi}clients/${item.id}`, item);
  }

  public addItem(item: Client) : Observable<Client>{
    return this.http.post<Client>(`${this.urlApi}clients`, item);
  }

  public getItemById(id: string):Observable<Client>{
    return this.http.get<Client>(`${this.urlApi}clients/${id}`);
  }

  public deleteItem(item: Client): Observable<Client> {
    return this.http.delete<Client>(`${this.urlApi}clients/${item.id}`)
  }
}
