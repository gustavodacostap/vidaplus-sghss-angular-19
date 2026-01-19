import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celular',
})
export class CelularPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    const digits = value.replace(/\D/g, '');

    // Formato esperado: 11 dígitos (DD + 9 dígitos)
    if (digits.length !== 11) {
      return value; // fallback seguro
    }

    return digits.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}
