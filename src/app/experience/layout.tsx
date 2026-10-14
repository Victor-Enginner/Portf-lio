import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Experiência',
    description: 'Clientes atendidos, trajetória e formação.',
};

export default function ExperienceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
