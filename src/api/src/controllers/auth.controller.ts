import { Request, Response, NextFunction } from 'express';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { registerUser, loginUser } from '../services/auth.service';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const data = registerSchema.parse(req.body);
    const result = await registerUser(data);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const data = loginSchema.parse(req.body);
    const result = await loginUser(data);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
