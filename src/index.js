import $ from 'jquery';
import './css/base.scss';
import domUpdates from './domUpdates';

import Login from './Login';
import Agency from './Agency';
import Trip from './Trip';

// FETCH DATA //
let travelers =
  fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/travelers/travelers")
    .then(response => response.json())
    .then(data => data.travelers)
    .catch(error => console.log(error.message));

let trips =
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips')
    .then(response => response.json())
    .then(data => data.trips)
    .catch(error => console.log(error.message));

let destinations =
  fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/destinations/destinations')
    .then(response => response.json())
    .then(data => data.destinations)
    .catch(error => console.log(error.message));

Promise.all([travelers, trips, destinations])
  .then(data => {
    travelers = data[0];
    trips = data[1];
    destinations = data[2];
    domUpdates.getFetchData(travelers, trips, destinations);
  })
  .catch(error => console.log(error.message))

$('.login-button').click(function() {
  let login = new Login($(".username-input").val(), $(".password-input").val());
  let loginResult = login.checkUserStatus(travelers);

  if (loginResult === 'agency') {
    //Agency Page Display//
    let agency = new Agency(loginResult, travelers, trips, destinations);
    $("main").html('');
    $("main").removeClass('login-main').addClass('agent-main');
    $('body').css('background', 'url("https://www.publicdomainpictures.net/pictures/190000/velka/travel-background-1469437944Rbi.jpg")');
    $("main").html(domUpdates.populateAgencyInfo(loginResult, agency));

    //Buttons Listeners//
    $(".agency-search-button").click(function() {
      let $searchName = $(".agency-search-input").val()
      if (agency.searchTravelerSummary($searchName) === undefined) {
        $(".agency-search-results").html("");
        $(".search-error").html("Not a Traveler in Database");
      } else {
        $(".search-error").html("");
        $(".agency-search-results").html("");
        let userSearchResult = agency.searchTravelerSummary($searchName)
        let upcomingTripsSummary =
          domUpdates.travelerSearchResults(userSearchResult);
        $(".agency-search-results").html(upcomingTripsSummary);

        $(".search-deny-button").click(function() {
          let trip = new Trip(travelers, trips, destinations);
          trip.removeTripRequest(event.target.dataset.id)
          $(event.target).closest('.search-summary')
            .html(`RequestID:${event.target.dataset.id} is Cancelled`)
        });
      }
    })

    $(".agency-clear-button").click(function() {
      $(".agency-search-results").html("");
    })

    $(".approve-button").click(function() {
      let trip = new Trip(travelers, trips, destinations);
      trip.approveTripRequest(event.target.dataset.id)
      $(event.target).closest('.pending-summary')
        .html(`RequestID:${event.target.dataset.id} is Approved`)
    });

    $(".deny-button").click(function() {
      let trip = new Trip(travelers, trips, destinations);
      trip.removeTripRequest(event.target.dataset.id)
      $(event.target).closest('.pending-summary')
        .html(`RequestID:${event.target.dataset.id} is Denied`)
    });

  } else if (loginResult === "invalid login") {
    //Login Error Message//
    $(".login-error-message").html("*please enter valid credentials");
  } else {
    //Traveler Page Display//
    $("main").html('')
    $("main").removeClass('login-main').addClass('traveler-main');
    $(".welcome-user").css("padding-bottom", "0.5em")
    $('body').css('background-image', 'url("https://www.travelloverepeat.com/wp-content/uploads/2018/10/Background-Image_Vietnam-10.jpg")');
    $("main").html(domUpdates.populateTravelerInfo(loginResult, travelers));

    //Buttons Listeners//
    $(".search-destination-button").click(function() {
      let trip = new Trip(travelers, trips, destinations)
      $(".search-results").html("");
      let $searchWord = $(".search-destination-input").val();
      $(".search-results")
        .html(domUpdates.displayAllDestination(
          trip.searchDestination($searchWord)));
      domUpdates.openForm();
    })

    $(".reset-destination-button").click(function() {
      $(".search-results").html("");
      let $defaultSearch = domUpdates.displayAllDestination(destinations);
      $(".search-results").html($defaultSearch);
      domUpdates.openForm();
    })
    domUpdates.openForm();
  }
})
