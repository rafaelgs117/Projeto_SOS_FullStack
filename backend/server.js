require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(cors({ origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map(v => v.trim()) : true }));
app.use(express.json({ limit: '1mb' }));
app.use((req, res, next) => { console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`); next(); });
const parseId = value => { const n = Number(value); return Number.isInteger(n) && n > 0 ? n : null; };
function validarContato(req, res, next) {
  const { nome, telefone, parentesco } = req.body || {};
  if (![nome, telefone, parentesco].every(v => typeof v === 'string' && v.trim()))
    return res.status(400).json({ mensagem: 'Nome, telefone e parentesco são obrigatórios.' });
  if (req.body.id_usuario !== undefined && !parseId(req.body.id_usuario))
    return res.status(400).json({ mensagem: 'id_usuario deve ser um número inteiro positivo.' });
  next();
}
app.get('/', (req, res) => res.status(200).json({ projeto: 'SOS Emergência', mensagem: 'API conectada ao PostgreSQL.', versao: '3.0.0', banco: 'PostgreSQL' }));
app.get('/api/health', async (req, res, next) => { try { await pool.query('SELECT 1'); res.status(200).json({ api: 'ok', banco: 'conectado' }); } catch (e) { next(e); } });

// CRUD completo de contatos, persistido na tabela contatos_emergencia.
app.get('/api/contatos', async (req, res, next) => {
  try { const r = await pool.query('SELECT id_contato, id_usuario, nome, telefone, parentesco, ativo, criado_em FROM contatos_emergencia ORDER BY id_contato'); res.status(200).json(r.rows); }
  catch (e) { next(e); }
});
app.get('/api/contatos/:id', async (req, res, next) => {
  const id = parseId(req.params.id); if (!id) return res.status(400).json({ mensagem: 'ID inválido.' });
  try { const r = await pool.query('SELECT id_contato, id_usuario, nome, telefone, parentesco, ativo, criado_em FROM contatos_emergencia WHERE id_contato=$1', [id]); if (!r.rowCount) return res.status(404).json({ mensagem: 'Contato não encontrado.' }); res.status(200).json(r.rows[0]); }
  catch (e) { next(e); }
});
app.post('/api/contatos', validarContato, async (req, res, next) => {
  const { nome, telefone, parentesco } = req.body;
  try {
    let userId = req.body.id_usuario ? Number(req.body.id_usuario) : null;
    if (!userId) { const u = await pool.query('SELECT id_usuario FROM usuarios ORDER BY id_usuario LIMIT 1'); if (!u.rowCount) return res.status(400).json({ mensagem: 'Cadastre um usuário antes de criar contatos.' }); userId = u.rows[0].id_usuario; }
    const r = await pool.query('INSERT INTO contatos_emergencia (id_usuario,nome,telefone,parentesco) VALUES ($1,$2,$3,$4) RETURNING id_contato,id_usuario,nome,telefone,parentesco,ativo,criado_em', [userId,nome.trim(),telefone.trim(),parentesco.trim()]);
    res.status(201).json(r.rows[0]);
  } catch (e) { if (e.code === '23503') return res.status(400).json({ mensagem: 'O id_usuario informado não existe.' }); next(e); }
});
app.put('/api/contatos/:id', validarContato, async (req, res, next) => {
  const id = parseId(req.params.id); if (!id) return res.status(400).json({ mensagem: 'ID inválido.' });
  const { nome, telefone, parentesco } = req.body;
  try {
    const r = req.body.id_usuario !== undefined
      ? await pool.query('UPDATE contatos_emergencia SET id_usuario=$1,nome=$2,telefone=$3,parentesco=$4 WHERE id_contato=$5 RETURNING id_contato,id_usuario,nome,telefone,parentesco,ativo,criado_em', [Number(req.body.id_usuario),nome.trim(),telefone.trim(),parentesco.trim(),id])
      : await pool.query('UPDATE contatos_emergencia SET nome=$1,telefone=$2,parentesco=$3 WHERE id_contato=$4 RETURNING id_contato,id_usuario,nome,telefone,parentesco,ativo,criado_em', [nome.trim(),telefone.trim(),parentesco.trim(),id]);
    if (!r.rowCount) return res.status(404).json({ mensagem: 'Contato não encontrado.' }); res.status(200).json(r.rows[0]);
  } catch (e) { if (e.code === '23503') return res.status(400).json({ mensagem: 'O id_usuario informado não existe.' }); next(e); }
});
app.delete('/api/contatos/:id', async (req, res, next) => {
  const id = parseId(req.params.id); if (!id) return res.status(400).json({ mensagem: 'ID inválido.' });
  try { const r = await pool.query('DELETE FROM contatos_emergencia WHERE id_contato=$1 RETURNING id_contato', [id]); if (!r.rowCount) return res.status(404).json({ mensagem: 'Contato não encontrado.' }); res.status(200).json({ mensagem: 'Contato removido do PostgreSQL.', id_contato: id }); }
  catch (e) { if (e.code === '23503') return res.status(400).json({ mensagem: 'Não é possível remover este contato porque existem notificações SOS vinculadas.' }); next(e); }
});

// Consultas e cadastro SOS também usam as tabelas reais do projeto.
app.get('/api/usuarios', async (req, res, next) => { try { const r = await pool.query('SELECT id_usuario,nome_completo,telefone,email,data_nascimento,ativo,criado_em FROM usuarios ORDER BY id_usuario'); res.status(200).json(r.rows); } catch (e) { next(e); } });
app.get('/api/usuarios/:id', async (req, res, next) => { const id = parseId(req.params.id); if (!id) return res.status(400).json({ mensagem: 'ID inválido.' }); try { const r = await pool.query('SELECT id_usuario,nome_completo,telefone,email,data_nascimento,ativo,criado_em FROM usuarios WHERE id_usuario=$1', [id]); if (!r.rowCount) return res.status(404).json({ mensagem: 'Usuário não encontrado.' }); res.status(200).json(r.rows[0]); } catch (e) { next(e); } });
app.get('/api/sos', async (req, res, next) => { try { const r = await pool.query('SELECT s.id_sos,s.id_usuario,u.nome_completo AS solicitante,s.mensagem,s.latitude,s.longitude,s.status,s.data_hora FROM solicitacoes_sos s JOIN usuarios u ON u.id_usuario=s.id_usuario ORDER BY s.id_sos'); res.status(200).json(r.rows); } catch (e) { next(e); } });
app.get('/api/sos/:id', async (req, res, next) => { const id = parseId(req.params.id); if (!id) return res.status(400).json({ mensagem: 'ID inválido.' }); try { const r = await pool.query('SELECT s.id_sos,s.id_usuario,u.nome_completo AS solicitante,s.mensagem,s.latitude,s.longitude,s.status,s.data_hora FROM solicitacoes_sos s JOIN usuarios u ON u.id_usuario=s.id_usuario WHERE s.id_sos=$1', [id]); if (!r.rowCount) return res.status(404).json({ mensagem: 'Solicitação SOS não encontrada.' }); res.status(200).json(r.rows[0]); } catch (e) { next(e); } });
app.post('/api/sos', async (req, res, next) => {
  const idUser = req.body?.id_usuario ?? req.body?.usuarioId; const { mensagem, latitude, longitude } = req.body || {};
  if (!parseId(idUser) || typeof mensagem !== 'string' || !mensagem.trim()) return res.status(400).json({ mensagem: 'Informe id_usuario (ou usuarioId) válido e mensagem.' });
  try { const r = await pool.query('INSERT INTO solicitacoes_sos (id_usuario,mensagem,latitude,longitude) VALUES ($1,$2,$3,$4) RETURNING id_sos,id_usuario,mensagem,latitude,longitude,status,data_hora', [Number(idUser),mensagem.trim(),latitude == null ? null : Number(latitude),longitude == null ? null : Number(longitude)]); res.status(201).json(r.rows[0]); }
  catch (e) { if (e.code === '23503') return res.status(400).json({ mensagem: 'O id_usuario informado não existe.' }); next(e); }
});
app.use((req, res) => res.status(404).json({ mensagem: 'Rota não encontrada.' }));
app.use((error, req, res, next) => { console.error('Erro na API:', error.message); if (res.headersSent) return next(error); res.status(500).json({ mensagem: 'Erro interno da API ou do banco de dados.' }); });
async function iniciarServidor() {
  try { await pool.query('SELECT 1'); console.log(`Conexão PostgreSQL estabelecida: ${process.env.DB_NAME || 'sos_emergencia'}`); app.listen(PORT, () => console.log(`API SOS Emergência em http://localhost:${PORT}`)); }
  catch (e) { console.error('Não foi possível conectar ao PostgreSQL. Confira serviço, banco e arquivo .env.'); console.error(e.message); process.exitCode = 1; await pool.end(); }
}
if (require.main === module) iniciarServidor();
module.exports = { app, iniciarServidor };
