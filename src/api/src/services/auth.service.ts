import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { RegisterInput, LoginInput } from '../validators/auth.validator';

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não configurado no .env');
}

function generateToken(userId: number) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export async function registerUser(data: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });

  if (existing) {
    const error = new Error('Já existe um usuário com este e-mail');
    (error as any).statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      passwordHash,
    },
  });

  const token = generateToken(user.id);

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token,
  };
}

export async function loginUser(data: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) {
    const error = new Error('E-mail ou senha inválidos');
    (error as any).statusCode = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(data.password, user.passwordHash);

  if (!passwordMatches) {
    const error = new Error('E-mail ou senha inválidos');
    (error as any).statusCode = 401;
    throw error;
  }

  const token = generateToken(user.id);

  return {
    user: { id: user.id, name: user.name, email: user.email },
    token,
  };
}
