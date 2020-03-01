// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import travelers from './data/traveler.js';
import trips from '../src/data/trips.js';
import destinations from '../src/data/destinations.js';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import Login from './Login';
import Traveler from './Traveler';
import Agency from './Agency';

$('.login-button').click(function() {
  let login = new Login($(".username-input").val(), $(".password-input").val())
  let loginResult = login.checkUserStatus(travelers);

  if (loginResult === 'agency') {
    $("main").html('');
    $("main").html(populateAgencyInfo(loginResult))
  } else if (loginResult === "invalid login") {
    $(".login-error-message").html("please enter valid credentials");
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
    `<div>RequestID: ${request.id}</div>
    <div>Name: ${agency.travelData.find(traveler => traveler.id ===request.userID).name}</div>
    <div>Destination: ${agency.destinationData.find(destination => destination.id === request.destinationID).destination}</div>
    <div>Date: ${request.date}</div>
    <div>Duration: ${request.duration}</div>
    <div>Status: ${request.status}</div>
    <button>Approve Request</button>
    <button>Deny Request</button>`
  }, '')

  return `<section>
  <div>Agent Summary</div>
    <div>Estimated Current Year Earnings: ${agency.calculateAgencyEarningsforYear("2020")}</div>
    <br>
    <div>Pending Requests</div>
      <section>${pendingRequestSummary}</section>
      </section>`

}

function populateTravelerInfo(userID, travelersData) {
  let travelerInfo = travelersData.find(traveler => traveler.id === userID);
  let traveler = new Traveler(travelerInfo, trips, destinations);
  let filterTrips = traveler.filterTravelerTripsbyYear("2020");
  $(".welcome-user").html(`Welcome, ${traveler.name}`);

  let tripSummary = filterTrips.reduce((tripsSummary, trip) => {
    return tripsSummary +=
    `<section class="trip-card">
    <img class="destination-image" src="${trip.destinationImage}" alt="${trip.destinationAlt}">
    <div>Trip Location: ${trip.destination}</div>
    <div>Trip date: ${trip.date}</div>
    <div>Trip Duration: ${trip.duration}</div>
    <div>Trip Status: ${trip.status}</div>
    <div>Overall Trip Cost: ${trip.overallCost}</div>
    </section>
    `
  },'')

  return `
    <section class="user-summary">
      <h2>Traveler Summary</h2>
      <div>Current Year Total Spent: ${traveler.calculateTotalSpentForYear("2020")}</div>
      <div>All-Time Total Spent: ${traveler.calculateTotalSpentOverall()}</div>
    </section>
    <section class="user-trip-summary">
      <h2>Past Trips</h2>
      <div>${tripSummary}</div>
    </section>
    <section class="user-trip-summary">
      <h2>Present Trips</h2>
      <div></div>
    </section>
    <section class="user-trip-summary">
      <h2>Upcoming Trips</h2>
      <div>${tripSummary}</div>
    </section>
    <section class="user-trip-summary">
      <h2>Pending Trips</h2>
      <div>${tripSummary}</div>
    </section>`
}

console.log('This is the JavaScript entry file - your code begins here.');
