import { ClientI } from '../interfaces/client-i';

export class Client implements ClientI {
  state: string;
  tva: number;
  id: number;
  name: string = 'Default Name';
  ca: number;
  comment: string;

  constructor(obj?: Partial<Client>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }
}
