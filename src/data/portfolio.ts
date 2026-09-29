export type Locale = "pt" | "en";

export type LocalizedText = Record<Locale, string>;

export type ProjectVisibility = "featured" | "summary" | "draft";

export interface Metric {
  value: string;
  label: LocalizedText;
}

export interface ProjectCase {
  slug: string;
  title: string;
  category: LocalizedText;
  visibility: ProjectVisibility;
  period: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  flow?: LocalizedText[];
  impact: LocalizedText[];
  decisions: LocalizedText[];
  stack: string[];
  private: boolean;
  role?: LocalizedText;
  context?: LocalizedText;
  highlight?: LocalizedText;
  media?: {
    coverImage?: string;
    videoUrl?: string;
    posterImage?: string;
  };
  links?: Array<{
    label: LocalizedText;
    url: string;
  }>;
  confidentiality?: LocalizedText;
  accent: "cyan" | "blue" | "violet" | "amber";
}

export interface ExperienceItem {
  company: string;
  role: LocalizedText;
  period: LocalizedText;
  contract?: string;
  summary: LocalizedText;
  highlights: LocalizedText[];
}

export interface CapabilityGroup {
  id: "automation" | "fullstack" | "ai-data" | "infra-growth";
  title: LocalizedText;
  description: LocalizedText;
  items: string[];
}

export const siteConfig = {
  name: "Victor Senisse",
  email: "senissevictor@gmail.com",
  linkedin: "https://www.linkedin.com/in/victorsenisse/",
  github: "https://github.com/Senisse19",
  siteUrl: "https://victorsenisse.me",
  videoUrl: "https://vimeo.com/1230247856?share=copy&fl=sv&fe=ci" as string | undefined,
  videoPoster: "https://i.vimeocdn.com/video/2205108967-601475346a9f80593756b501f4df123903e27a9f06f559661e22d6bbde1ee5e9-d_640?region=us" as string | undefined,
};

export const siteCopy = {
  pt: {
    nav: {
      work: "Automações",
      capabilities: "Projetos",
      experience: "Trajetória",
      about: "Sobre",
      skills: "Competências",
      contact: "Contato",
    },
    actions: {
      viewWork: "Explorar projetos",
      linkedin: "Falar no LinkedIn",
      resume: "Baixar currículo",
      details: "Ver case",
      viewEcosystem: "Ver todos os projetos",
      visit: "Visitar projeto",
      back: "Voltar ao portfólio",
      next: "Próximo case",
      email: "Enviar e-mail",
      seeResults: "Ver resultados no vídeo",
    },
    hero: {
      availability: "Aberto a oportunidades · CLT/PJ · Brasil e remoto internacional",
      eyebrow: "Full-stack · Automação · IA aplicada",
      since: "Em tecnologia desde 2021",
      stack: "Python · TypeScript · Next.js · FastAPI · PostgreSQL · n8n",
      title: "Transformo processos manuais em sistemas automatizados, inteligentes e escaláveis.",
      description:
        "Desenvolvedor full-stack especializado em automação ponta a ponta — dos workflows e integrações ao produto web, dados e agentes de IA.",
      photoAlt: "Victor Senisse, desenvolvedor full-stack especializado em automação",
      visualLabel: "Fluxo de automação: gatilho, orquestração, integrações e resultado",
    },
    sections: {
      workEyebrow: "Projetos selecionados",
      workTitle: "Sistemas que tiram o trabalho manual do caminho.",
      workDescription:
        "Quatro produtos que criei e liderei, da arquitetura ao deploy. Abra um case para ver o problema, a solução e as decisões técnicas.",
      additionalTitle: "Outros projetos",
      ecosystemEyebrow: "Escala e integração",
      ecosystemTitle: "Um produto central. Um ecossistema inteiro conectado.",
      ecosystemDescription:
        "Projetos desenvolvidos com o time de Automação & IA do Grupo Studio, organizados por frente técnica para explorar no seu ritmo.",
      ecosystemCaption: "Ecossistema do time de Automação & IA · 65 repositórios",
      capabilitiesEyebrow: "Como eu construo",
      capabilitiesTitle: "Da tarefa repetitiva ao sistema em produção.",
      explorerEyebrow: "Ecossistema Grupo Studio",
      experienceEyebrow: "Trajetória",
      experienceTitle: "Experiência que conecta operação e engenharia.",
      videoEyebrow: "Resultados em produção",
      videoTitle: "Veja os sistemas funcionando e os resultados entregues.",
      videoDescription:
        "Apresentação dos produtos que construí no Grupo Studio rodando em produção: como as soluções se conectam e o que mudou na operação.",
      videoAction: "Assistir apresentação",
      videoFrameTitle: "Apresentação dos projetos do Grupo Studio",
      aboutEyebrow: "Sobre",
      aboutTitle: "Tecnologia com contexto de negócio.",
      aboutBody:
        "Comecei em suporte e infraestrutura, perto de quem usa os sistemas. Hoje construo automações, APIs e produtos full-stack que conectam operação, dados e resultado.",
      aboutStory:
        "Foram quase dois anos de help desk atendendo mais de 200 usuários, depois back-end em Progress 4GL para a TK Elevator na Zallpy. Hoje, no Grupo Studio e na Brivia, crio produtos de automação e IA de ponta a ponta: modelo de dados, APIs, robôs, interface e deploy.",
      contactEyebrow: "Vamos conversar",
      contactTitle: "Procurando alguém para transformar processos em sistemas?",
      contactBody:
        "Estou aberto a oportunidades em automação, desenvolvimento full-stack e IA aplicada, no Brasil ou em times remotos internacionais.",
    },
    labels: {
      privateProject: "Projeto corporativo privado",
      role: "Meu papel",
      context: "Contexto",
      period: "Período",
      problem: "O problema",
      solution: "A solução",
      impact: "Impacto e escala",
      decisions: "Decisões técnicas",
      stack: "Tecnologias",
      architecture: "Arquitetura",
      architectureSteps: ["interface", "orquestração", "dados + APIs", "resultado"],
      confidentiality: "Confidencialidade",
      confidentialityBody:
        "Este case descreve arquitetura e decisões sem expor código, credenciais, clientes ou dados da operação.",
    },
    footer: "Desenvolvido por Victor Senisse · Porto Alegre, RS",
  },
  en: {
    nav: {
      work: "Automation",
      capabilities: "Projects",
      experience: "Career",
      about: "About",
      skills: "Skills",
      contact: "Contact",
    },
    actions: {
      viewWork: "Explore projects",
      linkedin: "Message on LinkedIn",
      resume: "Download resume",
      details: "View case study",
      viewEcosystem: "View all projects",
      visit: "Visit project",
      back: "Back to portfolio",
      next: "Next case",
      email: "Send an email",
      seeResults: "See results in the video",
    },
    hero: {
      availability: "Open to opportunities · Employment/contract · Brazil and international remote",
      eyebrow: "Full-stack · Automation · Applied AI",
      since: "Working in tech since 2021",
      stack: "Python · TypeScript · Next.js · FastAPI · PostgreSQL · n8n",
      title: "I turn manual processes into automated, intelligent and scalable systems.",
      description:
        "Full-stack developer specializing in end-to-end automation — from workflows and integrations to web products, data and AI agents.",
      photoAlt: "Victor Senisse, full-stack developer specializing in automation",
      visualLabel: "Automation flow: trigger, orchestration, integrations and outcome",
    },
    sections: {
      workEyebrow: "Selected projects",
      workTitle: "Systems that move manual work out of the way.",
      workDescription:
        "Four products I created and led, from architecture to deployment. Open a case study to see the problem, solution and technical decisions.",
      additionalTitle: "Additional projects",
      ecosystemEyebrow: "Scale and integration",
      ecosystemTitle: "One core product. An entire connected ecosystem.",
      ecosystemDescription:
        "Projects developed with the Grupo Studio Automation & AI team, organized by technical area so you can explore at your own pace.",
      ecosystemCaption: "Automation & AI team ecosystem · 65 repositories",
      capabilitiesEyebrow: "How I build",
      capabilitiesTitle: "From repetitive work to a production system.",
      explorerEyebrow: "Grupo Studio ecosystem",
      experienceEyebrow: "Career",
      experienceTitle: "Experience bridging operations and engineering.",
      videoEyebrow: "Results in production",
      videoTitle: "See the systems running and the results they delivered.",
      videoDescription:
        "A walkthrough of the products I built at Grupo Studio running in production: how the solutions connect and what changed in the operation.",
      videoAction: "Watch presentation",
      videoFrameTitle: "Grupo Studio project presentation",
      aboutEyebrow: "About",
      aboutTitle: "Technology with business context.",
      aboutBody:
        "I started in support and infrastructure, close to the people using the systems. Today I build automations, APIs and full-stack products connecting operations, data and outcomes.",
      aboutStory:
        "I spent almost two years in help desk supporting more than 200 users, then moved to back-end development in Progress 4GL for TK Elevator at Zallpy. Today, at Grupo Studio and Brivia, I build automation and AI products end to end: data model, APIs, robots, interface and deployment.",
      contactEyebrow: "Let's talk",
      contactTitle: "Looking for someone to turn processes into systems?",
      contactBody:
        "I am open to opportunities in automation, full-stack development and applied AI, in Brazil or with international remote teams.",
    },
    labels: {
      privateProject: "Private corporate project",
      role: "My role",
      context: "Context",
      period: "Period",
      problem: "The problem",
      solution: "The solution",
      impact: "Impact and scale",
      decisions: "Technical decisions",
      stack: "Technologies",
      architecture: "Architecture",
      architectureSteps: ["interface", "orchestration", "data + APIs", "outcome"],
      confidentiality: "Confidentiality",
      confidentialityBody:
        "This case study explains architecture and decisions without exposing code, credentials, clients or operational data.",
    },
    footer: "Built by Victor Senisse · Porto Alegre, Brazil",
  },
} satisfies Record<Locale, unknown>;

// The ecosystem solution count is added by the About section (ecosystem.ts imports this file)
export const metrics: Metric[] = [
  {
    value: "4",
    label: {
      pt: "produtos criados e liderados",
      en: "products created and led",
    },
  },
  {
    value: "115",
    label: {
      pt: "migrations em produção sem downtime",
      en: "production migrations without downtime",
    },
  },
  {
    value: "3×",
    label: {
      pt: "ROI médio em produto próprio",
      en: "average ROI for an owned product",
    },
  },
];

export const projects: ProjectCase[] = [
  {
    slug: "automatax",
    title: "AutomaTax",
    category: { pt: "Orquestração fiscal", en: "Tax automation orchestration" },
    visibility: "featured",
    period: { pt: "2026 — atual", en: "2026 — present" },
    summary: {
      pt: "Plataforma central que coordena procurações, consultas ao SERPRO, filas de RPAs, documentos e inteligência operacional.",
      en: "Core platform coordinating powers of attorney, SERPRO requests, RPA queues, documents and operational intelligence.",
    },
    problem: {
      pt: "Centenas de CNPJs eram acompanhados por planilhas, consultas manuais e robôs sem coordenação. Faltava uma fonte central para filas, permissões, documentos e resultados.",
      en: "Hundreds of company records were managed through spreadsheets, manual queries and disconnected bots. The operation lacked a single source for queues, permissions, documents and outcomes.",
    },
    solution: {
      pt: "Uma aplicação Next.js conectada a um backend FastAPI, Postgres e integrações governamentais. Usuários abrem solicitações; RPAs reservam o trabalho por RPCs, processam documentos e devolvem status ao mesmo banco.",
      en: "A Next.js application connected to FastAPI, Postgres and government integrations. Users create requests; RPAs reserve work through RPCs, process documents and write status back to the same database.",
    },
    flow: [
      { pt: "Solicitação", en: "Request" }, { pt: "Fila Postgres", en: "Postgres queue" },
      { pt: "RPA / SERPRO", en: "RPA / SERPRO" }, { pt: "Documento + status", en: "Document + status" },
    ],
    impact: [
      { pt: "115 migrations versionadas, com homologação e rollback.", en: "115 versioned migrations with staging and rollback." },
      { pt: "21 tabelas e 85 colunas padronizadas sem quebrar consumidores.", en: "21 tables and 85 columns standardized without breaking consumers." },
      { pt: "4.862 padrões de consulta mapeados em 107 dias.", en: "4,862 query patterns mapped across 107 days." },
      { pt: "Sete famílias de documentos coordenadas pela mesma fila operacional.", en: "Seven document families coordinated through one operational queue." },
    ],
    decisions: [
      {
        pt: "Cache de token SERPRO thread-safe, com lock por chave, double-checked locking e timeout para proteger o pool do FastAPI.",
        en: "Thread-safe SERPRO token cache with per-key locks, double-checked locking and timeouts to protect the FastAPI pool.",
      },
      {
        pt: "Views de compatibilidade preservaram integrações antigas durante a padronização do banco.",
        en: "Compatibility views preserved legacy integrations while the production schema was standardized.",
      },
      {
        pt: "Sincronização idempotente e somente leitura substituiu uma integração por linked server que falhava silenciosamente.",
        en: "An idempotent, read-only synchronization replaced a linked-server integration that failed silently.",
      },
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "Supabase", "Docker", "SERPRO", "SWR", "Recharts"],
    private: true,
    role: {
      pt: "Criei e liderei — da arquitetura ao deploy, em desenvolvimento full-stack.",
      en: "Created and led — from architecture to deployment, full-stack.",
    },
    context: {
      pt: "O e-CAC é o portal da Receita Federal para empresas e o SERPRO é a API oficial do governo para dados fiscais — antes, tudo isso era acessado manualmente.",
      en: "e-CAC is Brazil's federal tax portal for companies and SERPRO is the government's official tax-data API — both used to be accessed manually.",
    },
    highlight: { pt: "Centenas de CNPJs coordenados em uma fila central", en: "Hundreds of companies coordinated in one central queue" },
    accent: "cyan",
  },
  {
    slug: "plataforma-lei-do-bem",
    title: "Plataforma Lei do Bem",
    category: { pt: "SaaS multiempresa", en: "Multi-tenant SaaS" },
    visibility: "featured",
    period: { pt: "2026", en: "2026" },
    summary: {
      pt: "Gestão de projetos de P&D, dispêndios, timesheets, evidências e dossiês para o incentivo fiscal da Lei do Bem.",
      en: "Management of R&D projects, expenses, timesheets, evidence and compliance reports for Brazil's R&D tax incentive.",
    },
    problem: {
      pt: "Projetos, folha, notas fiscais e evidências de P&D eram controlados em planilhas, dificultando revisão, auditoria e isolamento entre clientes.",
      en: "R&D projects, payroll, invoices and evidence were controlled in spreadsheets, making reviews, audits and client isolation difficult.",
    },
    solution: {
      pt: "Uma plataforma multiempresa com fluxo de revisão por campo, motor financeiro, documentos e geração de dossiê, protegida em três camadas de autorização.",
      en: "A multi-tenant platform with field-level review workflows, a financial engine, documents and dossier generation, protected by three authorization layers.",
    },
    flow: [
      { pt: "Projeto de P&D", en: "R&D project" }, { pt: "Dispêndios + evidências", en: "Expenses + evidence" },
      { pt: "Revisão segura", en: "Secure review" }, { pt: "Dossiê", en: "Dossier" },
    ],
    impact: [
      { pt: "Centralização de projetos, dispêndios, folha e evidências.", en: "Projects, expenses, payroll and evidence centralized." },
      { pt: "Isolamento por empresa em aplicação, banco e storage.", en: "Tenant isolation across application, database and storage." },
      { pt: "Geração de dossiê MCTI e módulos de compliance.", en: "MCTI dossier generation and compliance modules." },
    ],
    decisions: [
      { pt: "RLS nas tabelas e políticas equivalentes no Supabase Storage.", en: "RLS on tables with equivalent Supabase Storage policies." },
      { pt: "Service role restrita ao servidor e troca obrigatória de senha temporária.", en: "Service-role access restricted to the server and mandatory temporary-password replacement." },
      { pt: "Scripts automatizados verificam isolamento, uploads e fluxos de aprovação.", en: "Automated scripts verify tenant isolation, uploads and approval flows." },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "RLS", "Storage", "Recharts", "Vercel"],
    private: true,
    role: {
      pt: "Criei e liderei — da arquitetura ao deploy, em desenvolvimento full-stack.",
      en: "Created and led — from architecture to deployment, full-stack.",
    },
    context: {
      pt: "A Lei do Bem é o incentivo fiscal federal para empresas que investem em P&D; para usá-lo, é preciso comprovar os gastos ao MCTI com um dossiê.",
      en: "Lei do Bem is Brazil's federal R&D tax incentive; companies must prove their R&D spending to the Ministry of Science (MCTI) with a dossier.",
    },
    highlight: { pt: "Planilhas → plataforma multiempresa auditável", en: "Spreadsheets → auditable multi-tenant platform" },
    accent: "violet",
  },
  {
    slug: "taxswap",
    title: "TaxSwap",
    category: { pt: "Automação documental", en: "Document automation" },
    visibility: "featured",
    period: { pt: "2026", en: "2026" },
    summary: {
      pt: "Wizard que lê documentos financeiros e fiscais, aplica regras de negócio e gera kits comerciais auditáveis.",
      en: "A wizard that reads financial and tax documents, applies domain rules and generates auditable sales kits.",
    },
    problem: {
      pt: "O time comercial combinava manualmente planilhas e PDFs de três fontes, repetindo cálculos antes de cada proposta.",
      en: "The sales team manually combined spreadsheets and PDFs from three sources, repeating calculations for every proposal.",
    },
    solution: {
      pt: "Um fluxo de importação, revisão e diagnóstico final com extração de PDF, fallback para OCR e geração de uma apresentação consolidada.",
      en: "An import, review and final-diagnosis flow with PDF extraction, OCR fallback and generation of a consolidated presentation.",
    },
    flow: [
      { pt: "Upload validado", en: "Validated upload" }, { pt: "PDF / OCR", en: "PDF / OCR" },
      { pt: "Regras + revisão", en: "Rules + review" }, { pt: "Kit auditável", en: "Auditable kit" },
    ],
    impact: [
      { pt: "Três documentos consolidados em um fluxo guiado.", en: "Three documents consolidated into one guided flow." },
      { pt: "Páginas abaixo de 75% de confiança são reprocessadas.", en: "Pages below 75% confidence are reprocessed." },
      { pt: "Snapshots imutáveis e trilha de auditoria para cada edição.", en: "Immutable snapshots and an audit trail for every edit." },
    ],
    decisions: [
      { pt: "Fallback de pdfjs-dist para Tesseract.js em documentos digitalizados.", en: "Fallback from pdfjs-dist to Tesseract.js for scanned documents." },
      { pt: "Uploads validados por magic bytes; PDFs protegidos por senha são rejeitados.", en: "Uploads validated through magic bytes; password-protected PDFs are rejected." },
      { pt: "Regras de domínio isoladas e cobertas por Vitest antes do deploy.", en: "Domain rules isolated and covered by Vitest before deployment." },
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "Tesseract.js", "React PDF", "Zod", "Vitest", "Vercel"],
    private: true,
    role: {
      pt: "Criei e liderei — da arquitetura ao deploy, em desenvolvimento full-stack.",
      en: "Created and led — from architecture to deployment, full-stack.",
    },
    context: {
      pt: "Diagnósticos tributários de clientes precisam virar propostas comerciais com números corretos e rastreáveis.",
      en: "Client tax diagnostics have to become sales proposals with accurate, traceable numbers.",
    },
    highlight: { pt: "3 fontes manuais → 1 fluxo guiado e auditável", en: "3 manual sources → 1 guided, auditable flow" },
    accent: "amber",
  },
  {
    slug: "social-intelligence-pwa",
    title: "Social Intelligence PWA",
    category: { pt: "PWA · Analytics & Growth", en: "PWA · Analytics & Growth" },
    visibility: "featured",
    period: { pt: "Projeto independente", en: "Independent project" },
    summary: {
      pt: "PWA para acompanhar crescimento de perfis, evolução de seguidores, conteúdo e engajamento, validado com campanhas próprias.",
      en: "A PWA for tracking profile growth, follower movement, content and engagement, validated through owned campaigns.",
    },
    problem: {
      pt: "Dados de crescimento, perdas, ganhos e desempenho de conteúdo ficavam dispersos, dificultando análises e decisões de campanha.",
      en: "Growth, follower changes and content-performance data were fragmented, making campaign analysis and decisions harder.",
    },
    solution: {
      pt: "Uma aplicação web instalável que reúne indicadores de perfil e conteúdo em uma experiência mobile, apoiada por testes de criativos e acompanhamento de mídia.",
      en: "An installable web application combining profile and content indicators in a mobile experience, supported by creative testing and paid-media monitoring.",
    },
    flow: [
      { pt: "Dados do perfil", en: "Profile data" }, { pt: "Indicadores", en: "Indicators" },
      { pt: "PWA instalável", en: "Installable PWA" }, { pt: "Teste de campanhas", en: "Campaign testing" },
    ],
    impact: [
      { pt: "ROI médio de 3x nas campanhas de aquisição.", en: "Average 3x ROI across acquisition campaigns." },
      { pt: "Produto web instalável como aplicativo no celular.", en: "Installable web product with an app-like mobile experience." },
      { pt: "Experimentação conectando produto, criativos e métricas.", en: "Experimentation connecting product, creatives and metrics." },
    ],
    decisions: [
      { pt: "Arquitetura PWA para combinar distribuição web e experiência instalável.", en: "PWA architecture combining web distribution and an installable experience." },
      { pt: "Detalhes comerciais e estruturas proprietárias permanecem deliberadamente privados.", en: "Commercial details and proprietary structures intentionally remain private." },
    ],
    stack: ["React", "Node.js", "JavaScript", "PWA", "REST APIs", "Analytics", "Meta Ads", "Google Ads"],
    private: true,
    role: {
      pt: "Criei e liderei — da arquitetura ao deploy, em desenvolvimento full-stack.",
      en: "Created and led — from architecture to deployment, full-stack.",
    },
    highlight: { pt: "ROI médio de 3× nas campanhas", en: "3× average ROI across campaigns" },
    confidentiality: {
      pt: "Nome, segmento, telas, estrutura comercial e lógica proprietária foram omitidos para proteger o produto.",
      en: "The name, market, screens, commercial structure and proprietary logic were omitted to protect the product.",
    },
    accent: "blue",
  },
  {
    slug: "supply-tax-landing-page",
    title: "Supply Tax Landing Page",
    category: { pt: "Produto e aquisição B2B", en: "B2B product and acquisition" },
    visibility: "summary",
    period: { pt: "2026", en: "2026" },
    summary: {
      pt: "Landing page com calculadora de impacto da Reforma Tributária e envio estruturado de diagnósticos ao comercial.",
      en: "Landing page with a tax-reform impact calculator and structured diagnostics sent to sales.",
    },
    problem: { pt: "O produto precisava captar e qualificar leads B2B.", en: "The product needed to acquire and qualify B2B leads." },
    solution: { pt: "Calculadora interativa, conteúdo educativo e formulário integrado ao Resend.", en: "Interactive calculator, educational content and a Resend-integrated form." },
    impact: [],
    decisions: [],
    stack: ["Next.js", "React", "TypeScript", "Framer Motion", "Resend", "Vercel"],
    private: true,
    accent: "amber",
  },
  {
    slug: "elara",
    title: "Elara Software",
    category: { pt: "Agentes conversacionais", en: "Conversational agents" },
    visibility: "summary",
    period: { pt: "Projeto recente", en: "Recent project" },
    summary: {
      pt: "Agente de IA para atendimento, qualificação de leads e automação de rotinas comerciais por WhatsApp.",
      en: "AI agent for support, lead qualification and sales automation through WhatsApp.",
    },
    problem: { pt: "Atendimento e qualificação dependiam de disponibilidade humana.", en: "Support and qualification depended on human availability." },
    solution: { pt: "Agentes conversacionais integrados a ferramentas de operação e cobrança.", en: "Conversational agents integrated with operations and billing tools." },
    impact: [],
    decisions: [],
    stack: ["n8n", "OpenAI", "Retell AI", "Supabase", "PostgreSQL", "WhatsApp API"],
    private: false,
    media: { coverImage: "/elara-cover.png" },
    links: [{ label: { pt: "Visitar projeto", en: "Visit project" }, url: "https://elarasoftware.com.br" }],
    accent: "violet",
  },
  {
    slug: "chatwoot-data-extractor",
    title: "Chatwoot Data Extractor",
    category: { pt: "Dados e produtividade", en: "Data and productivity" },
    visibility: "summary",
    period: { pt: "Projeto recente", en: "Recent project" },
    summary: {
      pt: "Aplicação desktop para extrair conversas e produzir métricas de SLA, volume, tempo de resposta e produtividade.",
      en: "Desktop application for extracting conversations and producing SLA, volume, response-time and productivity metrics.",
    },
    problem: { pt: "Dados operacionais estavam presos no histórico da plataforma.", en: "Operational data was locked inside platform history." },
    solution: { pt: "Extração filtrada, análise e envio para fluxos de IA sem expor dados reais neste portfólio.", en: "Filtered extraction, analysis and AI workflows without exposing real data in this portfolio." },
    impact: [],
    decisions: [],
    stack: ["Python", "PyQt6", "Chatwoot API", "n8n", "Google Drive API"],
    private: false,
    links: [{ label: { pt: "Ver no GitHub", en: "View on GitHub" }, url: "https://github.com/Senisse19/scraper-historico-chatwoot" }],
    accent: "cyan",
  },
];

export const capabilities: CapabilityGroup[] = [
  {
    id: "automation",
    title: { pt: "Automação e orquestração", en: "Automation and orchestration" },
    description: {
      pt: "Fluxos resilientes, filas, RPAs e integrações que substituem trabalho manual repetitivo.",
      en: "Resilient workflows, queues, RPAs and integrations replacing repetitive manual work.",
    },
    items: ["Python", "Playwright", "n8n", "BullMQ", "pg-boss", "RPA", "Workers", "Webhooks"],
  },
  {
    id: "fullstack",
    title: { pt: "Full-stack e APIs", en: "Full-stack and APIs" },
    description: {
      pt: "Produtos web completos, do modelo de dados à interface e ao deploy.",
      en: "Complete web products, from data model and APIs to interface and deployment.",
    },
    items: ["React", "Next.js", "TypeScript", "Node.js", "FastAPI", "REST", "PostgreSQL", "Supabase", "Zod", "Vitest", "Recharts"],
  },
  {
    id: "ai-data",
    title: { pt: "IA e dados", en: "AI and data" },
    description: {
      pt: "Agentes, NLP, OCR, processamento documental e pipelines orientados a decisões.",
      en: "Agents, NLP, OCR, document processing and decision-oriented data pipelines.",
    },
    items: ["LangChain", "LangGraph", "OpenAI", "RAG", "OCR", "Tesseract.js", "Polars", "DuckDB", "Analytics"],
  },
  {
    id: "infra-growth",
    title: { pt: "Infra, analytics e growth", en: "Infrastructure, analytics and growth" },
    description: {
      pt: "Operação, observabilidade e experimentação conectadas ao resultado do produto.",
      en: "Operations, observability and experimentation connected to product outcomes.",
    },
    items: ["Docker", "Vercel", "Coolify", "Google Cloud", "GA4", "Meta Ads", "Google Ads", "Looker Studio"],
  },
];

export const experiences: ExperienceItem[] = [
  {
    company: "Grupo Studio",
    role: { pt: "Analista de Inteligência Artificial", en: "Artificial Intelligence Analyst" },
    period: { pt: "nov/2025 — atual", en: "Nov 2025 — present" },
    contract: "PJ",
    summary: {
      pt: "Desenvolvimento de produtos full-stack e da plataforma que centraliza o ecossistema de automação fiscal.",
      en: "Full-stack product development within a connected tax-automation ecosystem.",
    },
    highlights: [
      { pt: "Desenvolvimento do AutomaTax e evolução segura do banco de produção.", en: "Development of AutomaTax and safe evolution of its production database." },
      { pt: "Integrações com SERPRO, SQL Server, Google Calendar, WhatsApp e RPAs.", en: "Integrations with SERPRO, SQL Server, Google Calendar, WhatsApp and RPAs." },
    ],
  },
  {
    company: "Brivia Group",
    role: { pt: "Especialista em IA e n8n", en: "AI and n8n Specialist" },
    period: { pt: "nov/2025 — atual", en: "Nov 2025 — present" },
    contract: "PJ",
    summary: {
      pt: "Criação de automações, integrações de APIs, agentes e experiências web apoiadas por IA.",
      en: "Building automations, API integrations, agents and AI-assisted web experiences.",
    },
    highlights: [
      { pt: "Orquestração de fluxos com n8n e integração de serviços externos.", en: "Workflow orchestration with n8n and external-service integrations." },
      { pt: "Implementação de agentes e páginas dinâmicas para iniciativas digitais.", en: "Implementation of agents and dynamic pages for digital initiatives." },
    ],
  },
  {
    company: "Zallpy Digital",
    role: { pt: "Desenvolvedor Back-end", en: "Back-end Developer" },
    period: { pt: "out/2023 — abr/2025", en: "Oct 2023 — Apr 2025" },
    summary: {
      pt: "Desenvolvimento e manutenção de sistemas para a TK Elevator com Progress 4GL, automações e suporte à operação.",
      en: "Development and maintenance of TK Elevator systems using Progress 4GL, automation and operational support.",
    },
    highlights: [],
  },
  {
    company: "TozziniFreire Advogados",
    role: { pt: "Assistente de Help Desk", en: "Help Desk Assistant" },
    period: { pt: "dez/2021 — out/2023", en: "Dec 2021 — Oct 2023" },
    summary: {
      pt: "Suporte a mais de 200 usuários, Active Directory, redes, virtualização e resolução de incidentes.",
      en: "Support for more than 200 users, Active Directory, networking, virtualization and incident resolution.",
    },
    highlights: [],
  },
];

export const ecosystemGroups = [
  {
    id: "ecac",
    title: { pt: "RPAs e-CAC", en: "e-CAC RPAs" },
    examples: ["DCTFWeb", "DARF", "PER/DCOMP", "Situação Fiscal"],
  },
  {
    id: "esocial",
    title: { pt: "eSocial e EFD-Reinf", en: "eSocial and EFD-Reinf" },
    examples: ["Downloads eSocial", "EFD-Reinf", "Procurações", "Tax Lumen"],
  },
  {
    id: "data",
    title: { pt: "SPED e dados", en: "SPED and data" },
    examples: ["motor-sped", "SupplyTAX", "autoEFD", "Diagnósticos"],
  },
  {
    id: "infra",
    title: { pt: "APIs e infraestrutura", en: "APIs and infrastructure" },
    examples: ["SERPRO", "Sessões e-CAC", "Filas", "Workers"],
  },
] as const;

export const featuredProjects = projects.filter((project) => project.visibility === "featured");
