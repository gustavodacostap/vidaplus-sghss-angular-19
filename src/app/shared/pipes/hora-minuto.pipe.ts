import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'horaMinuto',
  standalone: true,
})
export class HoraMinutoPipe implements PipeTransform {
  transform(value: Date | string | null | undefined): string {
    if (!value) return '';

    if (moment.isMoment(value)) {
      return value.format('HH:mm');
    }

    if (value instanceof Date) {
      const hours = value.getHours().toString().padStart(2, '0');
      const minutes = value.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }

    return value;
  }
}
