import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projetos',
    description: 'Sites, automações e agentes de IA publicados.',
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
