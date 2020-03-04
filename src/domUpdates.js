import $ from 'jquery';
var moment = require('moment');

import Login from './Login';
import Traveler from './Traveler';
import Agency from './Agency';
import Trip from './Trip';

let travelers, trips, destinations, traveler;

let domUpdates = {
  //Transfer Fetch Data//
  getFetchData(travelersData, tripsData, destinationData) {
    travelers = travelersData;
    trips = tripsData;
    destinations = destinationData;
  },

  //Traveler Page Display//
  populateTravelerInfo(userID, travelersData) {
    let travelerInfo = travelersData.find(traveler => traveler.id === userID);
    traveler = new Traveler(travelerInfo, trips, destinations);
    $(".welcome-user").html(`Welcome, ${traveler.name}`);
    let presentTripsSummary = this.populateUserTrips(traveler.filterPresentTrips());
    let pastTripsSummary = this.populateUserTrips(traveler.filterPastTrips());
    let upcomingTrips = this.populateUserTrips(traveler.filterUpcomingTrips());
    let pendingTrips = this.populateUserTrips(traveler.filterPendingTrips());

    return `
      <section class="user-summary">
        <h2>Traveler Summary</h2>
        <div>${moment().format("YYYY")} Spending</div>
          <div>${formatter.format(traveler.calculateTotalSpentForYear(moment().format("YYYY")))}</div>
        <div>All-Time Spending</div>
          <div>${formatter.format(traveler.calculateTotalSpentOverall())}</div>
      </section>
      <section class="user-trip-summary">
        <h2>Past Trips</h2>
        <div class="trip-section">${pastTripsSummary}</div>
      </section>
      <section class="user-trip-summary">
        <h2>Present Trips</h2>
        <div class="trip-section">${presentTripsSummary}</div>
      </section>
      <section class="user-trip-summary">
        <h2>Upcoming Trips</h2>
        <div class="trip-section">${upcomingTrips}</div>
      </section>
      <section class="user-trip-summary">
        <h2>Pending Trips</h2>
        <div class="trip-section">${pendingTrips}</div>
      </section>
      <section class="search-destination-section">
        <label for="search-destination-input">Search Destination</label>
        <input id="search-destination-input" class="search-destination-input"></input>
        <button id="search-destination-button" class="search-destination-button">Search</button>
        <button id="reset-destination-button" class="reset-destination-button">Reset Search</button>
        <div class="search-results">${this.displayAllDestination(destinations)}</div>
      </section>`
  },

  populateUserTrips(tripsData) {
    return tripsData.reduce((tripsSummary, trip) => {
      return tripsSummary +=
      `<section class="trip-card">
        <img class="destination-image" src="${trip.destinationImage}" alt="${trip.destinationAlt}">
        <div><span>Trip Location:</span> ${trip.destination}</div>
        <div><span>Trip date:</span> ${trip.date}</div>
        <div><span>Trip Duration:</span> ${trip.duration}</div>
        <div><span>Trip Status:</span> ${trip.status}</div>
        <div><span>Overall Trip Cost:</span> ${formatter.format(trip.overallCost)}</div>
      </section>`
    },'')
  },

  displayAllDestination(destinationsData) {
    return destinationsData.reduce((destinationSummary, destination) => {
      return destinationSummary +=
      `<section class="search-trip-card">
        <div>Click Image to Book Trip</div>
        <img data-id="${destination.id}" class="search-destination-image" src="${destination.image}" alt="${destination.alt}">
        <div><span>Location:</span> ${destination.destination}</div>
        <div><span>Estimated Lodging Per Day ($):</span> <div class="lodging-per-day${destination.id}">${destination.estimatedLodgingCostPerDay}</div></div>
        <div><span>Estimated Cost Per Person ($):</span> <div class="cost-per-person${destination.id}">${destination.estimatedFlightCostPerPerson}</div></div>
        <div class="trip-request${destination.id}"></div>
      </section>`
    },'')
  },

  openForm() {
    return $(".search-destination-image").click(function() {
      let trip = new Trip(travelers, trips, destinations);
      let currentDestinationID = event.target.dataset.id;
      let currentTraveler = traveler.id;

      $(`.trip-request${currentDestinationID}`).html(`
      <div class="trip-request-form">
      <label class="trip-request-label">Trip Request</label>
      <label for="enter-request-date">Enter Date:</label>
      <input id="enter-request-date" class="enter-request-date date${currentDestinationID}" type='text' placeholder="YYYY/MM/DD"></input>
      <label for="enter-request-travelers">Enter Travelers:</label>
      <input id="enter-request-travelers" class="enter-request-travelers travelers${currentDestinationID}" type="number"></input>
      <label for="enter-request-duration">Enter Duration:</label>
      <input id="enter-request-duration" class="enter-request-duration duration${currentDestinationID}" type="number"></input>
      <button data-id="${currentDestinationID}"id="calculate-request-cost" class="calculate-request-cost">Calculate Total Cost</button>
      <label for="estimate-total-cost">Total Cost + Fees:</label>
      <div id="estimate-total-cost">$0</div>
      <button data-id="${currentDestinationID}"id="submit-trip-request" class="submit-trip-request">Submit Request</button>
      </div>
      `);

      $('.calculate-request-cost').click(function() {
        let $lodgingPerDay = $(`.lodging-per-day${currentDestinationID}`).html()
        let $costPerPerson = $(`.cost-per-person${currentDestinationID}`).html()
        let $travalers = $(`.travelers${currentDestinationID}`).val();
        let $duration = $(`.duration${currentDestinationID}`).val();
        $("#estimate-total-cost").html(`${formatter.format(trip.calculateTripTotal($lodgingPerDay, $costPerPerson, $travalers, $duration))}`)
      })

      $(".submit-trip-request").click(function() {
        let $date = $(`.date${currentDestinationID}`).val();
        let $travalers = $(`.travelers${currentDestinationID}`).val();
        let $duration = $(`.duration${currentDestinationID}`).val();
        trip.submitTripRequest(currentTraveler, currentDestinationID, $travalers, $date, $duration);
        $(event.target).closest('.trip-request-form').html(`Your Request is Processed`)
      })
    })
  },

  travelerSearchResults(userSearchResult) {
    return userSearchResult.reduce((summary, request) => {
      return summary +=
      `<section class="search-summary">
        <div>RequestID: ${request.tripID}</div>
        <div>Date: ${request.date}</div>
        <div>Name: ${request.travelerName}</div>
        <div>Destination: ${request.destinationName}</div>
        <div>Duration: ${request.duration} days</div>
        <div>Status: ${request.status}</div>
        <div>Total Cost + Agency Fees: ${formatter.format(request.totalCostPlusAgentFees)}</div>
        <button data-id="${request.tripID}" class="search-deny-button">Cancel Request</button>
      </section>`
    }, '')
  },

  //Agency Page Display//
  populateAgencyInfo(agencyId, agency) {
    let pendingRequest = agency.filterNewTripRequest();
    let usersCurrentlyOnTrip = agency.currentUsersOnTrip();

    let pendingRequestSummary = pendingRequest.reduce((summary, request) => {
      return summary +=
      `<section class="pending-summary">
        <div>RequestID: ${request.id}</div>
        <div>Date: ${request.date}</div>
        <div>Name: ${agency.travelData.find(traveler => traveler.id == request.userID).name}</div>
        <div>Destination: ${agency.destinationData.find(destination => destination.id == request.destinationID).destination}</div>
        <div>Duration: ${request.duration} days</div>
        <div>Status: ${request.status}</div>
        <button data-id="${request.id}" class="approve-button">Approve Request</button>
        <button data-id="${request.id}" class="deny-button">Deny Request</button>
      </section>`
    }, '')

    let usersCurrentlySummary = usersCurrentlyOnTrip.reduce((summary, request) => {
      return summary +=
      `<section class="pending-summary">
        <div>RequestID: ${request.requestID}</div>
        <div>Date: ${request.date}</div>
        <div>Name: ${agency.travelData.find(traveler => traveler.id === request.userID).name}</div>
        <div>Destination: ${request.destination}</div>
        <div>Duration: ${request.duration} days</div>
      </section>`
    }, '')

    return `
      <section class="agent-summary">
        <h2>Agent Summary</h2>
        <div>Estimated ${moment().format("YYYY")} Earnings:</div>
        <div>${formatter.format(agency.calculateAgencyEarningsforYear(moment().format("YYYY")))}</div>
      </section>
      <section>
      <label for="pending-request">Pending Requests:</label>
        <section id="pending-request" class="pending-request">${pendingRequestSummary}</section>
      </section>
      <section>
      <div>Today's Traveling Travelers</div>
        <section>${usersCurrentlySummary}</section>
      </section>
      <section class="search-user">
        <label for="agency-search-input">Search Traveler Name</label>
        <input id="agency-search-input" class="agency-search-input"></input>
        <button id="agency-search-button" class="agency-search-button">Search Traveler</button>
        <button id="agency-clear-button" class="agency-clear-button">Clear Search</button>
        <div class="agency-search-results"></div>
      </section>
      `
  },

}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

export default domUpdates;
