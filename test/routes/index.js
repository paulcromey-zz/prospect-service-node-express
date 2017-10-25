var chai = require('chai');
var should = chai.should();

var server = require('../../app');
var request = require('supertest').agent(server.listen());

describe('Prospect Service', function () {

    it('GET /api/prospects', function (done) {
        request
            .get('/api/prospects')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .expect(function (res) {
                should.exist(res.body[0]);
                should.exist(res.body[0].uuid);
                should.exist(res.body[0].email);
                should.equal(res.body[0].uuid, '1');
                should.equal(res.body[0].email, 'paul.cromey@gmail.com');
            })
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    })
});