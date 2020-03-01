// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import travelers from './data/traveler.js';
import trips from '../src/data/trips.js';

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
  let filterTrips = traveler.filterTravelerTrips();

  return filterTrips.reduce((acc, trip) => {

    return acc +=
    `<div>${trip.date}</div>
    <div>${trip.duration}</div>
    <div>${trip.status}</div>
    <div>${trip.travelers}</div>`
  },'')
}

console.log('This is the JavaScript entry file - your code begins here.');
