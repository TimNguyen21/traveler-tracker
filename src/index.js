import $ from 'jquery';
import './css/base.scss';
var moment = require('moment');

import Login from './Login';
import Traveler from './Traveler';
import Agency from './Agency';
import Trip from './Trip';

// FETCH DATA //
let travelers = fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers")
  .then(response => response.json())
  .then(data => data.travelers)
  .catch(error => console.log(error.message));

let trips = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
  .then(response => response.json())
  .then(data => data.trips)
  .catch(error => console.log(error.message));

let destinations = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
  .then(response => response.json())
  .then(data => data.destinations)
  .catch(error => console.log(error.message));

Promise.all([travelers, trips, destinations])
  .then(data => {
    travelers = data[0];
    trips = data[1];
    destinations = data[2];
  })
  .catch(error => console.log(error.message))

$('.login-button').click(function() {
  let login = new Login($(".username-input").val(), $(".password-input").val())
  let loginResult = login.checkUserStatus(travelers);

  if (loginResult === 'agency') {
    $("main").html('');
    $("main").removeClass('login-main').addClass('agent-main');
    $("main").html(populateAgencyInfo(loginResult))
  } else if (loginResult === "invalid login") {
    $(".login-error-message").html("*please enter valid credentials");
  } else {
    $("main").html('')
    $("main").removeClass('login-main').addClass('traveler-main');
    $("main").html(populateTravelerInfo(loginResult, travelers));
    $(".search-destination-button").click(function() {
      let trip = new Trip(travelers, trips, destinations)
      $(".search-results").html("");
      let $searchWord = $(".search-destination-input").val();
      $(".search-results").html(displayAllDestination(trip.searchDestination($searchWord)));
    })
    $(".reset-destination-button").click(function() {
      $(".search-results").html("");
      let $defaultSearch = displayAllDestination(destinations);
      $(".search-results").html($defaultSearch);
    })
  }
})

function populateAgencyInfo(agencyId) {
  let agency = new Agency(agencyId, travelers, trips, destinations);
  let pendingRequest = agency.filterNewTripRequest();
  let usersCurrentlyOnTrip = agency.currentUsersOnTrip();

  let pendingRequestSummary = pendingRequest.reduce((summary, request) => {
    return summary +=
    `<section class="pending-summary">
      <div>RequestID: ${request.id}</div>
      <div>Date: ${request.date}</div>
      <div>Name: ${agency.travelData.find(traveler => traveler.id === request.userID).name}</div>
      <div>Destination: ${agency.destinationData.find(destination => destination.id === request.destinationID).destination}</div>
      <div>Duration: ${request.duration} days</div>
      <div>Status: ${request.status}</div>
      <button>Approve Request</button>
      <button>Deny Request</button>
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
    <div>Pending Requests</div>
      <section class="pending-request">${pendingRequestSummary}</section>
    </section>
    <section>
    <div>Today's Traveling Travelers</div>
      <section>${usersCurrentlySummary}</section>
    </section>
    <section class="search-user">
      <label>Search User</label>
      <input></input>
      <button>Search</button>
      <div class="search-results">?</div>
    </section>
    `
}

function populateTravelerInfo(userID, travelersData) {
  let travelerInfo = travelersData.find(traveler => traveler.id === userID);
  let traveler = new Traveler(travelerInfo, trips, destinations);
  $(".welcome-user").html(`Welcome, ${traveler.name}`);
  let presentTripsSummary = populateUserTrips(traveler.filterPresentTrips());
  let pastTripsSummary = populateUserTrips(traveler.filterPastTrips());
  let upcomingTrips = populateUserTrips(traveler.filterUpcomingTrips());
  let pendingTrips = populateUserTrips(traveler.filterPendingTrips());

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
      <div>${pastTripsSummary}</div>
    </section>
    <section class="user-trip-summary">
      <h2>Present Trips</h2>
      <div>${presentTripsSummary}</div>
    </section>
    <section class="user-trip-summary">
      <h2>Upcoming Trips</h2>
      <div>${upcomingTrips}</div>
    </section>
    <section class="user-trip-summary">
      <h2>Pending Trips</h2>
      <div>${pendingTrips}</div>
    </section>
    <section class="search-destination-section">
      <label for="search-destination-input">Search Destination</label>
      <input id="search-destination-input" class="search-destination-input"></input>
      <button id="search-destination-button" class="search-destination-button">Search</button>
      <button id="reset-destination-button" class="reset-destination-button">Reset Search</button>
      <div class="search-results">${displayAllDestination(destinations)}</div>
    </section>`
}

function populateUserTrips(tripsData) {
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
}

function displayAllDestination(destinationsData) {
  return destinationsData.reduce((destinationSummary, destination) => {
    return destinationSummary +=
    `<section class="trip-card">
      <img class="destination-image" src="${destination.image}" alt="${destination.alt}">
      <div><span>Location:</span> ${destination.destination}</div>
      <div><span>Estimated Lodging Per Day:</span> ${destination.estimatedLodgingCostPerDay}</div>
      <div><span>Estimated Cost Per Person:</span> ${destination.estimatedFlightCostPerPerson}</div>
    </section>`
  },'')
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})
