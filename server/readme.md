# 📎 Projeto Encurtador de URL

Este é um projeto de encurtador de links, com funcionalidades como criação, listagem, rastreamento de acessos, exportação para CSV e hospedagem dos dados via CDN (ex: Amazon S3 ou Cloudflare R2).

---

## ✅ Funcionalidades

### 🔗 Criação de Link

- [✅] Deve ser possível **criar um link**
- [✅] Não deve ser possível criar um link com **URL encurtada mal formatada**
- [ ] Não deve ser possível criar um link com **URL encurtada já existente**

### ❌ Exclusão de Link

- [ ] Deve ser possível **deletar um link**

### 🔍 Redirecionamento

- [ ] Deve ser possível **obter a URL original por meio de uma URL encurtada**

### 📄 Listagem de Links

- [✅] Deve ser possível **listar todas as URL’s cadastradas**
- [✅] Deve ser possível realizar a listagem de forma **performática**

### 📈 Rastreamento de Acessos

- [ ] Deve ser possível **incrementar a quantidade de acessos** de um link

### 📤 Exportação para CSV

- [✅] Deve ser possível **exportar os links criados em um CSV**
  - [✅] Deve ser possível acessar o **CSV por meio de uma CDN** (Amazon S3, Cloudflare R2, etc)
  - [✅] Deve ser **gerado um nome aleatório e único para o arquivo**
  - [✅] O CSV deve conter os seguintes campos:
    - [✅] URL original
    - [✅] URL encurtada
    - [✅] Contagem de acessos
    - [✅] Data de criação

---

## 🛠 Tecnologias sugeridas

- **Backend**: Node.js + Fastify + Zod
- **ORM**: Drizzle ORM
- **Banco de dados**: PostgreSQL ou SQLite
- **Armazenamento CDN**: Amazon S3 ou Cloudflare R2
- **Geração de CSV**: `fast-csv`, `csv-writer` ou solução personalizada
- **Deploy**: Vercel, Railway, Render, etc.

---

## 🚀 Como rodar o projeto localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git

# Acesse o diretório do projeto
cd seu-repositorio

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute as migrações do banco de dados
npm run db:migrate

# Inicie a aplicação
npm run dev
```
