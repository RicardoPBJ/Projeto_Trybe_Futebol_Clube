import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import Teams from '../database/models/Teams';
import { teams } from './mocks/teams.mock';
import { app } from '../app'


chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota /teams', () => {
  describe('GET', async () => {
    afterEach(() => {
      sinon.restore();
    })

    it('testando método findAll', async () => {
      sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);
  
      const { body, status } = await chai.request(app).get('/teams');
  
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(teams);
    })

    it('testando método findOne', async () => {
      sinon.stub(Teams, 'findOne').resolves(teams[0] as Teams);
  
      const { body, status } = await chai.request(app).get('/teams/1');
  
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(teams[0]);
    })

    it('testando método findOne', async () => {
      sinon.stub(Teams, 'findOne').resolves(null);
  
      const { body, status } = await chai.request(app).get('/teams/:id');
  
      expect(status).to.be.equal(400);
      expect(body).to.be.deep.equal({ message: 'Team not found' });
    })
  })
})