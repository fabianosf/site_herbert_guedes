import { describe, it, expect } from 'vitest';
import {
  sanitizeString,
  sanitizeEmail,
  isValidEmail,
  sanitizeContact,
} from '../lib/sanitize';

describe('sanitizeString', () => {
  it('strips HTML and script payloads', () => {
    expect(sanitizeString('<script>alert(1)</script>hello')).toBe('hello');
    expect(sanitizeString('<img src=x onerror=alert(1)>')).toBe('');
    expect(sanitizeString('<b>bold</b>')).toBe('bold');
  });

  it('strips control characters and trims whitespace', () => {
    expect(sanitizeString('  hello\x00world  ')).toBe('helloworld');
  });

  it('truncates to max length', () => {
    expect(sanitizeString('a'.repeat(1000), 10)).toHaveLength(10);
  });

  it('returns empty string for non-strings', () => {
    expect(sanitizeString(null)).toBe('');
    expect(sanitizeString(undefined)).toBe('');
    expect(sanitizeString(42)).toBe('');
  });
});

describe('sanitizeEmail / isValidEmail', () => {
  it('lowercases and trims', () => {
    expect(sanitizeEmail('  USER@Example.COM  ')).toBe('user@example.com');
  });

  it('validates RFC-ish emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('user.name+tag@sub.example.io')).toBe(true);
    expect(isValidEmail('plainaddress')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
    expect(isValidEmail('user@example')).toBe(false);
  });
});

describe('sanitizeContact', () => {
  const ok = {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    message: 'I would like to discuss a project, please reach out.',
  };

  it('returns valid for well-formed input', () => {
    const r = sanitizeContact(ok);
    expect(r.valid).toBe(true);
    expect(r.errors).toEqual({});
    expect(r.data.email).toBe('ada@example.com');
  });

  it('flags missing name with stable error code', () => {
    const r = sanitizeContact({ ...ok, name: 'A' });
    expect(r.valid).toBe(false);
    expect(r.errors.name).toBe('name_required');
  });

  it('flags invalid email with stable error code', () => {
    const r = sanitizeContact({ ...ok, email: 'not-an-email' });
    expect(r.valid).toBe(false);
    expect(r.errors.email).toBe('email_invalid');
  });

  it('flags short message with stable error code', () => {
    const r = sanitizeContact({ ...ok, message: 'short' });
    expect(r.valid).toBe(false);
    expect(r.errors.message).toBe('message_short');
  });

  it('strips XSS payloads from all fields', () => {
    const r = sanitizeContact({
      name: '<script>x</script>Bob',
      email: 'bob@example.com',
      message: 'Hello <img src=x onerror=alert(1)> world friend forever',
    });
    expect(r.data.name).toBe('Bob');
    expect(r.data.message).not.toMatch(/<|>|onerror/);
  });

  it('rejects honeypot-triggered submissions', () => {
    const r = sanitizeContact({ ...ok, website: 'http://spam.example' });
    expect(r.valid).toBe(false);
    expect(r.errors._form).toBe('form_rejected');
  });
});
