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

export function parseBrDateInputToIso(value?: string | null): string | null {
  if (!value) {
    return null;
  }

  const normalized = value.replace(/\D/g, '');
  if (normalized.length !== 8) {
    return null;
  }

  const day = Number(normalized.slice(0, 2));
  const month = Number(normalized.slice(2, 4));
  const year = Number(normalized.slice(4, 8));

  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  const mm = String(month).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  return `${year}-${mm}-${dd}`;
}

export function formatDateInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);

  if (digits.length <= 2) {
    return day;
  }

  if (digits.length <= 4) {
    return `${day}/${month}`;
  }

  return `${day}/${month}/${year}`;
}
