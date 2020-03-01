import {expect} from 'chai';

import Traveler from '../src/Traveler';
import trips from '../src/data/trips.js'
import destinations from '../src/data/destinations.js'

describe("Traveler", function() {
  let travelerData, traveler;

  beforeEach(() => {
    travelerData = {
      "id":1,
      "name":"Ham Leadbeater",
      "travelerType":"relaxer"
    }

    traveler = new Traveler(travelerData, trips, destinations);

  })

  it("should be a function", function() {
    expect(Traveler).to.be.a('function');
  });

  it("should be an instance of a Traveler", function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  });

  it("should return user's trip data based current year", function() {
    expect(traveler.filterTravelerTripsbyYear("2021")).to.deep.equal([
      {
        id: 117,
        travelers: 3,
        date: '2021/01/09',
        duration: 15,
        status: 'approved',
        suggestedActivities: [],
        destination: 'San Juan, Puerto Rico',
        totalTripCost: 3750,
        agencyFees: 375,
        overallCost: 4125,
        destinationImage: 'https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80',
        destinationAlt: 'white and brown concrete buildings near sea under white clouds during daytime'
      }]
    )
  })

  it("should return user's empty trip data based on current year", function() {
    expect(traveler.filterTravelerTripsbyYear("2020")).to.deep.equal([])
  })

  it("should return user's current year total cost", function() {
    expect(traveler.calculateTotalSpentForYear('2021')).to.equal(4125);
  });

  it("should return user's current year total cost", function() {
    expect(traveler.calculateTotalSpentForYear('2020')).to.equal(0);
  });

  it("should return user's trip data based on user ID and approved trips", function() {
    expect(traveler.filterTravelerTrips()).to.deep.equal([
      {
        id: 117,
        travelers: 3,
        date: '2021/01/09',
        duration: 15,
        status: 'approved',
        suggestedActivities: [],
        destination: 'San Juan, Puerto Rico',
        totalTripCost: 3750,
        agencyFees: 375,
        overallCost: 4125,
        destinationImage: 'https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80',
        destinationAlt: 'white and brown concrete buildings near sea under white clouds during daytime'
      }]
    )
  })

  it("should return user's all-time overall total spent", function() {
    expect(traveler.calculateTotalSpentOverall()).to.equal(4125);
  });

})
