const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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

app.get('/', (req, res) => res.status(200).json({
  projeto: 'SOS Emergência',
  mensagem: 'API Back-end funcionando!',
  versao: '1.0.0'
}));

app.get('/api/contatos', (req, res) => res.status(200).json(contatos));

app.get('/api/contatos/:id', (req, res) => {
  const contato = contatos.find(item => item.id === Number(req.params.id));
  if (!contato) return res.status(404).json({ erro: 'Contato não encontrado.' });
  res.status(200).json(contato);
});

app.post('/api/contatos', (req, res) => {
  const { nome, telefone, parentesco } = req.body;
  if (!nome || !telefone || !parentesco) {
    return res.status(400).json({ erro: 'Nome, telefone e parentesco são obrigatórios.' });
  }
  const novo = {
    id: contatos.length ? Math.max(...contatos.map(x => x.id)) + 1 : 1,
    nome, telefone, parentesco
  };
  contatos.push(novo);
  res.status(201).json(novo);
});

app.get('/api/usuarios', (req, res) => res.status(200).json(usuarios));

app.get('/api/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(item => item.id === Number(req.params.id));
  if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
  res.status(200).json(usuario);
});

app.get('/api/sos', (req, res) => res.status(200).json(solicitacoesSOS));

app.get('/api/sos/:id', (req, res) => {
  const solicitacao = solicitacoesSOS.find(item => item.id === Number(req.params.id));
  if (!solicitacao) return res.status(404).json({ erro: 'Solicitação SOS não encontrada.' });
  res.status(200).json(solicitacao);
});

app.post('/api/sos', (req, res) => {
  const { usuarioId, mensagem, localizacao } = req.body;
  if (!usuarioId || !mensagem) {
    return res.status(400).json({ erro: 'usuarioId e mensagem são obrigatórios.' });
  }
  const nova = {
    id: solicitacoesSOS.length ? Math.max(...solicitacoesSOS.map(x => x.id)) + 1 : 1,
    usuarioId, mensagem, localizacao: localizacao || null,
    data: new Date().toISOString()
  };
  solicitacoesSOS.push(nova);
  res.status(201).json(nova);
});

app.use((req, res) => res.status(404).json({ erro: 'Endpoint não encontrado.' }));

app.listen(PORT, () => {
  console.log(`Servidor SOS Emergência rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});
