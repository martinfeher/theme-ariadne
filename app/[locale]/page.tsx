import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import Header from '../components/Header';
import PopularProducts from '../components/PopularProducts';

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        <section className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{t('welcome')}</h1>
            <p className="text-lg text-gray-600 mb-8">{t('subtitle')}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-green-500 text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t('freeShipping')}
                </h3>
                <p className="text-gray-600">{t('freeShippingDesc')}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-green-500 text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {t('securePayment')}
                </h3>
                <p className="text-gray-600">{t('securePaymentDesc')}</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-green-500 text-4xl mb-4">📞</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('support')}</h3>
                <p className="text-gray-600">{t('supportDesc')}</p>
              </div>
            </div>
          </div>
        </section>

        <PopularProducts />
      </main>
    </div>
  );
}
