/**
 * Form input sanitization helpers.
 *
 * Strategy:
 *   1. DOMPurify strips any HTML/JS payload (defense against stored XSS if
 *      the value is ever rendered as HTML downstream).
 *   2. Type-specific validators normalize whitespace and apply RFC-ish checks.
 *   3. All public functions are pure and side-effect free -> easy to unit-test.
 */

import DOMPurify from 'dompurify';

const EMAIL_RE =
  /^(?=.{3,254}$)[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z]{2,})+$/;

// eslint-disable-next-line no-control-regex -- intentional: strip ASCII control chars
const CONTROL_CHARS_RE = /[\x00-\x1F\x7F]/g;

export const sanitizeString = (value: unknown, maxLength = 500): string => {
  if (typeof value !== 'string') return '';
  const stripped = DOMPurify.sanitize(value, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
    KEEP_CONTENT: true,
  });
  return stripped.replace(CONTROL_CHARS_RE, '').trim().slice(0, maxLength);
};

export const sanitizeEmail = (value: unknown): string => {
  const cleaned = sanitizeString(value, 254).toLowerCase();
  return cleaned;
};

export const isValidEmail = (value: string): boolean => EMAIL_RE.test(value);

export type ContactInput = {
  name: string;
  email: string;
  message: string;
  company?: string;
  /** Honeypot field. Real users never fill it. */
  website?: string;
};

export type ContactErrorCode =
  | 'name_required'
  | 'email_invalid'
  | 'message_short'
  | 'form_rejected';

export type ContactErrors = Partial<Record<keyof ContactInput, ContactErrorCode>> & {
  _form?: ContactErrorCode;
};

export type ContactResult = {
  valid: boolean;
  data: ContactInput;
  errors: ContactErrors;
};

export const sanitizeContact = (raw: Partial<ContactInput>): ContactResult => {
  const data: ContactInput = {
    name: sanitizeString(raw.name, 120),
    email: sanitizeEmail(raw.email),
    message: sanitizeString(raw.message, 4000),
    company: sanitizeString(raw.company, 120),
    website: sanitizeString(raw.website, 200),
  };

  const errors: ContactErrors = {};

  if (data.website) {
    // Honeypot triggered -> silently reject.
    errors._form = 'form_rejected';
  }
  if (data.name.length < 2) {
    errors.name = 'name_required';
  }
  if (!isValidEmail(data.email)) {
    errors.email = 'email_invalid';
  }
  if (data.message.length < 10) {
    errors.message = 'message_short';
  }

  return { valid: Object.keys(errors).length === 0, data, errors };
};
