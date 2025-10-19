import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react';
import { View } from 'react-native';

type Language = 'en' | 'ar';
export type Currency =
  | 'USD'
  | 'SAR'
  | 'SYP'
  | 'JOD'
  | 'EGP'
  | 'AED'
  | 'QAR'
  | 'BHD'
  | 'KWD'
  | 'OMR'
  | 'LYD'
  | 'DZD'
  | 'MAD'
  | 'TND'
  | 'SDG'
  | 'IQD'
  | 'LBP'
  | 'MRU'
  | 'YER'
  | 'SOS';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  t: (key: string) => string;
  currencySymbols: Record<Currency, string>;
  currencyRates: Record<Currency, number>;
  convertPrice: (
    price: number,
    fromCurrency?: string,
    toCurrency?: string
  ) => number;
  formatPrice: (price: number, displayCurrency?: Currency) => string;
  // Wishlist functionality
  wishlist: string[];
  addToWishlist: (propertyId: string) => void;
  removeFromWishlist: (propertyId: string) => void;
  isInWishlist: (propertyId: string) => boolean;
  clearWishlist: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

interface AppContextProviderProps {
  children: ReactNode;
}

// Translations dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    home: 'Home',
    tour_guides: 'Tour Guides',
    search: 'Search',
    // Search
    search_title: '...Find Your Perfect Stay',
    search_subtitle: 'Discover luxury accommodations',
    nuzl: 'Nuzul',
    where_to: 'Where to?',
    check_in: 'Check in',
    check_out: 'Check out',
    guests: 'Guests',
    search: 'Search',
    // Property types
    hotels: 'Hotels',
    apartments: 'Apartments',
    resorts: 'Resorts & Chalets',
    huts: 'Huts & Camps',
    featured_hotels: 'Featured Hotels',
    explore_properties: 'Explore our handpicked properties',
    property_types: 'Property Types',
    night: 'night',
    view_details: 'View Details',
    view_all_properties: 'View All Properties',
    // Common
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    no_results: 'No results found',
    try_different_filters: 'Try different filters',
  },
  ar: {
    // Navigation
    home: 'الرئيسية',
    tour_guides: 'المرشدون السياحيون',
    search: 'بحث',
    // Search
    search_title: '…مكانك بين أهلك وناسك',
    search_subtitle: 'اكتشف أماكن اقامتك الفاخرة',
    nuzl: 'نـُزل',
    where_to: 'إلى أين؟',
    check_in: 'تسجيل الدخول',
    check_out: 'تسجيل الخروج',
    guests: 'الضيوف',
    search: 'بحث',
    // Property types
    hotels: 'الفنادق',
    apartments: 'الشقق الفندقية او المخدومة',
    resorts: 'المنتجعات والشاليهات',
    huts: 'الأكواخ والمخيمات',
    featured_hotels: 'الفنادق المميزة',
    explore_properties: 'استكشف عقاراتنا المختارة',
    property_types: 'أنواع العقارات',
    night: 'ليلة',
    view_details: 'عرض التفاصيل',
    view_all_properties: 'عرض جميع العقارات',
    // Common
    loading: 'جاري التحميل...',
    error: 'خطأ',
    retry: 'إعادة المحاولة',
    no_results: 'لا توجد نتائج',
    try_different_filters: 'جرب مرشحات مختلفة',
  },
};

// Currency symbols
export const currencySymbols: Record<Currency, string> = {
  USD: '$',
  SAR: 'SAR',
  SYP: 'SYP',
  JOD: 'JOD',
  EGP: 'EGP',
  AED: 'AED',
  QAR: 'QAR',
  BHD: 'BHD',
  KWD: 'KWD',
  OMR: 'OMR',
  LYD: 'LYD',
  DZD: 'DZD',
  MAD: 'MAD',
  TND: 'TND',
  SDG: 'SDG',
  IQD: 'IQD',
  LBP: 'LBP',
  MRU: 'MRU',
  YER: 'YER',
  SOS: 'SOS',
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [currencyRates, setCurrencyRates] = useState<Record<Currency, number>>({
    USD: 1,
    SAR: 3.75,
    SYP: 2500,
    JOD: 0.71,
    EGP: 50.2,
    AED: 3.67,
    QAR: 3.64,
    BHD: 0.38,
    KWD: 0.31,
    OMR: 0.38,
    LYD: 4.8,
    DZD: 135,
    MAD: 10,
    TND: 3.1,
    SDG: 600,
    IQD: 1300,
    LBP: 15000,
    MRU: 40,
    YER: 250,
    SOS: 570,
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Wishlist functions
  const addToWishlist = (propertyId: string) => {
    setWishlist((prev) => {
      const newWishlist = prev.includes(propertyId)
        ? prev
        : [...prev, propertyId];
      return newWishlist;
    });
  };

  const removeFromWishlist = (propertyId: string) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((id) => id !== propertyId);
      return newWishlist;
    });
  };

  const isInWishlist = (propertyId: string) => {
    return wishlist.includes(propertyId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const convertPrice = (
    price: number,
    fromCurrency: string = 'USD',
    toCurrency: string = currency
  ) => {
    // If same currency, no conversion needed
    if (fromCurrency === toCurrency) return Math.trunc(price * 100) / 100;

    // Get conversion rates
    const fromRate = currencyRates[fromCurrency as Currency];
    const toRate = currencyRates[toCurrency as Currency];

    // Handle missing rates
    if (!fromRate || !toRate) {
      console.error(
        `Missing exchange rate for ${fromCurrency} or ${toCurrency}`
      );
      return Math.trunc(price * 100) / 100;
    }

    // Convert: (price * toRate) / fromRate
    const convertedPrice = (price * toRate) / fromRate;
    return Math.trunc(convertedPrice * 100) / 100;
  };

  // Format price according to currency
  const formatPrice = (
    price: number,
    displayCurrency: Currency = currency
  ): string => {
    const convertedPrice = price * currencyRates[displayCurrency];

    // Format with appropriate precision
    let formattedPrice: string;
    if (displayCurrency === 'SYP') {
      // Round to nearest whole number for SYP due to high inflation
      formattedPrice = Math.round(convertedPrice).toString();
    } else {
      formattedPrice = convertedPrice.toFixed(2);
    }

    return `${currencySymbols[displayCurrency]}${formattedPrice}`;
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    currency,
    setCurrency,
    t,
    currencySymbols,
    convertPrice,
    currencyRates,
    formatPrice,
    // Wishlist functionality
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};