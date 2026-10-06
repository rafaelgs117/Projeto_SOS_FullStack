// ===== DEPENDÊNCIAS =====
const express = require('express');
require('dotenv').config(); // lê o arquivo .env

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE GLOBAL: lê JSON do body (sem isso, req.body = undefined)
app.use(express.json());

// "BANCO DE DADOS" EM MEMÓRIA (arrays) - o banco real vem nas próximas aulas
let contatos = [
  { id: 1, nome: 'Contato de Exemplo', telefone: '(48) 99999-9999', parentesco: 'Familiar' }
];

let usuarios = [
  { id: 1, nome: 'Usuário de Exemplo', idade: 25, telefone: '(48) 98888-8888' }
];

let solicitacoesSOS = [
  {
    id: 1,
    usuarioId: 1,
    mensagem: 'Solicitação SOS de exemplo',
    localizacao: { latitude: -27.5954, longitude: -48.5480 },
    data: '2026-09-28T12:00:00.000Z'
  }
];

// Gera o próximo id (maior id existente + 1), evitando repetir ids após DELETE
function proximoId(lista) {
  return lista.length ? Math.max(...lista.map((item) => item.id)) + 1 : 1;
}

// ===== MIDDLEWARES =====

// MIDDLEWARE 1: o "porteiro" que registra tudo (logs)
function registrarLog(req, res, next) {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next(); // SEMPRE chamar next(), senão a requisição trava
}
app.use(registrarLog);

// MIDDLEWARE 2: validação de dados (usado só no POST e PUT)
function validarContato(req, res, next) {
  const { nome, telefone, parentesco } = req.body || {};
  if (!nome) {
    return res.status(400).json({ mensagem: 'O nome é obrigatório' });
  }
  if (!telefone) {
    return res.status(400).json({ mensagem: 'O telefone é obrigatório' });
  }
  if (!parentesco) {
    return res.status(400).json({ mensagem: 'O parentesco é obrigatório' });
  }
  next(); // dados ok, pode continuar
}

function validarUsuario(req, res, next) {
  const { nome, idade } = req.body || {};
  if (!nome) {
    return res.status(400).json({ mensagem: 'O nome é obrigatório' });
  }
  if (!idade) {
    return res.status(400).json({ mensagem: 'A idade é obrigatória' });
  }
  next();
}

function validarSOS(req, res, next) {
  const { usuarioId, mensagem } = req.body || {};
  if (!usuarioId) {
    return res.status(400).json({ mensagem: 'O usuarioId é obrigatório' });
  }
  if (!mensagem) {
    return res.status(400).json({ mensagem: 'A mensagem é obrigatória' });
  }
  next();
}

// ===== ROTAS =====

// GET / -> verifica se a API está funcionando
app.get('/', (req, res) => {
  return res.status(200).json({
    projeto: 'SOS Emergência',
    mensagem: 'API Back-end funcionando!',
    versao: '2.0.0'
  });
});

// ---------- CONTATOS ----------

// GET /api/contatos -> lista todos (status 200)
app.get('/api/contatos', (req, res) => {
  return res.status(200).json(contatos);
});

// GET /api/contatos/:id -> busca por ID (parâmetro de rota)
app.get('/api/contatos/:id', (req, res) => {
  const id = Number(req.params.id); // :id vem como STRING -> converter!
  const contato = contatos.find((c) => c.id === id);
  if (!contato) {
    return res.status(404).json({ mensagem: 'Contato não encontrado' });
  }
  return res.status(200).json(contato);
});

// POST /api/contatos -> cria novo (com middleware de validação)
app.post('/api/contatos', validarContato, (req, res) => {
  const { nome, telefone, parentesco } = req.body;
  const novoContato = { id: proximoId(contatos), nome, telefone, parentesco };
  contatos.push(novoContato);
  return res.status(201).json(novoContato); // 201 = criado com sucesso
});

// PUT /api/contatos/:id -> atualiza existente
app.put('/api/contatos/:id', validarContato, (req, res) => {
  const id = Number(req.params.id);
  const contato = contatos.find((c) => c.id === id);
  if (!contato) {
    return res.status(404).json({ mensagem: 'Contato não encontrado' });
  }
  const { nome, telefone, parentesco } = req.body;
  contato.nome = nome;
  contato.telefone = telefone;
  contato.parentesco = parentesco;
  return res.status(200).json(contato);
});

// DELETE /api/contatos/:id -> remove
app.delete('/api/contatos/:id', (req, res) => {
  const id = Number(req.params.id);
  const contato = contatos.find((c) => c.id === id);
  if (!contato) {
    return res.status(404).json({ mensagem: 'Contato não encontrado' });
  }
  contatos = contatos.filter((c) => c.id !== id);
  return res.status(200).json({ mensagem: 'Contato removido com sucesso' });
});

// ---------- USUÁRIOS ----------

app.get('/api/usuarios', (req, res) => {
  return res.status(200).json(usuarios);
});

app.get('/api/usuarios/:id', (req, res) => {
  const id = Number(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
  return res.status(200).json(usuario);
});

app.post('/api/usuarios', validarUsuario, (req, res) => {
  const { nome, idade, telefone } = req.body;
  const novoUsuario = { id: proximoId(usuarios), nome, idade, telefone: telefone || null };
  usuarios.push(novoUsuario);
  return res.status(201).json(novoUsuario);
});

app.put('/api/usuarios/:id', validarUsuario, (req, res) => {
  const id = Number(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
  const { nome, idade, telefone } = req.body;
  usuario.nome = nome;
  usuario.idade = idade;
  usuario.telefone = telefone || usuario.telefone;
  return res.status(200).json(usuario);
});

app.delete('/api/usuarios/:id', (req, res) => {
  const id = Number(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);
  if (!usuario) {
    return res.status(404).json({ mensagem: 'Usuário não encontrado' });
  }
  usuarios = usuarios.filter((u) => u.id !== id);
  return res.status(200).json({ mensagem: 'Usuário removido com sucesso' });
});

// ---------- SOLICITAÇÕES SOS ----------

app.get('/api/sos', (req, res) => {
  return res.status(200).json(solicitacoesSOS);
});

app.get('/api/sos/:id', (req, res) => {
  const id = Number(req.params.id);
  const solicitacao = solicitacoesSOS.find((s) => s.id === id);
  if (!solicitacao) {
    return res.status(404).json({ mensagem: 'Solicitação SOS não encontrada' });
  }
  return res.status(200).json(solicitacao);
});

app.post('/api/sos', validarSOS, (req, res) => {
  const { usuarioId, mensagem, localizacao } = req.body;
  const novaSolicitacao = {
    id: proximoId(solicitacoesSOS),
    usuarioId,
    mensagem,
    localizacao: localizacao || null,
    data: new Date().toISOString()
  };
  solicitacoesSOS.push(novaSolicitacao);
  return res.status(201).json(novaSolicitacao);
});

app.put('/api/sos/:id', validarSOS, (req, res) => {
  const id = Number(req.params.id);
  const solicitacao = solicitacoesSOS.find((s) => s.id === id);
  if (!solicitacao) {
    return res.status(404).json({ mensagem: 'Solicitação SOS não encontrada' });
  }
  const { usuarioId, mensagem, localizacao } = req.body;
  solicitacao.usuarioId = usuarioId;
  solicitacao.mensagem = mensagem;
  solicitacao.localizacao = localizacao || solicitacao.localizacao;
  return res.status(200).json(solicitacao);
});

app.delete('/api/sos/:id', (req, res) => {
  const id = Number(req.params.id);
  const solicitacao = solicitacoesSOS.find((s) => s.id === id);
  if (!solicitacao) {
    return res.status(404).json({ mensagem: 'Solicitação SOS não encontrada' });
  }
  solicitacoesSOS = solicitacoesSOS.filter((s) => s.id !== id);
  return res.status(200).json({ mensagem: 'Solicitação SOS removida com sucesso' });
});

// MIDDLEWARE FINAL: rota que não existe -> 404
app.use((req, res) => {
  return res.status(404).json({ mensagem: 'Rota não encontrada' });
});

// SUBIR O SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
