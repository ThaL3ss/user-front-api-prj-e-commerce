# ShirtStore — Frontend

Frontend React do e-commerce **ShirtStore**. Inclui autenticação (login/cadastro),
perfil do usuário, troca de senha, gerenciamento de endereços com busca automática
de CEP via ViaCEP, histórico de pedidos (com scroll infinito) e a confirmação de
pedido (dados do comprador, pagamento e entrega).

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
│   ├── login/Login.jsx
│   ├── cadastro/Cadastro.jsx
│   ├── perfil/Perfil.jsx              # Perfil (cliente e admin)
│   ├── perfil/PerfilAdmin.jsx         # Painel /admin
│   ├── historicoPedidos/HistoricoPedidos.jsx # Histórico dos pedidos (cliente)
│   └── confirmarPedido/ConfirmarPedido.jsx   # Confirmar pedido (dados, pagamento, entrega)
├── components/
│   ├── shared/
│   │   ├── Navbar/Navbar.jsx
│   │   └── Commons/             # InputField, Buttons, Toasts
│   ├── PrivateRoute.jsx
│   ├── CollapsibleCard/
│   ├── AlterarSenha/            # Card de troca de senha
│   ├── Enderecos/                # CRUD de endereços (perfil) + ViaCEP
│   ├── SetHistoricoPedidos/      # Grupo de componentes do histórico de pedidos
│   │   ├── ModalPedido/          # Card de pedido (expande os itens) — busca itens e imagens
│   │   └── CardPedidoProduto/    # Card de um produto do pedido + "Comprar novamente" (carrinho)
│   └── SetPedidosPagamentos/     # Grupo de componentes da confirmação de pedido
│       ├── ContainerStep/        # Moldura numerada de cada etapa (I, II, III, etc ...)
│       ├── ConfirmDadosPessoais/ # Dados do comprador
│       ├── OpcaoPagamento/       # Cartão / boleto / pix
│       ├── ToggleBar/            # Toggle genérico de duas opções 
│       ├── DadosEntrega/         # Orquestra "Receber" (endereço) x "Retirar na loja" (mock)
│       └── ModalEnderecos/       # Modal de seleção de endereço (GET /endereco/usuario)
├── services/                # Um arquivo por domínio, todos sobre a instância axios de Auth.service
│   ├── login/Auth.service.js      # Axios + interceptors (token / 401)
│   ├── cadastro/Cadastro.service.js
│   ├── usuario/Usuario.service.js   # GET /usuarios/me
│   ├── pedido/Pedido.service.js     # GET /pedido, GET /item-pedido/{id}
│   ├── produto/Produto.service.js   # GET /produto/picture/{id}
│   ├── carrinho/Carrinho.service.js # POST /carrinho
│   └── endereco/Endereco.service.js # GET /endereco/usuario, GET /endereco/{id}
├── data/                     # Mocks e presets estáticos (inputs, botões, toasts, loja)
│   └── Loja/Loja.data.js        # Dados fixos da loja para retirada (sem API própria ainda)
├── utils/
│   └── endereco.js           # Formatação de exibição de endereço (rua, número, complemento)
└── context/
    └── AuthContext.jsx       # Estado de auth (token, usuário, login, logout)
```

## Rotas

| Rota | Página | Acesso |
|---|---|---|
| `/login` | Login | pública |
| `/cadastro` | Cadastro | pública |
| `/perfil` | Perfil | autenticado |
| `/pedidos` | HistoricoPedidos | autenticado |
| `/admin` | PerfilAdmin | apenas `role: admin` |

> `ConfirmarPedido` já existe em `pages/confirmarPedido` mas ainda não tem rota
> registrada em `App.jsx` — falta decidir o path (ex: `/confirmar-pedido`) e
> ligá-lo ao fluxo do carrinho.

## Autenticação

- Após o login, o `accessToken` é salvo no `localStorage`.
- O Axios envia `Authorization: Bearer <token>` em toda requisição.
- Em caso de `401`, a sessão é limpa e o usuário é redirecionado para `/login`.
- A `role` é extraída do JWT para controle de acesso (rota `/admin`).

## Notas

- A busca de CEP usa `fetch` nativo direto na API pública do ViaCEP (sem token e
  sem biblioteca externa).
- A identificação do usuário em `/pedido`, `/item-pedido`, `/carrinho` e
  `/endereco` é feita por um header `usuario_uuid`, resolvido a partir de
  `GET /usuarios/me` (mesmo padrão de `Perfil`/`PerfilAdmin`) — não pelo payload
  salvo no login.
- A paginação do histórico de pedidos é resolvida no front: `/pedido` retorna a
  lista completa do usuário e a tela revela 10 por vez via `IntersectionObserver`
  (sem `page`/`limit` na requisição).
- `VITE_API_URL` aponta hoje só para a API de usuários/auth (`:3040`). A API de
  pedidos roda em outra porta (`:3080`) e ainda não tem uma instância/baseURL
  própria nos services — qualquer chamada de pedido/carrinho/endereço cairá no
  host errado até isso ser configurado.
- O carrinho ("Comprar novamente") é responsabilidade do próprio
  `CardPedidoProduto`, não do `ModalPedido` — cada componente só lida com os
  dados que já possui.
