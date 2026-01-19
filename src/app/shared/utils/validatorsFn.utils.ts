import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Valida CPF.
 */
export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cpf: string = control.value;
    if (!cpf || cpf.length === 0) {
      return null;
    }
    const clean = cpf.replace(/\D/g, '');
    if (clean.length !== 11 || /^(\d)\1*$/.test(clean)) {
      return { cpf: 'CPF inválido' };
    }

    const calc = (digits: string, len: number): number => {
      const sum = Array.from({ length: len }, (_, i) => Number(digits[i]) * (len + 1 - i)).reduce(
        (acc, v) => acc + v,
        0,
      );
      const rem = 11 - (sum % 11);
      return rem < 10 ? rem : 0;
    };

    const dv1 = calc(clean, 9);
    const dv2 = calc(clean, 10);
    if (dv1 !== Number(clean[9]) || dv2 !== Number(clean[10])) {
      return { cpf: 'CPF inválido' };
    }
    return null;
  };
}

/**
 * Valida CEP (apenas formato).
 */
export function cepValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cep: string = control.value;
    if (!cep || cep.length === 0) {
      return null;
    }
    const clean = cep.replace(/\D/g, '');
    if (clean.length !== 8 || /^(\d)\1*$/.test(clean)) {
      return { cep: 'CEP inválido' };
    }
    return null;
  };
}

/**
 * Valida número de celular brasileiro.
 * Formato esperado: (XX) 9XXXX-XXXX
 */
export function celularValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!value) return null;

    const clean = value.replace(/\D/g, '');

    if (clean.length !== 11) {
      return { celular: 'Celular deve ter 11 dígitos' };
    }

    const ddd = parseInt(clean.substring(0, 2), 10);
    if (ddd < 11 || ddd > 99) {
      return { celular: 'DDD inválido' };
    }

    if (clean[2] !== '9') {
      return { celular: 'Celular deve começar com 9 após o DDD' };
    }

    return null;
  };
}

/**
 * Valida telefone fixo brasileiro.
 * Formato esperado: (XX) XXXX-XXXX
 */
export function telefoneFixoValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (!value) return null;

    const clean = value.replace(/\D/g, '');

    if (clean.length !== 10) {
      return { telefoneFixo: 'Telefone fixo deve ter 10 dígitos' };
    }

    const ddd = parseInt(clean.substring(0, 2), 10);
    if (ddd < 11 || ddd > 99) {
      return { telefoneFixo: 'DDD inválido' };
    }

    if (clean[2] === '0' || clean[2] === '1') {
      return { telefoneFixo: 'Telefone fixo inválido' };
    }

    return null;
  };
}
