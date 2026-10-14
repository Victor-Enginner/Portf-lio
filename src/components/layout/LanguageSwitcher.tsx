'use client';

import { useEffect, useRef, useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { locales, type Locale } from '@/i18n/settings';

const NOMES: Record<Locale, string> = {
    pt: 'Português',
    en: 'English',
    es: 'Español',
    ru: 'Русский',
};

// Troca de idioma: grava o cookie (só da sessão) lido em i18n/request.ts e recarrega
export function LanguageSwitcher({ variant = 'icon' }: { variant?: 'icon' | 'list' }) {
    const atual = useLocale() as Locale;
    const [aberto, setAberto] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fechar = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setAberto(false);
        };
        document.addEventListener('mousedown', fechar);
        return () => document.removeEventListener('mousedown', fechar);
    }, []);

    const trocar = (idioma: Locale) => {
        if (idioma === atual) return setAberto(false);
        // Cookie de sessão: ao abrir o site de novo, volta para português
        document.cookie = `locale=${idioma};path=/`;
        window.location.reload();
    };

    if (variant === 'list') {
        return (
            <div className="flex flex-wrap gap-2">
                {locales.map((l) => (
                    <button
                        key={l}
                        onClick={() => trocar(l)}
                        className={cn(
                            'px-4 py-2 rounded-full glass-card text-sm font-medium transition-colors',
                            l === atual ? 'bg-foreground text-background' : 'hover:bg-muted/50'
                        )}
                    >
                        {NOMES[l]}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setAberto((v) => !v)}
                className="flex items-center gap-1.5 p-2 md:px-3 md:py-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors text-xs font-bold uppercase"
                aria-label="Idioma / Language"
                aria-expanded={aberto}
            >
                <Globe className="w-4 h-4" />
                <span className="hidden md:inline">{atual}</span>
            </button>
            {aberto && (
                <div className="absolute right-0 top-full mt-2 min-w-[150px] rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl p-1.5 z-[200]">
                    {locales.map((l) => (
                        <button
                            key={l}
                            onClick={() => trocar(l)}
                            className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-sm hover:bg-muted transition-colors"
                        >
                            <span>{NOMES[l]}</span>
                            {l === atual && <Check className="w-4 h-4 text-primary" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
