import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'USDateToBR',
})
export class USDateToBRPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    const [year, month, day] = value.split('-');
    return `${day}/${month}/${year}`;
  }
}
