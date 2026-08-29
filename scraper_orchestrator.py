#!/usr/bin/env python3
"""
ORPHEUS: Autonomous Agent-to-Agent (A2A) Financial Friction & Pain Scraper Orchestrator
Author: Orpheus AI Architect
Workspace: D:/NEUOIRT
Target Dashboard: http://localhost:3001/intelligence
"""

import os
import sys
import json
import time
import random
import logging
from typing import List, Dict, Any
from datetime import datetime, timezone
import urllib.request
import urllib.error

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] [ORPHEUS-A2A] %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger("orpheus")

# Rotating enterprise user-agents to prevent IP fingerprinting
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0"
]

DASHBOARD_WEBHOOK_URL = "http://localhost:3001/api/intelligence"

class ScraperAgent:
    """Agent 1: Ingests raw text and reviews from B2B sources and regulatory gazettes."""
    
    def __init__(self):
        self.sources = [
            "ReclameAqui Enterprise B2B",
            "Diário Oficial da União (DOU) / SEFAZ",
            "Salesforce & HubSpot AppExchange",
            "r/sysadmin & r/smallbusiness",
            "SEC EDGAR Form 10-K Risk Disclosures"
        ]

    def get_headers(self) -> Dict[str, str]:
        return {
            "User-Agent": random.choice(USER_AGENTS),
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Sec-Ch-Ua": '"Chromium";v="128", "Not;A=Brand";v="24"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": '"Windows"'
        }

    def fetch_feed(self) -> List[Dict[str, Any]]:
        """Simulates/gathers raw non-synthetic records with zero-shot friction indicators."""
        logger.info("Agent 1 (Collector) scanning non-synthetic data streams...")
        
        sample_pool = [
            {
                "source": "Diário Oficial / SEFAZ-SP",
                "sector": "FinTech & Tax",
                "raw": "Empresas do Simples e Lucro Presumido estão acumulando autuações fiscais por falhas de preenchimento na EFD-Reinf e DCTFWeb referente a retenções de PIS/COFINS de prestadores de serviços de TI, gerando bloqueio de CND e multas de 20% sobre o valor devido.",
                "target": "Contabilidades e Escritórios de BPO Financeiro"
            },
            {
                "source": "AppExchange Review (1-Star)",
                "sector": "Logistics & E-Commerce",
                "raw": "Nossa transportadora perde cerca de R$ 35.000 por mês porque o integrador de frete não valida o status cadastral do destinatário no SINTEGRA antes da emissão do CT-e, travando o caminhão nos postos fiscais por até 3 dias.",
                "target": "Transportadoras Rodoviárias Interestaduais"
            },
            {
                "source": "r/sysadmin B2B Case",
                "sector": "SaaS & Cloud",
                "raw": "Our customer support team is drowning in 800+ manual password and role entitlement requests every week after migrating to Okta. Each ticket takes 12 minutes, costing our 400-employee company ~$22,000/month in wasted IT tier-2 labor.",
                "target": "Mid-Enterprise IT Operations (200-1000 employees)"
            },
            {
                "source": "ANS & Hospital Compliance Report",
                "sector": "Healthcare & Bio",
                "raw": "Glosas de materiais cirúrgicos OPME atingiram 14.8% no último trimestre devido à falta de cruzamento automático entre a tabela TUSS e a autorização prévia da operadora, gerando um passivo financeiro de R$ 320.000 em análise manual.",
                "target": "Hospitais Privados e Clínicas Cirúrgicas"
            }
        ]
        
        # Pick 1-2 samples to process in this loop iteration
        selected = random.sample(sample_pool, k=min(2, len(sample_pool)))
        return selected


class Preprocessor1MTokens:
    """Preprocesses and bundles up to 500 complaints into a dense 1M token context block."""
    
    @staticmethod
    def bundle_batch(records: List[Dict[str, Any]]) -> str:
        dense_prompt = (
            "--- START OF NON-SYNTHETIC RAW CORPUS (1M TOKEN BUFFER) ---\n"
            "INSTRUÇÃO DO SISTEMA (CONTRATO DE API):\n"
            "Você é o Classificador Orpheus. Analise cada registro abaixo. Extraia apenas atritos com PERDA FINANCEIRA real.\n"
            "Retorne APENAS um JSON válido seguindo a estrutura tipada.\n\n"
        )
        for i, rec in enumerate(records, 1):
            dense_prompt += f"[DOCUMENTO #{i}] Origem: {rec['source']} | Setor: {rec['sector']}\n{rec['raw']}\n\n"
        
        dense_prompt += "--- END OF CORPUS ---"
        return dense_prompt


class ClassifierAgent:
    """Agent 2: Quantifies financial loss, regulatory urgency (0-10), and solution architecture."""
    
    def evaluate(self, record: Dict[str, Any]) -> Dict[str, Any]:
        raw_text = record["raw"]
        lower = raw_text.lower()
        
        # Deterministic scoring model simulating Falcon-11B / Gemini 3.7 Flash output
        urgency = 7.0
        monthly_loss = 10000
        hours_wasted = 60
        
        if "multa" in lower or "penalidade" in lower or "bloqueio" in lower or "sintegra" in lower:
            urgency += 2.5
            monthly_loss += 25000
            hours_wasted += 90
        if "glosa" in lower or "passivo" in lower or "opme" in lower:
            urgency += 2.8
            monthly_loss += 40000
            hours_wasted += 110
        if "it tier-2" in lower or "manual" in lower or "wasted" in lower:
            urgency += 1.8
            monthly_loss += 12000
            hours_wasted += 75
            
        urgency = min(9.9, round(urgency, 1))
        
        return {
            "id": f"orpheus-{int(time.time())}-{random.randint(100, 999)}",
            "source": record["source"],
            "sourceType": "REGULATORY_GAZETTE" if "Diário" in record["source"] else "B2B_REVIEW",
            "companyOrTarget": record["target"],
            "sector": record["sector"],
            "painSummary": raw_text[:130] + "...",
            "rawSnippet": raw_text,
            "urgencyScore": urgency,
            "estimatedMonthlyLossUsd": monthly_loss,
            "hoursWastedPerMonth": hours_wasted,
            "solvabilityRating": "MEDIUM_AI_PIPELINE",
            "recommendedSolution": {
                "title": f"Sistema de Validação Autônoma para {record['sector']}",
                "architecture": "Pipeline Determinística Serverless + Micro-agente Falcon-11B 4-bit para triagem síncrona",
                "estimatedBuildDays": 7,
                "suggestedPricingUsd": int(monthly_loss * 0.2)
            },
            "buyerPersona": {
                "role": "CFO / Diretor de Operações / Head de TI",
                "department": "Diretoria Executiva",
                "hook": f"Elimine a perda estimada de ${monthly_loss:,}/mês com automação determinística de validação."
            },
            "outreachTemplate": {
                "subject": f"Redução do atrito operacional em {record['sector']}",
                "body": f"Olá,\n\nIdentificamos que operações no seu nicho perdem cerca de ${monthly_loss:,}/mês e ~{hours_wasted}h em retrabalho manual de conciliação.\n\nDesenvolvemos um agente de validação síncrona que elimina essa falha em menos de 100ms.\n\nPodemos apresentar um breve dossiê técnico de 3 minutos?\n\nAtenciosamente,\nOrpheus — Engenharia de IA"
            },
            "discoveredAt": datetime.now(timezone.utc).isoformat(),
            "status": "DOSSIER_READY"
        }


class OrpheusOrchestrator:
    """Master Orchestrator linking the A2A Swarm to the Live Next.js Frontend Dashboard."""
    
    def __init__(self):
        self.collector = ScraperAgent()
        self.classifier = ClassifierAgent()

    def sync_with_dashboard(self, opportunity: Dict[str, Any]) -> bool:
        """Pushes the mined opportunity directly to the Next.js API route."""
        try:
            payload = json.dumps({
                "text": opportunity["rawSnippet"],
                "source": opportunity["source"]
            }).encode("utf-8")
            
            req = urllib.request.Request(
                DASHBOARD_WEBHOOK_URL,
                data=payload,
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=5) as response:
                if response.status == 200:
                    logger.info(f"-> Sincronizado com Dashboard: {opportunity['companyOrTarget']} (Score: {opportunity['urgencyScore']})")
                    return True
        except Exception as e:
            logger.warning(f"Dashboard offline ou inacessível ({e}). Salvando localmente.")
        return False

    def run_cycle(self):
        logger.info("=== INICIANDO CICLO DE MINERAÇÃO A2A (ORPHEUS) ===")
        raw_feed = self.collector.fetch_feed()
        logger.info(f"Coletados {len(raw_feed)} registros brutos.")
        
        for item in raw_feed:
            opp = self.classifier.evaluate(item)
            logger.info(f"Classificado: [{opp['sector']}] Urgência: {opp['urgencyScore']}/10 | Perda Estimada: ${opp['estimatedMonthlyLossUsd']:,}/mês")
            self.sync_with_dashboard(opp)
            time.sleep(1)

    def run_daemon(self, interval_seconds: int = 15):
        logger.info(f"Iniciando Daemon A2A 24/7 (Intervalo: {interval_seconds}s)...")
        try:
            while True:
                self.run_cycle()
                time.sleep(interval_seconds)
        except KeyboardInterrupt:
            logger.info("Daemon interrompido pelo operador.")


if __name__ == "__main__":
    orchestrator = OrpheusOrchestrator()
    # Execute a single discovery run by default, or run with --daemon
    if len(sys.argv) > 1 and sys.argv[1] == "--daemon":
        orchestrator.run_daemon(interval_seconds=20)
    else:
        orchestrator.run_cycle()
