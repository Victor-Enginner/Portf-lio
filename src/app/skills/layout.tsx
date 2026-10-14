import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Habilidades',
    description: 'Tecnologias e ferramentas que uso.',
};

export default function SkillsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
