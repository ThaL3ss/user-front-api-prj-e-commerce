# ShirtStore — Frontend

Frontend React do e-commerce **ShirtStore**. Inclui autenticação (login/cadastro),
perfil do usuário, troca de senha e gerenciamento de endereços com busca automática
de CEP via ViaCEP.

## Stack

- **React** + **Vite**
- **React Router DOM** (navegação)
- **Axios** (requisições HTTP)
- **Tailwind CSS** (estilização)

## Pré-requisitos

- Node.js 18+
- A **API de usuários** rodando em `http://localhost:3040` (necessária para login,
  perfil e endereços funcionarem de fato).

## Como rodar

```bash
npm install
npm run dev
```

App disponível em **http://localhost:5173**.

### Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Pré-visualiza o build de produção |

## Variáveis de ambiente

Crie um `.env` na raiz (veja `.env.example`):

```
VITE_API_URL=http://localhost:3040
```

`VITE_API_URL` é a base de todas as requisições (instância única do Axios em
`src/services/api.js`).

## Estrutura

```
src/
├── main.jsx                # Entry point (Router + AuthProvider)
├── App.jsx                 # Definição das rotas
├── pages/
│   ├── Login.jsx
│   ├── Cadastro.jsx
│   ├── Perfil.jsx          # Perfil (cliente e admin)
│   └── PerfilAdmin.jsx     # Painel /admin
├── components/
│   ├── Navbar.jsx
│   ├── Logo.jsx
│   ├── InputField.jsx
│   ├── PrivateRoute.jsx
│   ├── CollapsibleCard.jsx
│   ├── AlterarSenha.jsx    # Card de troca de senha
│   ├── Enderecos.jsx       # CRUD de endereços + ViaCEP
│   └── icons.jsx           # Ícones SVG inline
├── services/
│   └── api.js              # Axios + interceptors (token / 401)
└── context/
    └── AuthContext.jsx     # Estado de auth (token, usuário, login, logout)
```

## Rotas

| Rota | Página | Acesso |
|---|---|---|
| `/login` | Login | pública |
| `/cadastro` | Cadastro | pública |
| `/perfil` | Perfil | autenticado |
| `/admin` | PerfilAdmin | apenas `role: admin` |

## Autenticação

- Após o login, o `accessToken` é salvo no `localStorage`.
- O Axios envia `Authorization: Bearer <token>` em toda requisição.
- Em caso de `401`, a sessão é limpa e o usuário é redirecionado para `/login`.
- A `role` é extraída do JWT para controle de acesso (rota `/admin`).

## Notas

- A busca de CEP usa `fetch` nativo direto na API pública do ViaCEP (sem token e
  sem biblioteca externa).
