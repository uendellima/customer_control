# 📇 Desafio FullStack Cadastro de Clientes

Este projeto é uma aplicação web Fullstack que permite cadastrar **clientes** com seus respectivos **contatos vinculados**, além de gerar relatórios listando os relacionamentos.

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

---

## ⚙️ Pré-requisitos

- Node.js (v18+ recomendado)
- PostgreSQL
- NPM ou Yarn

---

## 🛠️ Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/uendellima/customer_control.git
cd customer_control
```

### 2. Instale as dependências

```bash
cd backend
npm install
```

### 3. Configure o banco de dados

Crie um banco PostgreSQL e atualize o arquivo .env com as informações da sua instância:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nomedobanco?schema=public"
```

### 4. Execute as migrações e gere o Prisma Client

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Inicie o Servidor

```bash
node src/server.js
```

### 6. Inicie o site

```bash
cd ../frontend/customer_control
npm install
npm start
```

## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger UI. Após iniciar o servidor, acesse:

```
http://localhost:3001/api-docs
```

A documentação interativa permite:
- Visualizar todos os endpoints disponíveis
- Ver os schemas de requisição e resposta
- Testar os endpoints diretamente pela interface
- Verificar códigos de status HTTP e possíveis erros