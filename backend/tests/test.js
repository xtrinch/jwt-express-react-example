var expect = require('chai').expect;
const supertest = require('supertest');
const mocha = require('mocha')
var app = require('../app')

const userCredentials = {
    username: 'trina',
    password: 'monday123456'
};

const baseUrl = supertest.agent(app);

describe('app', function() {
    var res, body;

    describe('POST /signup', function() {
        this.timeout(2500);

        before(async function () {
            res = await baseUrl.post('/signup')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send(userCredentials);
        });

        it('respond with 200', function(done) {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            done();
        });

    })

    describe('GET /most-liked', function() {
        this.timeout(2500);

        before(async function () {
            res = await baseUrl.get('/most-liked')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send();
        });

        it('respond with an array of most liked users', function(done) {
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            done();
        });
    });
});
