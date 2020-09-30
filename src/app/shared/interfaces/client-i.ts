import { StateClient } from 'src/app/clients/enums/state-client.enum';

export interface ClientI {
  state: StateClient;
  tva: number;
  id: number;
  name: string;
  ca: number;
  comment: string;
}
