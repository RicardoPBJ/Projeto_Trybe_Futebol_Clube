import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app'
import Matches from '../database/models/Matches';
import { matches } from './mocks/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('testando a rota /matches', () => {
  describe('GET', async () => {
    afterEach(() => {
      sinon.restore();
    })

    it('testando método findAll', async () => {
      sinon.stub(Matches, 'findAll').resolves(matches as unknown as Matches[]);
  
      const { body, status } = await chai.request(app).get('/matches');
  
      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(matches);
    });
  });
  describe('POST', () => {
    afterEach(() => {
      sinon.restore();
    })
    const newMatch = {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 8,
      awayTeamGoals: 2,
      inProgress: true,
    };
    const newMatchBody = {
      homeTeamId: 16,
      awayTeamId: 8, 
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    };
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJhZG1pbiI6ZmFsc2UsImlhdCI6MTY4NDMzNTU2MCwiZXhwIjoxNjg0NTk0NzYwfQ.
    QieacH1Ti1L9pKORenmQ7EC9eKnXBD9zqBuL9FPaCeU`;
    it('testando método addMatch', async () => {
      sinon.stub(Matches, 'create').resolves({
        id: 49,
        homeTeamId: 16,
        homeTeamGoals: 2,
        awayTeamId: 8,
        awayTeamGoals: 2,
        inProgress: true,
      } as unknown as Matches);
  
      const { status, body } = await chai.request(app).post('/matches').send(newMatchBody).set('Authorization', token)
        .send(newMatchBody);
  
      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(newMatch);
    });
    // it('testando método finishMatch', async () => {
    //   sinon.stub(Matches, 'update').resolves([1]);
  
    //   const { status, body } = await chai.request(app).patch('/matches/:id/finish').set('Authorization', token);
  
    //   expect(status).to.be.equal(200);
    //   expect(body).to.be.deep.equal({ message: 'Finished' })
    // });
  });
});