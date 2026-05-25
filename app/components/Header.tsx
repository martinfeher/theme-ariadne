'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import { MapPin } from 'lucide-react';
import { Combobox } from '@/components/ui/combobox';
import SearchBarWithSuggestions from '@/app/components/SearchBarWithSuggestions';
import HeaderTopBar from '@/app/components/HeaderTopBar';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import ShoppingCartIcon from '@/app/components/icons/ShoppingCartIcon';
import CategoriesMegaMenu, { MobileCategoriesNav } from '@/app/components/CategoriesMegaMenu';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import { useWishlist } from '@/app/context/WishlistContext';
import { useCompare } from '@/app/context/CompareContext';

/** Show fixed search + cart bar after scrolling past this many pixels */
const SCROLL_Y_SHOW_FIXED_BAR = 100;

const locationOptions = [
  { value: "bratislava", label: "Bratislava" },
  { value: "kosice", label: "Košice" },
  { value: "presov", label: "Prešov" },
  { value: "zilina", label: "Žilina" },
  { value: "nitra", label: "Nitra" },
  { value: "trnava", label: "Trnava" },
  { value: "trencin", label: "Trenčín" },
  { value: "banska-bystrica", label: "Banská Bystrica" },
  { value: "poprad", label: "Poprad" },
  { value: "martin", label: "Martin" },
  { value: "zvolen", label: "Zvolen" },
  { value: "michalovce", label: "Michalovce" },
  { value: "prievidza", label: "Prievidza" },
  { value: "levoca", label: "Levoča" },
  { value: "ruzomberok", label: "Ružomberok" },
] as const;

const HOME_MENU_SLUGS = ['home-1', 'home-2', 'home-3', 'home-4'] as const;
const BLOG_SAMPLE_SLUG = 'seasonal-spring-produce';

function homeMenuHref(slug: (typeof HOME_MENU_SLUGS)[number]) {
  return slug === 'home-1' ? '/' : `/home/${slug}`;
}

function BlogMenuNav() {
  const t = useTranslations('Header');
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/blog', label: t('blogGrid') },
    { href: '/blog/list', label: t('blogList') },
    { href: '/blog/category/recipes', label: t('blogCategory') },
    { href: '/blog/tag/seasonal', label: t('blogTag') },
    { href: '/blog/author/ariadne-team', label: t('blogAuthor') },
    { href: `/blog/${BLOG_SAMPLE_SLUG}`, label: t('blogPostSidebar') },
    { href: `/blog/${BLOG_SAMPLE_SLUG}/full`, label: t('blogPostFull') },
  ] as const;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/blog"
        className={
          open
            ? 'flex items-center gap-1 font-medium text-green-600 transition-colors'
            : 'flex items-center gap-1 font-medium text-gray-700 transition-colors hover:text-green-600'
        }
        aria-expanded={open ? 'true' : 'false'}
        aria-haspopup="true"
      >
        <span>{t('blog')}</span>
        <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-[55] min-w-[14rem] rounded-lg border border-gray-100 bg-white py-1.5 shadow-lg"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              role="menuitem"
              className="block px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-green-600"
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function HomeMenuNav() {
  const t = useTranslations('Header');
  const [open, setOpen] = useState(false);
  const menuKeys = ['homeMenu1', 'homeMenu2', 'homeMenu3', 'homeMenu4'] as const;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/"
        className={
          open
            ? 'flex items-center gap-1 font-medium text-green-600 transition-colors'
            : 'flex items-center gap-1 font-medium text-gray-700 transition-colors hover:text-green-600'
        }
        aria-expanded={open ? 'true' : 'false'}
        aria-haspopup="true"
      >
        <span>{t('home')}</span>
        <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-[55] min-w-[12rem] rounded-lg border border-gray-100 bg-white py-1.5 shadow-lg"
        >
          {HOME_MENU_SLUGS.map((slug, i) => (
            <Link
              key={slug}
              href={homeMenuHref(slug)}
              role="menuitem"
              className="block px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-green-600"
              onClick={() => setOpen(false)}
            >
              {t(menuKeys[i])}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function BrowseCategoriesControl({
  isOpen,
  onOpenRequest,
  onToggle,
  onCloseRequest,
  compact,
  showMenu = true,
}: {
  isOpen: boolean;
  onOpenRequest: () => void;
  onToggle: () => void;
  onCloseRequest: () => void;
  compact?: boolean;
  /** When false, only the trigger is rendered (mega panel rendered elsewhere). */
  showMenu?: boolean;
}) {
  const t = useTranslations('Header');

  return (
    <div
      className="relative overflow-visible"
      onMouseEnter={onOpenRequest}
      onMouseLeave={onCloseRequest}
    >
      <button
        type="button"
        onClick={onToggle}
        className={
          compact
            ? `flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-white transition-colors ${
                isOpen ? 'bg-green-600 ring-2 ring-green-200' : 'bg-green-500 hover:bg-green-600'
              }`
            : `flex cursor-pointer items-center space-x-2 rounded-lg pl-4 pr-2 py-2 text-white transition-colors ${
                isOpen ? 'bg-green-600 ring-2 ring-green-200' : 'bg-green-500 hover:bg-green-600'
              }`
        }
        aria-label={t('browseCategories')}
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-haspopup="true"
      >
        <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
        {!compact && (
          <>
            <span className="whitespace-nowrap">{t('browseCategories')}</span>
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </>
        )}
      </button>

      {showMenu && isOpen && (
        <CategoriesMegaMenu
          onClose={onCloseRequest}
          variant={compact ? 'compact' : 'full'}
        />
      )}
    </div>
  );
}

const Header = () => {
  const t = useTranslations('Header');
  const tAuth = useTranslations('Auth');
  const router = useRouter();
  const { user, logout } = useAuth();
  const { itemCount, openCart, toggleCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { count: compareCount } = useCompare();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFixedSearchCart, setShowFixedSearchCart] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowFixedSearchCart(window.scrollY > SCROLL_Y_SHOW_FIXED_BAR);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submitSearch = () => {
    const params = new URLSearchParams();
    const q = searchQuery.trim();
    if (q) params.set('q', q);
    if (selectedCategory && selectedCategory !== 'all') {
      params.set('category', selectedCategory);
    }
    const qs = params.toString();
    router.push(qs ? `/search?${qs}` : '/search');
    setIsMobileMenuOpen(false);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitSearch();
  }

  const toggleCategories = () => setIsCategoriesOpen((o) => !o);
  const openCategories = () => setIsCategoriesOpen(true);
  const closeCategories = () => setIsCategoriesOpen(false);

  const handleSignOut = () => {
    logout();
    setIsAccountOpen(false);
    router.push('/login');
  };

  return (
    <header className="header-area header-style-1 header-height-2">
      <HeaderTopBar />
      {showFixedSearchCart && (
        <>
          <div className="fixed inset-x-0 top-0 z-200 w-full overflow-visible border-b border-[#c9ccb8] bg-[#ecede2] pt-[max(0.5rem,env(safe-area-inset-top))] shadow-sm">
            <div className="container mx-auto flex items-center gap-2 px-4 pb-2 sm:gap-3">
              <div className="hidden shrink-0 lg:block">
                <BrowseCategoriesControl
                  isOpen={isCategoriesOpen}
                  onOpenRequest={openCategories}
                  onToggle={toggleCategories}
                  onCloseRequest={closeCategories}
                />
              </div>
              <div className="shrink-0 lg:hidden">
                <BrowseCategoriesControl
                  isOpen={isCategoriesOpen}
                  onOpenRequest={openCategories}
                  onToggle={toggleCategories}
                  onCloseRequest={closeCategories}
                  compact
                />
              </div>
              <div className="min-w-0 flex-1 overflow-visible">
                <div className="hidden lg:block">
                  <SearchBarWithSuggestions
                    variant="desktop"
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    onSubmit={handleSearchSubmit}
                  />
                </div>
                <div className="lg:hidden">
                  <SearchBarWithSuggestions
                    variant="mobile"
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    onSubmit={handleSearchSubmit}
                  />
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-center pt-0.5 ml-1 lg:ml-4 group cursor-pointer" onClick={toggleCart}>
                <div className="relative">
                  <button
                    type="button"
                    className="cursor-pointer text-gray-600 group-hover:text-green-500"
                    aria-label={t('viewCart')}
                  >
                    <ShoppingCartIcon className="h-6 w-6" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-500 px-1 text-xs text-white">
                        {itemCount > 99 ? '99+' : itemCount}
                      </span>
                    )}
                  </button>
                </div>
                <span className="mt-0.5 hidden text-xs text-gray-500 sm:inline group-hover:text-green-500">{t('cart')}</span>
              </div>
            </div>
          </div>
          <div
            className="h-[calc(env(safe-area-inset-top,0px)+4.75rem)] shrink-0 lg:h-[calc(env(safe-area-inset-top,0px)+5.75rem)]"
            aria-hidden
          />
        </>
      )}

      {/* Mobile Promotion */}
      <div className="bg-green-500 text-white text-center py-2 text-sm lg:hidden">
        <span>{t('promo')}</span>
      </div>

      {/* Header Middle */}
      <div className="hidden lg:block py-4 bg-[#f3f4f5]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="shrink-0">
              <Link href="/">
                <Image src="/logo.svg" alt="WebAriadne" width={120} height={40} className="h-[42px] w-auto" />
              </Link>
            </div>

            {/* Search bar + live suggestions (hidden while fixed bar is active) */}
            <div
              className={`mx-8 max-w-2xl flex-1 overflow-visible rounded-xl ${showFixedSearchCart ? 'hidden' : ''}`}
            >
              <SearchBarWithSuggestions
                variant="desktop"
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                onSubmit={handleSearchSubmit}
              />
            </div>

            <div className="flex items-center">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Combobox
                    options={locationOptions}
                    value={selectedLocation}
                    onValueChange={setSelectedLocation}
                    placeholder={t('locationPlaceholder')}
                    leadingIcon={
                      <MapPin className="h-5 w-5 shrink-0 text-gray-400" strokeWidth={1.5} aria-hidden />
                    }
                    className="h-10 w-[190px] cursor-pointer border border-gray-200 bg-white px-3 py-2 text-sm font-normal shadow-[1px_1px_3px_rgba(0,0,0,0.08)] hover:border-gray-300 hover:bg-gray-50/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/35 focus-visible:ring-offset-0"
                    boxClassName="z-[60] w-[190px] -mt-[5px]"
                  />
                </div>

              <Link
                href="/compare"
                className="flex flex-col items-center group w-10"
                aria-label={
                  compareCount > 0
                    ? t('compareWithCount', { count: compareCount })
                    : t('compareProducts')
                }
              >
                <div className="relative group-hover:text-green-500">
                  <svg className="w-6 h-6" fill="currentColor" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1,8A1,1,0,0,1,2,7H9.586L7.293,4.707A1,1,0,1,1,8.707,3.293l4,4a1,1,0,0,1,0,1.414l-4,4a1,1,0,1,1-1.414-1.414L9.586,9H2A1,1,0,0,1,1,8Zm21,7H14.414l2.293-2.293a1,1,0,0,0-1.414-1.414l-4,4a1,1,0,0,0,0,1.414l4,4a1,1,0,0,0,1.414-1.414L14.414,17H22a1,1,0,0,0,0-2Z" />
                  </svg>
                  {compareCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex min-h-[1.25rem] min-w-[1.25rem] items-center justify-center rounded-full border text-white border-green-200 bg-teal-500 px-1 text-[10px] font-bold text-white">
                      {compareCount}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-1 cursor-pointer group-hover:text-green-500 ">
                  {t('compare')}
                </span>
              </Link>
         

              <Link href="/wishlist" className="flex flex-col items-center group w-10 mb-[4px] text-gray-600 group-hover:text-green-500">
                <div className="relative group-hover:text-green-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-teal-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 px-1 flex items-center justify-center">
                      {wishlistCount > 99 ? '99+' : wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500 cursor-pointer mt-[6px] group-hover:text-green-500">{t('wishlist')}</span>
              </Link>
         

              <div
                className="group relative mt-[1px] flex w-10 flex-col items-center"
                onMouseEnter={() => setIsAccountOpen(true)}
                onMouseLeave={() => setIsAccountOpen(false)}
              >
                <div className="relative">
                  <button
                    type="button"
                    className="cursor-pointer text-gray-600 group-hover:text-green-500"
                    aria-label={t('accountMenu')}
                    aria-expanded={isAccountOpen}
                    aria-haspopup="true"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>
                </div>
                <span className="mt-0 cursor-pointer text-xs text-gray-500 group-hover:text-green-500">{t('account')}</span>

                {isAccountOpen && (
                  <div className="absolute right-0 top-full z-[55] w-48 pt-1.5">
                    <div
                      role="menu"
                      className="rounded-lg border border-gray-100 bg-white shadow-xl"
                    >
                    <div className="py-2">
                      <Link
                        href="/account"
                        role="menuitem"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsAccountOpen(false)}
                      >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          {t('myAccount')}
                        </Link>
                        <Link
                          href="/order-tracking"
                          role="menuitem"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {t('orderTracking')}
                        </Link>
                        <Link
                          href="/vouchers"
                          role="menuitem"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                          {t('myVoucher')}
                        </Link>
                        <Link
                          href="/wishlist"
                          role="menuitem"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          {t('myWishlist')}
                        </Link>
                        <hr className="my-2" />
                        {user ? (
                          <button
                            type="button"
                            role="menuitem"
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={handleSignOut}
                          >
                            <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                            </svg>
                            {t('signOut')}
                          </button>
                        ) : (
                          <>
                            <Link
                              href="/login"
                              role="menuitem"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsAccountOpen(false)}
                            >
                              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              {tAuth('signIn')}
                            </Link>
                            <Link
                              href="/register"
                              role="menuitem"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsAccountOpen(false)}
                            >
                              <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                              </svg>
                              {tAuth('signUp')}
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div
                className={`relative group mt-[2px] flex flex-col items-center w-6 ${showFixedSearchCart ? 'hidden' : ''}`}
              >
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleCart}
                    className="group cursor-pointer text-gray-600"
                    aria-label={t('viewCart')}
                  >
                    <ShoppingCartIcon className="h-6 w-6 group-hover:text-green-500" />
                    {itemCount > 0 && (
                      <span className="absolute -top-2 -right-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-teal-500 px-1 text-xs text-white">
                        {itemCount > 99 ? '99+' : itemCount}
                      </span>
                    )}
                  </button>
                </div>
                <span className="cursor-pointer text-xs text-gray-500 group-hover:text-green-500">{t('cart')}</span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Bottom - Navigation */}
      <div className={`relative ${isCategoriesOpen && !showFixedSearchCart ? 'z-[70]' : ''}`}>
        <div className="border-t bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
            {/* Mobile Logo */}
            <div className="lg:hidden">
              <Link href="/">
                <Image src="/logo.svg" alt="Nest" width={100} height={32} className="h-8 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {!showFixedSearchCart && (
                <div
                  className="relative"
                  onMouseEnter={openCategories}
                  onMouseLeave={closeCategories}
                >
                  <BrowseCategoriesControl
                    isOpen={isCategoriesOpen}
                    onOpenRequest={openCategories}
                    onToggle={toggleCategories}
                    onCloseRequest={closeCategories}
                    showMenu={false}
                  />
                  {isCategoriesOpen && (
                    <div className="absolute left-1/2 top-full z-[60] w-screen max-w-none -translate-x-1/2 pt-1.5">
                      <CategoriesMegaMenu variant="full" onClose={closeCategories} />
                    </div>
                  )}
                </div>
              )}

              {/* Main Navigation */}
              <nav className="flex items-center space-x-8">
                <HomeMenuNav />
                <Link href="/about" className="text-gray-700 hover:text-green-500 font-medium">{t('about')}</Link>

                <div className="relative group">
                  <Link href="/vendors" className="flex items-center space-x-1 text-gray-700 hover:text-green-500 font-medium">
                    <span>{t('vendors')}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>

                <BlogMenuNav />

                <div className="relative group">
                  <Link href="/pages" className="flex items-center space-x-1 text-gray-700 hover:text-green-500 font-medium">
                    <span>{t('pages')}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>

                <Link href="/contact" className="text-gray-700 hover:text-green-500 font-medium">{t('contact')}</Link>
              </nav>
            </div>
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col space-y-1"
              aria-label={t('toggleMenu')}
            >
              <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>

            <div className="flex items-center space-x-3 lg:hidden">
              <LanguageSwitcher />
              <Link
                href="/compare"
                className="relative text-gray-600 group-hover:text-green-500"
                aria-label={
                  compareCount > 0
                    ? t('compareWithCount', { count: compareCount })
                    : t('compareProducts')
                }
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {compareCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full border border-green-200 bg-green-100 px-0.5 text-[9px] font-bold text-green-800">
                    {compareCount}
                  </span>
                )}
              </Link>
              <Link href="/wishlist" className="relative text-gray-600">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-0.5 text-[10px] text-white">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
              </Link>
              {!showFixedSearchCart && (
                <button
                  type="button"
                  onClick={openCart}
                  className="relative text-gray-600"
                  aria-label={t('openCart')}
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                  </svg>
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-500 px-0.5 text-[10px] text-white">
                      {itemCount > 99 ? '99+' : itemCount}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="overflow-visible border-t bg-white lg:hidden">
            <div className="space-y-4 px-4 py-4">
              <SearchBarWithSuggestions
                variant="mobile"
                searchQuery={searchQuery}
                onSearchQueryChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                onSubmit={handleSearchSubmit}
                onAfterSuggestionPick={() => setIsMobileMenuOpen(false)}
              />

              {/* Mobile Navigation Links */}
              <nav className="space-y-2">
                <div className="py-2">
                  <p className="font-medium text-gray-700">{t('mobileCategories')}</p>
                  <div className="mt-3">
                    <MobileCategoriesNav onClose={() => setIsMobileMenuOpen(false)} />
                  </div>
                </div>
                <div className="py-2">
                  <Link href="/" className="font-medium text-gray-700 hover:text-green-500">
                    {t('home')}
                  </Link>
                  <ul className="mt-1 space-y-1 border-l border-gray-200 pl-3">
                    {HOME_MENU_SLUGS.map((slug, i) => {
                      const keys = ['homeMenu1', 'homeMenu2', 'homeMenu3', 'homeMenu4'] as const;
                      return (
                        <li key={slug}>
                          <Link
                            href={homeMenuHref(slug)}
                            className="block py-1 text-sm text-gray-600 hover:text-green-600"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {t(keys[i])}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Link href="/about" className="block py-2 text-gray-700 hover:text-green-500 font-medium">{t('about')}</Link>
                <Link href="/vendors" className="block py-2 text-gray-700 hover:text-green-500 font-medium">{t('vendors')}</Link>
                <div>
                  <Link
                    href="/blog"
                    className="block py-2 font-medium text-gray-700 hover:text-green-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('blog')}
                  </Link>
                  <ul className="mt-1 space-y-1 border-l border-gray-200 pl-3">
                    {[
                      { href: '/blog', label: t('blogGrid') },
                      { href: '/blog/list', label: t('blogList') },
                      { href: '/blog/category/recipes', label: t('blogCategory') },
                      { href: '/blog/tag/seasonal', label: t('blogTag') },
                      { href: '/blog/author/ariadne-team', label: t('blogAuthor') },
                      { href: `/blog/${BLOG_SAMPLE_SLUG}`, label: t('blogPostSidebar') },
                      { href: `/blog/${BLOG_SAMPLE_SLUG}/full`, label: t('blogPostFull') },
                    ].map(({ href, label }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="block py-1 text-sm text-gray-600 hover:text-green-600"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/contact" className="block py-2 text-gray-700 hover:text-green-500 font-medium">{t('contact')}</Link>
              </nav>

              {/* Mobile Account Links */}
              <div className="border-t pt-4 space-y-2">
                {user ? (
                  <>
                    <Link href="/account" className="block py-2 text-gray-600 hover:text-green-500">{t('myAccount')}</Link>
                    <button
                      type="button"
                      className="block w-full py-2 text-left text-gray-600 hover:text-green-500 cursor-pointer"
                      onClick={handleSignOut}
                    >
                      {t('signOut')}
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block py-2 text-gray-600 hover:text-green-500">{tAuth('signIn')}</Link>
                    <Link href="/register" className="block py-2 text-gray-600 hover:text-green-500">{tAuth('signUp')}</Link>
                  </>
                )}
                <Link href="/order-tracking" className="block py-2 text-gray-600 hover:text-green-500">{t('orderTracking')}</Link>
                <Link href="/wishlist" className="block py-2 text-gray-600 hover:text-green-500">{t('wishlist')}</Link>
                <Link href="/compare" className="block py-2 text-gray-600 hover:text-green-500">{t('compare')}</Link>
              </div>

              {/* Mobile Support */}
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">{t('needHelp')}</p>
                <p className="text-md font-bold text-green-500">+ 1800 900</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
