import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, Locale } from './settings';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    const cookieStore = await cookies();

    let locale: Locale = defaultLocale;

    const cookieLocale = cookieStore.get('locale')?.value;
    if (cookieLocale && locales.includes(cookieLocale as Locale)) {
        locale = cookieLocale as Locale;
    }

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default,
        timeZone: 'America/Sao_Paulo'
    };
});
