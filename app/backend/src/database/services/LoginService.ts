import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import ILoginService from '../interfaces/ILoginService';
import Users from '../models/Users';
import ILogin from '../interfaces/ILogin';
import { FORMAT_INVALID } from '../utils/errors';
import tokenGenerator from '../utils/auth';

export default class LoginService implements ILoginService {
  protected model: ModelStatic<Users> = Users;

  public async loginUser(body: ILogin) {
    const { email, password } = body;

    const response = await this.model.findOne({ where: { email } });

    if (!response || !bcrypt.compareSync(password, response.dataValues.password)) {
      return { status: 401, message: FORMAT_INVALID };
    }

    const payload = { id: response.id, role: response.role, email };

    const token = { token: tokenGenerator(payload) };

    return { status: 200, message: token };
  }
}
