export interface OrderI {
  tjmHt: number;
  nbJours: number;
  tva: number;
  state: string;
  typePresta: string;
  client: string;
  comment: string;
  id: number;
  totalHt(): number;
  totalTtc(): number;
}
