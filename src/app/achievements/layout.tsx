import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Certificados',
    description: 'Certificados de IA, agentes e cloud com código de validação.',
};

export default function AchievementsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
