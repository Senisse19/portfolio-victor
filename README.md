# Portfólio — Victor Senisse

Portfólio bilíngue de um desenvolvedor full-stack especializado em automação, integrações, dados e IA aplicada.

## Experiência

- Homepage editorial com quatro cases expansíveis: AutomaTax, Plataforma Lei do Bem, TaxSwap e um PWA de inteligência para redes sociais.
- Explorador com 56 soluções do Grupo Studio em sete grupos recolhidos, além de Elara e Chatwoot Extractor em “Outros trabalhos”. O conjunto é identificado como trabalho do time; a interface não usa selos de autoria ou contribuição.
- Demonstração interativa do fluxo **Entrada → Fila → Robô/API → Resultado**. Há uma cena 3D no desktop e um equivalente HTML/SVG no mobile, em movimento reduzido ou sem WebGL.
- Vídeo dos projetos do Grupo Studio via Vimeo, com player carregado apenas depois do clique.
- Português e inglês com preferência persistida, currículos correspondentes, navegação por teclado e links antigos redirecionados para o conteúdo na homepage.

## Stack e execução

Next.js 16, React 19, TypeScript, CSS, React Three Fiber/Three.js, Vitest e Playwright.

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`. Se a porta estiver ocupada, o Next.js informa o endereço usado. Para verificar o projeto:

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
```

## Conteúdo e confidencialidade

Os cases ficam em `src/data/portfolio.ts`; o catálogo, em `src/data/ecosystem.ts`. O Markdown de projetos na raiz é a fonte técnica de referência. As descrições públicas omitem código, credenciais, clientes e dados operacionais privados. O PWA não revela nome, telas ou lógica comercial.

As páginas públicas são pré-renderizadas. O site inclui sitemap, robots, manifesto e metadados sociais. Os currículos estão em `public/curriculo-pt.pdf` e `public/resume-en.pdf`.
