# E-COMERCE
O objetivo é fazer um e-comerce em node e react para portifolio, usando os melhores conceitos e comitando tudo.

## Objetivo base:
- [ ] Listagem e Detalhes de Produtos: Buscar os produtos de um banco de dados (PostgreSQL ou MongoDB são ótimas escolhas) e exibi-los.

- [ ] Autenticação de Usuários: Permitir que usuários se cadastrem e façam login. Use JWT (JSON Web Tokens) para gerenciar as sessões. Isso é um requisito técnico muito comum.

- [ ] Carrinho de Compras: Funcionalidade para adicionar, remover e visualizar itens no carrinho. O estado do carrinho deve ser gerenciado no front-end (React).

## Fluxo Completo do E-commerce
Aqui está uma descrição detalhada do fluxo, que podemos usar como guia para o desenvolvimento:

### 1. O Visitante Anônimo (Usuário Não Logado)

#### Jornada: O usuário entra no site.

    O que ele vê: A página inicial (Home) com uma galeria dos produtos.

    O que ele pode fazer:

        Navegar pela lista de todos os produtos.

        Usar filtros ou uma barra de busca para encontrar itens específicos.

        Clicar em um produto para ver a Página de Detalhes do Produto (com descrição completa, preço, fotos).

    O Ponto de Conversão: Na página do produto, ele clica em "Adicionar ao Carrinho" ou "Comprar". Neste momento, o sistema o direciona para a página de Login/Cadastro. Ele não pode comprar sem uma conta.

#### 2. O Sistema de Usuários (Cadastro e Login)

    Jornada: O usuário decide criar uma conta ou fazer login.

    O que ele faz:

        Cadastro: Preenche nome, e-mail e senha. O back-end recebe, criptografa a senha e salva o novo usuário no banco de dados.
    
        Login: Informa e-mail e senha. O back-end valida as credenciais e, se estiverem corretas, retorna um token (JWT) que o front-end irá salvar.

        Resultado: O usuário agora está autenticado. O site pode exibir seu nome ("Olá, Ryan!") e ele tem acesso a novas áreas.

#### 3. O Usuário Logado e seu Perfil

    Jornada: Após o login, o usuário tem uma experiência completa.

    Novas Funcionalidades:

        Sistema de Perfil: Uma página onde ele pode ver seus dados e, o mais importante, um histórico de todos os seus pedidos anteriores. Isso é crucial para um e-commerce real.

#### 4. O Fluxo de Compra
    Esta é a parte central e se divide em dois caminhos que você mencionou:

    A. Compra via Carrinho (Vários Itens)

    Jornada: O usuário navega pelo site e adiciona vários produtos ao carrinho.

    Como funciona:

        Ao clicar em "Adicionar ao Carrinho", o item é adicionado a um "estado" no front-end. O ícone do carrinho é atualizado.

        O usuário clica no ícone e vai para a Página do Carrinho.

        Lá, ele pode ver a lista de produtos, alterar quantidades, remover itens e ver o valor total.

        Ao clicar em "Finalizar Compra", ele inicia o processo de checkout.

    B. Compra Única (Botão "Comprar Agora")

    Jornada: O usuário quer apenas um item e não quer usar o carrinho.

    Como funciona:

        Na página de detalhes do produto, ele clica em "Comprar Agora".

        Ele é levado diretamente para o processo de checkout, pulando a etapa do carrinho.

#### 5. O Checkout (Finalização da Compra)

    Jornada: O passo final, seja vindo do carrinho ou da compra única.

    Como funciona:

        O usuário está em uma página de checkout.

        Ele confirma os produtos e o endereço (no nosso caso, podemos simplificar isso).

        Ele clica em "Confirmar Pagamento".
    
        O front-end envia uma requisição para o back-end (ex: POST /api/orders) com os dados do pedido (ID do usuário, lista de produtos).

        O back-end (simulando a aprovação do pagamento) cria um novo pedido no banco de dados, associando-o ao usuário.

    O front-end recebe a confirmação, limpa o carrinho, e mostra uma página de "Compra Realizada com Sucesso!". Em seguida, pode redirecioná-lo para a página de perfil, onde o novo pedido já aparece no histórico.

### Organização de pastas:
```

e-comerce_node/
│
├── .gitignore                # Ignora arquivos desnecessários (node_modules, .env)
├── docker-compose.yml        # Orquestra o back-end e o banco de dados com um só comando
├── README.md                 # Documentação principal do seu projeto
│
├── backend/                  # Pasta do projeto Node.js
│   │
│   ├── Dockerfile            # Define como criar a imagem Docker do seu back-end
│   ├── package.json
│   ├── .env                  # Variáveis de ambiente (conexão do DB, segredo JWT)
│   │
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── middlewares/
│       ├── services/
│       ├── config/
│       └── server.js
│
└── frontend/                 # Pasta do projeto React
    │
    ├── package.json
    ├── .env                  # Variáveis de ambiente (URL da API)
    ├── vite.config.js
    │
    └── src/
        ├── pages/
        ├── components/
        ├── contexts/
        ├── hooks/
        ├── services/
        └── ...
```

## Checklist do Projeto E-commerce Full-Stack

- [x] Fase 1: Planejamento e Configuração do Ambiente

    - [x] Iniciar o Git e Docker:

        - [x] git init na pasta principal e criar repositório no GitHub.

        - [x] Criar um arquivo .gitignore.

        - [x] Configurar Dockerfile para o back-end.

        - [x] Configurar docker-compose.yml na raiz do projeto para orquestrar o back-end e o banco de dados.

        - [x] Primeiro Commit: Fazer o commit inicial da estrutura com a mensagem chore: Inicia a estrutura do projeto e configuração do Docker.

- [x] Fase 2: Construção do Back-end (API)

    - [x] Configurar o Servidor Express e Prisma:

    - [x] Inicializar o package.json na pasta backend.

    - [x] Instalar dependências: express, prisma, @prisma/client, jsonwebtoken, bcryptjs, dotenv.

    - [x] Configurar o servidor Express básico com CORS.

    - [x] Inicializar o Prisma no projeto.

    - [x] Modelagem do Banco de Dados com Prisma:

    - [x] Definir os Models User e Product no arquivo schema.prisma.

    - [x] Adicionar Models Order e OrderItem para gerenciar as compras.

    - [x] Relacionar os models: User -> Order, Order -> OrderItem, Product -> OrderItem.

    - [x] Executar a primeira migration do Prisma para criar as tabelas no banco de dados.

    - [x] Implementar Autenticação e Autorização:

        - [x] Endpoint POST /api/users/register.

        - [x] Endpoint POST /api/users/login.

        - [x] Criar middleware para verificar token JWT.

        - [x] Criar middleware para verificar se o usuário é Admin.

    - [x] Implementar CRUD de Produtos (Rotas de Admin):

        - [x] POST /api/products (Criar) - Protegido para Admin.

        - [x] PUT /api/products/:id (Atualizar) - Protegido para Admin.

        - [x] DELETE /api/products/:id (Deletar) - Protegido para Admin.

    - [x] Implementar Rotas Públicas:

        - [x] GET /api/products (Listar todos).

        - [x] GET /api/products/:id (Ver detalhes).

    - [x] Implementar Rotas do Usuário Logado (Pedidos):

        - [x] POST /api/orders (Cria um novo pedido a partir do carrinho) - Protegido.

        - [x] GET /api/orders/myorders (Lista os pedidos do usuário logado) - Protegido.

- [ ] Fase 3: Construção do Front-end (React)
    - [ ] Configurar o Projeto React:

    - [ ] npm create vite@latest frontend.

    - [ ] Instalar dependências: axios, react-router-dom.

    - [ ] Estruturar as Páginas e Componentes:

        -[ ] Criar a estrutura de pastas (components, pages, contexts, hooks).

        - [ ] Configurar as rotas no App.js com react-router-dom.

    - [ ] Desenvolver as Páginas e Componentes:

        - [ ] Página de Home (Listagem de produtos).

        - [ ] Página de Detalhes do Produto (com botões "Adicionar ao Carrinho" e "Comprar Agora").

        - [ ] Páginas de Login e Registro.

        - [ ] Página do Carrinho de Compras (com resumo e botão "Finalizar Compra").

        - [ ] Página de Checkout (simulação de formulário e confirmação).

        - [ ] Página de Sucesso do Pedido.

        - [ ] Página de Perfil do Usuário (com Histórico de Pedidos).

        - [ ] Páginas do Painel de Admin (CRUD de produtos).

        - [ ] Implementar a Lógica e Gerenciamento de Estado:

        - [ ] Conectar com a API do back-end usando axios.

        - [ ] Criar um Contexto de Autenticação (AuthContext) para gerenciar o login, logout e dados do usuário.

        - [ ] Criar um Contexto do Carrinho (CartContext) para gerenciar os itens, adicionar, remover e limpar.

        -[ ] Implementar rotas protegidas no front-end para o perfil e o painel de admin.

        - [ ] Implementar a lógica para os fluxos de "Compra Única" e "Compra via Carrinho".

        - [ ] Estilizar os componentes (sugestão: MUI ou Chakra UI).

- [ ] Fase 4: Finalização e Deploy
    - [ ] Escrever a Documentação:

       - [ ] Criar um arquivo README.md completo, explicando o projeto, tecnologias e como executá-lo com Docker.

    - [ ] Configurar Variáveis de Ambiente:

    - [ ] Criar arquivos .env para o back-end e para o front-end.

    - [ ] Deploy do Back-end + Banco de Dados:

        - [ ] Fazer o deploy em uma plataforma como Render (que suporta Docker e PostgreSQL).

        - [ ] Deploy do Front-end:

        - [ ] Fazer o deploy em uma plataforma como Vercel ou Netlify.

    - [ ] Teste Final:

    - [ ] Testar todos os fluxos na aplicação em produção.

    - [ ] Postar no LinkedIn:

 
