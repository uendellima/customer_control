import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Customer Control API",
      version: "1.0.0",
      description: "API para gerenciamento de clientes e seus contatos",
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Servidor de desenvolvimento",
      },
    ],
    components: {
      schemas: {
        Customer: {
          type: "object",
          required: ["name", "email", "phone"],
          properties: {
            id: {
              type: "integer",
              description: "ID único do cliente",
              example: 1,
            },
            name: {
              type: "string",
              description: "Nome do cliente",
              example: "João Silva",
            },
            email: {
              type: "string",
              description: "Email do cliente",
              example: "joao@example.com",
            },
            phone: {
              type: "string",
              description: "Telefone do cliente",
              example: "(11) 98765-4321",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Data de criação do cliente",
            },
            contacts: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Contact",
              },
            },
          },
        },
        CustomerInput: {
          type: "object",
          required: ["name", "email", "phone"],
          properties: {
            name: {
              type: "string",
              description: "Nome do cliente",
              example: "João Silva",
            },
            email: {
              type: "string",
              description: "Email do cliente",
              example: "joao@example.com",
            },
            phone: {
              type: "string",
              description: "Telefone do cliente",
              example: "(11) 98765-4321",
            },
          },
        },
        Contact: {
          type: "object",
          required: ["name", "email", "phone", "customerId"],
          properties: {
            id: {
              type: "integer",
              description: "ID único do contato",
              example: 1,
            },
            name: {
              type: "string",
              description: "Nome do contato",
              example: "Maria Santos",
            },
            email: {
              type: "string",
              description: "Email do contato",
              example: "maria@example.com",
            },
            phone: {
              type: "string",
              description: "Telefone do contato",
              example: "(11) 91234-5678",
            },
            customerId: {
              type: "integer",
              description: "ID do cliente associado",
              example: 1,
            },
          },
        },
        ContactInput: {
          type: "object",
          required: ["name", "email", "phone", "customerId"],
          properties: {
            name: {
              type: "string",
              description: "Nome do contato",
              example: "Maria Santos",
            },
            email: {
              type: "string",
              description: "Email do contato",
              example: "maria@example.com",
            },
            phone: {
              type: "string",
              description: "Telefone do contato",
              example: "(11) 91234-5678",
            },
            customerId: {
              type: "integer",
              description: "ID do cliente associado",
              example: 1,
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              description: "Mensagem de erro",
              example: "Recurso não encontrado",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
