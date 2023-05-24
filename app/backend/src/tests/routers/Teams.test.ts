import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import Teams from '../../database/models/Teams';
import { teams } from '../mocks/teams.mock';
import { app } from '../../app'


chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota /teams', () => {
  
  afterEach(() => {
    sinon.restore();
  })

  beforeEach(() => {
    sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);
  });

  it('testando metodo GET', async () => {
    
    const { body, status } = await chai.request(app).get('/teams');

    expect(status).to.be.eq(200);
    // expect(body).to.be.deep.eq(teams);
  })
})