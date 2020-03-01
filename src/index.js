// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import travelers from './data/traveler.js';
import trips from '../src/data/trips.js';
import destinations from '../src/data/destinations.js'


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import Login from './Login'
import Traveler from './Traveler'

$('.login-button').click(function() {
  let login = new Login($(".username-input").val(), $(".password-input").val())
  let loginResult = login.checkUserStatus(travelers);

  if (loginResult === 'agency') {
    $("main").html('Agwncy info');
  } else if (loginResult === "invalid login") {
    $(".login-error-message").html("please enter valid credentials");
  } else {
    $("main").html('')
    $("main").html(populateTravelerInfo(loginResult, travelers));
  }
})

function populateTravelerInfo(userID, travelersData) {
  let travelerInfo = travelersData.find(traveler => traveler.id === userID);
  let traveler = new Traveler(travelerInfo, trips);
  let filterTrips = traveler.filterTravelerTrips(destinations);

  return filterTrips.reduce((acc, trip) => {

    return acc +=
    `<div>Trip date: ${trip.date}</div>
    <div>Trip Duration: ${trip.duration}</div>
    <div>Trip Location: ${trip.destination}</div>
    <div>Trip Status: ${trip.status}</div>
    <div>Total Trip Cost: ${trip.totalTripCost}</div>
    <div>Agency Fee: ${trip.agencyFees}</div>
    <div>Overall Cost: ${trip.overallCost}</div>`
  },'')
}

console.log('This is the JavaScript entry file - your code begins here.');
