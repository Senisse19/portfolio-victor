import type { LocalizedText } from "./portfolio";

export interface EcosystemCatalogItem {
  id: string;
  name: string;
  description: LocalizedText;
  stack: string[];
}

export interface EcosystemCatalogGroup {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  items: EcosystemCatalogItem[];
}

const item = (
  id: string,
  name: string,
  pt: string,
  en: string,
  stack: string[],
): EcosystemCatalogItem => ({ id, name, description: { pt, en }, stack });

export const ecosystemCatalog: EcosystemCatalogGroup[] = [
  {
    id: "orchestration",
    title: { pt: "Orquestração e infraestrutura", en: "Orchestration and infrastructure" },
    description: {
      pt: "A camada central que distribui trabalho, autentica sessões e mantém os robôs conectados.",
      en: "The core layer distributing work, authenticating sessions and keeping robots connected.",
    },
    items: [
      item("automatax", "AutomaTax", "Plataforma central de filas, permissões, documentos, custos e integrações fiscais.", "Core platform for queues, permissions, documents, costs and tax integrations.", ["Next.js", "FastAPI", "PostgreSQL", "SERPRO"]),
      item("checklist-automation", "Plataforma Checklist Automation", "Interface única para disparar e acompanhar RPAs fiscais conectados à fila central.", "Unified interface for launching and monitoring tax RPAs connected to the central queue.", ["FastAPI", "HTMX", "Playwright", "PostgreSQL"]),
      item("aplogin", "e-CAC Session Manager", "API que mantém e renova sessões autenticadas por certificado para uso compartilhado pelos robôs.", "API that maintains and renews certificate-authenticated sessions shared by robots.", ["Node.js", "Express", "Python", "Playwright"]),
      item("aptcha", "Aptcha", "Serviço assíncrono de resolução de hCaptcha, com filas, workers e escala horizontal.", "Asynchronous hCaptcha-solving service with queues, workers and horizontal scaling.", ["Node.js", "BullMQ", "Redis", "Docker"]),
    ],
  },
  {
    id: "data-audit",
    title: { pt: "SPED, eSocial e auditoria", en: "SPED, eSocial and audit" },
    description: {
      pt: "Plataformas de processamento intensivo, análise fiscal, recuperação de créditos e diagnósticos.",
      en: "Data-intensive platforms for tax analysis, credit recovery and diagnostics.",
    },
    items: [
      item("motor-sped", "motor-sped", "Motor de ingestão SPED com detecção de leiaute, processamento paralelo e dados em Parquet.", "SPED ingestion engine with layout detection, parallel processing and Parquet storage.", ["Python", "Polars", "DuckDB", "FastAPI"]),
      item("supplytax", "SupplyTAX", "Plataforma multiempresa de ingestão SPED e análise de fornecedores para a Reforma Tributária.", "Multi-company SPED ingestion and supplier-analysis platform for Brazil's tax reform.", ["Python", "Polars", "DuckDB", "React"]),
      item("supply-tax-simulator", "Supply Tax", "Simulador multi-tenant de cenários tributários, transição, contratos e DRE projetado.", "Multi-tenant simulator for tax scenarios, transition, contracts and projected income statements.", ["NestJS", "Prisma", "PostgreSQL", "React"]),
      item("autoefd", "autoEFD", "Aplicação desktop local-first para auditoria, classificação fiscal e cálculo de créditos.", "Local-first desktop application for audit, tax classification and credit calculations.", ["Electron", "React", "Python", "DuckDB"]),
      item("tax-lumen", "Tax Lumen", "Pipeline de processamento de XMLs do eSocial, cruzamentos, apuração e classificação assistida por IA.", "Pipeline for eSocial XML processing, reconciliation, calculation and AI-assisted classification.", ["FastAPI", "React", "DuckDB", "PyArrow"]),
      item("esocial-retificador", "eSocial Retificador", "Plataforma de retificação de eventos com domínio compartilhado, filas seguras e comunicação mTLS.", "Event-rectification platform with shared domain logic, secure queues and mTLS communication.", ["Next.js", "Fastify", "pg-boss", "Supabase"]),
      item("hub-studio-law", "Hub Studio Law", "Hub de diagnósticos contábeis e jurídicos gerados a partir de arquivos ECF.", "Hub for accounting and legal diagnostics generated from ECF files.", ["NestJS", "SQL Server", "React", "FastAPI"]),
      item("diagnostics-law", "Diagnostics Law", "Suíte de análise ECF, cálculo de Capag-E, painel por CNPJ e processamento de filas.", "Suite for ECF analysis, Capag-E calculation, company dashboards and queue processing.", ["FastAPI", "Python", "SQL Server", "Pandas"]),
    ],
  },
  {
    id: "products",
    title: { pt: "Produtos web, comercial e portais", en: "Web products, commercial tools and portals" },
    description: {
      pt: "Produtos que transformam análise técnica em operação, relacionamento com clientes e resultado comercial.",
      en: "Products turning technical analysis into operations, client experience and commercial outcomes.",
    },
    items: [
      item("lei-do-bem", "Plataforma Lei do Bem", "Gestão multiempresa de P&D, dispêndios, evidências e dossiês para o incentivo fiscal.", "Multi-company management of R&D, expenses, evidence and tax-incentive dossiers.", ["Next.js", "Supabase", "PostgreSQL", "RLS"]),
      item("taxswap", "TaxSwap", "Automação documental que consolida diagnósticos e gera kits comerciais auditáveis.", "Document automation that consolidates diagnostics and generates auditable sales kits.", ["Next.js", "Tesseract.js", "Supabase", "Vitest"]),
      item("supply-tax-lp", "Supply Tax Landing Page", "Landing page comercial com calculadora de impacto da Reforma Tributária e captação estruturada.", "Commercial landing page with a tax-reform impact calculator and structured lead capture.", ["Next.js", "TypeScript", "Resend", "Vercel"]),
      item("newtax-calc", "New Tax Calculator", "Simulador de preços, proposta e contrato para a oferta New Tax.", "Pricing, proposal and contract simulator for the New Tax offering.", ["HTML", "CSS", "JavaScript"]),
      item("newtax-crm", "New Tax CRM", "CRM com agenda, gestão de projetos e operação comercial do New Tax.", "CRM with scheduling, project management and New Tax sales operations.", ["JavaScript", "Supabase", "REST"]),
      item("crm-chefes", "CRM Chefes de Receita", "Funil comercial para acompanhamento de oportunidades do Núcleo de Receitas.", "Sales pipeline for tracking opportunities in the Revenue practice.", ["JavaScript", "Supabase", "SheetJS"]),
      item("dashboard-lideres", "Painel de Projetos & Líderes", "Painel executivo para visualização de projetos e responsáveis.", "Executive dashboard for visualizing projects and owners.", ["HTML", "CSS", "JavaScript"]),
      item("painel-regional", "Painel Regional", "Apresentação interativa de créditos e honorários regionais alimentada por planilhas.", "Interactive regional credit and fee presentation powered by spreadsheets.", ["Python", "JavaScript", "Vercel Blob"]),
      item("dashboard-comp", "Dashboard de Compensações", "Painel de compensações e restituições integrado a dados operacionais.", "Compensation and refund dashboard integrated with operational data.", ["Next.js", "Google Sheets API", "Drizzle"]),
      item("diagnostico-enquadramento", "Diagnóstico de Enquadramento", "Checklist guiado que usa IA para gerar laudo preliminar de enquadramento na Lei do Bem.", "Guided checklist using AI to generate a preliminary R&D tax-incentive assessment.", ["Next.js", "OpenAI API", "PDF"]),
      item("portal-cliente", "Portal do Cliente", "Portal autenticado para carteira, responsáveis e distribuição segura de DARFs.", "Authenticated portal for portfolios, account owners and secure DARF distribution.", ["Spring Boot", "React", "PostgreSQL", "AWS S3"]),
    ],
  },
  {
    id: "rpa-ecac",
    title: { pt: "RPAs do e-CAC", en: "e-CAC RPAs" },
    description: {
      pt: "Robôs coordenados por filas para operar serviços fiscais, alternar perfis e organizar documentos.",
      en: "Queue-coordinated robots operating tax services, switching profiles and organizing documents.",
    },
    items: [
      item("dctfweb-checklist", "DCTFWeb · Checklist", "Baixa em massa relatórios de débitos da DCTFWeb por CNPJ.", "Bulk-downloads DCTFWeb debt reports by company.", ["Python", "PyAutoGUI", "OpenCV"]),
      item("dctfweb-assisted", "DCTFWeb · Baixa assistida", "Executável que reutiliza uma sessão autenticada e baixa apurações por período.", "Desktop tool reusing one authenticated session to download filings by period.", ["Python", "Playwright", "PyInstaller"]),
      item("dctfweb-averages", "DCTFWeb · Médias previdenciárias", "Apura saldos previdenciários anuais e alimenta a análise de perfil das empresas.", "Calculates annual social-security balances and feeds company-profile analysis.", ["Python", "Selenium", "pdfplumber"]),
      item("dctfweb-manual", "DCTFWeb · Médias e faturamento", "Aplicação local com motores de médias e faturamento para filas ou processamento avulso.", "Local application with average and revenue engines for queue or one-off processing.", ["Flask", "Playwright", "pdfplumber"]),
      item("dctf-dec", "DCTF · DEC e PDF", "Automação que baixa arquivos DEC e PDFs na mesma sessão do e-CAC.", "Automation downloading DEC files and PDFs within the same e-CAC session.", ["Python", "Playwright", "PyAutoGUI"]),
      item("dctf-panel", "DCTF · Painel executável", "Interface empacotada com diagnóstico, calibração e atualização do fluxo DEC/PDF.", "Packaged interface with diagnostics, calibration and updates for the DEC/PDF flow.", ["Python", "CustomTkinter", "Playwright"]),
      item("darf-checklist", "DARF · Checklist", "Extrai comprovantes de arrecadação em massa com retentativas e organização por CNPJ.", "Bulk-extracts tax-payment receipts with retries and company-based organization.", ["Python", "PyAutoGUI", "OpenCV"]),
      item("darf-manual", "DARF · Emissão assistida", "Emite comprovantes DARF, DAS, DAE e DJE a partir de uma sessão isolada.", "Issues DARF, DAS, DAE and DJE receipts from an isolated session.", ["Python", "Playwright", "PyInstaller"]),
      item("perdcomp-download", "PER/DCOMP · Download", "Baixa documentos via DOM, sem dependência de resolução ou reconhecimento de imagem.", "Downloads documents through the DOM without relying on screen resolution or image recognition.", ["Python", "Playwright", "PostgreSQL"]),
      item("perdcomp-missing", "PER/DCOMP · Documentos faltantes", "Cruza listagens com arquivos existentes e solicita cópias ausentes em lotes.", "Reconciles listings with existing files and requests missing copies in batches.", ["Python", "Selenium", "Aptcha"]),
      item("perdcomp-refund", "PER/DCOMP · Restituição", "Cria, confere e transmite pedidos de restituição com checkpoints e confirmação explícita.", "Creates, validates and submits refund requests with checkpoints and explicit confirmation.", ["Python", "FastAPI", "Playwright"]),
      item("perdcomp-compensation", "PER/DCOMP · Compensação", "Prepara pedidos de compensação e restituição em rascunho, bloqueando transmissão automática.", "Prepares compensation and refund requests as drafts while blocking automatic submission.", ["FastAPI", "React", "TypeScript"]),
      item("fiscal-status", "Situação Fiscal", "Baixa relatórios de situação fiscal para cada CNPJ reservado na fila.", "Downloads tax-status reports for each company reserved in the queue.", ["Python", "Playwright", "CustomTkinter"]),
      item("powers-of-attorney", "Procurações eletrônicas", "Extrai, interpreta e reconcilia procurações recebidas, expiradas, canceladas e ativas.", "Extracts, interprets and reconciles received, expired, cancelled and active powers of attorney.", ["Python", "Playwright", "OCR", "Supabase"]),
    ],
  },
  {
    id: "rpa-data",
    title: { pt: "RPAs de eSocial, EFD-Reinf, faturamento e SPED", en: "eSocial, EFD-Reinf, revenue and SPED RPAs" },
    description: {
      pt: "Automações produtor-consumidor, downloads recorrentes e classificação fiscal em grande volume.",
      en: "Producer-consumer automations, recurring downloads and high-volume tax classification.",
    },
    items: [
      item("esocial-download", "eSocial · Solicitação e download", "Dois robôs coordenados solicitam, aguardam e baixam arquivos mensais desde 2018.", "Two coordinated robots request, wait for and download monthly files since 2018.", ["Python", "Playwright", "PostgreSQL"]),
      item("efd-auto", "EFD-Reinf · Automático", "Baixa cinco anos de XMLs por certificado e converte os documentos em planilhas.", "Downloads five years of XML files per certificate and converts them into spreadsheets.", ["Python", "Selenium", "XML"]),
      item("efd-manual", "EFD-Reinf · Assistido", "Aplicativo para lotes locais com uma API intermediando o acesso seguro ao banco.", "Desktop batch application with an API securely mediating database access.", ["Python", "Playwright", "FastAPI"]),
      item("receitanetbx", "ReceitanetBX · Download de SPED", "Serviço residente que solicita, acompanha e organiza escriturações pelo web service oficial.", "Resident service requesting, tracking and organizing filings through the official web service.", ["Python", "SOAP", "PostgreSQL"]),
      item("revenue-ecf", "Faturamento por ECF", "Família de workers que calcula médias e consolidados a partir de ECF e EFD-Contribuições.", "Worker family calculating averages and totals from ECF and EFD-Contribuições.", ["Python", "PostgreSQL", "Flask"]),
      item("revenue-project", "Registro de faturamento anual", "Sincroniza faturamento e regime por CNPJ e ano com o sistema Project.", "Synchronizes annual revenue and tax regime by company with the Project system.", ["Python", "PostgreSQL", "pytest"]),
      item("simples-revenue", "Simples Nacional · Faturamento", "Consulta opção tributária e apura faturamento anual nas declarações PGDAS-D.", "Checks tax-regime status and calculates annual revenue from PGDAS-D filings.", ["Python", "Playwright", "OpenCV"]),
      item("simples-bulk", "Simples Nacional · Consulta em massa", "Consulta em lote empresas optantes e consolida o resultado operacional.", "Bulk-checks companies enrolled in Simples Nacional and consolidates results.", ["Python", "Playwright", "Pandas"]),
      item("cnpj-card", "Cartão CNPJ", "Emite comprovantes cadastrais resolvendo hCaptcha por meio do Aptcha.", "Issues company-registration certificates while solving hCaptcha through Aptcha.", ["Python", "Playwright", "Aptcha"]),
      item("folder-standardization", "Padronização de pastas", "Cria estruturas de cliente e distribui automaticamente os SPEDs nas pastas corretas.", "Creates client folder structures and automatically distributes SPED files.", ["Python", "PostgreSQL", "Windows"]),
    ],
  },
  {
    id: "serpro-apis",
    title: { pt: "APIs e integrações SERPRO", en: "SERPRO APIs and integrations" },
    description: {
      pt: "Integrações diretas que substituem navegação de tela por serviços autenticados e mensuráveis.",
      en: "Direct integrations replacing browser navigation with authenticated, measurable services.",
    },
    items: [
      item("api-dctfweb", "API DCTFWeb", "Extrai declarações via Integra Contador, classifica perfis e gera análises em XLSX.", "Extracts filings through Integra Contador, classifies profiles and generates XLSX analyses.", ["Python", "SERPRO", "Pydantic", "pdfplumber"]),
      item("api-darf", "API Consulta DARF", "Consulta pagamentos por período e exporta dados financeiros estruturados.", "Queries payments by period and exports structured financial data.", ["Python", "SERPRO", "CSV"]),
      item("serpro-mailbox", "Caixa Postal SERPRO", "Consulta mensagens DTE, detecta avisos de pagamento e acompanha custos por chamada.", "Queries DTE messages, detects payment notices and tracks per-call costs.", ["FastAPI", "httpx", "SQLite", "SERPRO"]),
    ],
  },
  {
    id: "utilities",
    title: { pt: "Conversores, utilitários e legado", en: "Converters, utilities and legacy systems" },
    description: {
      pt: "Ferramentas de apoio que tornam documentos utilizáveis, preparam ambientes e conectam sistemas históricos.",
      en: "Supporting tools making documents usable, preparing environments and connecting historical systems.",
    },
    items: [
      item("dctfweb-converter", "Conversor DCTFWeb", "Consolida pastas de PDFs DCTFWeb em planilhas de análise e perfil.", "Consolidates DCTFWeb PDF folders into analysis and profile spreadsheets.", ["Python", "pdfplumber", "openpyxl"]),
      item("dctfweb-layout", "Conversor de layout DCTFWeb", "Transforma a declaração completa em um PDF no layout de relatório de débitos.", "Transforms a full filing into a debt-report-layout PDF.", ["Python", "pdfplumber", "ReportLab"]),
      item("dctfweb-darf", "Conversor DCTFWeb + DARF", "Converte documentos fiscais em TXT/XLSX com análise de viabilidade.", "Converts tax documents into TXT/XLSX with feasibility analysis.", ["Python", "CustomTkinter", "openpyxl"]),
      item("certificate-installer", "Instalador de certificados", "Importa certificados A1 em lote para preparar rapidamente as VMs dos robôs.", "Bulk-imports A1 certificates to quickly prepare robot virtual machines.", ["Python", "Windows", "certutil"]),
      item("legacy-systems", "Sistemas legados Delphi", "Base histórica de gestão, auditoria fiscal, APIs e integrações com SQL Server.", "Historical management, tax-audit, API and SQL Server integration systems.", ["Delphi", "FireDAC", "UniGUI", "SQL Server"]),
      item("taxlumen-releases", "Distribuição Tax Lumen", "Canal privado de instaladores, versões e atualização automática do produto.", "Private channel for installers, releases and automatic product updates.", ["GitHub Releases", "PyInstaller"]),
    ],
  },
];

export const ecosystemItemCount = ecosystemCatalog.reduce((total, group) => total + group.items.length, 0);
