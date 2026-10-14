
import { notFound } from 'next/navigation';
import { portfolioData } from '@/data/portfolio';
import { getPortfolio } from '@/data/usePortfolio';
import { getLocale } from 'next-intl/server';
import { ProjectPageContent } from '@/components/projects/ProjectPageContent';

export async function generateStaticParams() {
    return portfolioData.projects.map((project) => ({
        slug: project.slug,
    }));
}

import type { Metadata } from 'next';

// Prévia de link de cada projeto: título, descrição e o print do próprio projeto
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = getPortfolio(await getLocale()).projects.find((p) => p.slug === slug);
    if (!project) return {};
    const imagens = project.image ? [{ url: project.image.replace('/projetos/', '/projetos/og/').replace('.webp', '.jpg'), width: 1200, height: 630, alt: project.title }] : undefined;
    return {
        title: project.title,
        description: project.description,
        openGraph: { title: project.title, description: project.description, images: imagens, type: 'article' },
        twitter: { card: 'summary_large_image', title: project.title, description: project.description, images: imagens?.map((i) => i.url) },
    };
}

import { getProjectImages } from '@/app/actions/getProjectImages'; // Import server action

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = getPortfolio(await getLocale()).projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    // Fetch dynamic images from public/project folder
    const galleryImages = await getProjectImages(slug, project.title);

    // If dynamic images found, override the project data
    const updatedProject = {
        ...project,
        image: galleryImages.length > 0 ? galleryImages[0] : project.image, // First image as Hero
        galleryImages: galleryImages.length > 0 ? galleryImages : project.galleryImages // All images for gallery
    };

    return <ProjectPageContent project={updatedProject} />;
}
