var supertest = require('supertest');
var should = require('should');

describe('users-service', () => {

  var api = supertest('http://localhost:8123');

  it('returns a 200 for a known user', (done) => {

    api.get('/search?email=homer@thesimpsons.com')
    .expect(200, done);
  });

});