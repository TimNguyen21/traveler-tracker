import {expect} from 'chai';

import Login from '../src/Login';

describe("Login", function() {
  let travelersData;

  beforeEach(() => {
    travelersData = [
      {
        "id": 1,
        "name": "Ham Leadbeater",
        "travelerType": "relaxer"
      },
      {
        "id": 2,
        "name": "Rachael Vaughten",
        "travelerType": "thrill-seeker"
      },
      {
        "id": 3,
        "name": "Sibby Dawidowitsch",
        "travelerType": "shopper"
      }
    ]

  })

  it("should be a function", function() {
    expect(Login).to.be.a('function');
  });

  it("should be an instance of a Login", function() {
    let login = new Login('traveler1', 'password2020');

    expect(login).to.be.an.instanceof(Login);
  });

  it("should return agent userName", function() {
    let login = new Login('agency', 'password2020');

    expect(login.checkUserStatus(travelersData)).to.be.equal('agency');
  });

  it("should return user's ID", function() {
    let login = new Login('traveler2', 'password2020');

    expect(login.checkUserStatus(travelersData)).to.be.equal(2);
  })

  it("should return invalid login with invalid password", function() {
    let login = new Login('agency', 'password');

    expect(login.checkUserStatus(travelersData)).to.be.equal('invalid login');
  })

  it("should return invalid login with invalid username", function() {
    let login = new Login('traveler20', 'password2020');

    expect(login.checkUserStatus(travelersData)).to.be.equal('invalid login');
  })

})
