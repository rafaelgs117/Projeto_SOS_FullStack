# Backend — SOS Emergência

API inicial do projeto integrador SOS Emergência — Aula 08.

## Instalação e execução

```bash
cd backend
npm install
npm start
```

Servidor: `http://localhost:3000`

Modo desenvolvimento:

```bash
npm run dev
```

## Endpoints

| VERBO | ENDPOINT | AÇÃO EXECUTADA |
|---|---|---|
| GET | `/` | Verifica se a API está funcionando |
| GET | `/api/contatos` | Lista os contatos |
| GET | `/api/contatos/:id` | Busca contato por ID |
| POST | `/api/contatos` | Cadastra contato |
| GET | `/api/usuarios` | Lista usuários |
| GET | `/api/usuarios/:id` | Busca usuário por ID |
| GET | `/api/sos` | Lista solicitações SOS |
| GET | `/api/sos/:id` | Busca solicitação SOS por ID |
| POST | `/api/sos` | Registra solicitação SOS |

## Exemplo POST /api/contatos

```json
{
  "nome": "Maria da Silva",
  "telefone": "(48) 99999-1111",
  "parentesco": "Mãe"
}
```

## Exemplo POST /api/sos

```json
{
  "usuarioId": 1,
  "mensagem": "Preciso de ajuda",
  "localizacao": {
    "latitude": -27.5954,
    "longitude": -48.548
  }
}
```

Os dados desta etapa ficam em memória. O banco de dados pode ser integrado posteriormente.

## Integrantes

- Nome do integrante 1 — GitHub: `@usuario`
- Nome do integrante 2 — GitHub: `@usuario`
- Nome do integrante 3 — GitHub: `@usuario`
- Nome do integrante 4 — GitHub: `@usuario`

> Substitua os placeholders pelos nomes reais antes de publicar o repositório.

## Códigos HTTP utilizados

- `200` — consulta realizada com sucesso.
- `201` — recurso criado com sucesso.
- `400` — dados obrigatórios não informados.
- `404` — recurso ou endpoint não encontrado.
