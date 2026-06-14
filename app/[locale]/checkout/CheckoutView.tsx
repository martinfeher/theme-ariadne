'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import { useCart } from '@/app/context/CartContext';
import { useFormatCurrency } from '@/app/context/CurrencyContext';
import { useProductI18n } from '@/app/hooks/useProductI18n';
import {
  PAYMENT_METHODS,
  SHIPPING_METHODS,
  generateOrderId,
  shippingCost,
} from '@/lib/checkout-options';
import { savePlacedOrder } from '@/lib/placed-orders';

type CheckoutForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  shippingMethod: string;
  paymentMethod: string;
  orderNotes: string;
};

const INITIAL_FORM: CheckoutForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postcode: '',
  country: 'SK',
  shippingMethod: 'standard',
  paymentMethod: 'card',
  orderNotes: '',
};

const STEPS = ['details', 'delivery', 'review'] as const;

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

export default function CheckoutView() {
  const t = useTranslations('Checkout');
  const tHeader = useTranslations('Header');
  const { getProductName } = useProductI18n();
  const formatPrice = useFormatCurrency();
  const router = useRouter();
  const { lines, subtotal, itemCount, clearCart } = useCart();

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (lines.length === 0) {
      router.replace('/cart');
    }
  }, [lines.length, router]);

  const shipping = useMemo(
    () => shippingCost(subtotal, form.shippingMethod),
    [subtotal, form.shippingMethod]
  );
  const total = subtotal + shipping;

  const setField = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateStep = (index: number): boolean => {
    const next: Partial<Record<keyof CheckoutForm, string>> = {};
    if (index === 0) {
      if (!form.firstName.trim()) next.firstName = t('required');
      if (!form.lastName.trim()) next.lastName = t('required');
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        next.email = t('invalidEmail');
      }
      if (!form.phone.trim()) next.phone = t('required');
      if (!form.address.trim()) next.address = t('required');
      if (!form.city.trim()) next.city = t('required');
      if (!form.postcode.trim()) next.postcode = t('required');
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const placeOrder = () => {
    if (!validateStep(0)) {
      setStep(0);
      return;
    }
    setSubmitting(true);
    const orderId = generateOrderId();
    savePlacedOrder({
      id: orderId,
      email: form.email.trim(),
      lines: lines.map((l) => ({ productId: l.product.id, quantity: l.quantity })),
      shipping,
    });
    const params = new URLSearchParams({
      order: orderId,
      email: form.email.trim(),
      total: total.toFixed(2),
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
    });
    clearCart();
    router.push(`/order-confirmation?${params.toString()}`);
  };

  if (lines.length === 0) {
    return (
      <PageShell>
        <main className="container mx-auto px-4 py-16 text-center text-gray-500">
          {t('redirecting')}
        </main>
      </PageShell>
    );
  }

  return (
    <PageShell>

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <nav className="text-sm text-green-600">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-green-700">
                {tHeader('home')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/cart" className="hover:text-green-700">
                {t('breadcrumbCart')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-gray-800">{t('breadcrumbCheckout')}</li>
          </ol>
        </nav>

        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">{t('title')}</h1>

        <ol className="mt-8 flex flex-wrap gap-2 sm:gap-0">
          {STEPS.map((key, index) => {
            const done = index < step;
            const active = index === step;
            return (
              <li
                key={key}
                className={`flex flex-1 items-center gap-2 border-b-2 pb-3 text-sm font-medium sm:px-4 ${
                  active
                    ? 'border-green-500 text-green-600'
                    : done
                      ? 'border-green-300 text-green-600'
                      : 'border-gray-200 text-gray-400'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    done
                      ? 'bg-green-500 text-white'
                      : active
                        ? 'border-2 border-green-500 text-green-600'
                        : 'border border-gray-300 text-gray-400'
                  }`}
                >
                  {done ? <Check className="h-4 w-4" /> : index + 1}
                </span>
                <span className="hidden sm:inline">{t(`steps.${key}`)}</span>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {step === 0 && (
              <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900">{t('contactTitle')}</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <Field id="firstName" label={t('firstName')} required>
                    <input
                      id="firstName"
                      value={form.firstName}
                      onChange={(e) => setField('firstName', e.target.value)}
                      className={inputClass}
                      autoComplete="given-name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
                    )}
                  </Field>
                  <Field id="lastName" label={t('lastName')} required>
                    <input
                      id="lastName"
                      value={form.lastName}
                      onChange={(e) => setField('lastName', e.target.value)}
                      className={inputClass}
                      autoComplete="family-name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
                    )}
                  </Field>
                  <Field id="email" label={t('email')} required>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setField('email', e.target.value)}
                      className={inputClass}
                      autoComplete="email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
                  </Field>
                  <Field id="phone" label={t('phone')} required>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setField('phone', e.target.value)}
                      className={inputClass}
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                    )}
                  </Field>
                </div>

                <h2 className="mt-8 text-lg font-semibold text-gray-900">{t('addressTitle')}</h2>
                <div className="mt-5 grid gap-4">
                  <Field id="address" label={t('address')} required>
                    <input
                      id="address"
                      value={form.address}
                      onChange={(e) => setField('address', e.target.value)}
                      className={inputClass}
                      autoComplete="street-address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-red-600">{errors.address}</p>
                    )}
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field id="city" label={t('city')} required>
                      <input
                        id="city"
                        value={form.city}
                        onChange={(e) => setField('city', e.target.value)}
                        className={inputClass}
                        autoComplete="address-level2"
                      />
                      {errors.city && (
                        <p className="mt-1 text-xs text-red-600">{errors.city}</p>
                      )}
                    </Field>
                    <Field id="postcode" label={t('postcode')} required>
                      <input
                        id="postcode"
                        value={form.postcode}
                        onChange={(e) => setField('postcode', e.target.value)}
                        className={inputClass}
                        autoComplete="postal-code"
                      />
                      {errors.postcode && (
                        <p className="mt-1 text-xs text-red-600">{errors.postcode}</p>
                      )}
                    </Field>
                    <Field id="country" label={t('country')} required>
                      <select
                        id="country"
                        value={form.country}
                        onChange={(e) => setField('country', e.target.value)}
                        className={inputClass}
                      >
                        <option value="SK">{t('countrySK')}</option>
                        <option value="CZ">{t('countryCZ')}</option>
                        <option value="AT">{t('countryAT')}</option>
                      </select>
                    </Field>
                  </div>
                </div>
              </section>
            )}

            {step === 1 && (
              <section className="space-y-6">
                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="text-lg font-semibold text-gray-900">{t('shippingTitle')}</h2>
                  <div className="mt-4 space-y-3">
                    {SHIPPING_METHODS.map((method) => {
                      const methodShipping = shippingCost(subtotal, method.id);
                      const priceLabel =
                        methodShipping === 0 ? t('free') : formatPrice(methodShipping);
                      return (
                        <label
                          key={method.id}
                          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                            form.shippingMethod === method.id
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="shipping"
                            checked={form.shippingMethod === method.id}
                            onChange={() => setField('shippingMethod', method.id)}
                            className="mt-1 text-green-600 focus:ring-green-500"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {t(method.labelKey as Parameters<typeof t>[0])}
                            </p>
                            <p className="text-sm text-gray-500">
                              {t('deliveryDays', { days: method.days })}
                            </p>
                          </div>
                          <span className="shrink-0 font-semibold text-gray-900">{priceLabel}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                  <h2 className="text-lg font-semibold text-gray-900">{t('paymentTitle')}</h2>
                  <div className="mt-4 space-y-3">
                    {PAYMENT_METHODS.map((method) => (
                      <label
                        key={method.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                          form.paymentMethod === method.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={form.paymentMethod === method.id}
                          onChange={() => setField('paymentMethod', method.id)}
                          className="mt-1 text-green-600 focus:ring-green-500"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            {t(method.labelKey as Parameters<typeof t>[0])}
                          </p>
                          <p className="text-sm text-gray-500">
                            {t(method.descriptionKey as Parameters<typeof t>[0])}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-semibold text-gray-900">{t('reviewTitle')}</h2>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {t('shipTo')}
                    </p>
                    <p className="mt-1 font-medium text-gray-900">
                      {form.firstName} {form.lastName}
                    </p>
                    <p className="text-gray-600">{form.address}</p>
                    <p className="text-gray-600">
                      {form.postcode} {form.city}
                    </p>
                    <p className="text-gray-600">{form.email}</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {t('deliveryPayment')}
                    </p>
                    <p className="mt-1 text-gray-900">
                      {t(
                        SHIPPING_METHODS.find((m) => m.id === form.shippingMethod)
                          ?.labelKey as Parameters<typeof t>[0]
                      )}
                    </p>
                    <p className="text-gray-600">
                      {t(
                        PAYMENT_METHODS.find((m) => m.id === form.paymentMethod)
                          ?.labelKey as Parameters<typeof t>[0]
                      )}
                    </p>
                  </div>
                </div>

                <Field id="orderNotes" label={t('orderNotes')}>
                  <textarea
                    id="orderNotes"
                    rows={3}
                    value={form.orderNotes}
                    onChange={(e) => setField('orderNotes', e.target.value)}
                    className={inputClass}
                    placeholder={t('orderNotesPlaceholder')}
                  />
                </Field>

                <ul className="mt-6 divide-y divide-gray-100 border-t border-gray-100 pt-4">
                  {lines.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3 py-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                        <Image
                          src={product.image}
                          alt={getProductName(product)}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {getProductName(product)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t('qtyLine', {
                            qty: quantity,
                            price: formatPrice(product.price),
                          })}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-gray-900">
                        {formatPrice(product.price * quantity)}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="flex flex-wrap gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                  {t('back')}
                </button>
              )}
              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600 sm:flex-none cursor-pointer"
                >
                  {t('continue')}
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={placeOrder}
                  disabled={submitting}
                  className="inline-flex flex-1 items-center justify-center rounded-lg bg-green-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-600 disabled:opacity-60 sm:flex-none cursor-pointer"
                >
                  {submitting ? t('placingOrder') : t('placeOrder')}
                </button>
              )}
            </div>
          </div>

          <aside className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-24 h-fit">
            <h2 className="text-lg font-semibold text-gray-900">{t('orderSummary')}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <dt>{itemCount === 1 ? t('itemOne') : t('itemsMany', { count: itemCount })}</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-gray-600">
                <dt>{t('shipping')}</dt>
                <dd>{shipping === 0 ? t('free') : formatPrice(shipping)}</dd>
              </div>
            </dl>
            <div className="mt-4 flex justify-between border-t border-gray-100 pt-4 text-base font-bold">
              <span>{t('total')}</span>
              <span className="text-green-600">{formatPrice(total)}</span>
            </div>
          </aside>
        </div>
      </main>
    </PageShell>
  );
}
