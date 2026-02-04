import express from 'express';
import cors from 'cors';
import pool from './context/db'; // conexão com Neon
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json());

// rota de cadastro
app.post('/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hash]
    );

    const user = result.rows[0];
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'segredo');

    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: 'Usuário já existe ou erro no cadastro' });
  }
});

// rota de login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (result.rows.length === 0) return res.status(400).json({ error: 'Usuário não encontrado' });

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: 'Senha inválida' });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'segredo');
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
