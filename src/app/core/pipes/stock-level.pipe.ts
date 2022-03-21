import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockLevel',
})
export class StockLevelPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    if (value === 0) {
      return 'outofstock';
    } else if (value < 10) {
      return 'lowstock';
    } else {
      return 'instock';
    }
  }
}
