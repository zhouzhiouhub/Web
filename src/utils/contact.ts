export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7) return '****';
  return `${digits.slice(0, 3)}****${digits.slice(-4)}`;
}

export function maskEmail(email: string): string {
  const [user, domain] = email.split('@');
  if (!user || !domain) return '****';
  const keep = Math.min(3, Math.max(user.length - 4, 1));
  return `${user.slice(0, keep)}****@${domain}`;
}

export function maskContact(value: string, type: 'email' | 'phone'): string {
  return type === 'email' ? maskEmail(value) : maskPhone(value);
}
