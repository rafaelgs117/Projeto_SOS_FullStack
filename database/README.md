# SOS Emergência — Aula 10 (PostgreSQL)

## Conteúdo
- `database/sos_emergencia.sql`: script completo DDL + DML, com cinco tabelas, chaves, restrições, inserts e consultas.
- `MODELAGEM_SOS_EMERGENCIA_AULA10.pdf`: contexto, modelagem conceitual e lógica, relacionamentos e orientação de execução.

## Como executar no pgAdmin
1. Abra o pgAdmin e conecte ao servidor PostgreSQL.
2. Crie um banco chamado `sos_emergencia` (botão direito em Databases > Create > Database).
3. Selecione esse banco e abra Tools > Query Tool.
4. Abra `database/sos_emergencia.sql`, cole o conteúdo no Query Tool e clique em Execute (ícone de raio/F5).
5. Confira as tabelas em Schemas > public > Tables.
6. Execute os SELECTs do final do arquivo e mostre os resultados, especialmente o SELECT com JOIN.

## Tabelas e relacionamentos
- `usuarios`: dados básicos do usuário.
- `perfis_usuario`: informações complementares, com `id_usuario UNIQUE` para garantir relação 1:1.
- `contatos_emergencia`: contatos cadastrados por um usuário (1:N).
- `solicitacoes_sos`: solicitações geradas por um usuário (1:N).
- `notificacoes_sos`: tabela de junção que relaciona solicitações SOS e contatos (N:N), registrando canal e estado de envio.

## Observações
- Os dados são fictícios, criados para fins acadêmicos.
- O script apaga tabelas com esses nomes antes de recriá-las; execute em um banco de teste vazio.
- Os registros são armazenados no PostgreSQL, diferentemente da versão anterior da API que mantinha arrays em memória.
- O projeto ainda é um modelo acadêmico: este script não envia SMS/WhatsApp e não faz integração automática com a API.
