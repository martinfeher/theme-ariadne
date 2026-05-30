'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/navigation';
import {
  ArrowLeftRight,
  ChevronDown,
  Flame,
  Heart,
  LayoutGrid,
  LogIn,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShoppingCart,
  Ticket,
  User,
  UserPlus,
} from 'lucide-react';
import SearchBarWithSuggestions from '@/app/components/SearchBarWithSuggestions';
import HeaderTopBar from '@/app/components/HeaderTopBar';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import DeliveryLocationPicker from '@/app/components/header/DeliveryLocationPicker';
import CategoriesMegaMenu, { MobileCategoriesNav } from '@/app/components/CategoriesMegaMenu';
import { useCart } from '@/app/context/CartContext';
import { useAuth } from '@/app/context/AuthContext';
import { useWishlist } from '@/app/context/WishlistContext';
import { useCompare } from '@/app/context/CompareContext';

/** Show fixed search + cart bar after scrolling past this many pixels */
const SCROLL_Y_SHOW_FIXED_BAR = 100;

/** Shared header icon styling — Lucide stroke icons only */
const ICON = 'h-6 w-6';
const ICON_STROKE = 1.75;
const MENU_ICON = 'mr-3 h-4 w-4 shrink-0';

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
        <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={ICON_STROKE} aria-hidden />
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

function PagesMenuNav() {
  const t = useTranslations('Header');
  const [open, setOpen] = useState(false);

  const links = [
    { href: '/account', label: t('pagesMenuAccount') },
    { href: '/account/settings', label: t('pagesMenuAccountSettings') },
    { href: '/pages', label: t('pagesMenuHub') },
    { href: '/about', label: t('pagesMenuAbout') },
    { href: '/about-2', label: t('pagesMenuAbout2') },
    { href: '/deals', label: t('pagesMenuDeals') },
    { href: '/contact', label: t('pagesMenuContact') },
    { href: '/faq', label: t('pagesMenuFaq') },
    { href: '/refund-policy', label: t('pagesMenuRefundPolicy') },
    { href: '/privacy', label: t('pagesMenuPrivacy') },
    { href: '/terms', label: t('pagesMenuTerms') },
    { href: '/order-history', label: t('pagesMenuOrderHistory') },
    { href: '/order-tracking', label: t('pagesMenuOrderTracking') },
    { href: '/login', label: t('pagesMenuLogin') },
    { href: '/register', label: t('pagesMenuRegister') },
    { href: '/404', label: t('pagesMenu404') },
    { href: '/500', label: t('pagesMenu500') },
    { href: '/maintenance', label: t('pagesMenuMaintenance') },
    { href: '/coming-soon', label: t('pagesMenuComingSoon') },
  ] as const;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href="/pages"
        className={
          open
            ? 'flex items-center gap-1 font-medium text-green-600 transition-colors'
            : 'flex items-center gap-1 font-medium text-gray-700 transition-colors hover:text-green-600'
        }
        aria-expanded={open ? 'true' : 'false'}
        aria-haspopup="true"
      >
        <span>{t('pages')}</span>
        <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={ICON_STROKE} aria-hidden />
      </Link>
      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-[55] max-h-[min(24rem,70vh)] min-w-[14rem] overflow-y-auto rounded-lg border border-gray-100 bg-white py-1.5 shadow-lg"
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
        <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={ICON_STROKE} aria-hidden />
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
      {...(showMenu
        ? { onMouseEnter: onOpenRequest, onMouseLeave: onCloseRequest }
        : {})}
    >
      <button
        type="button"
        onClick={onToggle}
        className={
          compact
            ? `flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-white transition-colors ${
                isOpen ? 'bg-green-800 ring-2 ring-green-200' : 'bg-green-700 hover:bg-green-800'
              }`
            : `flex cursor-pointer items-center space-x-2 rounded-lg pl-4 pr-2 py-2 text-white transition-colors ${
                isOpen ? 'bg-green-800 ring-2 ring-green-200' : 'bg-green-700 hover:bg-green-800'
              }`
        }
        aria-label={t('browseCategories')}
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-haspopup="true"
      >
        <LayoutGrid className="h-5 w-5 shrink-0" strokeWidth={ICON_STROKE} aria-hidden />
        {!compact && (
          <>
            <span className="whitespace-nowrap">{t('browseCategories')}</span>
            <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={ICON_STROKE} aria-hidden />
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
    <header className="header-area header-style-1 header-height-2 relative z-50 overflow-visible">
      <HeaderTopBar />
      {showFixedSearchCart && (
        <>
          <div className="fixed inset-x-0 top-0 z-200 w-full overflow-visible border-b border-[#c9ccb8] bg-[#ecede2] pt-[max(0.5rem,env(safe-area-inset-top))] shadow-sm">
            <div className="container relative mx-auto overflow-visible px-4 pb-2">
              {/* Toolbar: categories + search + cart stay on one row when mega menu opens */}
              <div className="relative z-10 flex items-center gap-2 bg-[#ecede2] sm:gap-3">
                <div
                  className="relative hidden shrink-0 lg:block"
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
                    <div className="absolute left-0 top-full z-[100] -mt-px w-[min(56rem,calc(100vw-2rem))] before:absolute before:inset-x-0 before:bottom-full before:h-2 before:content-['']">
                      <CategoriesMegaMenu variant="full" onClose={closeCategories} />
                    </div>
                  )}
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
                <div
                  className="group ml-1 flex shrink-0 cursor-pointer flex-col items-center pt-0.5 lg:ml-4"
                  onClick={toggleCart}
                >
                  <div className="relative">
                    <button
                      type="button"
                      className="cursor-pointer text-gray-600 group-hover:text-green-500"
                      aria-label={t('viewCart')}
                    >
                      <ShoppingCart className={ICON} strokeWidth={ICON_STROKE} />
                      {itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-500 px-1 text-xs text-white">
                          {itemCount > 99 ? '99+' : itemCount}
                        </span>
                      )}
                    </button>
                  </div>
                  <span className="mt-0.5 hidden text-xs text-gray-500 sm:inline group-hover:text-green-500">
                    {t('cart')}
                  </span>
                </div>
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

            {/* Search + delivery city on one row */}
            <div
              className={`mx-8 flex min-w-0 flex-1 max-w-4xl items-center gap-3 overflow-visible ${showFixedSearchCart ? 'hidden' : ''}`}
            >
              <div className="min-w-0 flex-1">
                <SearchBarWithSuggestions
                  variant="desktop"
                  searchQuery={searchQuery}
                  onSearchQueryChange={setSearchQuery}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  onSubmit={handleSearchSubmit}
                />
              </div>
         
            </div>
            <DeliveryLocationPicker
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              />

            <div className="flex items-center ml-6">
              <div className="flex items-center gap-5">
              <Link
                href="/compare"
                className="group flex w-10 flex-col items-center text-gray-600"
                aria-label={
                  compareCount > 0
                    ? t('compareWithCount', { count: compareCount })
                    : t('compareProducts')
                }
              >
                <div className="relative text-gray-600 transition-colors group-hover:text-green-600">
                  <ArrowLeftRight className={ICON} strokeWidth={ICON_STROKE} />
                  {compareCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex min-h-[1.25rem] min-w-[1.25rem] items-center justify-center rounded-full border text-white border-green-200 bg-teal-500 px-1 text-[10px] font-bold text-white">
                      {compareCount}
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500 mt-1 cursor-pointer group-hover:text-green-600 ">
                  {t('compare')}
                </span>
              </Link>
         

              <Link href="/wishlist" className="group flex w-10 flex-col items-center text-gray-600">
                <div className="relative transition-colors group-hover:text-green-600">
                  <Heart className={ICON} strokeWidth={ICON_STROKE} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-teal-500 text-white text-xs rounded-full min-w-[1.25rem] h-5 px-1 flex items-center justify-center">
                      {wishlistCount > 99 ? '99+' : wishlistCount}
                    </span>
                  )}
                </div>
                <span className="mt-1 cursor-pointer text-xs text-gray-500 group-hover:text-green-600">{t('wishlist')}</span>
              </Link>
         

              <div
                className="group relative mt-[1px] flex w-10 flex-col items-center"
                onMouseEnter={() => setIsAccountOpen(true)}
                onMouseLeave={() => setIsAccountOpen(false)}
              >
                <div className="relative">
                  <button
                    type="button"
                    className="cursor-pointer text-gray-600 transition-colors group-hover:text-green-600"
                    aria-label={t('accountMenu')}
                    aria-expanded={isAccountOpen}
                    aria-haspopup="true"
                  >
                    <User className={ICON} strokeWidth={ICON_STROKE} />
                  </button>
                </div>
                <span className="mt-0 cursor-pointer text-xs text-gray-500 group-hover:text-green-600">{t('account')}</span>

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
                          <User className={MENU_ICON} strokeWidth={ICON_STROKE} aria-hidden />
                          {t('myAccount')}
                        </Link>
                        <Link
                          href="/account/settings"
                          role="menuitem"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          <Settings className={MENU_ICON} strokeWidth={ICON_STROKE} aria-hidden />
                          {t('settings')}
                        </Link>
                        <Link
                          href="/order-history"
                          role="menuitem"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          <Package className={MENU_ICON} strokeWidth={ICON_STROKE} aria-hidden />
                          {t('orderHistory')}
                        </Link>
                        <Link
                          href="/order-tracking"
                          role="menuitem"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          <MapPin className={MENU_ICON} strokeWidth={ICON_STROKE} aria-hidden />
                          {t('orderTracking')}
                        </Link>
                        <Link
                          href="/vouchers"
                          role="menuitem"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          <Ticket className={MENU_ICON} strokeWidth={ICON_STROKE} aria-hidden />
                          {t('myVoucher')}
                        </Link>
                        <Link
                          href="/wishlist"
                          role="menuitem"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          <Heart className={MENU_ICON} strokeWidth={ICON_STROKE} aria-hidden />
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
                            <LogOut className={MENU_ICON} strokeWidth={ICON_STROKE} aria-hidden />
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
                              <LogIn className={MENU_ICON} strokeWidth={ICON_STROKE} aria-hidden />
                              {tAuth('signIn')}
                            </Link>
                            <Link
                              href="/register"
                              role="menuitem"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => setIsAccountOpen(false)}
                            >
                              <UserPlus className={MENU_ICON} strokeWidth={ICON_STROKE} aria-hidden />
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
                    className="group cursor-pointer text-gray-600 transition-colors hover:text-green-600"
                    aria-label={t('viewCart')}
                  >
                    <ShoppingCart className={`${ICON} group-hover:text-green-600`} strokeWidth={ICON_STROKE} />
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
      <div className="relative overflow-visible">
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
                    <div className="absolute left-0 top-full z-[100] -mt-px w-[min(56rem,calc(100vw-2rem))] before:absolute before:inset-x-0 before:bottom-full before:h-2 before:content-['']">
                      <CategoriesMegaMenu variant="full" onClose={closeCategories} />
                    </div>
                  )}
                </div>
              )}

              {/* Main Navigation */}
              <nav className="flex items-center space-x-8">
                <HomeMenuNav />
                <Link href="/about" className="text-gray-700 hover:text-green-500 font-medium">{t('about')}</Link>

                <Link
                  href="/deals"
                  className="flex items-center gap-1.5 font-medium text-orange-600 transition-colors hover:text-orange-700"
                >
                  <Flame className="h-4 w-4" aria-hidden />
                  {t('deals')}
                </Link>

                <Link href="/vendors" className="flex items-center gap-1 font-medium text-gray-700 transition-colors hover:text-green-600">
                  <span>{t('vendors')}</span>
                  <ChevronDown className="h-4 w-4" strokeWidth={ICON_STROKE} aria-hidden />
                </Link>

                <BlogMenuNav />

                <PagesMenuNav />

                <Link href="/faq" className="text-gray-700 hover:text-green-500 font-medium">{t('faq')}</Link>

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
                className="group relative text-gray-600 transition-colors hover:text-green-600"
                aria-label={
                  compareCount > 0
                    ? t('compareWithCount', { count: compareCount })
                    : t('compareProducts')
                }
              >
                <ArrowLeftRight className={ICON} strokeWidth={ICON_STROKE} />
                {compareCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full border border-green-200 bg-green-100 px-0.5 text-[9px] font-bold text-green-800">
                    {compareCount}
                  </span>
                )}
              </Link>
              <Link
                href="/wishlist"
                className="relative text-gray-600 transition-colors hover:text-green-600"
                aria-label={t('wishlist')}
              >
                <Heart className={ICON} strokeWidth={ICON_STROKE} />
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
                  className="relative text-gray-600 transition-colors hover:text-green-600"
                  aria-label={t('openCart')}
                >
                  <ShoppingCart className={ICON} strokeWidth={ICON_STROKE} />
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

              <DeliveryLocationPicker
                value={selectedLocation}
                onValueChange={setSelectedLocation}
                className="w-full"
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
                <Link href="/deals" className="flex items-center gap-1.5 py-2 font-medium text-orange-600 hover:text-orange-700">
                  <Flame className="h-4 w-4" aria-hidden />
                  {t('deals')}
                </Link>
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
                <div>
                  <Link
                    href="/pages"
                    className="block py-2 font-medium text-gray-700 hover:text-green-500"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('pages')}
                  </Link>
                  <ul className="mt-1 max-h-48 space-y-1 overflow-y-auto border-l border-gray-200 pl-3">
                    {[
                      { href: '/account', label: t('pagesMenuAccount') },
                      { href: '/account/settings', label: t('pagesMenuAccountSettings') },
                      { href: '/pages', label: t('pagesMenuHub') },
                      { href: '/about', label: t('pagesMenuAbout') },
                      { href: '/about-2', label: t('pagesMenuAbout2') },
                      { href: '/deals', label: t('pagesMenuDeals') },
                      { href: '/contact', label: t('pagesMenuContact') },
                      { href: '/faq', label: t('pagesMenuFaq') },
                      { href: '/refund-policy', label: t('pagesMenuRefundPolicy') },
                      { href: '/privacy', label: t('pagesMenuPrivacy') },
                      { href: '/terms', label: t('pagesMenuTerms') },
                      { href: '/order-history', label: t('pagesMenuOrderHistory') },
                      { href: '/order-tracking', label: t('pagesMenuOrderTracking') },
                      { href: '/login', label: t('pagesMenuLogin') },
                      { href: '/register', label: t('pagesMenuRegister') },
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
                <Link href="/faq" className="block py-2 text-gray-700 hover:text-green-500 font-medium">{t('faq')}</Link>
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
