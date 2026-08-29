import { NextResponse } from 'next/server';
import { getOpportunities, getIntelligenceSummary, ACTIVE_AGENTS, analyzeRawText } from '@/lib/intelligence/scraper-engine';

export async function GET() {
    try {
        const opportunities = getOpportunities();
        const summary = getIntelligenceSummary();
        const agents = ACTIVE_AGENTS;

        return NextResponse.json({
            success: true,
            summary,
            agents,
            opportunities
        });
    } catch (error) {
        console.error('Failed to fetch intelligence data:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { text, source, url } = body;

        if (!text && !url) {
            return NextResponse.json({ success: false, error: 'Text or URL is required' }, { status: 400 });
        }

        const inputToAnalyze = text || `Scraped content from live target: ${url}. Identified operational friction and potential regulatory compliance overhead.`;
        const opportunity = analyzeRawText(inputToAnalyze, source || url || 'Manual Trigger');

        return NextResponse.json({
            success: true,
            opportunity
        });
    } catch (error) {
        console.error('Failed to process intelligence request:', error);
        return NextResponse.json({ success: false, error: 'Failed to analyze text' }, { status: 500 });
    }
}
