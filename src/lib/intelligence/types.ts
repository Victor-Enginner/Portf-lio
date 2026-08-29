export interface PainOpportunity {
    id: string;
    source: string;
    sourceType: 'B2B_REVIEW' | 'COMMUNITY_FORUM' | 'REGULATORY_GAZETTE' | 'SUPPORT_TICKET' | 'SEC_FILING';
    companyOrTarget: string;
    sector: 'SaaS & Cloud' | 'FinTech & Tax' | 'Legal & Compliance' | 'Logistics & E-Commerce' | 'Healthcare & Bio';
    painSummary: string;
    rawSnippet: string;
    urgencyScore: number; // 0.0 to 10.0
    estimatedMonthlyLossUsd: number;
    hoursWastedPerMonth: number;
    solvabilityRating: 'EASY_AUTOMATION' | 'MEDIUM_AI_PIPELINE' | 'COMPLEX_SYSTEMS';
    recommendedSolution: {
        title: string;
        architecture: string;
        estimatedBuildDays: number;
        suggestedPricingUsd: number;
    };
    buyerPersona: {
        role: string;
        department: string;
        hook: string;
    };
    outreachTemplate: {
        subject: string;
        body: string;
    };
    discoveredAt: string;
    status: 'DISCOVERED' | 'DOSSIER_READY' | 'CONTACTED' | 'RESOLVED';
}

export interface AgentTelemetry {
    id: string;
    name: string;
    role: string;
    status: 'IDLE' | 'ACTIVE' | 'PROCESSING' | 'STREAMING';
    model: string;
    contextSize: string;
    itemsProcessed: number;
    lastActivity: string;
}

export interface IntelligenceSummary {
    totalPainsMined: number;
    highUrgencyCount: number;
    totalAnnualFrictionUsd: number;
    activeAgentsCount: number;
    topSectors: { sector: string; count: number }[];
}
