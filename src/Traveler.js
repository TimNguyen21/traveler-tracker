var moment = require('moment');

class Traveler {
  constructor(travelerData, tripsData, destinationData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.tripsData = tripsData;
    this.destinationData = destinationData;
  }

  approvedTrips() {
    return this.tripsData
      .filter(trip => trip.userID === this.id && trip.status === "approved");
  }

  filterPendingTrips() {
    let userTripsData =
      this.tripsData
        .filter(trip => trip.userID === this.id && trip.status === "pending");

    return userTripsData.map(trip => {
      let destinationInfo =
        this.destinationData
          .find(destinationData => trip.destinationID === destinationData.id);
      let totalCost =
        parseInt(this.calculateTotalTripCost(
          destinationInfo.estimatedFlightCostPerPerson,
          trip.travelers, trip.duration,
          destinationInfo.estimatedLodgingCostPerDay));

      return this.tripSummaryCard(trip, destinationInfo, totalCost);
    })
  }

  filterPastTrips() {
    let userTripsData = this.approvedTrips();
    let currentDay = moment();
    let filterPastTrips = userTripsData.filter(trip => {
      let endDate =
        moment(trip.date, 'YYYY/MM/DD')
          .add(trip.duration, 'days').format('YYYY/MM/DD');

      return moment(currentDay).isAfter(endDate);
    })

    return filterPastTrips.map(trip => {
      let destinationInfo =
        this.destinationData
          .find(destinationData => trip.destinationID === destinationData.id);
      let totalCost =
        parseInt(this.calculateTotalTripCost(
          destinationInfo.estimatedFlightCostPerPerson,
          trip.travelers, trip.duration,
          destinationInfo.estimatedLodgingCostPerDay));

      return this.tripSummaryCard(trip, destinationInfo, totalCost);
    })
  }

  filterUpcomingTrips() {
    let userTripsData = this.approvedTrips();
    let currentDay = moment();
    let filterUpcomingTrips = userTripsData.filter(trip => {
      let startDate = moment(trip.date, 'YYYY/MM/DD');

      return moment(currentDay).isBefore(startDate);
    })

    return filterUpcomingTrips.map(trip => {
      let destinationInfo =
        this.destinationData
          .find(destinationData => trip.destinationID === destinationData.id);
      let totalCost =
        parseInt(this.calculateTotalTripCost(
          destinationInfo.estimatedFlightCostPerPerson,
          trip.travelers, trip.duration,
          destinationInfo.estimatedLodgingCostPerDay));

      return this.tripSummaryCard(trip, destinationInfo, totalCost);
    })
  }

  filterPresentTrips() {
    let userTripsData = this.approvedTrips();
    let currentDay = moment();
    let filterPresentTrips = userTripsData.filter(trip => {
      let startDate = moment(trip.date, 'YYYY/MM/DD');
      let endDate =
        moment(trip.date, 'YYYY/MM/DD')
          .add(trip.duration, 'days').format('YYYY/MM/DD');

      return moment(currentDay).isBetween(startDate, endDate);
    })

    return filterPresentTrips.map(trip => {
      let destinationInfo =
        this.destinationData
          .find(destinationData => trip.destinationID === destinationData.id);
      let totalCost =
        parseInt(this.calculateTotalTripCost(
          destinationInfo.estimatedFlightCostPerPerson,
          trip.travelers, trip.duration,
          destinationInfo.estimatedLodgingCostPerDay));

      return this.tripSummaryCard(trip, destinationInfo, totalCost);
    })
  }

  filterTravelerTrips() {
    let userTripsData = this.approvedTrips();

    return userTripsData.map(trip => {
      let destinationInfo =
        this.destinationData
          .find(destinationData => trip.destinationID === destinationData.id);
      let totalCost =
        parseInt(this.calculateTotalTripCost(
          destinationInfo.estimatedFlightCostPerPerson,
          trip.travelers, trip.duration,
          destinationInfo.estimatedLodgingCostPerDay));

      return this.tripSummaryCard(trip, destinationInfo, totalCost);
    })
  }

  calculateTotalSpentOverall() {
    let travelerTrip = this.filterTravelerTrips();

    let totalSpentOverall =
      parseInt(travelerTrip.reduce((totalSpent, trip) => {
        return totalSpent += trip.overallCost
      }, 0))

    return Math.round(totalSpentOverall);
  }

  filterTravelerTripsbyYear(year) {
    let userTripsData = this.tripsData
      .filter(trip => trip.userID === this.id && trip.status === "approved"
        && trip.date.includes(year));

    return userTripsData.map(trip => {
      let destinationInfo =
        this.destinationData
          .find(destinationData => trip.destinationID === destinationData.id);
      let totalCost =
        parseInt(this.calculateTotalTripCost(
          destinationInfo.estimatedFlightCostPerPerson,
          trip.travelers, trip.duration,
          destinationInfo.estimatedLodgingCostPerDay));

      return this.tripSummaryCard(trip, destinationInfo, totalCost);
    })
  }

  calculateTotalSpentForYear(year) {
    let travelerTrip = this.filterTravelerTripsbyYear(year);

    let totalSpentOverall = parseInt(travelerTrip.reduce((totalSpent, trip) => {
      return totalSpent += trip.overallCost
    }, 0))

    return Math.round(totalSpentOverall);
  }

  calculateTotalTripCost(costPerPerson, totalTravelers,
    duration, lodgingCostPerDay) {
    return (costPerPerson * totalTravelers) + (duration * lodgingCostPerDay)
  }

  tripSummaryCard(tripInfo, destinationInfo, totalCost) {
    return {
      id: tripInfo.id,
      travelers: tripInfo.travelers,
      date: tripInfo.date,
      duration: tripInfo.duration,
      status: tripInfo.status,
      suggestedActivities: tripInfo.suggestedActivities,
      destination: destinationInfo.destination,
      totalTripCost: Math.round(totalCost),
      agencyFees: Math.round(totalCost * .10),
      overallCost: Math.round(totalCost * 1.1),
      destinationImage: destinationInfo.image,
      destinationAlt: destinationInfo.alt
    }
  }

}

export default Traveler;
