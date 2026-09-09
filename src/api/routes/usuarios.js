const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { nome, telefone, email, senha } = req.body;
  if (!nome || !telefone || !email || !senha) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }
  try {
    const [existentes] = await pool.query('SELECT id FROM Usuario WHERE email = ?', [email]);
    if (existentes.length > 0) {
      return res.status(409).json({ erro: 'Já existe uma conta com esse e-mail.' });
    }
    const hash = await bcrypt.hash(senha, 10);
    const [result] = await pool.query(
      'INSERT INTO Usuario (nome, telefone, email, senha) VALUES (?, ?, ?, ?)',
      [nome, telefone, email, hash]
    );
    res.status(201).json({ id: result.insertId, nome, telefone, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
  }
});

module.exports = router;