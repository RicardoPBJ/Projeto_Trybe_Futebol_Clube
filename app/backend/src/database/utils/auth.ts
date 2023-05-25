import jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'jwt_secret';

export type JwtPayloadType = {
  id: number,
  email: string,
};

const jwtConfig: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const tokenGenerator = (payload: JwtPayloadType) => {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

export default tokenGenerator;
