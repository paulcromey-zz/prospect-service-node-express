var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our todo model for our unit testing.
var Prospect = require('../../api/schemas/prospects');

describe("Get all prospects", function(){
    // Test will pass if we get all todos
   it("should return all prospects", function(done){
       var ProspectMock = sinon.mock(Prospect);
       var expectedResult = {status: true, todo: []};
       ProspectMock.expects('find').yields(null, expectedResult);
       Prospect.find(function (err, result) {
           ProspectMock.verify();
           ProspectMock.restore();
           expect(result.status).to.be.true;
           done();
       });
   });

   // Test will pass if we fail to get a todo
   it("should return error", function(done){
       var ProspectMock = sinon.mock(Prospect);
       var expectedResult = {status: false, error: "Something went wrong"};
       ProspectMock.expects('find').yields(expectedResult, null);
       Prospect.find(function (err, result) {
           ProspectMock.verify();
           ProspectMock.restore();
           expect(err.status).to.not.be.true;
           done();
       });
   });
});