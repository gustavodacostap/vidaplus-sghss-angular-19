import { AbstractControl } from '@angular/forms';

export function getFormErrorMessage(control: AbstractControl | null): string | null {
  if (!control || !control.errors || !(control.dirty || control.touched)) {
    return null;
  }

  // required costuma vir sem mensagem
  if (control.errors['required']) {
    return 'Campo obrigatório';
  }

  // percorre os outros erros e usa a mensagem do validator
  for (const errorKey of Object.keys(control.errors)) {
    const errorValue = control.errors[errorKey];

    if (typeof errorValue === 'string') {
      return errorValue;
    }
  }

  return null;
}
