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

  it("should return user travel summary based on name search", function() {
    expect(agency.searchTravelerSummary("ham leadbeater")).to.be.deep.equal([
      {
        tripID: 117,
        travelerID: 1,
        date: '2021/01/09',
        travelerName: 'Ham Leadbeater',
        destinationID: 28,
        destinationName: 'San Juan, Puerto Rico',
        travelers: 3,
        duration: 15,
        status: 'approved',
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 900,
        totalCostPlusAgentFees: 4125,
        destinationImage: 'https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80',
        imageAlt: 'white and brown concrete buildings near sea under white clouds during daytime'
      }
    ]);
  });

  it("should return results of Pending Trip request", function() {
    expect(agency.filterNewTripRequest().length).to.be.equal(12);
  });

  it("should return results of Pending Trip request", function() {
    expect(agency.filterNewTripRequest()[0]).to.be.deep.equal({
      id: 2,
      userID: 35,
      destinationID: 25,
      travelers: 5,
      date: '2020/10/04',
      duration: 18,
      status: 'pending',
      suggestedActivities: []
    });
  });

})
