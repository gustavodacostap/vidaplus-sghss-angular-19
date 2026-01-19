import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listAnd',
})
export class ListAndPipe implements PipeTransform {
  transform(value: string[] | null | undefined, conjunction: 'e' | 'ou' = 'e'): string {
    if (!value || value.length === 0) return '';

    if (value.length === 1) {
      return value[0];
    }

    if (value.length === 2) {
      return `${value[0]} ${conjunction} ${value[1]}`;
    }

    const last = value[value.length - 1];
    const initial = value.slice(0, -1).join(', ');

    return `${initial} ${conjunction} ${last}`;
  }
}
