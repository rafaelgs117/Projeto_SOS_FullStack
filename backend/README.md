# Backend — SOS Emergência (API v2)

API do projeto integrador SOS Emergência — **Aula 09**: evolução da API da Aula 08 com nodemon, `.env`, `.gitignore`, middlewares, rotas com parâmetros e status codes corretos.

## Instalação e execução

```bash
cd backend
npm install
```

Crie o arquivo `.env` (ele não vai para o GitHub):

```
PORT=3000
```

Modo desenvolvimento (nodemon reinicia sozinho ao salvar):

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

Servidor: `http://localhost:3000`

## O que mudou da v1 para a v2

- **nodemon** (`npm run dev`) — reinício automático a cada alteração salva.
- **dotenv + `.env`** — a porta sai do código (`process.env.PORT`).
- **`.gitignore`** — protege `node_modules` e `.env`.
- **Middleware de log** — imprime método e URL de cada requisição no terminal.
- **Middlewares de validação** — retornam 400 quando o body está incompleto (POST e PUT).
- **CRUD completo** — PUT e DELETE em contatos, usuários e SOS.
- **Middleware final** — rota inexistente retorna 404.

## Endpoints

| VERBO | ENDPOINT | AÇÃO EXECUTADA | STATUS |
|---|---|---|---|
| GET | `/` | Verifica se a API está funcionando | 200 |
| GET | `/api/contatos` | Lista os contatos | 200 |
| GET | `/api/contatos/:id` | Busca contato por ID | 200 / 404 |
| POST | `/api/contatos` | Cadastra contato | 201 / 400 |
| PUT | `/api/contatos/:id` | Atualiza contato | 200 / 400 / 404 |
| DELETE | `/api/contatos/:id` | Remove contato | 200 / 404 |
| GET | `/api/usuarios` | Lista usuários | 200 |
| GET | `/api/usuarios/:id` | Busca usuário por ID | 200 / 404 |
| POST | `/api/usuarios` | Cadastra usuário | 201 / 400 |
| PUT | `/api/usuarios/:id` | Atualiza usuário | 200 / 400 / 404 |
| DELETE | `/api/usuarios/:id` | Remove usuário | 200 / 404 |
| GET | `/api/sos` | Lista solicitações SOS | 200 |
| GET | `/api/sos/:id` | Busca solicitação SOS por ID | 200 / 404 |
| POST | `/api/sos` | Registra solicitação SOS | 201 / 400 |
| PUT | `/api/sos/:id` | Atualiza solicitação SOS | 200 / 400 / 404 |
| DELETE | `/api/sos/:id` | Remove solicitação SOS | 200 / 404 |

## Bodies de exemplo (Postman → Body → raw → JSON)

**Contato** (`POST`/`PUT /api/contatos`)

```json
{ "nome": "Maria da Silva", "telefone": "(48) 99999-1111", "parentesco": "Mãe" }
```

**Usuário** (`POST`/`PUT /api/usuarios`)

```json
{ "nome": "Ana", "idade": 30, "telefone": "(48) 98888-0000" }
```

**SOS** (`POST`/`PUT /api/sos`)

```json
{
  "usuarioId": 1,
  "mensagem": "Preciso de ajuda",
  "localizacao": { "latitude": -27.5954, "longitude": -48.548 }
}
```

## Tabela de testes no Postman

| # | MÉTODO | URL | BODY | ESPERADO |
|---|---|---|---|---|
| 1 | GET | `/api/contatos` | — | 200 + lista completa |
| 2 | GET | `/api/contatos/1` | — | 200 + item de id 1 |
| 3 | GET | `/api/contatos/999` | — | 404 |
| 4 | POST | `/api/contatos` | `{"nome":"Maria","telefone":"(48) 99999-1111","parentesco":"Mãe"}` | 201 + item criado |
| 5 | POST | `/api/contatos` | `{}` | 400 (validação) |
| 6 | PUT | `/api/contatos/1` | `{"nome":"Novo","telefone":"(48) 90000-0000","parentesco":"Pai"}` | 200 + item atualizado |
| 7 | DELETE | `/api/contatos/1` | — | 200 + mensagem de remoção |

> O navegador só faz GET. POST, PUT e DELETE são testados no Postman. Acompanhe o terminal: o middleware de log imprime cada requisição.

Os dados ficam em memória (arrays). O banco de dados real entra nas próximas aulas.

## Integrantes

- Nome do integrante 1 — GitHub: `@rafaelgs117`
- Nome do integrante 2 — GitHub: `@`

## Códigos HTTP utilizados

- `200` — consulta, atualização ou remoção realizada com sucesso.
- `201` — recurso criado com sucesso.
- `400` — dados obrigatórios não informados.
- `404` — recurso ou rota não encontrada.
