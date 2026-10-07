from __future__ import annotations

from pathlib import Path
from typing import Iterable

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfgen.canvas import Canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    CondPageBreak,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
PUBLIC_DIR = ROOT / "public"

NAVY = colors.HexColor("#071018")
INK = colors.HexColor("#15232D")
MUTED = colors.HexColor("#536B78")
CYAN = colors.HexColor("#008CB4")
PALE = colors.HexColor("#EAF4F7")
LINE = colors.HexColor("#D8E5EA")
WHITE = colors.white


def register_fonts() -> tuple[str, str]:
    regular = Path(r"C:\Windows\Fonts\arial.ttf")
    bold = Path(r"C:\Windows\Fonts\arialbd.ttf")
    if regular.exists() and bold.exists():
        pdfmetrics.registerFont(TTFont("ResumeSans", regular))
        pdfmetrics.registerFont(TTFont("ResumeSans-Bold", bold))
        return "ResumeSans", "ResumeSans-Bold"
    return "Helvetica", "Helvetica-Bold"


FONT, FONT_BOLD = register_fonts()
FULL_NAME = "Victor de Almeida Senisse"


def styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=base["Normal"],
            fontName=FONT_BOLD,
            fontSize=22,
            leading=26,
            textColor=WHITE,
            spaceAfter=3,
        ),
        "title": ParagraphStyle(
            "Title",
            parent=base["Normal"],
            fontName=FONT_BOLD,
            fontSize=10.3,
            leading=13,
            textColor=colors.HexColor("#6DE1F7"),
            tracking=0.5,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName=FONT,
            fontSize=7.8,
            leading=11,
            textColor=colors.HexColor("#C4D7DF"),
            alignment=TA_RIGHT,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName=FONT_BOLD,
            fontSize=10.4,
            leading=13,
            textColor=CYAN,
            spaceBefore=8,
            spaceAfter=5,
            uppercase=True,
            tracking=0.7,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName=FONT,
            fontSize=8.6,
            leading=12.1,
            textColor=INK,
            spaceAfter=4,
        ),
        "body_small": ParagraphStyle(
            "BodySmall",
            parent=base["Normal"],
            fontName=FONT,
            fontSize=7.9,
            leading=10.7,
            textColor=MUTED,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["Normal"],
            fontName=FONT_BOLD,
            fontSize=9.4,
            leading=12,
            textColor=INK,
        ),
        "company": ParagraphStyle(
            "Company",
            parent=base["Normal"],
            fontName=FONT_BOLD,
            fontSize=8.1,
            leading=10,
            textColor=CYAN,
            uppercase=True,
            tracking=0.35,
        ),
        "period": ParagraphStyle(
            "Period",
            parent=base["Normal"],
            fontName=FONT_BOLD,
            fontSize=7.6,
            leading=10,
            textColor=MUTED,
            alignment=TA_RIGHT,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName=FONT,
            fontSize=8.2,
            leading=11.1,
            textColor=INK,
            leftIndent=10,
            firstLineIndent=-7,
            spaceAfter=2.2,
        ),
        "project": ParagraphStyle(
            "Project",
            parent=base["Normal"],
            fontName=FONT_BOLD,
            fontSize=8.9,
            leading=11,
            textColor=INK,
            spaceAfter=2,
        ),
        "skill_label": ParagraphStyle(
            "SkillLabel",
            parent=base["Normal"],
            fontName=FONT_BOLD,
            fontSize=7.8,
            leading=10.5,
            textColor=CYAN,
        ),
        "skill_text": ParagraphStyle(
            "SkillText",
            parent=base["Normal"],
            fontName=FONT,
            fontSize=7.7,
            leading=10.5,
            textColor=INK,
        ),
    }


def bullet_paragraphs(items: Iterable[str], s) -> list[Paragraph]:
    return [Paragraph(f"• {item}", s["bullet"]) for item in items]


def section_title(text: str, s) -> list:
    return [Spacer(1, 2), Paragraph(text.upper(), s["section"]), Table([[""]], colWidths=[100 * mm], rowHeights=[0.5], style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), LINE)]))]


def experience(company: str, role: str, period: str, bullets: list[str], s):
    header = Table(
        [[Paragraph(company, s["company"]), Paragraph(period, s["period"])]],
        colWidths=[118 * mm, 57 * mm],
        style=TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0), ("RIGHTPADDING", (0, 0), (-1, -1), 0)]),
    )
    return KeepTogether([header, Paragraph(role, s["role"]), Spacer(1, 3), *bullet_paragraphs(bullets, s), Spacer(1, 5)])


def project(title: str, role: str, body: str, stack: str, s):
    return KeepTogether([
        Paragraph(f"{title} <font color='#536B78'>| {role}</font>", s["project"]),
        Paragraph(body, s["body"]),
        Paragraph(f"<b>Stack:</b> {stack}", s["body_small"]),
        Spacer(1, 6),
    ])


def header(data, s):
    left = [Paragraph(FULL_NAME, s["name"]), Paragraph(data["headline"].upper(), s["title"])]
    contact = Paragraph(
        f"Porto Alegre, RS<br/>+55 51 99812-9077<br/><link href='mailto:senissevictor@gmail.com' color='#C4D7DF'>senissevictor@gmail.com</link><br/><link href='https://victorsenisse.me' color='#C4D7DF'>victorsenisse.me</link> · <link href='https://www.linkedin.com/in/victorsenisse/' color='#C4D7DF'>LinkedIn</link>",
        s["contact"],
    )
    table = Table([[left, contact]], colWidths=[116 * mm, 59 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), NAVY),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (0, 0), 10 * mm),
        ("RIGHTPADDING", (1, 0), (1, 0), 10 * mm),
        ("TOPPADDING", (0, 0), (-1, -1), 7 * mm),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7 * mm),
    ]))
    return table


class NumberedCanvas(Canvas):
    def __init__(self, *args, page_label: str, margins: tuple[float, float], **kwargs):
        super().__init__(*args, **kwargs)
        self._page_label = page_label
        self._margins = margins
        self._saved_states: list[dict] = []

    def showPage(self):
        self._saved_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        total = len(self._saved_states)
        for state in self._saved_states:
            self.__dict__.update(state)
            self._draw_footer(total)
            super().showPage()
        super().save()

    def _draw_footer(self, total: int):
        left, right = self._margins
        self.saveState()
        self.setStrokeColor(LINE)
        self.line(left, 10 * mm, A4[0] - right, 10 * mm)
        self.setFont(FONT, 7)
        self.setFillColor(MUTED)
        self.drawString(left, 6.5 * mm, FULL_NAME)
        self.drawRightString(A4[0] - right, 6.5 * mm, f"{self._page_label} {self._pageNumber} / {total}")
        self.restoreState()


def build_resume(path: Path, data: dict):
    s = styles()
    doc = BaseDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=17 * mm,
        rightMargin=17 * mm,
        topMargin=14 * mm,
        bottomMargin=14 * mm,
        title=f"{FULL_NAME} - {data['headline']}",
        author=FULL_NAME,
        subject=data["summary"],
    )

    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="resume")

    doc.addPageTemplates([PageTemplate(id="resume", frames=[frame], )])
    story = [header(data, s), Spacer(1, 8 * mm)]
    story.extend(section_title(data["summary_title"], s))
    story.extend([Spacer(1, 4), Paragraph(data["summary"], s["body"]), Spacer(1, 4)])
    story.extend(section_title(data["experience_title"], s))
    story.append(Spacer(1, 5))
    for item in data["experience"]:
        story.append(experience(*item, s))

    story.append(CondPageBreak(45 * mm))
    story.extend(section_title(data["projects_title"], s))
    story.append(Spacer(1, 5))
    for item in data["projects"]:
        story.append(project(*item, s))

    story.extend(section_title(data["skills_title"], s))
    skill_rows = []
    for label, value in data["skills"]:
        skill_rows.append([Paragraph(label, s["skill_label"]), Paragraph(value, s["skill_text"])])
    skill_table = Table(skill_rows, colWidths=[43 * mm, 132 * mm], hAlign="LEFT")
    skill_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 3),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
        ("LINEBELOW", (0, 0), (-1, -2), .35, LINE),
    ]))
    story.extend([Spacer(1, 4), skill_table])

    story.extend(section_title(data["education_title"], s))
    education_rows = [[Paragraph(item[0], s["role"]), Paragraph(item[1], s["body_small"])] for item in data["education"]]
    education_table = Table(education_rows, colWidths=[115 * mm, 60 * mm])
    education_table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    story.extend([Spacer(1, 4), education_table])

    margins = (doc.leftMargin, doc.rightMargin)
    doc.build(story, canvasmaker=lambda *a, **k: NumberedCanvas(*a, page_label=data["page"], margins=margins, **k))


PT = {
    "headline": "Desenvolvedor Full-stack & Automação",
    "summary_title": "Resumo profissional",
    "experience_title": "Experiência profissional",
    "projects_title": "Projetos selecionados",
    "skills_title": "Competências técnicas",
    "education_title": "Formação e idiomas",
    "page": "Página",
    "summary": "Engenheiro de Software orientado a resultados, com trajetória do suporte técnico ao desenvolvimento back-end e, hoje, à arquitetura de soluções de Inteligência Artificial. Traduzo desafios de negócio em sistemas autônomos e eficientes, orquestrando agentes de IA, automações ponta a ponta, integrações de LLMs, APIs, workers e deploy, para substituir rotinas manuais por sistemas confiáveis. Domínio de Python, JavaScript, TypeScript e n8n, com visão estratégica de produto e foco em entrega de valor mensurável.",
    "experience": [
        (
            "GRUPO STUDIO",
            "Analista de Inteligência Artificial (PJ)",
            "nov/2025 - atual",
            [
                "Autor principal do AutomaTax, plataforma Next.js/FastAPI/PostgreSQL que centraliza filas, dados, permissões e integrações de um ecossistema de automação fiscal.",
                "Evoluí o banco de produção por 115 migrations; padronizei 21 tabelas e 85 colunas com views de compatibilidade, sem interromper consumidores.",
                "Implementei integrações com SERPRO via mTLS/OAuth2, SQL Server, Google Calendar, WhatsApp e RPAs coordenados por RPCs no Postgres.",
                "Desenvolvedor principal da Plataforma Lei do Bem e autor do TaxSwap, automação documental com OCR, auditoria, regras de domínio e testes.",
                "Projeto, treino e implantação de modelos de machine learning, deep learning e NLP aplicados ao negócio, com testes, validações e ajustes para garantir precisão e desempenho.",
                "Coleta, limpeza e preparo de dados estruturados e não estruturados, com qualidade, integridade e segurança, e pipelines para alimentar modelos e sistemas inteligentes.",
                "Integração de soluções de IA a sistemas e processos corporativos, apoio às áreas técnicas e de negócio e monitoramento da performance dos algoritmos com melhorias contínuas.",
                "Relatórios, dashboards, KPIs e análises preditivas para diferentes áreas do grupo, apoiando lideranças em decisões baseadas em dados.",
                "Pesquisa de tendências em IA, automação e ciência de dados, teste de novas ferramentas, frameworks e metodologias e promoção da cultura de dados e inovação.",
            ],
        ),
        (
            "BRIVIA GROUP",
            "Especialista em IA e n8n (PJ)",
            "nov/2025 - atual",
            [
                "Desenvolvimento de automações com n8n e de APIs, com integração de serviços externos para iniciativas digitais.",
                "Criação e implementação de multi-agentes de IA.",
                "Criação de páginas estáticas e dinâmicas com diversas ferramentas de IA e de conteúdo técnico sobre Inteligência Artificial.",
            ],
        ),
        (
            "ZALLPY DIGITAL",
            "Desenvolvedor Back-end",
            "out/2023 - abr/2025",
            [
                "Desenvolvimento e manutenção de sistemas back-end para a TK Elevator com Progress 4GL.",
                "Liderança de projetos de automação e IA, participação ativa em cerimônias Scrum e suporte a usuários nível 1.",
            ],
        ),
        (
            "TOZZINIFREIRE ADVOGADOS",
            "Assistente de Help Desk",
            "dez/2021 - out/2023",
            [
                "Suporte técnico a mais de 200 usuários e resolução de incidentes de TI.",
                "Criação de VMs, clonagem de HDs, gestão de Active Directory, configuração de redes e manutenção da infraestrutura.",
            ],
        ),
    ],
    "projects": [
        (
            "AutomaTax",
            "autor principal",
            "Orquestra procurações, documentos fiscais, análise de perfil, reuniões e custos SERPRO. Mapeei 4.862 padrões de consulta em 107 dias para planejar a evolução segura do banco.",
            "Next.js, TypeScript, FastAPI, Python, PostgreSQL, Supabase, Docker, SERPRO",
        ),
        (
            "TaxSwap",
            "autor único",
            "Wizard que consolida três documentos fiscais e financeiros, usa OCR em PDFs digitalizados e gera apresentações auditáveis com snapshots imutáveis e signed URLs.",
            "Next.js, TypeScript, Supabase, Tesseract.js, React PDF, Zod, Vitest",
        ),
        (
            "Social Intelligence PWA",
            "produto próprio anonimizado",
            "Aplicação instalável para acompanhar crescimento, seguidores e engajamento. Estruturei criativos, campanhas e testes de aquisição, alcançando ROI médio de 3x.",
            "React, Node.js, PWA, APIs REST, Analytics, Meta Ads, Google Ads",
        ),
    ],
    "skills": [
        ("Automação", "Python, Playwright, n8n, RPAs, filas, workers, webhooks e processamento documental"),
        ("IA e Agentes", "Arquitetura de IA e automação, agentes de IA, engenharia de prompt, RAG, LangChain, LangGraph, OCR, integração de LLMs (OpenAI, Google Gemini) e plataformas de desenvolvimento com IA (Lovable, Cursor, Google Antigravity)"),
        ("Full-stack", "Python, JavaScript, TypeScript, Node.js, React, Next.js, Progress 4GL, FastAPI, APIs REST e aplicações web"),
        ("Dados e BI", "PostgreSQL, Supabase, SQL Server, MySQL, Redis, análise de dados e dashboards em Power BI e Looker Studio"),
        ("Infra e growth", "Docker, Vercel, Coolify, Google Cloud, Microsoft Azure, Cloudflare, Meta Ads, Google Ads e GA4"),
        ("Ferramentas e metodologias", "Scrum, Kanban, Jira, Git e GitHub, Trello, Bitrix24 e Airtable"),
        ("TI corporativo", "Active Directory, gestão de redes, virtualização e suporte a usuários"),
    ],
    "education": [
        ("Engenharia de Software - Uniasselvi", "Em andamento"),
        ("Inglês - CCAA", "Nível C1 avançado"),
    ],
}


EN = {
    "headline": "Full-Stack & Automation Developer",
    "summary_title": "Professional summary",
    "experience_title": "Professional experience",
    "projects_title": "Selected projects",
    "skills_title": "Technical skills",
    "education_title": "Education and languages",
    "page": "Page",
    "summary": "Results-driven Software Engineer whose career moved from technical support to back-end development and, today, to architecting complex Artificial Intelligence solutions. I turn business challenges into autonomous, efficient systems, orchestrating AI agents, end-to-end automations, LLM integrations, APIs, workers and deployment to replace manual routines with reliable systems. Strong in Python, JavaScript, TypeScript and n8n, with strategic product vision and a focus on delivering measurable value.",
    "experience": [
        (
            "GRUPO STUDIO",
            "Artificial Intelligence Analyst (Contractor)",
            "Nov 2025 - present",
            [
                "Lead author of AutomaTax, a Next.js/FastAPI/PostgreSQL platform centralizing queues, data, permissions and integrations for a tax-automation ecosystem.",
                "Evolved the production database through 115 migrations; standardized 21 tables and 85 columns with compatibility views and no consumer downtime.",
                "Built integrations with SERPRO through mTLS/OAuth2, SQL Server, Google Calendar, WhatsApp and RPAs coordinated through Postgres RPCs.",
                "Lead developer of the Lei do Bem platform and sole author of TaxSwap, a document-automation product with OCR, audit trails, domain rules and tests.",
                "Designed, trained and deployed machine learning, deep learning and NLP models for business needs, with testing, validation and tuning to ensure accuracy and performance.",
                "Collected, cleaned and prepared structured and unstructured data with quality, integrity and security, and built pipelines to feed models and intelligent systems.",
                "Integrated AI solutions into internal systems and corporate processes, supported technical and business teams and monitored algorithm performance with continuous improvements.",
                "Delivered reports, dashboards, KPIs and predictive analyses for several areas of the group, supporting leaders in data-driven decisions.",
                "Tracked trends in AI, automation and data science, tested new tools, frameworks and methodologies and promoted a data and innovation culture.",
            ],
        ),
        (
            "BRIVIA GROUP",
            "AI and n8n Specialist (Contractor)",
            "Nov 2025 - present",
            [
                "Developed n8n automations and APIs, integrating external services for digital initiatives.",
                "Designed and implemented AI multi-agent systems.",
                "Built static and dynamic pages with several AI tools and produced technical content on Artificial Intelligence.",
            ],
        ),
        (
            "ZALLPY DIGITAL",
            "Back-end Developer",
            "Oct 2023 - Apr 2025",
            [
                "Developed and maintained back-end systems for TK Elevator using Progress 4GL.",
                "Led automation and AI projects, took an active part in Scrum ceremonies and provided level 1 user support.",
            ],
        ),
        (
            "TOZZINIFREIRE ADVOGADOS",
            "Help Desk Assistant",
            "Dec 2021 - Oct 2023",
            [
                "Provided technical support to more than 200 users and resolved IT incidents.",
                "Created VMs, cloned hard drives, managed Active Directory, configured networks and maintained the infrastructure.",
            ],
        ),
    ],
    "projects": [
        (
            "AutomaTax",
            "lead author",
            "Orchestrates powers of attorney, tax documents, profile analysis, meetings and SERPRO costs. I mapped 4,862 query patterns across 107 days to plan a safe production schema evolution.",
            "Next.js, TypeScript, FastAPI, Python, PostgreSQL, Supabase, Docker, SERPRO",
        ),
        (
            "TaxSwap",
            "sole author",
            "Wizard consolidating three financial and tax documents, using OCR for scanned PDFs and generating auditable presentations with immutable snapshots and signed URLs.",
            "Next.js, TypeScript, Supabase, Tesseract.js, React PDF, Zod, Vitest",
        ),
        (
            "Social Intelligence PWA",
            "anonymized owned product",
            "Installable application tracking growth, followers and engagement. I structured creative testing and acquisition campaigns, reaching an average 3x ROI.",
            "React, Node.js, PWA, REST APIs, Analytics, Meta Ads, Google Ads",
        ),
    ],
    "skills": [
        ("Automation", "Python, Playwright, n8n, RPAs, queues, workers, webhooks and document processing"),
        ("AI and Agents", "AI and automation architecture, AI agents, prompt engineering, RAG, LangChain, LangGraph, OCR, LLM integration (OpenAI, Google Gemini) and AI development platforms (Lovable, Cursor, Google Antigravity)"),
        ("Full-stack", "Python, JavaScript, TypeScript, Node.js, React, Next.js, Progress 4GL, FastAPI, REST APIs and web applications"),
        ("Data and BI", "PostgreSQL, Supabase, SQL Server, MySQL, Redis, data analysis and dashboards in Power BI and Looker Studio"),
        ("Infra and growth", "Docker, Vercel, Coolify, Google Cloud, Microsoft Azure, Cloudflare, Meta Ads, Google Ads and GA4"),
        ("Tools and methodologies", "Scrum, Kanban, Jira, Git and GitHub, Trello, Bitrix24 and Airtable"),
        ("Corporate IT", "Active Directory, network management, virtualization and user support"),
    ],
    "education": [
        ("Software Engineering - Uniasselvi", "In progress"),
        ("English - CCAA", "Advanced C1 level"),
    ],
}


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    outputs = [
        (OUTPUT_DIR / "curriculo-victor-senisse-pt.pdf", PT, PUBLIC_DIR / "curriculo-pt.pdf"),
        (OUTPUT_DIR / "resume-victor-senisse-en.pdf", EN, PUBLIC_DIR / "resume-en.pdf"),
    ]
    for output, data, public_copy in outputs:
        build_resume(output, data)
        public_copy.write_bytes(output.read_bytes())
        print(f"Generated {output}")
        print(f"Published {public_copy}")


if __name__ == "__main__":
    main()
