// import { Response } from 'express';
import ILogin from './ILogin';

export type Message = { message: string } | { token: string };

export type ServiceResult = { status: number, message: Message };

export default interface ILoginService {
  loginUser(body: ILogin): Promise<ServiceResult>;
}
