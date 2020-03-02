import {expect} from 'chai';

import Agency from '../src/Agency';
import trips from '../src/data/trips.js'
import destinations from '../src/data/destinations.js'
import travelers from '../src/data/traveler.js'

describe("Agency", function() {
  let agency;

  beforeEach(() => {
    agency = new Agency('agency', travelers, trips, destinations);

  })

  it("should be a function", function() {
    expect(Agency).to.be.a('function');
  });

  it("should be an instance of a Agency", function() {
    expect(agency).to.be.an.instanceof(Agency);
  });

  it("should return Agency earning based on year 2020", function() {
    expect(agency.calculateAgencyEarningsforYear("2020")).to.be.equal(71405);
  });

  it("should return Agency earning based on year 2019", function() {
    expect(agency.calculateAgencyEarningsforYear("2019")).to.be.equal(32275);
  });

})
