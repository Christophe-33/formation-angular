import { OrderI } from '../interfaces/order-i';

export class Order implements OrderI {
  tjmHt: number;
  nbJours: number;
  tva: number;
  state: string;
  typePresta: string;
  client: string;
  comment: string;
  id: number;

  constructor(obj?: Partial<Order>) {
    if (obj) {
      Object.assign(this, obj);
    }
  }

  totalHt(): number {
    return this.tjmHt * this.nbJours;
  }

  totalTtc(): number {
    return this.totalHt() * (1 + this.tva / 100);
  }
}