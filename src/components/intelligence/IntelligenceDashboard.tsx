'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Activity, 
    AlertTriangle, 
    Cpu, 
    DollarSign, 
    Download, 
    Eye, 
    Filter, 
    Flame, 
    Globe, 
    Layers, 
    Mail, 
    Play, 
    RefreshCw, 
    Search, 
    Send, 
    Server, 
    ShieldAlert, 
    Sparkles, 
    Terminal, 
    TrendingUp,
    Zap 
} from 'lucide-react';
import { PainOpportunity, AgentTelemetry, IntelligenceSummary } from '@/lib/intelligence/types';

export function IntelligenceDashboard() {
    const [opportunities, setOpportunities] = useState<PainOpportunity[]>([]);
    const [agents, setAgents] = useState<AgentTelemetry[]>([]);
    const [summary, setSummary] = useState<IntelligenceSummary | null>(null);
    const [selectedSector, setSelectedSector] = useState<string>('ALL');
    const [selectedUrgencyOnly, setSelectedUrgencyOnly] = useState(false);
    const [activeModalOpportunity, setActiveModalOpportunity] = useState<PainOpportunity | null>(null);
    const [modalTab, setModalTab] = useState<'DOSSIER' | 'OUTREACH'>('DOSSIER');
    
    // Live Scan Trigger State
    const [scanInput, setScanInput] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [scanSource, setScanSource] = useState('Diário Oficial / SEC / B2B Review');

    // Fetch initial telemetry
    const fetchTelemetry = async () => {
        try {
            const res = await fetch('/api/intelligence');
            const data = await res.json();
            if (data.success) {
                setOpportunities(data.opportunities);
                setAgents(data.agents);
                setSummary(data.summary);
            }
        } catch (err) {
            console.error('Telemetry fetch error:', err);
        }
    };

    useEffect(() => {
        fetchTelemetry();
        const interval = setInterval(fetchTelemetry, 6000);
        return () => clearInterval(interval);
    }, []);

    // Handle Manual Live Scan
    const handleRunScan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!scanInput.trim()) return;

        setIsScanning(true);
        try {
            const res = await fetch('/api/intelligence', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: scanInput, source: scanSource })
            });
            const data = await res.json();
            if (data.success && data.opportunity) {
                setOpportunities(prev => [data.opportunity, ...prev]);
                setScanInput('');
                setActiveModalOpportunity(data.opportunity);
            }
        } catch (err) {
            console.error('Scan error:', err);
        } finally {
            setIsScanning(false);
        }
    };

    // Filtered list
    const filteredOpportunities = opportunities.filter(opp => {
        const matchesSector = selectedSector === 'ALL' || opp.sector === selectedSector;
        const matchesUrgency = !selectedUrgencyOnly || opp.urgencyScore >= 9.0;
        return matchesSector && matchesUrgency;
    });

    const sectors = ['ALL', 'Logistics & E-Commerce', 'FinTech & Tax', 'Legal & Compliance', 'Healthcare & Bio', 'SaaS & Cloud'];

    return (
        <div className="w-full min-h-screen bg-black text-foreground pt-24 pb-20 px-4 md:px-12 lg:px-20 font-sans selection:bg-primary selection:text-white">
            
            {/* Header / Hero Section */}
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
                            <span className="font-bold text-white tracking-wider">A2A ENGINE: ACTIVE</span>
                            <span className="text-zinc-600">|</span>
                            <span className="text-emerald-400">24/7 AUTONOMOUS MINING</span>
                            <span className="text-zinc-600">|</span>
                            <span className="text-zinc-400">1M TOKENS CONTEXT BUFFER</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button 
                            onClick={fetchTelemetry}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 transition"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>SYNC TELEMETRY</span>
                        </button>
                    </div>
                </div>

                {/* Main Title & Value Proposition */}
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-semibold tracking-widest uppercase">
                        <Zap className="w-3.5 h-3.5" />
                        AI Operator Command Center
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                        Pain Scraper & <span className="bg-gradient-to-r from-primary via-blue-400 to-emerald-400 bg-clip-text text-transparent">Market Opportunity Miner</span>
                    </h1>
                    <p className="text-sm md:text-base text-zinc-400 max-w-3xl leading-relaxed">
                        Sistema autônomo Agent-to-Agent que rastreia atrito financeiro, multas regulatórias e ineficiências operacionais em dados não-sintéticos (avaliações B2B, Diários Oficiais e fóruns técnicos).
                    </p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur">
                        <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
                            <span>POTENTIAL LOSS MINED</span>
                            <DollarSign className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="mt-2 text-2xl md:text-3xl font-black text-white font-mono">
                            ${summary ? (summary.totalAnnualFrictionUsd / 1000).toFixed(0) : '1,250'}k<span className="text-xs text-zinc-500 font-normal"> /year</span>
                        </div>
                        <p className="mt-1 text-[11px] text-zinc-400">Total de atrito financeiro auditado</p>
                    </div>

                    <div className="p-5 rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur">
                        <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
                            <span>HIGH URGENCY DOORS</span>
                            <Flame className="w-4 h-4 text-rose-500" />
                        </div>
                        <div className="mt-2 text-2xl md:text-3xl font-black text-white font-mono">
                            {summary?.highUrgencyCount || 4} <span className="text-xs text-rose-400 font-normal">Score &gt; 8.5/10</span>
                        </div>
                        <p className="mt-1 text-[11px] text-zinc-400">Dores com prontidão imediata de compra</p>
                    </div>

                    <div className="p-5 rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur">
                        <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
                            <span>A2A SWARM WORKERS</span>
                            <Cpu className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="mt-2 text-2xl md:text-3xl font-black text-white font-mono">
                            4 <span className="text-xs text-emerald-400 font-normal">Online (24/7)</span>
                        </div>
                        <p className="mt-1 text-[11px] text-zinc-400">Coletor, Classificador, Validador, Vendas</p>
                    </div>

                    <div className="p-5 rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur">
                        <div className="flex items-center justify-between text-zinc-400 text-xs font-mono">
                            <span>QUANTIZED INFERENCE</span>
                            <Server className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="mt-2 text-2xl md:text-3xl font-black text-white font-mono">
                            4-Bit NF4 <span className="text-xs text-purple-400 font-normal">6GB VRAM</span>
                        </div>
                        <p className="mt-1 text-[11px] text-zinc-400">Falcon-11B / Gemini 3.7 Pro</p>
                    </div>
                </div>

                {/* A2A Agent Swarm Telemetry Ribbon */}
                <div className="p-5 rounded-2xl border border-white/10 bg-zinc-950/40 space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase flex items-center gap-2">
                            <Activity className="w-4 h-4 text-primary" />
                            Live A2A Agent Swarm Telemetry
                        </h2>
                        <span className="text-[11px] font-mono text-zinc-500">Autonomous Orchestration Stream</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {agents.map(agent => (
                            <div key={agent.id} className="p-3.5 rounded-xl border border-white/5 bg-zinc-900/60 flex flex-col justify-between space-y-2">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-white truncate">{agent.name}</span>
                                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                                            agent.status === 'PROCESSING' || agent.status === 'STREAMING' 
                                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                        }`}>
                                            {agent.status}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{agent.role}</p>
                                </div>
                                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                                    <span>Model: {agent.model}</span>
                                    <span>{agent.lastActivity}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interactive Live Scanner Input Form */}
                <form onSubmit={handleRunScan} className="p-5 rounded-2xl border border-primary/30 bg-gradient-to-b from-primary/10 via-zinc-950/80 to-zinc-950 space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-primary" />
                            <span className="text-xs font-mono font-bold text-white tracking-wider">EXECUTE LIVE PAIN & FRICTION AUDIT</span>
                        </div>
                        <span className="text-[11px] font-mono text-primary/80">Real-time Analysis</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3">
                        <div className="flex-1">
                            <textarea 
                                value={scanInput}
                                onChange={(e) => setScanInput(e.target.value)}
                                placeholder="Cole aqui uma reclamação de cliente B2B, texto de edital fiscal, norma do Diário Oficial, ou review negativa de software..."
                                rows={2}
                                className="w-full bg-zinc-900/90 border border-white/10 rounded-xl px-4 py-2.5 text-xs md:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/60 transition resize-none font-mono"
                            />
                        </div>
                        <div className="flex flex-col gap-2 min-w-[200px]">
                            <select 
                                value={scanSource}
                                onChange={(e) => setScanSource(e.target.value)}
                                className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-primary/60 font-mono"
                            >
                                <option value="B2B Reviews / G2 / AppExchange">B2B SaaS Reviews</option>
                                <option value="Diário Oficial / SEC Gazette">Diário Oficial / Regulação</option>
                                <option value="r/sysadmin & Tech Forums">Comunidades Técnicas</option>
                                <option value="ReclameAqui Enterprise">ReclameAqui B2B</option>
                            </select>

                            <button 
                                type="submit"
                                disabled={isScanning || !scanInput.trim()}
                                className="h-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-mono font-bold text-xs px-4 py-2.5 rounded-xl transition cursor-pointer shadow-lg shadow-primary/20"
                            >
                                {isScanning ? (
                                    <>
                                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                        <span>ANALYZING...</span>
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-3.5 h-3.5 fill-current" />
                                        <span>MINAR DOR & GERAR DOSSIÊ</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Filters & Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono text-zinc-500 mr-2 flex items-center gap-1">
                            <Filter className="w-3.5 h-3.5" /> SETOR:
                        </span>
                        {sectors.map(sector => (
                            <button
                                key={sector}
                                onClick={() => setSelectedSector(sector)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                                    selectedSector === sector 
                                        ? 'bg-white text-black font-bold' 
                                        : 'bg-zinc-900/80 border border-white/10 text-zinc-400 hover:text-white'
                                }`}
                            >
                                {sector}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSelectedUrgencyOnly(!selectedUrgencyOnly)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 border transition ${
                                selectedUrgencyOnly 
                                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 font-bold' 
                                    : 'bg-zinc-900 border-white/10 text-zinc-400'
                            }`}
                        >
                            <Flame className="w-3.5 h-3.5 text-rose-500" />
                            <span>URGENCY &gt; 9.0 ONLY</span>
                        </button>
                    </div>
                </div>

                {/* Mined Opportunities Feed */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                        <span>SHOWING {filteredOpportunities.length} HIGH-VALUE FRICTION TARGETS</span>
                        <span>SORTED BY: URGENCY SCORE &times; FINANCIAL IMPACT</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {filteredOpportunities.map((opp) => (
                            <motion.div
                                key={opp.id}
                                layout
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-6 rounded-2xl border border-white/10 bg-zinc-950/80 hover:border-primary/40 transition-all space-y-4 relative overflow-hidden group"
                            >
                                {/* Glow Accent */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-primary/10 transition" />

                                {/* Card Header */}
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-white/10 text-[11px] font-mono text-zinc-300">
                                                {opp.sector}
                                            </span>
                                            <span className="text-xs text-zinc-500 font-mono">
                                                Fonte: {opp.source}
                                            </span>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-white">
                                            {opp.companyOrTarget}
                                        </h3>
                                    </div>

                                    {/* Urgency Badge */}
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <div className="text-[10px] font-mono text-zinc-500 uppercase">Estimated Loss</div>
                                            <div className="text-base font-mono font-bold text-emerald-400">
                                                ${opp.estimatedMonthlyLossUsd.toLocaleString()}<span className="text-xs text-zinc-500">/mo</span>
                                            </div>
                                        </div>
                                        
                                        <div className={`px-3 py-1.5 rounded-xl font-mono font-black text-sm flex items-center gap-1.5 border ${
                                            opp.urgencyScore >= 9.0 
                                                ? 'bg-rose-500/10 border-rose-500/40 text-rose-400 shadow-lg shadow-rose-500/10'
                                                : 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                                        }`}>
                                            <Flame className="w-4 h-4 fill-current" />
                                            {opp.urgencyScore.toFixed(1)}/10
                                        </div>
                                    </div>
                                </div>

                                {/* Raw Snippet / Friction Description */}
                                <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 text-xs text-zinc-300 leading-relaxed font-mono">
                                    <span className="text-zinc-500 block text-[10px] uppercase font-bold mb-1">Mined Friction Snippet:</span>
                                    {opp.rawSnippet}
                                </div>

                                {/* Proposed AI Solution & Action Bar */}
                                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/5">
                                    <div className="space-y-0.5">
                                        <span className="text-[11px] font-mono text-zinc-400">
                                            💡 Solução de Engenharia: <strong className="text-white">{opp.recommendedSolution.title}</strong>
                                        </span>
                                        <div className="text-[11px] text-zinc-500">
                                            Tempo de Build: ~{opp.recommendedSolution.estimatedBuildDays} dias | Custo de Oferta sugerido: <strong>${opp.recommendedSolution.suggestedPricingUsd.toLocaleString()}</strong>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setActiveModalOpportunity(opp);
                                                setModalTab('DOSSIER');
                                            }}
                                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-200 transition"
                                        >
                                            <Eye className="w-3.5 h-3.5" />
                                            <span>Ver Dossiê Técnico</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                setActiveModalOpportunity(opp);
                                                setModalTab('OUTREACH');
                                            }}
                                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-mono font-bold transition shadow-lg shadow-primary/10"
                                        >
                                            <Mail className="w-3.5 h-3.5" />
                                            <span>Cold Email Pronto</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for Technical Dossier & Cold Outreach Draft */}
            <AnimatePresence>
                {activeModalOpportunity && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-3xl rounded-3xl border border-white/20 bg-zinc-950 p-6 md:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveModalOpportunity(null)}
                                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition"
                            >
                                ✕
                            </button>

                            {/* Modal Header */}
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-xs font-mono text-primary">
                                    <span>OPPORTUNITY ID: {activeModalOpportunity.id}</span>
                                    <span>•</span>
                                    <span>{activeModalOpportunity.sector}</span>
                                </div>
                                <h2 className="text-2xl font-black text-white">
                                    {activeModalOpportunity.companyOrTarget}
                                </h2>
                            </div>

                            {/* Tabs */}
                            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
                                <button
                                    onClick={() => setModalTab('DOSSIER')}
                                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition ${
                                        modalTab === 'DOSSIER' ? 'bg-primary text-white' : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    Dossiê de Engenharia & ROI
                                </button>
                                <button
                                    onClick={() => setModalTab('OUTREACH')}
                                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition ${
                                        modalTab === 'OUTREACH' ? 'bg-primary text-white' : 'text-zinc-400 hover:text-white'
                                    }`}
                                >
                                    Pitch de Vendas (Cold Email B2B)
                                </button>
                            </div>

                            {/* Tab Content */}
                            {modalTab === 'DOSSIER' ? (
                                <div className="space-y-4 text-xs md:text-sm font-mono text-zinc-300">
                                    <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-2">
                                        <span className="text-zinc-500 font-bold uppercase text-[10px] block">Diagnóstico de Atrito:</span>
                                        <p className="text-zinc-200">{activeModalOpportunity.painSummary}</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
                                            <span className="text-zinc-500 font-bold uppercase text-[10px]">Custo Mensal Estimado:</span>
                                            <div className="text-xl font-bold text-emerald-400">
                                                ${activeModalOpportunity.estimatedMonthlyLossUsd.toLocaleString()} / mês
                                            </div>
                                            <p className="text-[11px] text-zinc-400">~{activeModalOpportunity.hoursWastedPerMonth} horas/mês perdidas em retrabalho manual.</p>
                                        </div>

                                        <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-1">
                                            <span className="text-zinc-500 font-bold uppercase text-[10px]">Perfil do Comprador:</span>
                                            <div className="text-sm font-bold text-white">
                                                {activeModalOpportunity.buyerPersona.role}
                                            </div>
                                            <p className="text-[11px] text-zinc-400">{activeModalOpportunity.buyerPersona.hook}</p>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 space-y-2">
                                        <span className="text-primary font-bold uppercase text-[10px] block">Arquitetura Técnica Recomendada:</span>
                                        <div className="text-white font-bold text-sm">
                                            {activeModalOpportunity.recommendedSolution.title}
                                        </div>
                                        <p className="text-zinc-300 text-xs leading-relaxed">
                                            {activeModalOpportunity.recommendedSolution.architecture}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 text-xs md:text-sm font-mono">
                                    <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-2">
                                        <span className="text-zinc-500 font-bold uppercase text-[10px] block">Assunto do E-mail:</span>
                                        <div className="text-white font-bold">{activeModalOpportunity.outreachTemplate.subject}</div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-2">
                                        <span className="text-zinc-500 font-bold uppercase text-[10px] block">Corpo da Abordagem B2B:</span>
                                        <pre className="text-zinc-300 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                                            {activeModalOpportunity.outreachTemplate.body}
                                        </pre>
                                    </div>
                                </div>
                            )}

                            {/* Modal Footer */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                                <button
                                    onClick={() => setActiveModalOpportunity(null)}
                                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition"
                                >
                                    Fechar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
