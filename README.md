# 🔗 Brev.ly

> Encurtador de links moderno e eficiente desenvolvido como avaliação prática do Módulo 1 da Pós-graduação em "Desenvolvimento Full Stack" da Faculdade de Tecnologia RocketSeat.

## 📝 Sobre o Projeto

O **Brev.ly** é uma aplicação web completa para encurtamento de URLs, oferecendo uma interface intuitiva e funcionalidades robustas para gerenciamento de links.

### ✨ Funcionalidades

- 🎯 **Criar Links Curtos** - Transforme URLs longas em links compactos
- 📋 **Listar Links** - Visualize todos os links criados de forma organizada
- 🗑️ **Excluir Links** - Remova links desnecessários facilmente
- 📊 **Exportar para CSV** - Exporte seus links em formato CSV
- 🔄 **Redirecionamento Automático** - Acesso direto à URL original através do link curto

## 🏗️ Arquitetura do Projeto

```
brevly/
├── front-end/          # Interface do usuário (React + TypeScript)
└── server/             # API e backend services
```

## 🛠️ Stack Tecnológica

### Frontend
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) **TypeScript** - Tipagem estática
- ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React** - Biblioteca para interfaces
- ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **TailwindCSS** - Framework CSS utilitário
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) **Vite** - Build tool moderna

### Backend
- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) **TypeScript** - Tipagem estática
- ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) **Node.js** - Runtime JavaScript
- ![Fastify](https://img.shields.io/badge/Fastify-000000?style=flat&logo=fastify&logoColor=white) **Fastify** - Framework web performático
- ![Drizzle](https://img.shields.io/badge/Drizzle-C5F74F?style=flat&logo=drizzle&logoColor=black) **Drizzle ORM** - ORM type-safe
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white) **PostgreSQL** - Banco de dados relacional
- ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat&logo=Cloudflare&logoColor=white) **CloudFlare** - CDN e armazenamento de arquivos

## 📡 Endpoints da API

### Documentação
- **Swagger UI**: `/docs` - Interface interativa para testar a API

### Rotas Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/links` | Cria um novo link encurtado |
| `GET` | `/links` | Lista todos os links |
| `GET` | `/links/:id` | Busca link por ID |
| `GET` | `/links/short/:shortURL` | Busca link por URL encurtada |
| `POST` | `/links/exports` | Exporta links em CSV com ordenação |
| `DELETE` | `/links/:id` | Remove link por ID |
| `DELETE` | `/links/short/:shortURL` | Remove link por URL encurtada |

## 🚀 Executando o Projeto

### Pré-requisitos

- Node.js (v18+)
- Docker & Docker Compose
- npm ou yarn

### Configuração Inicial

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd brevly
   ```

2. **Configure as variáveis de ambiente**
   ```bash
   cd server
   cp .env.example .env
   ```
   
   > ⚠️ **Importante**: Configure as variáveis de ambiente no arquivo `.env` antes de prosseguir.

3. **Inicie o banco de dados**
   ```bash
   docker-compose up -d
   ```

### Frontend

```bash
cd front-end
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Backend

```bash
cd server
npm install
npm run dev
```

A API estará disponível em `http://localhost:3333`

## 📚 Scripts Disponíveis

### Frontend
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção

### Backend
- `npm run dev` - Inicia o servidor em modo desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm start` - Inicia o servidor compilado

## 🤝 Contribuição

Este projeto foi desenvolvido como parte de uma avaliação acadêmica. Sugestões e melhorias são bem-vindas!
