// Traduções dos campos de texto de portfolioData (o original em português fica em portfolio.ts).
// Só texto: links, imagens, datas e ids nunca são repetidos aqui.

type TextoProjeto = { title?: string; description?: string; longDescription?: string; role?: string; team?: string; highlights?: string[] };
type TextoExperiencia = { company?: string; position?: string; description?: string; location?: string };
type TextoSkill = { name?: string; description?: string };

export interface Traducao {
    personal: { title: string; subtitle: string; bio: string; location: string };
    projects: Record<string, TextoProjeto>; // chave: slug
    experiences: Record<string, TextoExperiencia>; // chave: id
    education: Record<string, { degree?: string; major?: string; activities?: string[] }>;
    achievements: Record<string, { title?: string; type?: string }>;
    hardSkills: TextoSkill[]; // mesma ordem de portfolio.ts
    softSkills: TextoSkill[];
}

export const traducoes: Record<'en' | 'es' | 'ru', Traducao> = {
    en: {
        personal: {
            title: 'AI Engineer & Web Developer',
            subtitle: 'Websites, automations and AI agents that bring customers to your business',
            bio: 'I build high-converting websites, WhatsApp automations and AI agents for small businesses that want to sell more without hiring a team. I handle everything from briefing to deploy: design, code, automated prospecting and launch.',
            location: 'São Paulo, Brazil',
        },
        projects: {
            'inovare-pintura': { title: 'Inovare Pintura — Client website', description: 'Business website for a painting and renovation company in Olhão, Portugal.', longDescription: 'Delivered for a real client in Portugal: website with project gallery, services (painting, drywall, plumbing, thermal insulation) and quote requests. Custom domain, live in production.', role: 'Full Stack Developer', team: 'Client project', highlights: ['International client', 'Custom domain', 'Built for quote requests'] },
            'nexus-scan': { title: 'NEXUS SCAN — Local prospecting', description: 'Scans Google Maps for a city, finds businesses without a website and writes a ready-to-send WhatsApp pitch.', longDescription: 'Prospecting tool that cross-checks Google Places data, spots digital gaps (businesses with no website or a weak presence) and delivers a personalized pitch for each lead.', role: 'Creator', team: 'Own product', highlights: ['Lead scoring', 'Personalized message', 'City search'] },
            'repass-ai': { title: 'REPASS AI — OSINT & 3D websites', description: 'Agentic platform that scans local leads, enriches the data and generates 3D websites automatically.', longDescription: 'Agentic engine combining OSINT scanning of local businesses, enrichment via Places API and autonomous 3D website generation, so the client sees the proposal ready.', role: 'Creator', team: 'Own product', highlights: ['AI agents', '3D website generation', 'Lead enrichment'] },
            'prospector-3d': { title: 'Prospector — 3D office of agents', description: 'A team of local AI agents (Atlas, Nova, Maia, Leo, Alva) that finds companies, audits their website and drafts the WhatsApp pitch.', longDescription: 'Multi-agent system running 100% locally with Ollama: each agent has a role (discovery, audit, decision, copywriting) and the work is shown in a living 3D office. Node 22, zero dependencies.', role: 'Creator', team: 'Own product', highlights: ['Multi-agent', 'Local AI', '3D visualization'] },
            'whatsapp-automation': { title: 'WhatsApp Automation', description: 'Dashboard to create and track automated WhatsApp campaigns.', role: 'Creator', team: 'Own product', highlights: ['Campaigns', 'Automation', 'Dashboard'] },
            'victor-ads': { title: 'Victor Ads — AI systems for business', description: 'Services website: automations that let a one-person business run like a team.', role: 'Design & Development', team: 'Own brand' },
            'tranquilin-city': { title: 'Tranquilin City — Digital urban housing', description: 'Digital map of units with real-time data, fractional funding and an investor dashboard.', role: 'Full Stack Developer' },
            'o-protocolo': { title: 'The Protocol — AI-assisted engineering', description: 'A production method that separates engineering from vibecoding: 20 gates, base prompts and an agent workflow.', role: 'Author' },
            'victor-hub-ai': { title: 'Victor Hub AI', description: 'Personal arsenal: UI/UX, animated websites, 3D, automations and the Victor Hub OS.', role: 'Creator' },
            'solucoes-digitais': { title: 'Victor Digital Solutions', description: 'Recruitment page for sales partners who prospect clients for websites, automations and AI.', role: 'Creator' },
            'golgothateams': { description: 'Command hub for bug bounty: roadmap, multi-platform setup, playbook and project board.', role: 'Creator' },
        },
        experiences: {
            'prof-1': { position: 'Web Developer — Freelance', description: 'Built and launched the company website, with a project gallery and quote requests.', location: 'Remote' },
            'prof-2': { company: 'Victor Digital Solutions', position: 'Founder — Websites, Automation & AI', description: 'Websites, WhatsApp automations and AI-powered prospecting tools for small businesses.', location: 'São Paulo, Brazil' },
        },
        education: { 'edu-1': { degree: 'Continuous learning', major: 'AI, Agents & Cloud', activities: ['IBM Bootcamp', 'Santander Acceleration', 'DIO.pro'] } },
        achievements: {
            'cert-1': { title: 'Introduction to AWS and Cloud Computing', type: 'Course' },
            'cert-2': { title: 'Santander Acceleration — Building a project with Lovable', type: 'Course' },
            'cert-3': { title: 'Programming in the Age of AI Agents', type: 'Course' },
            'cert-4': { title: 'IBM Bob Bootcamp: Enterprise-Grade AI', type: 'Course' },
        },
        hardSkills: [
            { name: 'AI Agents', description: 'Multi-agent systems for prospecting, auditing and writing outreach.' },
            { name: 'WhatsApp Automation', description: 'Automated campaigns and flows for support and prospecting.' },
            { name: 'Web Development', description: 'Conversion-focused websites and landing pages in Next.js.' },
            { name: '3D Experiences', description: '3D scenes and interfaces with Three.js.' },
            { name: 'Data-driven Prospecting', description: 'Collecting and qualifying local leads via Google Places.' },
            { name: 'Deploy & Cloud', description: 'Shipping on Vercel and AWS fundamentals.' },
        ],
        softSkills: [
            { name: 'Execution', description: 'From briefing to deploy, shipped and live' },
            { name: 'Business mindset', description: 'Technology that helps you sell more' },
            { name: 'Continuous learning', description: 'Studying AI and agents every day' },
            { name: 'Straight talk', description: 'Technical things explained plainly' },
        ],
    },
    es: {
        personal: {
            title: 'Ingeniero de IA y Desarrollador Web',
            subtitle: 'Sitios web, automatizaciones y agentes de IA que atraen clientes a tu negocio',
            bio: 'Creo sitios web que convierten, automatizaciones de WhatsApp y agentes de IA para pequeños negocios que quieren vender más sin contratar un equipo. Trabajo del briefing al deploy: diseño, código, prospección automatizada y publicación.',
            location: 'São Paulo, Brasil',
        },
        projects: {
            'inovare-pintura': { title: 'Inovare Pintura — Sitio para cliente', description: 'Sitio institucional para una empresa de pintura y reformas en Olhão, Portugal.', longDescription: 'Proyecto entregado a un cliente real en Portugal: sitio con portafolio de obras, servicios (pintura, pladur, fontanería, aislamiento térmico) y solicitud de presupuestos. Dominio propio y en producción.', role: 'Desarrollador Full Stack', team: 'Proyecto para cliente', highlights: ['Cliente internacional', 'Dominio propio', 'Enfocado en presupuestos'] },
            'nexus-scan': { title: 'NEXUS SCAN — Prospección local', description: 'Recorre Google Maps de la ciudad, encuentra negocios sin sitio web y genera el mensaje de WhatsApp listo para enviar.', longDescription: 'Herramienta de prospección que cruza datos de Google Places, detecta brechas digitales (empresas sin sitio o con presencia débil) y entrega un mensaje personalizado para cada lead.', role: 'Creador', team: 'Producto propio', highlights: ['Puntuación de leads', 'Mensaje personalizado', 'Búsqueda por ciudad'] },
            'repass-ai': { title: 'REPASS AI — OSINT y sitios 3D', description: 'Plataforma agéntica que rastrea leads locales, enriquece los datos y genera sitios 3D automáticamente.', longDescription: 'Motor agéntico que combina rastreo OSINT de negocios locales, enriquecimiento vía Places API y generación autónoma de sitios 3D para presentar al cliente la propuesta lista.', role: 'Creador', team: 'Producto propio', highlights: ['Agentes de IA', 'Generación de sitios 3D', 'Enriquecimiento de leads'] },
            'prospector-3d': { title: 'Prospector — Oficina 3D de agentes', description: 'Equipo de agentes de IA locales (Atlas, Nova, Maia, Leo, Alva) que encuentra empresas, audita su sitio y prepara el mensaje de WhatsApp.', longDescription: 'Sistema multiagente 100% local con Ollama: cada agente tiene una función (descubrimiento, auditoría, decisión, redacción) y el trabajo se ve en una oficina 3D viva. Node 22 sin dependencias.', role: 'Creador', team: 'Producto propio', highlights: ['Multiagente', 'IA local', 'Visualización 3D'] },
            'whatsapp-automation': { title: 'WhatsApp Automation', description: 'Panel para crear y seguir campañas automatizadas de WhatsApp.', role: 'Creador', team: 'Producto propio', highlights: ['Campañas', 'Automatización', 'Dashboard'] },
            'victor-ads': { title: 'Victor Ads — Sistemas de IA para negocios', description: 'Sitio de servicios: automatizaciones que hacen que un negocio de una sola persona funcione como un equipo.', role: 'Diseño y Desarrollo', team: 'Marca propia' },
            'tranquilin-city': { title: 'Tranquilin City — Vivienda urbana digital', description: 'Mapa digital de unidades con datos en tiempo real, captación fraccionada y panel para inversores.', role: 'Desarrollador Full Stack' },
            'o-protocolo': { title: 'El Protocolo — Ingeniería con IA', description: 'Método de producción que separa la ingeniería del vibecoding: 20 gates, prompts base y flujo de agentes.', role: 'Autor' },
            'victor-hub-ai': { title: 'Victor Hub AI', description: 'Arsenal personal: UI/UX, sitios animados, 3D, automatizaciones y el Victor Hub OS.', role: 'Creador' },
            'solucoes-digitais': { title: 'Victor Soluciones Digitales', description: 'Página de reclutamiento de socios comerciales que prospectan clientes de sitios, automatizaciones e IA.', role: 'Creador' },
            'golgothateams': { description: 'Centro de mando para bug bounty: roadmap, configuración multiplataforma, playbook y tablero de proyectos.', role: 'Creador' },
        },
        experiences: {
            'prof-1': { position: 'Desarrollador Web — Freelance', description: 'Desarrollo y publicación del sitio de la empresa, con portafolio de obras y solicitud de presupuestos.', location: 'Remoto' },
            'prof-2': { company: 'Victor Soluciones Digitales', position: 'Fundador — Sitios, Automatización e IA', description: 'Sitios web, automatizaciones de WhatsApp y herramientas de prospección con IA para pequeños negocios.' },
        },
        education: { 'edu-1': { degree: 'Formación continua', major: 'IA, Agentes y Cloud', activities: ['Bootcamp IBM', 'Aceleración Santander', 'DIO.pro'] } },
        achievements: {
            'cert-1': { title: 'Introducción a AWS y la computación en la nube', type: 'Curso' },
            'cert-2': { title: 'Aceleración Santander — Creando un proyecto con Lovable', type: 'Curso' },
            'cert-3': { title: 'Programando en la era de los agentes de IA', type: 'Curso' },
            'cert-4': { title: 'Bootcamp IBM Bob: IA de nivel empresarial', type: 'Curso' },
        },
        hardSkills: [
            { name: 'Agentes de IA', description: 'Sistemas multiagente para prospección, auditoría y redacción de mensajes.' },
            { name: 'Automatización de WhatsApp', description: 'Campañas y flujos automáticos de atención y prospección.' },
            { name: 'Desarrollo Web', description: 'Sitios y landing pages en Next.js enfocados en conversión.' },
            { name: 'Experiencias 3D', description: 'Escenas e interfaces 3D con Three.js.' },
            { name: 'Prospección con datos', description: 'Recolección y calificación de leads locales vía Google Places.' },
            { name: 'Deploy y Cloud', description: 'Publicación en Vercel y fundamentos de AWS.' },
        ],
        softSkills: [
            { name: 'Ejecución', description: 'Del briefing al deploy, publicado y funcionando' },
            { name: 'Visión de negocio', description: 'Tecnología al servicio de vender más' },
            { name: 'Aprendizaje continuo', description: 'Estudiando IA y agentes todos los días' },
            { name: 'Comunicación directa', description: 'Explico lo técnico sin rodeos' },
        ],
    },
    ru: {
        personal: {
            title: 'AI-инженер и веб-разработчик',
            subtitle: 'Сайты, автоматизация и AI-агенты, которые приводят клиентов в ваш бизнес',
            bio: 'Создаю продающие сайты, автоматизацию WhatsApp и AI-агентов для малого бизнеса, который хочет продавать больше без найма команды. Веду проект от брифа до запуска: дизайн, код, автоматический поиск клиентов и публикация.',
            location: 'Сан-Паулу, Бразилия',
        },
        projects: {
            'inovare-pintura': { title: 'Inovare Pintura — сайт для клиента', description: 'Сайт компании по покраске и ремонту в Ольяне, Португалия.', longDescription: 'Проект для реального клиента в Португалии: сайт с портфолио работ, услугами (покраска, гипсокартон, сантехника, теплоизоляция) и заявками на расчёт стоимости. Собственный домен, работает в продакшене.', role: 'Full Stack разработчик', team: 'Клиентский проект', highlights: ['Зарубежный клиент', 'Собственный домен', 'Ориентирован на заявки'] },
            'nexus-scan': { title: 'NEXUS SCAN — локальный поиск клиентов', description: 'Сканирует Google Maps города, находит бизнесы без сайта и готовит сообщение для WhatsApp.', longDescription: 'Инструмент поиска клиентов: сопоставляет данные Google Places, выявляет цифровые пробелы (компании без сайта или со слабым присутствием) и формирует персональное предложение для каждого лида.', role: 'Автор', team: 'Собственный продукт', highlights: ['Оценка лидов', 'Персональное сообщение', 'Поиск по городу'] },
            'repass-ai': { title: 'REPASS AI — OSINT и 3D-сайты', description: 'Агентная платформа: находит локальные лиды, обогащает данные и автоматически генерирует 3D-сайты.', longDescription: 'Агентный движок: OSINT-сканирование локального бизнеса, обогащение через Places API и автономная генерация 3D-сайтов, чтобы клиент сразу видел готовое предложение.', role: 'Автор', team: 'Собственный продукт', highlights: ['AI-агенты', 'Генерация 3D-сайтов', 'Обогащение лидов'] },
            'prospector-3d': { title: 'Prospector — 3D-офис агентов', description: 'Команда локальных AI-агентов (Atlas, Nova, Maia, Leo, Alva): находит компании, проверяет сайт и готовит сообщение в WhatsApp.', longDescription: 'Мультиагентная система, полностью локальная на Ollama: у каждого агента своя роль (поиск, аудит, решение, текст), а работа показана в живом 3D-офисе. Node 22 без зависимостей.', role: 'Автор', team: 'Собственный продукт', highlights: ['Мультиагентность', 'Локальный AI', '3D-визуализация'] },
            'whatsapp-automation': { title: 'WhatsApp Automation', description: 'Панель для создания и отслеживания автоматических рассылок в WhatsApp.', role: 'Автор', team: 'Собственный продукт', highlights: ['Рассылки', 'Автоматизация', 'Дашборд'] },
            'victor-ads': { title: 'Victor Ads — AI-системы для бизнеса', description: 'Сайт услуг: автоматизация, благодаря которой бизнес одного человека работает как команда.', role: 'Дизайн и разработка', team: 'Собственный бренд' },
            'tranquilin-city': { title: 'Tranquilin City — цифровое городское жильё', description: 'Цифровая карта объектов с данными в реальном времени, долевым финансированием и панелью для инвесторов.', role: 'Full Stack разработчик' },
            'o-protocolo': { title: 'Протокол — инженерия с AI', description: 'Метод разработки, отделяющий инженерию от вайбкодинга: 20 этапов проверки, базовые промпты и workflow агентов.', role: 'Автор' },
            'victor-hub-ai': { title: 'Victor Hub AI', description: 'Личный арсенал: UI/UX, анимированные сайты, 3D, автоматизация и Victor Hub OS.', role: 'Автор' },
            'solucoes-digitais': { title: 'Victor Digital Solutions', description: 'Страница набора партнёров, которые находят клиентов на сайты, автоматизацию и AI.', role: 'Автор' },
            'golgothateams': { description: 'Командный центр для bug bounty: роадмап, мультиплатформенная настройка, плейбук и доска проектов.', role: 'Автор' },
        },
        experiences: {
            'prof-1': { position: 'Веб-разработчик — фриланс', description: 'Разработка и запуск сайта компании с портфолио работ и заявками на расчёт.', location: 'Удалённо' },
            'prof-2': { company: 'Victor Digital Solutions', position: 'Основатель — сайты, автоматизация и AI', description: 'Сайты, автоматизация WhatsApp и AI-инструменты поиска клиентов для малого бизнеса.', location: 'Сан-Паулу, Бразилия' },
        },
        education: { 'edu-1': { degree: 'Непрерывное обучение', major: 'AI, агенты и облако', activities: ['Буткемп IBM', 'Акселерация Santander', 'DIO.pro'] } },
        achievements: {
            'cert-1': { title: 'Введение в AWS и облачные вычисления', type: 'Курс' },
            'cert-2': { title: 'Акселерация Santander — проект на Lovable', type: 'Курс' },
            'cert-3': { title: 'Программирование в эпоху AI-агентов', type: 'Курс' },
            'cert-4': { title: 'Буткемп IBM Bob: AI корпоративного уровня', type: 'Курс' },
        },
        hardSkills: [
            { name: 'AI-агенты', description: 'Мультиагентные системы для поиска клиентов, аудита и написания предложений.' },
            { name: 'Автоматизация WhatsApp', description: 'Автоматические рассылки и сценарии поддержки и продаж.' },
            { name: 'Веб-разработка', description: 'Продающие сайты и лендинги на Next.js.' },
            { name: '3D-интерфейсы', description: '3D-сцены и интерфейсы на Three.js.' },
            { name: 'Поиск клиентов по данным', description: 'Сбор и квалификация локальных лидов через Google Places.' },
            { name: 'Деплой и облако', description: 'Публикация на Vercel и основы AWS.' },
        ],
        softSkills: [
            { name: 'Результат', description: 'От брифа до запуска — всё работает' },
            { name: 'Бизнес-мышление', description: 'Технологии, которые помогают продавать' },
            { name: 'Постоянное обучение', description: 'Каждый день изучаю AI и агентов' },
            { name: 'Прямое общение', description: 'Объясняю технические вещи просто' },
        ],
    },
};
