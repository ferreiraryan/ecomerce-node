# 🛒 DevStore — E-commerce Full Stack

DevStore é uma plataforma **full stack de e-commerce**, desenvolvida para simular um ambiente real de mercado e demonstrar boas práticas de **arquitetura de software**, **segurança**, **integridade de dados** e **experiência do usuário**.

O projeto conta com **painel administrativo**, **gestão de estoque**, **checkout seguro** e uma arquitetura moderna baseada em **monorepo**.

---

## 🚀 Stack Tecnológica

### 🔧 Back-end
- **Node.js** + **Express**
- **TypeScript** — tipagem estática e segurança
- **PostgreSQL** — banco de dados relacional
- **Prisma ORM** — modelagem e queries tipadas
- **Docker** — ambiente isolado e reproduzível
- **Zod** — validação rigorosa de dados
- **JWT** + **BCrypt** — autenticação e criptografia

### 🎨 Front-end
- **React** + **Vite**
- **Tailwind CSS** — layout responsivo + Dark Mode
- **Context API** — estado global (Auth, Carrinho)
- **Axios** — consumo da API

---

## 📂 Estrutura do Projeto

```bash
/devstore
│
├── backend/                    # API Node.js
│   ├── src/
│   │   ├── controllers/        # Camada HTTP
│   │   ├── services/           # Regras de negócio
│   │   ├── middlewares/        # Auth, Zod, Upload
│   │   └── ...
│   ├── prisma/                 # Schema, migrations, seeds
│   └── Dockerfile
│
├── frontend/                   # Aplicação React
│   ├── src/
│   │   ├── components/         # Componentes reutilizáveis
│   │   ├── context/            # Auth, Cart
│   │   ├── pages/              # Admin, Checkout, Profile
│   │   └── services/           # Integração com API
│   └── ...
│
├── docker-compose.yml          # Orquestração dos containers
└── README.md
```

---

## 📥 Instalação e Configuração

### Pré-requisitos
- Docker
- Docker Compose
- Node.js (para rodar o front fora do Docker)

---

### 📦 Clone o Repositório
```bash
git clone https://github.com/ferreiraryan/ecomerce-node.git
cd devstore
```

---

### 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados (Docker)
DATABASE_URL="postgresql://docker:docker@db:5432/ecommerce?schema=public"

# Segurança
JWT_SECRET="sua_chave_super_secreta"

```

---

## 🐳 Executando com Docker

```bash
docker-compose up --build
```

- Back-end: **http://localhost:3333**

---

## ⚛️ Executando o Front-end (Dev)

```bash
cd frontend
npm install
npm run dev
```

- Front-end: **http://localhost:5173**

---

## 🛠️ Funcionalidades

### 👤 Usuário
- Registro e Login seguros (JWT + Zod)
- Navegação por categorias
- Carrinho de compras em tempo real
- Checkout seguro com validação de estoque
- Histórico de pedidos com status

### 🛡️ Administrador
- CRUD completo de produtos
- Gestão de categorias
- Controle de estoque
- Visualização e atualização de pedidos

### 🔒 Segurança & Consistência
- Validação de dados no back-end
- Preço calculado no servidor (anti-fraude)
- Transações atômicas (`prisma.$transaction`)
- Autorização por role (USER / ADMIN)

---

## 🤝 Contribuindo

1. Faça um **fork**
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit: `git commit -m "Minha feature"`
4. Push: `git push origin minha-feature`
5. Abra um **Pull Request** 🚀

---

## 📬 Contato

**Ryan Ferreira**  
📧 Email: ryanferreira4883@gmail.com  
🐙 GitHub: https://github.com/ferreiraryan  
💼 LinkedIn: https://www.linkedin.com/in/ferryan/

---

⭐ Se este projeto te ajudou, considere deixar uma estrela!
