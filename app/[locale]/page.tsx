import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import PageShell from '../components/PageShell';
import PopularProducts from '../components/PopularProducts';
import WeeklyDiscounts from '../components/WeeklyDiscounts';
import TopSellingProducts from '../components/TopSellingProducts';
import FreshInSeason from '../components/FreshInSeason';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  return (
    <PageShell>
      <main>
        <section className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('welcome')}</h1>
            <p className="text-lg text-gray-600 mb-8">{t('subtitle')}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg bg-[#FFF0E8] p-6 shadow-sm ring-1 ring-orange-100/70">
                <div className="text-orange-500 text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t('freeShipping')}
                </h3>
                <p className="text-gray-600">{t('freeShippingDesc')}</p>
              </div>

              <div className="rounded-lg bg-[#EAF3FC] p-6 shadow-sm ring-1 ring-sky-100/70">
                <div className="text-sky-500 text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t('securePayment')}
                </h3>
                <p className="text-gray-600">{t('securePaymentDesc')}</p>
              </div>

              <div className="rounded-lg bg-[#E6F6F0] p-6 shadow-sm ring-1 ring-teal-100/70">
                <div className="text-teal-500 text-4xl mb-4">📞</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('support')}</h3>
                <p className="text-gray-600">{t('supportDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        <PopularProducts />
        <WeeklyDiscounts />
        <FreshInSeason />
        <TopSellingProducts />
      </main>
    </PageShell>
  );
}
