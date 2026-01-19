export function formatCpf(value: string | null | undefined): string {
  if (!value) return '';

  // remove tudo que não for número
  const digits = value.replace(/\D/g, '');

  if (digits.length !== 11) {
    return value; // fallback seguro
  }

  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}
