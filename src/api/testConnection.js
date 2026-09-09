const mysql = require('mysql2/promise');
require('dotenv').config();

async function testar() {
  console.log('Tentando conectar no MySQL...');
  console.log(`Host: ${process.env.DB_HOST} | Usuário: ${process.env.DB_USER} | Banco: ${process.env.DB_NAME}`);

  try {
    const conexao = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const [resultado] = await conexao.query('SELECT 1 + 1 AS resultado');
    console.log('✅ Conexão bem-sucedida! Resultado do teste:', resultado[0].resultado);

    const [tabelas] = await conexao.query('SHOW TABLES');
    console.log('Tabelas encontradas no banco:', tabelas.map((t) => Object.values(t)[0]));

    await conexao.end();
  } catch (erro) {
    console.error('❌ Falha ao conectar no banco:');
    console.error(erro.message);
  }
}

testar();