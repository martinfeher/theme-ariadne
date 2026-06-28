import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Home as HomeIcon } from 'lucide-react';
import PageShell from '@/app/components/PageShell';
import PopularProducts from '@/app/components/PopularProducts';
import WeeklyDiscounts from '@/app/components/WeeklyDiscounts';
import FreshInSeason from '@/app/components/FreshInSeason';
import TopSellingProducts from '@/app/components/TopSellingProducts';
import FeaturedVendors from '@/app/components/FeaturedVendors';

export default async function Home4View() {
  const t4 = await getTranslations('Home4');
  const tHeader = await getTranslations('Header');

  return (
    <PageShell>
      <main>
        <section className="container mx-auto px-4 py-6">
          <nav
            className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-slate-600"
            aria-label={t4('breadcrumbNav')}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-md hover:text-[#3BB77E]"
            >
              <HomeIcon className="h-4 w-4" aria-hidden />
              {tHeader('home')}
            </Link>
            <span className="text-slate-400" aria-hidden>
              /
            </span>
            <span className="font-medium text-slate-800">{tHeader('homeMenu4')}</span>
          </nav>

          <div className="relative mb-8 aspect-[1871/670] w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-gray-100">
            <Image
              src="/images/hero_image.jpg"
              alt={t4('heroImageAlt')}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </section>

        <PopularProducts />
        <FreshInSeason />
        <WeeklyDiscounts />
        <TopSellingProducts />
        <FeaturedVendors />
      </main>
    </PageShell>
  );
}
