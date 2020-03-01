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

  it("should return user's trip data based on user ID", function() {
    expect(traveler.filterTravelerTrips()).to.deep.equal([
      {
        id: 117,
        travelers: 3,
        date: '2021/01/09',
        duration: 15,
        status: 'approved',
        suggestedActivities: [],
        destination: 'San Juan, Puerto Rico',
        totalTripCost: '3750.00',
        agencyFees: '375.00',
        overallCost: '4125.00',
        destinationImage: 'https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80',
        destinationAlt: 'white and brown concrete buildings near sea under white clouds during daytime'
      }]
    )
  })

  it("should return user's overall total cost", function() {
    expect(traveler.calculateTotalSpentOverall()).to.equal('4125.00');
  });



})
