import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Container } from '../ui/Container';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { siteConfig } from '../../config/theme';
import {
  sanitizeContact,
  type ContactErrors,
  type ContactInput,
  type ContactErrorCode,
} from '../../lib/sanitize';
import { fadeUp, stagger, viewportOnce } from '../../lib/motion';
import { cn } from '../../lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialValues: ContactInput = {
  name: '',
  email: '',
  message: '',
  company: '',
  website: '',
};

export const Contact = () => {
  const { t } = useTranslation();
  const [values, setValues] = useState<ContactInput>(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const translateError = (code?: ContactErrorCode) =>
    code ? t(`contact.form.errors.${code}`) : undefined;

  const update =
    <K extends keyof ContactInput>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = sanitizeContact(values);

    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setStatus('submitting');

    try {
      if (siteConfig.contactEndpoint) {
        const res = await fetch(siteConfig.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(result.data),
        });
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      } else {
        await new Promise((r) => setTimeout(r, 600));
      }
      setStatus('success');
      setValues(initialValues);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section relative">
      <Container size="full">
        <SectionHeader
          index={t('contact.section.index')}
          eyebrow={t('contact.section.eyebrow')}
          title={
            <>
              {t('contact.section.title_a')}
              <br className="hidden md:block" />
              <span className="italic font-light text-gradient">
                {' '}
                {t('contact.section.title_b')}
              </span>
            </>
          }
          description={
            <>
              {t('contact.section.description_prefix')}{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="link-underline text-bone-50"
              >
                {siteConfig.email}
              </a>
              .
            </>
          }
        />

        <motion.form
          noValidate
          onSubmit={onSubmit}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          aria-describedby="contact-status"
          className="mx-auto max-w-3xl space-y-6"
        >
          <motion.div variants={fadeUp} className="grid gap-6 md:grid-cols-2">
            <Field
              label={t('contact.form.name')}
              name="name"
              value={values.name}
              onChange={update('name')}
              error={translateError(errors.name)}
              autoComplete="name"
              required
            />
            <Field
              label={t('contact.form.email')}
              name="email"
              type="email"
              value={values.email}
              onChange={update('email')}
              error={translateError(errors.email)}
              autoComplete="email"
              required
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Field
              label={t('contact.form.company')}
              name="company"
              value={values.company ?? ''}
              onChange={update('company')}
              error={translateError(errors.company)}
              autoComplete="organization"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <Field
              as="textarea"
              label={t('contact.form.message')}
              name="message"
              value={values.message}
              onChange={update('message')}
              error={translateError(errors.message)}
              rows={6}
              required
            />
          </motion.div>

          <div className="hidden" aria-hidden="true">
            <label>
              Website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website ?? ''}
                onChange={update('website')}
              />
            </label>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center justify-between gap-4 pt-4"
          >
            <Button type="submit" disabled={status === 'submitting'} size="lg">
              {status === 'submitting' ? t('contact.form.submitting') : t('contact.form.submit')}
            </Button>
            <p
              id="contact-status"
              role="status"
              aria-live="polite"
              className={cn(
                'text-sm transition-opacity',
                status === 'success' && 'text-accent',
                status === 'error' && 'text-red-400',
                status === 'idle' && 'text-bone-400',
                status === 'submitting' && 'text-bone-300',
              )}
            >
              {status === 'success' && t('contact.form.status_success')}
              {status === 'error' && t('contact.form.status_error')}
              {status === 'idle' && t('contact.form.status_idle')}
              {status === 'submitting' && t('contact.form.status_submitting')}
            </p>
          </motion.div>
        </motion.form>
      </Container>
    </section>
  );
};

// ----------------------------------------------------------------
// Field
// ----------------------------------------------------------------
type FieldBaseProps = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
};
type FieldInputProps = FieldBaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & { as?: 'input' };
type FieldTextareaProps = FieldBaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { as: 'textarea' };
type FieldProps = FieldInputProps | FieldTextareaProps;

const Field = (props: FieldProps) => {
  const isTextarea = props.as === 'textarea';
  const { label, name, error, required } = props;
  const id = `f-${name}`;
  const errorId = `${id}-error`;
  const inputClass = cn(
    'w-full rounded-xl border bg-ink-900/40 px-5 py-4 text-bone-50 placeholder:text-bone-400/60',
    'transition-colors duration-300 ease-smooth',
    error
      ? 'border-red-400/60 focus:border-red-400'
      : 'border-ink-700/60 focus:border-accent/60',
  );

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs uppercase tracking-[0.25em] text-bone-300">
        {label}
        {required && (
          <span aria-hidden="true" className="text-accent">
            {' '}
            *
          </span>
        )}
      </label>
      {isTextarea
        ? (() => {
            const { as: _as, label: _l, name: _n, error: _e, required: _r, ...rest } =
              props as FieldTextareaProps;
            return (
              <textarea
                id={id}
                name={name}
                required={required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className={cn(inputClass, 'resize-y min-h-[120px]')}
                {...rest}
              />
            );
          })()
        : (() => {
            const { as: _as, label: _l, name: _n, error: _e, required: _r, ...rest } =
              props as FieldInputProps;
            return (
              <input
                id={id}
                name={name}
                required={required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className={inputClass}
                {...rest}
              />
            );
          })()}
      {error && (
        <p id={errorId} className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};
