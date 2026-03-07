export function parseDate(value?: string | null): Date | null {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

export function formatDatePtBr(value?: string | null): string {
  const parsed = parseDate(value);
  if (!parsed) {
    return '--/--/----';
  }

  return parsed.toLocaleDateString('pt-BR');
}

export function daysUntil(value?: string | null): number | null {
  const parsed = parseDate(value);
  if (!parsed) {
    return null;
  }

  const now = new Date();
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.ceil((parsed.getTime() - now.getTime()) / msPerDay);
}

export function formatRelativeExpiry(value?: string | null): string {
  const diff = daysUntil(value);

  if (diff === null) {
    return 'Sem data';
  }

  if (diff < 0) {
    return `Expirou em ${formatDatePtBr(value)}`;
  }

  if (diff === 0) {
    return 'Expira hoje';
  }

  if (diff === 1) {
    return 'Expira em 1 dia';
  }

  if (diff >= 30) {
    const months = Math.round(diff / 30);
    return `Expira em ${months} ${months === 1 ? 'mês' : 'meses'}`;
  }

  return `Expira em ${diff} dias`;
}

export function calculateProgress(startDate?: string | null, expiryDate?: string | null): number {
  const start = parseDate(startDate);
  const end = parseDate(expiryDate);

  if (!start || !end) {
    return 0.4;
  }

  const total = end.getTime() - start.getTime();
  if (total <= 0) {
    return 1;
  }

  const elapsed = Date.now() - start.getTime();
  const progress = elapsed / total;
  return Math.max(0, Math.min(1, progress));
}
