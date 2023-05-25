import { Response, Request, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import { TOKEN_NOT_VALID } from '../utils/errors';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const tokenVerify = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json(TOKEN_NOT_VALID);

  try {
    const user = jwt.verify(authorization, secret);
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenVerify;
