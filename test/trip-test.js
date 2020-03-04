import {expect} from 'chai';

import Trip from '../src/Trip';
import trips from '../src/data/trips.js'
import destinations from '../src/data/destinations.js';

describe("Trip", function() {
  let travelerData, trip;

  beforeEach(() => {
    travelerData = [
      {
        "id": 1,
        "name": "Ham Leadbeater",
        "travelerType": "relaxer"
      },
      {"id": 47,
        "name": "Den Dossettor",
        "travelerType": "relaxer"
      }
    ]

    trip = new Trip(travelerData, trips, destinations);
  })

  it("should be a function", function() {
    expect(Trip).to.be.a('function');
  });

  it("should be an instance of a Trip", function() {
    expect(trip).to.be.an.instanceof(Trip);
  });

  it("should return result based on user search", function() {
    expect(trip.searchDestination("lima")).to.deep.equal([
      {
        id: 1,
        destination: 'Lima, Peru',
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
        alt: 'overview of city buildings with a clear sky'
      }
    ]);
  });

  it("should return no result based on user search", function() {
    expect(trip.searchDestination("toga")).to.deep.deep.equal([]);
  });

})
