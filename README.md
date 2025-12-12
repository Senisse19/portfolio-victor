# Portfolio Victor Senisse

![Next.js](https://img.shields.io/badge/Next.js-16.0.8-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Three.js](https://img.shields.io/badge/Three.js-0.182.0-black?logo=three.js)

Portfólio pessoal moderno e interativo com efeitos 3D, animações fluidas e design premium, apresentando projetos e habilidades profissionais.

## 🚀 Sobre o Projeto

Portfólio pessoal desenvolvido com as mais recentes tecnologias web, featuring efeitos 3D impressionantes com Three.js, animações suaves com Framer Motion, e um design responsivo e acessível que se destaca.

### ✨ Funcionalidades Principais

- **🎨 Design Premium**: Interface moderna com gradientes dinâmicos e glassmorphism
- **🌌 Background 3D**: Efeitos 3D interativos com Three.js e React Three Fiber
- **✨ Animações Sofisticadas**: Transições fluidas com Framer Motion
- **📱 Mobile-First**: Totalmente responsivo e otimizado para todos os dispositivos
- **⚡ Performance**: Otimizado com detecção automática de capacidade do dispositivo
- **📄 Integração PDF**: Extração e exibição automática de informações do currículo
- **🎯 SEO Otimizado**: Meta tags e estrutura semântica para melhor indexação
- **♿ Acessível**: WCAG compliant com suporte a leitores de tela

## 🛠️ Tecnologias Utilizadas

### Core
- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca de interface de usuário
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática

### 3D & Animações
- **[Three.js](https://threejs.org/)** - Biblioteca para gráficos 3D
- **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** - React renderer para Three.js
- **[@react-three/drei](https://github.com/pmndrs/drei)** - Helpers úteis para R3F
- **[Framer Motion](https://www.framer.com/motion/)** - Animações declarativas

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Lucide React](https://lucide.dev/)** - Ícones modernos e otimizados
- **[clsx](https://github.com/lukeed/clsx)** - Utilitário para classes condicionais
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge inteligente de classes

### Utilities
- **[pdf-parse](https://www.npmjs.com/package/pdf-parse)** - Parser de arquivos PDF

## 📋 Pré-requisitos

- Node.js 20.x ou superior
- npm, yarn, pnpm ou bun

## 🔧 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/Senisse19/portfolio-victor.git
cd portfolio-victor
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

4. **Acesse a aplicação**

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📁 Estrutura do Projeto

```
portfolio-victor/
├── src/
│   ├── app/                 # App Router do Next.js
│   │   ├── page.tsx        # Página principal
│   │   ├── layout.tsx      # Layout raiz
│   │   └── globals.css     # Estilos globais
│   └── components/          # Componentes React
│       ├── Hero.tsx        # Seção hero
│       ├── About.tsx       # Sobre mim
│       ├── Projects.tsx    # Projetos
│       ├── Skills.tsx      # Habilidades
│       ├── Contact.tsx     # Contato
│       └── Background3D.tsx # Background 3D com Three.js
├── public/                  # Arquivos estáticos
│   └── ...
├── Curriculo - Victor Senisse.pdf  # Currículo em PDF
└── extract_resume.py        # Script para extrair dados do PDF
```

## 🎯 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa o linter

## 🎨 Seções do Portfólio

### 🏠 Hero
- Introdução impactante com animações
- Background 3D interativo (Neural Network)
- Call-to-action para download de currículo

### 👨‍💻 Sobre Mim
- Apresentação profissional
- Experiência e formação
- Tecnologias e stack preferido

### 💼 Projetos
- Showcase de projetos destacados
- Links para GitHub e demos
- Descrições e tecnologias usadas

### 🛠️ Habilidades
- Visualização de skills técnicas
- Níveis de proficiência
- Categorias organizadas (Frontend, Backend, Tools, etc)

### 📧 Contato
- Formulário de contato
- Links para redes sociais
- GitHub, LinkedIn, Email

## 🌌 Efeitos 3D

O portfólio conta com um impressionante background 3D desenvolvido com Three.js:

- **Neural Network Effect**: Rede neural animada com partículas e conexões
- **Interativo**: Responde ao movimento do mouse
- **Otimizado**: Detecção automática de performance do dispositivo
- **Responsivo**: Adapta densidade de partículas baseado no tamanho da tela

### Otimização de Performance

```typescript
// Detecção automática de performance
- Mobile: Efeitos 3D desabilitados ou simplificados
- Desktop: Full experience com partículas e animações
- Low-end devices: Fallback para background estático
```

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Importe o projeto no [Vercel](https://vercel.com)
3. Deploy automático!

O projeto está otimizado para Vercel com:
- Edge Functions
- Automatic HTTPS
- Global CDN
- Analytics integration

### Outras Plataformas

Compatível com qualquer plataforma que suporte Next.js:
- Netlify
- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform

## ⚡ Otimizações

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Componentes lazy-loaded
- **Font Optimization**: next/font para web fonts
- **Performance Monitoring**: Web Vitals tracking
- **SEO**: Meta tags dinâmicas e sitemap
- **Accessibility**: ARIA labels e navegação via teclado

## 🎨 Customização

### Cores e Tema

As cores podem ser customizadas em `src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: ...
    --foreground: ...
    /* Personalize suas cores aqui */
  }
}
```

### Conteúdo

Edite os arquivos em `src/components/` para atualizar:
- Informações pessoais
- Projetos
- Habilidades
- Links de redes sociais

## 🤝 Contribuindo

Este é um projeto pessoal, mas sugestões são sempre bem-vindas!

## 📄 Licença

Este projeto é privado e proprietário.

## 👨‍💻 Autor

**Victor Senisse**
- Portfolio: [portfolio-victor.vercel.app](https://portfolio-victor.vercel.app)
- GitHub: [@Senisse19](https://github.com/Senisse19)
- LinkedIn: [Victor Senisse](https://linkedin.com/in/victor-senisse)

## 📞 Contato

Interessado em colaborar ou contratar? Entre em contato através do:
- 📧 Email: [seu-email]
- 💼 LinkedIn: [Victor Senisse](https://linkedin.com/in/victor-senisse)
- 🐙 GitHub: [@Senisse19](https://github.com/Senisse19)

---

Desenvolvido com ❤️ e Next.js por Victor Senisse
