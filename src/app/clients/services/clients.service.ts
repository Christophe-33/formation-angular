import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  private pCollection: Observable<Client[]>;
  private urlApi = environment.urlApi;

  constructor(private http: HttpClient) {
    this.collection = this.http.get<Client[]>(`${this.urlApi}clients`).pipe(
      map((col) => {
        return col.map((item) => {
          return new Client(item);
        });
      })
    );
  }

  get collection(): Observable<Client[]> {
    return this.pCollection;
  }

  set collection(col: Observable<Client[]>) {
    this.pCollection = col;
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
}
