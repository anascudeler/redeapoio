import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Dados inválidos',
      issues: err.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      })),
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno do servidor';

  if (statusCode === 500) {
    console.error(err);
  }

  return res.status(statusCode).json({ message });
}
