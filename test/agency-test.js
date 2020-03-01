import {expect} from 'chai';

import Agency from '../src/Agency';
import trips from '../src/data/trips.js'
import destinations from '../src/data/destinations.js'

describe("Agency", function() {
  // let travelerData, traveler;

  // beforeEach(() => {
  //   travelerData = {
  //     "id":1,
  //     "name":"Ham Leadbeater",
  //     "travelerType":"relaxer"
  //   }
  //
  //   traveler = new Traveler(travelerData, trips, destinations);
  //
  // })

  it("should be a function", function() {
    expect(Agency).to.be.a('function');
  });

  it("should be an instance of a Agency", function() {
    let agency = new Agency()

    expect(agency).to.be.an.instanceof(Agency);
  });


})
