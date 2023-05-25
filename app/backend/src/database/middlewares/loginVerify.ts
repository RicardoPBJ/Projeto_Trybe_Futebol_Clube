import { Response, Request, NextFunction } from 'express';
import { FORMAT_INVALID, BAD_REQUEST } from '../utils/errors';

const loginVerify = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json(BAD_REQUEST);

  const regex = (/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/);

  if (regex.test(email) === false) return res.status(401).json(FORMAT_INVALID);

  if (password.length < 6) return res.status(401).json(FORMAT_INVALID);

  next();
};

export default loginVerify;
