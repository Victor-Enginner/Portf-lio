import { Metadata } from 'next';
import { IntelligenceDashboard } from '@/components/intelligence/IntelligenceDashboard';

export const metadata: Metadata = {
    title: 'Pain Scraper & Market Opportunity Miner | AI Operator',
    description: 'Autonomous A2A system mining non-synthetic enterprise friction, regulatory bottlenecks, and monetizable AI opportunities.',
};

export default function IntelligencePage() {
    return (
        <main className="min-h-screen bg-black">
            <IntelligenceDashboard />
        </main>
    );
}
