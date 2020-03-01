import {expect} from 'chai';

import Traveler from '../src/Traveler';
import trips from '../src/data/trips.js'

describe("Traveler", function() {
  let travelerData;

  beforeEach(() => {
    travelerData = {
      "id":1,
      "name":"Ham Leadbeater",
      "travelerType":"relaxer"
    }

  })

  it("should be a function", function() {
    expect(Traveler).to.be.a('function');
  });

  it("should be an instance of a Traveler", function() {
    let traveler = new Traveler(travelerData, trips);

    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it("should return user's trip data based on user ID", function() {
    let traveler = new Traveler(travelerData, trips);

    expect(traveler.filterTravelerTrips()).to.deep.equal([
        {
          id: 117,
          userID: 1,
          destinationID: 28,
          travelers: 3,
          date: '2021/01/09',
          duration: 15,
          status: 'approved',
          suggestedActivities: []
        }
      ]
    )
  })



})
