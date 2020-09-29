import { Pipe, PipeTransform } from '@angular/core';
import { Order } from 'src/app/shared/models/order';

@Pipe({
  name: 'total',
})
export class TotalPipe implements PipeTransform {
  transform(value: Order, ...args: any[]): any {
    if (value) {
      if (args.length > 0 && args[0] == 'ttc') {
        return value.totalTtc();
      } else {
        return value.totalHt();
      }
    }

    return null;
  }
}
