var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our Prospect model for our unit testing.
var Prospect = require('../../api/schemas/prospects');

describe("Get all prospects", function(){
    // Test will pass if we get all Prospects
   it("should return all prospects", function(done){
       var ProspectMock = sinon.mock(Prospect);
       var expectedResult = {status: true, Prospect: []};
       ProspectMock.expects('find').yields(null, expectedResult);
       Prospect.find(function (err, result) {
           ProspectMock.verify();
           ProspectMock.restore();
           expect(result.status).to.be.true;
           done();
       });
   });

   // Test will pass if we fail to get a Prospect
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

// Test will pass if the Prospect is saved
describe("Post a new Prospect", function(){
    it("should create new post", function(done){
        var ProspectMock = sinon.mock(new Prospect({ Prospect: 'Save new Prospect from mock'}));
        var prospect = ProspectMock.object;
        var expectedResult = { status: true };
        ProspectMock.expects('save').yields(null, expectedResult);
        prospect.save(function (err, result) {
            ProspectMock.verify();
            ProspectMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the Prospect is not saved
    it("should return error, if post not saved", function(done){
        var ProspectMock = sinon.mock(new Prospect({ Prospect: 'Save new Prospect from mock'}));
        var prospect = ProspectMock.object;
        var expectedResult = { status: false };
        ProspectMock.expects('save').yields(expectedResult, null);
        prospect.save(function (err, result) {
            ProspectMock.verify();
            ProspectMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

// Test will pass if the Prospect is updated based on an ID
describe("Update a new Prospect by id", function(){
    /*it("should updated a Prospect by id", function(done){
        var ProspectMock = sinon.mock(new Prospect({ Prospect: 'Save new Prospect from mock'}));
        var prospect = ProspectMock.object;
      var expectedResult = { status: true };
      ProspectMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult);
      prospect.save(function (err, result) {
        ProspectMock.verify();
        ProspectMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });
    // Test will pass if the Prospect is not updated based on an ID
    it("should return error if update action is failed", function(done){
      var ProspectMock = sinon.mock(new Prospect({ completed: true}));
      var prospect = ProspectMock.object;
      var expectedResult = { status: false };
      ProspectMock.expects('save').withArgs({_id: 12345}).yields(expectedResult, null);
      prospect.save(function (err, result) {
        ProspectMock.verify();
        ProspectMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });*/
});

// Test will pass if the Prospect is deleted based on an ID
describe("Delete a prospect by id", function(){
    it("should delete a prospect by id", function(done){
        var ProspectMock = sinon.mock(Prospect);
        var expectedResult = { status: true };
        ProspectMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
        Prospect.remove({_id: 12345}, function (err, result) {
            ProspectMock.verify();
            ProspectMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the Prospect is not deleted based on an ID
    it("should return error if delete action is failed", function(done){
        var ProspectMock = sinon.mock(Prospect);
        var expectedResult = { status: false };
        ProspectMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
        Prospect.remove({_id: 12345}, function (err, result) {
            ProspectMock.verify();
            ProspectMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});