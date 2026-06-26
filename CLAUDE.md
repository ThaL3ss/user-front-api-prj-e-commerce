# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ShirtStore — e-commerce de camisas esportivas desenvolvido como projeto universitário (SENAC). Arquitetura de microsserviços com 6 serviços independentes. Este repositório contém o **frontend React** e o **backend do carrinho** (Parllon, porta 3030).

## Microsserviços do Grupo

| Porta | Serviço | Responsável |
|-------|---------|-------------|
| 3000 | API Gateway (roteador central) | Felipe |
| 3010 | Catálogo de Produtos | Fábio |
| 3020 | Pedidos e Pagamentos | Darley |
| 3030 | **Carrinho de Compras** | **Parllon** |
| 3040 | Usuários e Autenticação | Thales |
| 3050 | Avaliações e Comentários | Nikolas |

O frontend faz todas as chamadas de API através do gateway em `localhost:3000`. O gateway roteia para o microsserviço correto com base em rotas registradas no seu banco de dados.

---

## Frontend (React/Vite)

### Comandos

```bash
# Rodar em desenvolvimento (porta 5173)
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

Não há lint script — o projeto usa Vite com plugin React sem ESLint configurado no frontend.

### Variáveis de Ambiente (`.env`)

```
VITE_API_URL=http://localhost:3040      # Auth/Usuários (Thales)
VITE_GATEWAY_URL=http://localhost:3000  # API Gateway (Felipe)
```

### Arquitetura do Frontend

**Stack:** React 18 + Vite + React Router v6 + Axios + CSS Modules + Tailwind CSS

**Padrão de dados:** componentes são "data-driven" via arquivos `.data.jsx` em `src/data/`. Nunca hardcode texto ou configuração diretamente nos componentes.

**Serviços Axios** (`src/services/`):
- `login/Auth.service.js` — chamadas ao backend de auth (porta 3040), com interceptor JWT
- `gateway/Gateway.service.js` — todas as chamadas ao gateway (porta 3000), com interceptor JWT
- `product/Product.service.js` — wraps de `GET /gateway/produto`
- `cart/Cart.service.js` — wraps do CRUD de carrinho via gateway

**Contextos** (`src/context/`):
- `AuthContext` — token JWT, usuário, role, `isAuthenticated`. Provider em `main.jsx`.
- `CartContext` — estado do carrinho com `useReducer`. Provider aninhado dentro de `AuthProvider`. Persiste no localStorage (`key: "cart"`) e sincroniza com o backend quando autenticado.

**Roteamento** (`src/App.jsx`): rotas públicas direto, rotas protegidas dentro de `<PrivateRoute>`. A rota `/carrinho` é pública (guests também têm carrinho).

**Ícones** (`src/assets/icons/Icons.jsx`): todos os SVGs são inline, sem biblioteca externa. Ao adicionar novos ícones, adicionar neste arquivo como named exports.

**CSS Modules:** cada componente tem seu próprio `.module.css`. Accent color padrão: `#c6ff00`. Fundo padrão: `#000`. Texto: `#fff`.

**Produto da API do catálogo** retorna: `{ idProduto, nomeProduto, precoProduto (Float), urlImagem, categoriaId, estoqueId }`. O frontend mapeia para `{ id, name, price, image }` antes de usar no carrinho.

---

## Backend do Carrinho (`backend_carrinho/`)

### Comandos

```bash
cd backend_carrinho

# Desenvolvimento com hot-reload
npm run start:dev

# Build de produção
npm run build
npm run start:prod

# Gerar Prisma Client após alterar o schema
npx prisma generate

# Criar tabelas no banco (primeira vez ou após alterar schema)
npx prisma db push

# Abrir Prisma Studio
npx prisma studio
```

### Variáveis de Ambiente (`backend_carrinho/.env`)

```
PORT=3030
NODE_ENV=development
DATABASE_URL="mysql://<usuario>:<senha>@<host>:<porta>/<schema_parllon>"
JWT_SECRET=<jwt_secret_compartilhado_com_thales>
ALLOWED_ORIGINS=http://localhost:5173
```

> O arquivo `.env` não é commitado. Usar `.env.example` como referência.

### Arquitetura do Backend

**Stack:** NestJS 11 + TypeScript + Prisma 7 + MySQL (via `@prisma/adapter-mariadb`) + Passport JWT

**Módulos:**
- `PrismaModule` (global) — `PrismaService` estende `PrismaClient` com o adapter MariaDB
- `AuthModule` — apenas valida tokens JWT emitidos pelo Thales (porta 3040); **não emite tokens**
- `CarrinhoModule` — controller + service com CRUD completo

**Autenticação:** todos os endpoints usam `@UseGuards(JwtAuthGuard)`. O `req.user.sub` contém o UUID do usuário extraído do token.

**Schema do banco** (`prisma/schema.prisma`): tabelas `carrinhos` (1 por usuário) e `itens_carrinho` (N por carrinho). O `datasource` não tem `url` no schema — a conexão é configurada via `prisma.config.ts` (Prisma 7).

**Swagger:** disponível em `http://localhost:3030/api` com autenticação Bearer.

### Endpoints

| Método | Path | Descrição |
|--------|------|-----------|
| GET | `/carrinho` | Retorna carrinho do usuário (cria se não existir) |
| POST | `/carrinho/itens` | Adiciona item (incrementa se produto+tamanho já existe) |
| PATCH | `/carrinho/itens/:id` | Atualiza quantidade (remove se quantidade ≤ 0) |
| DELETE | `/carrinho/itens/:id` | Remove item específico |
| DELETE | `/carrinho` | Esvazia o carrinho |

### Para registrar no Gateway (Felipe)

Após subir o backend, pedir ao Felipe para registrar no banco do gateway:

```
path=/carrinho        method=GET    targetUrl=http://localhost:3030/carrinho      requiresAuth=true
path=/carrinho/itens  method=POST   targetUrl=http://localhost:3030/carrinho/itens requiresAuth=true
path=/carrinho/itens  method=PATCH  targetUrl=http://localhost:3030/carrinho/itens requiresAuth=true
path=/carrinho/itens  method=DELETE targetUrl=http://localhost:3030/carrinho/itens requiresAuth=true
path=/carrinho        method=DELETE targetUrl=http://localhost:3030/carrinho      requiresAuth=true
```

---

## Git

- Branch de trabalho do Parllon: `branch-parllon-carrinho`
- Frontend pushado em: `github.com/Parllon/user-front-api-prj-e-commerce`
- Backend pushado em: `github.com/Parllon/carrinho-api-prj-e-commerce`
- Não commitar: `*.env`, `darley.env`, `fabio-.env`, `thales-*.env`, `nikolas.env`, `backend_carrinho/node_modules/`
