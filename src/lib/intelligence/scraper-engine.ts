import { PainOpportunity, AgentTelemetry, IntelligenceSummary } from './types';

// Pre-seeded high-value B2B pain points mined across enterprise ecosystems
const INITIAL_OPPORTUNITIES: PainOpportunity[] = [
    {
        id: 'pain-8941',
        source: 'TrustRadius / Salesforce AppExchange',
        sourceType: 'B2B_REVIEW',
        companyOrTarget: 'Mid-Market Logistics Providers (Multi-State)',
        sector: 'Logistics & E-Commerce',
        painSummary: 'ICMS-DIFAL & Interstate Tax recalculation bottlenecks creating 48h shipping delays and $15,000+ in monthly tax authority penalties.',
        rawSnippet: '"We are paying $1,800/seat for our ERP, yet our back-office team spends 40+ hours every week manually cross-referencing state tax tables because the automated plugin frequently hallucinates state aliquots on split-destination freight."',
        urgencyScore: 9.6,
        estimatedMonthlyLossUsd: 28500,
        hoursWastedPerMonth: 160,
        solvabilityRating: 'MEDIUM_AI_PIPELINE',
        recommendedSolution: {
            title: 'Deterministic Tax Validator & Zero-Shot Tariff Extractor',
            architecture: 'FastAPI Microservice + LoRA Falcon-11B for unstructured fiscal invoice parsing + Deterministic SEFAZ schema assertion cache.',
            estimatedBuildDays: 7,
            suggestedPricingUsd: 2500
        },
        buyerPersona: {
            role: 'Chief Financial Officer / Head of Supply Chain',
            department: 'Finance & Logistics',
            hook: 'Eliminate DIFAL fiscal holds and recoup ~160 hours/month with an automated pre-dispatch tax audit agent.'
        },
        outreachTemplate: {
            subject: 'Automating the 48h DIFAL audit bottleneck for your fleet',
            body: 'Hi {{firstName}},\n\nI noticed mid-market freight operators frequently experience 30-48h dispatch holds due to SEFAZ aliquot discrepancies in split-destination invoices.\n\nWe engineered an autonomous deterministic verification agent (sub-100ms validation) that flags tariff mismatches before generation, preventing the typical $15k–$28k/mo in fines and overtime.\n\nWould you be open to a 5-minute teardown of how this integrates directly with your existing ERP pipeline?\n\nBest,\n[Your Name] — AI Systems Engineer'
        },
        discoveredAt: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
        status: 'DOSSIER_READY'
    },
    {
        id: 'pain-8942',
        source: 'r/sysadmin & AWS Marketplace Complaints',
        sourceType: 'COMMUNITY_FORUM',
        companyOrTarget: 'HealthTech & Telemedicine SaaS Providers',
        sector: 'Healthcare & Bio',
        painSummary: 'HIPAA & LGPD audit trail fragmentation across distributed vector databases costing $40k/yr in compliance consulting.',
        rawSnippet: '"Our LLM patient triage system logs patient queries across 4 microservices. When regulators asked for an immutable anonymized query log, we had to pull 3 senior engineers off roadmap for 3 weeks to reconstruct token histories."',
        urgencyScore: 9.2,
        estimatedMonthlyLossUsd: 19000,
        hoursWastedPerMonth: 120,
        solvabilityRating: 'MEDIUM_AI_PIPELINE',
        recommendedSolution: {
            title: 'Zero-Leakage Vector Redaction & Compliance Logger',
            architecture: 'eBPF network tap + Local On-Prem 4-bit Falcon/Nemotron filter to strip PHI/PII prior to vector indexing with cryptographic tamper-proof proofs.',
            estimatedBuildDays: 10,
            suggestedPricingUsd: 4500
        },
        buyerPersona: {
            role: 'VP of Engineering / Data Protection Officer',
            department: 'Security & Compliance',
            hook: 'Automate 100% of HIPAA/LGPD vector audit trails without blocking developer velocity.'
        },
        outreachTemplate: {
            subject: 'Zero-overhead PII redaction for your LLM patient triage pipeline',
            body: 'Hi {{firstName}},\n\nReconstructing audit logs for unstructured patient prompts across vector stores usually burns hundreds of senior engineering hours right before compliance audits.\n\nWe built an automated cryptographic redaction sidecar that intercepts and scrubs PII in sub-10ms with zero model downtime.\n\nHappy to share our benchmark audit report if you are preparing for upcoming compliance reviews.\n\nBest,\n[Your Name] — AI Systems Engineer'
        },
        discoveredAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        status: 'DOSSIER_READY'
    },
    {
        id: 'pain-8943',
        source: 'G2 Crowd / HubSpot Integrations Negative Reviews',
        sourceType: 'B2B_REVIEW',
        companyOrTarget: 'B2B SaaS Sales Ops (50-250 reps)',
        sector: 'SaaS & Cloud',
        painSummary: 'Inaccurate lead enrichment causing 32% bounce rate and $8,000/mo wasted on depleted sales rep outreach quotas.',
        rawSnippet: '"We pay for Apollo + ZoomInfo + HubSpot, yet 30% of contacts have outdated company revenue numbers and invalid email routing, destroying our email deliverability and burning sender reputation."',
        urgencyScore: 8.8,
        estimatedMonthlyLossUsd: 12400,
        hoursWastedPerMonth: 90,
        solvabilityRating: 'EASY_AUTOMATION',
        recommendedSolution: {
            title: 'Autonomous Real-Time Lead Verifier & SEC/LinkedIn Triangulator',
            architecture: 'Headless Chromium Scraper + LLM entity disambiguation agent feeding validated JSON directly to CRM webhooks.',
            estimatedBuildDays: 4,
            suggestedPricingUsd: 1800
        },
        buyerPersona: {
            role: 'Head of Revenue Operations / VP of Sales',
            department: 'RevOps',
            hook: 'Restore 98%+ email deliverability and stop reps from researching bad leads manually.'
        },
        outreachTemplate: {
            subject: 'Fixing the 30% bad data leak in your HubSpot enrichment stream',
            body: 'Hi {{firstName}},\n\nMost RevOps teams we speak with are burning $8k–$15k/mo on enrichment APIs that fail to verify real-time domain DNS health and executive job changes.\n\nWe developed a live verification agent that triangulates corporate registries and mailserver response codes before records ever hit your reps\' queues.\n\nWould you like a sample audit on 100 of your uncontacted leads to see what is currently leaking?\n\nBest,\n[Your Name] — AI Systems Engineer'
        },
        discoveredAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
        status: 'DOSSIER_READY'
    },
    {
        id: 'pain-8944',
        source: 'Diário Oficial / Regulatory Gazettes',
        sourceType: 'REGULATORY_GAZETTE',
        companyOrTarget: 'FinTech Credit Originators & Factoring Desks',
        sector: 'FinTech & Tax',
        painSummary: 'New Central Bank Resolution requiring automated continuous risk scoring on duplicate receivables within 15 minutes of registration.',
        rawSnippet: '"Credit desks failing to cross-check duplicate trade bills across registered registradoras within 15 minutes face mandatory suspension and administrative liability under normative notice 4.952."',
        urgencyScore: 9.8,
        estimatedMonthlyLossUsd: 45000,
        hoursWastedPerMonth: 210,
        solvabilityRating: 'COMPLEX_SYSTEMS',
        recommendedSolution: {
            title: 'Continuous Trade Bill Registradora Reconciler',
            architecture: 'Distributed Celery worker cluster with async websocket listeners and high-throughput vector similarity for credit duplication detection.',
            estimatedBuildDays: 14,
            suggestedPricingUsd: 8500
        },
        buyerPersona: {
            role: 'Chief Risk Officer / Head of Credit',
            department: 'Risk & Legal',
            hook: 'Automate 100% compliance with continuous trade bill reconciliation in under 500ms.'
        },
        outreachTemplate: {
            subject: 'Sub-second registradora duplicate detection for your credit desk',
            body: 'Hi {{firstName}},\n\nWith the latest Central Bank requirement for 15-minute duplicate trade bill reconciliation, manual cross-checks between registradoras are no longer scalable.\n\nWe engineered an ultra-fast automated reconciler that performs cross-registry vector and CNPJ deduplication in under 500ms per issuance.\n\nCould I send over our technical architecture brief for your engineering team to evaluate?\n\nBest,\n[Your Name] — AI Systems Engineer'
        },
        discoveredAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(),
        status: 'DOSSIER_READY'
    }
];

// Telemetry of active Agent-to-Agent swarm
export const ACTIVE_AGENTS: AgentTelemetry[] = [
    {
        id: 'agent-1',
        name: 'Scraper & Stream Ingestion Agent',
        role: 'Ingests raw text from B2B reviews, Diário Oficial, and tech communities 24/7',
        status: 'ACTIVE',
        model: 'Playwright + Regex Streamer',
        contextSize: '128k stream buffer',
        itemsProcessed: 14280,
        lastActivity: '12s ago'
    },
    {
        id: 'agent-2',
        name: 'Financial Friction Classifier',
        role: 'Evaluates monetary loss, penalty risk, and urgency score (0-10)',
        status: 'PROCESSING',
        model: 'Antigravity (Gemini 3.7 Flash) / Falcon-11B 4-bit',
        contextSize: '1,000,000 tokens',
        itemsProcessed: 4892,
        lastActivity: '3s ago'
    },
    {
        id: 'agent-3',
        name: 'Market Demand & CPC Validator',
        role: 'Validates search volume, job openings, and willingness to pay',
        status: 'ACTIVE',
        model: 'SERP API + LinkedIn Signal Engine',
        contextSize: '32k context',
        itemsProcessed: 840,
        lastActivity: '45s ago'
    },
    {
        id: 'agent-4',
        name: 'Executive Dossier & Pitch Generator',
        role: 'Synthesizes technical solution architecture and personalized B2B outreach',
        status: 'STREAMING',
        model: 'DeepSeek-Coder / Antigravity Harness',
        contextSize: '128k context',
        itemsProcessed: 312,
        lastActivity: 'Just now'
    }
];

export function getOpportunities(): PainOpportunity[] {
    return INITIAL_OPPORTUNITIES;
}

export function getIntelligenceSummary(): IntelligenceSummary {
    const opps = INITIAL_OPPORTUNITIES;
    const totalPains = opps.length;
    const highUrgency = opps.filter(o => o.urgencyScore >= 8.5).length;
    const totalLoss = opps.reduce((acc, curr) => acc + curr.estimatedMonthlyLossUsd * 12, 0);

    const sectorMap: Record<string, number> = {};
    opps.forEach(o => {
        sectorMap[o.sector] = (sectorMap[o.sector] || 0) + 1;
    });

    const topSectors = Object.entries(sectorMap).map(([sector, count]) => ({ sector, count }));

    return {
        totalPainsMined: totalPains,
        highUrgencyCount: highUrgency,
        totalAnnualFrictionUsd: totalLoss,
        activeAgentsCount: ACTIVE_AGENTS.length,
        topSectors
    };
}

export function analyzeRawText(text: string, sourceName = 'Live User Input'): PainOpportunity {
    const lower = text.toLowerCase();
    
    let urgency = 6.5;
    let estimatedMonthly = 8000;
    let hoursWasted = 50;
    let sector: PainOpportunity['sector'] = 'SaaS & Cloud';

    if (lower.includes('tax') || lower.includes('icms') || lower.includes('fiscal') || lower.includes('receita') || lower.includes('multa') || lower.includes('fine')) {
        urgency += 2.8;
        estimatedMonthly += 15000;
        hoursWasted += 80;
        sector = 'FinTech & Tax';
    } else if (lower.includes('hipaa') || lower.includes('lgpd') || lower.includes('gdpr') || lower.includes('patient') || lower.includes('saúde') || lower.includes('legal')) {
        urgency += 2.5;
        estimatedMonthly += 18000;
        hoursWasted += 60;
        sector = 'Legal & Compliance';
    } else if (lower.includes('frete') || lower.includes('shipping') || lower.includes('inventory') || lower.includes('logistics') || lower.includes('atraso')) {
        urgency += 2.2;
        estimatedMonthly += 12000;
        hoursWasted += 70;
        sector = 'Logistics & E-Commerce';
    }

    urgency = Math.min(9.9, urgency);

    const id = `pain-live-${Date.now()}`;

    return {
        id,
        source: sourceName,
        sourceType: 'COMMUNITY_FORUM',
        companyOrTarget: 'Mined Target from Analysis',
        sector,
        painSummary: text.slice(0, 140) + '...',
        rawSnippet: text,
        urgencyScore: parseFloat(urgency.toFixed(1)),
        estimatedMonthlyLossUsd: estimatedMonthly,
        hoursWastedPerMonth: hoursWasted,
        solvabilityRating: 'MEDIUM_AI_PIPELINE',
        recommendedSolution: {
            title: `Automated ${sector} Remediation Agent`,
            architecture: 'Serverless Worker + LoRA Quantized LLM + Deterministic Validation Gate',
            estimatedBuildDays: 6,
            suggestedPricingUsd: Math.round(estimatedMonthly * 0.2)
        },
        buyerPersona: {
            role: 'Head of Operations / Chief Technology Officer',
            department: 'Operations',
            hook: `Recover $${estimatedMonthly.toLocaleString()}/mo in operational overhead with autonomous validation.`
        },
        outreachTemplate: {
            subject: `Automating the operational friction in ${sector}`,
            body: `Hi,\n\nWe analyzed recent friction points in your domain and engineered an automated verification agent to eliminate the ~$${estimatedMonthly.toLocaleString()}/mo in manual review overhead.\n\nHappy to share a 3-minute technical brief if helpful.\n\nBest,\nAI Systems Engineer`
        },
        discoveredAt: new Date().toISOString(),
        status: 'DOSSIER_READY'
    };
}
