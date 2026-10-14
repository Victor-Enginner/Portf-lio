import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contato',
    description: 'Peça um orçamento de site, automação ou agente de IA.',
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
