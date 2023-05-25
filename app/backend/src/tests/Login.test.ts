import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/Users';
import { app } from '../app'
import { user } from './mocks/user.mock';
import tokenGenerator from '../database/utils/auth';


chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota /login', () => {
  describe('POST', async () => {
    afterEach(() => {
      sinon.restore();
    })

    it('testando método loginUser', async () => {
      // sinon.stub(tokenGenerator, 'sign').resolves('token')
      // sinon.stub(Users, 'findOne').resolves(user as Users);
  
      const { body, status } = await chai.request(app).post('/login')
        .send({
          email: 'carlos@gmail.com',
          password: '12345676',
        });
  
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal({ token: 'token' });
    })

    it('retorna erro 400 ao não receber o password', async () => {
      const { body, status } = await chai.request(app).post('/login')
        .send({
          email: 'carlos@gmail.com',
        });
  
      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    })

    it('retorna erro 400 ao não receber o email', async () => {
      const { body, status } = await chai.request(app).post('/login')
        .send({
          password: '12345676',
        });
  
      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
    })

    it('retorna erro 401 ao receber um password invalido', async () => {
      const { body, status } = await chai.request(app).post('/login')
        .send({
          email: 'carlos@gmail.com',
          password: '12345',
        });
  
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    })

    it('retorna erro 401 ao receber um email invalido', async () => {
      const { body, status } = await chai.request(app).post('/login')
        .send({
          email: 'carlos@@gmail..com',
          password: '12345678',
        });
  
      expect(status).to.be.equal(401);
      expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
    })
  })
})
