import {expect} from 'chai';

import Traveler from '../src/Traveler';
import trips from '../src/data/trips.js'
import destinations from '../src/data/destinations.js'

describe("Traveler", function() {
  let travelerData1, travelerData2, traveler, traveler2;

  beforeEach(() => {
    travelerData1 = {
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer"
    },

    travelerData2 = {
      "id": 47,
      "name": "Den Dossettor",
      "travelerType": "relaxer"
    },

    traveler = new Traveler(travelerData1, trips, destinations);
    traveler2 = new Traveler(travelerData2, trips, destinations);

  });

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
  });

  it("should return user's empty trip data based on current year", function() {
    expect(traveler.filterTravelerTripsbyYear("2020")).to.deep.equal([])
  });

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
  });

  it("should return user's pending trips", function() {
    expect(traveler2.filterPendingTrips()).to.deep.equal([
      {
        id: 83,
        travelers: 1,
        date: '2020/05/06',
        duration: 11,
        status: 'pending',
        suggestedActivities: [],
        destination: 'London, England',
        totalTripCost: 2100,
        agencyFees: 210,
        overallCost: 2310,
        destinationImage: 'https://images.unsplash.com/photo-1549471156-52ee71691122?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        destinationAlt: 'city with bridge under night sky'
      }]
    )
  });

  it("should return user's approved trips", function() {
    expect(traveler.approvedTrips()).to.deep.equal([
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
    ]);
  });

  it("should return user's all-time total spent", function() {
    expect(traveler2.calculateTotalSpentOverall()).to.deep.equal(8877);
  });

  it("should return total trip cost for a user's trip", function() {
    let costPerPerson = 200;
    let totalTravelers = 2;
    let tripDuration = 9;
    let lodgingCostPerDay = 80;

    expect(traveler.calculateTotalTripCost(costPerPerson, totalTravelers,
      tripDuration, lodgingCostPerDay)).to.be.equal(1120);
  });

})
