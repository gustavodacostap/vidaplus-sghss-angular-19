export function formatNotificationTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  // Agora / segundos
  if (diffMinutes < 1) {
    return 'agora';
  }

  // Até 59 minutos
  if (diffMinutes < 60) {
    return `há ${diffMinutes} min`;
  }

  // Até 1h59
  if (diffHours < 2) {
    return `há ${diffHours} h`;
  }

  // Mesmo dia → horário exato
  if (now.toDateString() === date.toDateString()) {
    return `às ${new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)}`;
  }

  // Ontem
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (yesterday.toDateString() === date.toDateString()) {
    return 'ontem';
  }

  // Até 7 dias
  if (diffDays < 7) {
    return `há ${diffDays} dias`;
  }

  // Data curta
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: now.getFullYear() !== date.getFullYear() ? 'numeric' : undefined,
  }).format(date);
}

export function USDateToBR(date: string): string {
  if (!date) return '';

  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
}

export function calcularIdade(dataNascimento: string | Date | null | undefined): number {
  if (!dataNascimento) return 0;

  const nascimento = new Date(dataNascimento);
  const hoje = new Date();

  let idade = hoje.getFullYear() - nascimento.getFullYear();

  const mesAtual = hoje.getMonth();
  const mesNascimento = nascimento.getMonth();

  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())
  ) {
    idade--;
  }

  return idade;
}
