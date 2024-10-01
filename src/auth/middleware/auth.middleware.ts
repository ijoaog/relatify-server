import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly staticToken = process.env.BEARER_TOKEN;

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || authHeader !== `Bearer ${this.staticToken}`) {
      throw new UnauthorizedException('Token inválido ou não fornecido');
    }

    next();
  }
}
