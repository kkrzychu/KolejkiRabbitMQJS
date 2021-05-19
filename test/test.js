const assert = require('assert');
const app = require('../PersonalDataService');


describe('Convert function', function () {

  let objectBefore = {
    id: 107,
    name: "Subhash Talwar",
    email: "subhash_talwar@ruecker-hoppe.name",
    gender: "Male",
    status: "Active",
    created_at: "2021-05-17T03:50:05.627+05:30",
    updated_at: "2021-05-17T03:50:05.627+05:30"
  };

  let convertedObject = app.convert(objectBefore);

  

  it('Name comparison', function () {
    assert.equal(objectBefore.name, convertedObject.name);
  });


  it('Email comparison', function () {
    assert.equal(objectBefore.email, convertedObject.email);
  });

  it('Status comparison', function () {
    assert.equal(objectBefore.status, convertedObject.status);
  });

  it('Checking the correctness of the login', function () {
    let log = objectBefore.email.substring(0, objectBefore.email.lastIndexOf("@"));
    assert.equal(log, convertedObject.login);
  });

  it('Checking if uuid is assigned a value', function () {
    assert.equal(convertedObject.uuid != null && convertedObject.uuid != undefined, true);
  });


});
