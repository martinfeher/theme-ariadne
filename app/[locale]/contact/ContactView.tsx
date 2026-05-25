'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Clock, Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import Header from '@/app/components/Header';
import {
  CONTACT_INFO,
  contactMapEmbedUrl,
  contactMapExternalUrl,
} from '@/lib/contact-info';

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const INITIAL_FORM: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

type FormErrors = Partial<Record<keyof ContactForm, string>>;

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20';

export default function ContactView() {
  const t = useTranslations('Contact');
  const tHeader = useTranslations('Header');

  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const setField = (key: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!form.name.trim()) next.name = t('required');
    if (!form.email.trim()) {
      next.email = t('required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      next.email = t('invalidEmail');
    }
    if (!form.subject.trim()) next.subject = t('required');
    if (!form.message.trim()) next.message = t('required');
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);
    setSubmitted(true);
    setForm(INITIAL_FORM);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="text-sm text-green-600" aria-label={t('breadcrumbNav')}>
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-700">
                {tHeader('home')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-gray-800">{t('breadcrumbContact')}</li>
          </ol>
        </nav>

        <div className="mt-6 max-w-2xl">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('title')}</h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">{t('subtitle')}</p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-5">
          <section className="lg:col-span-3">
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              {submitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <CheckCircle2 className="h-14 w-14 text-green-500" aria-hidden />
                  <h2 className="mt-4 text-xl font-semibold text-gray-900">{t('successTitle')}</h2>
                  <p className="mt-2 max-w-sm text-sm text-gray-600">{t('successMessage')}</p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-700 cursor-pointer"
                  >
                    {t('sendAnother')}
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-gray-900">{t('formTitle')}</h2>
                  <p className="mt-1 text-sm text-gray-500">{t('formHint')}</p>

                  <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field id="contact-name" label={t('name')} required>
                        <input
                          id="contact-name"
                          value={form.name}
                          onChange={(e) => setField('name', e.target.value)}
                          className={inputClass}
                          autoComplete="name"
                          placeholder={t('namePlaceholder')}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                        )}
                      </Field>
                      <Field id="contact-email" label={t('email')} required>
                        <input
                          id="contact-email"
                          type="email"
                          value={form.email}
                          onChange={(e) => setField('email', e.target.value)}
                          className={inputClass}
                          autoComplete="email"
                          placeholder={t('emailPlaceholder')}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                        )}
                      </Field>
                    </div>

                    <Field id="contact-subject" label={t('subject')} required>
                      <input
                        id="contact-subject"
                        value={form.subject}
                        onChange={(e) => setField('subject', e.target.value)}
                        className={inputClass}
                        placeholder={t('subjectPlaceholder')}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-red-600">{errors.subject}</p>
                      )}
                    </Field>

                    <Field id="contact-message" label={t('message')} required>
                      <textarea
                        id="contact-message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => setField('message', e.target.value)}
                        className={`${inputClass} resize-y min-h-[120px]`}
                        placeholder={t('messagePlaceholder')}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-600">{errors.message}</p>
                      )}
                    </Field>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-green-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto cursor-pointer"
                    >
                      <Send className="h-4 w-4" aria-hidden />
                      {submitting ? t('sending') : t('sendMessage')}
                    </button>
                  </form>
                </>
              )}
            </div>
          </section>

          <aside className="space-y-5 lg:col-span-2">
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">{t('infoTitle')}</h2>
              <ul className="mt-5 space-y-4">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-green-500" aria-hidden />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t('addressLabel')}</p>
                    <p className="mt-0.5 text-sm text-gray-600">
                      {CONTACT_INFO.addressLine1}
                      <br />
                      {CONTACT_INFO.city}
                      <br />
                      {t(`country${CONTACT_INFO.countryKey}`)}
                    </p>
                    <a
                      href={contactMapExternalUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm text-green-600 hover:text-green-700"
                    >
                      {t('openInMaps')}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-green-500" aria-hidden />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t('phoneLabel')}</p>
                    <a
                      href={CONTACT_INFO.phoneHref}
                      className="mt-0.5 text-sm text-gray-600 hover:text-green-600"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-green-500" aria-hidden />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t('emailLabel')}</p>
                    <a
                      href={CONTACT_INFO.emailHref}
                      className="mt-0.5 text-sm text-gray-600 hover:text-green-600"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-green-500" aria-hidden />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t('hoursLabel')}</p>
                    <p className="mt-0.5 text-sm text-gray-600">{t('hoursWeekdays')}</p>
                    <p className="text-sm text-gray-600">{t('hoursSaturday')}</p>
                    <p className="text-sm text-gray-600">{t('hoursSunday')}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
              <iframe
                title={t('mapTitle')}
                src={contactMapEmbedUrl()}
                className="h-64 w-full border-0 sm:h-72"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </aside>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400">{t('demoHint')}</p>
      </main>
    </div>
  );
}
