process.env.NODE_ENV = 'test';

// let models = require('./models')
// let School = models.School;
// let Student = models.Student;
// var App = require('components/app.js')

//Require the dev-dependencies
const expect = require('chai').expect
var supertest = require('supertest');
let bodyParser = require('body-parser');


// let html = require ('./index.html')
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('./server.js');
let should = chai.should();
const request = require('supertest');
const express = require('express');
const server = express();


const test = (arg) => {

  let id = "d6i0wruU7ddayTqrhwszluW0i9aNBlb1"
  // SC.initialize({
  //   client_id: id,
  // });

  // SC.get('/tracks', {
supertest(server)
  .get('https://api.soundcloud.com/tracks/?client_id=d6i0wruU7ddayTqrhwszluW0i9aNBlb1', {
    genres: arg,
    limit: 1
  }).end((allTracksByGenre) => {
    console.log(allTracksByGenre)
    // map through all users and return user ids
    // const allUsersId = allTracksByGenre.map((tracks)=>{
    //   return tracks.user_id
    })
}
// app.get('/user', function(req, res) {
//   res.status(200).json({ name: 'tobi' });
// });
describe('api test', function(){
  it('should get all tracks', function() {
    let result1 = test('rock')


    // expect(result1).eql([0, 'string', 2, 3, 'cake', 100, -2])
    expect(result1).to.be.a('object');

    // expect(result1).to.have.lengthOf(1);


  })
})
