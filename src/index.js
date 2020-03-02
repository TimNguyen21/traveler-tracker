var moment = require('moment');

import $ from 'jquery';
import './css/base.scss';
import travelers from './data/traveler.js';
import trips from '../src/data/trips.js';
import destinations from '../src/data/destinations.js';

import Login from './Login';
import Traveler from './Traveler';
import Agency from './Agency';

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
  }
})

function populateAgencyInfo(agencyId) {
  let agency = new Agency(agencyId, travelers, trips, destinations);
  let pendingRequest = agency.filterNewTripRequest();

  let pendingRequestSummary = pendingRequest.reduce((pendingSummary, request) => {
    return pendingSummary +=
    `<section class="pending-summary">
      <div>RequestID: ${request.id}</div>
      <div>Name: ${agency.travelData.find(traveler => traveler.id ===request.userID).name}</div>
      <div>Destination: ${agency.destinationData.find(destination => destination.id === request.destinationID).destination}</div>
      <div>Date: ${request.date}</div>
      <div>Duration: ${request.duration}</div>
      <div>Status: ${request.status}</div>
      <button>Approve Request</button>
      <button>Deny Request</button>
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
    <div>Current Travelers</div>
      <section>Travelers info</section>
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
    <section class="search-destination">
      <label>Search Destination</label>
      <input></input>
      <button>Search</button>
      <div class="search-results"></div>
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

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})
