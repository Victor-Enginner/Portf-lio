import { useMemo } from 'react';
import { useLocale } from 'next-intl';
import type { PortfolioData } from '@/types';
import { portfolioData } from './portfolio';
import { traducoes } from './traducoes';

const cache = new Map<string, PortfolioData>();

// Devolve portfolioData com os textos no idioma pedido (português é o original)
export function getPortfolio(locale: string): PortfolioData {
    if (!(locale in traducoes)) return portfolioData;
    const salvo = cache.get(locale);
    if (salvo) return salvo;

    const t = traducoes[locale as keyof typeof traducoes];
    const dados: PortfolioData = {
        ...portfolioData,
        personal: { ...portfolioData.personal, ...t.personal },
        projects: portfolioData.projects.map(p => ({ ...p, ...t.projects[p.slug] })),
        experiences: portfolioData.experiences.map(e => ({ ...e, ...t.experiences[e.id] })),
        education: portfolioData.education.map(e => ({ ...e, ...t.education[e.id] })),
        achievements: portfolioData.achievements.map(a => ({ ...a, ...t.achievements[a.id] })),
        hardSkills: portfolioData.hardSkills.map((s, i) => ({ ...s, ...t.hardSkills[i] })),
        softSkills: portfolioData.softSkills.map((s, i) => ({ ...s, ...t.softSkills[i] })),
    };
    cache.set(locale, dados);
    return dados;
}

export function usePortfolio(): PortfolioData {
    const locale = useLocale();
    return useMemo(() => getPortfolio(locale), [locale]);
}
