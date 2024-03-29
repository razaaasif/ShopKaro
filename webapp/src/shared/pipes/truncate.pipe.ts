import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number): unknown {
    return value && value.length >= limit
      ? value.substring(0, limit - 3) + '...'
      : value;
  }
}
