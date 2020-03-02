var moment = require('moment');

class Traveler {
  constructor(travelerData, tripsData, destinationData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.tripsData = tripsData;
    this.destinationData = destinationData;
  }

  filterTravelerTrips() {
    let userTripsData = this.tripsData.filter(trip => trip.userID === this.id && trip.status === "approved");

    return userTripsData.map(trip => {
      let destinationInfo = this.destinationData.find(destinationData => trip.destinationID === destinationData.id);
      let totalCost = parseInt(this.calculateTotalTripCost(destinationInfo.estimatedFlightCostPerPerson, trip.travelers, trip.duration, destinationInfo.estimatedLodgingCostPerDay));

      return {
        id: trip.id,
        travelers: trip.travelers,
        date: trip.date,
        duration: trip.duration,
        status: trip.status,
        suggestedActivities: trip.suggestedActivities,
        destination: destinationInfo.destination,
        totalTripCost: Math.round(totalCost),
        agencyFees: Math.round(totalCost*.10),
        overallCost: Math.round(totalCost*1.1),
        destinationImage: destinationInfo.image,
        destinationAlt: destinationInfo.alt
      }
    })
  }

  calculateTotalSpentOverall() {
    let travelerTrip = this.filterTravelerTrips();

    let totalSpentOverall = parseInt(travelerTrip.reduce((totalSpent, trip) => {
      return totalSpent += trip.overallCost
    }, 0))

    return Math.round(totalSpentOverall);
  }

  filterTravelerTripsbyYear(year) {
    let userTripsData = this.tripsData.filter(trip => trip.userID === this.id && trip.status === "approved" && trip.date.includes(year));

    return userTripsData.map(trip => {
      let destinationInfo = this.destinationData.find(destinationData => trip.destinationID === destinationData.id);
      let totalCost = parseInt(this.calculateTotalTripCost(destinationInfo.estimatedFlightCostPerPerson, trip.travelers, trip.duration, destinationInfo.estimatedLodgingCostPerDay));

      return {
        id: trip.id,
        travelers: trip.travelers,
        date: trip.date,
        duration: trip.duration,
        status: trip.status,
        suggestedActivities: trip.suggestedActivities,
        destination: destinationInfo.destination,
        totalTripCost: Math.round(totalCost),
        agencyFees: Math.round(totalCost*.10),
        overallCost: Math.round(totalCost*1.1),
        destinationImage: destinationInfo.image,
        destinationAlt: destinationInfo.alt
      }
    })
  }

  calculateTotalSpentForYear(year) {
    let travelerTrip = this.filterTravelerTripsbyYear(year);

    let totalSpentOverall = parseInt(travelerTrip.reduce((totalSpent, trip) => {
      return totalSpent += trip.overallCost
    }, 0))

    return Math.round(totalSpentOverall);
  }

  calculateTotalTripCost(costPerPerson, totalTravelers, duration, lodgingCostPerDay) {
    return (costPerPerson * totalTravelers) + (duration * lodgingCostPerDay)
  }

  filterPendingTrips() {
    let userTripsData = this.tripsData.filter(trip => trip.userID === this.id && trip.status === "pending");

    return userTripsData.map(trip => {
      let destinationInfo = this.destinationData.find(destinationData => trip.destinationID === destinationData.id);
      let totalCost = parseInt(this.calculateTotalTripCost(destinationInfo.estimatedFlightCostPerPerson, trip.travelers, trip.duration, destinationInfo.estimatedLodgingCostPerDay));

      return {
        id: trip.id,
        travelers: trip.travelers,
        date: trip.date,
        duration: trip.duration,
        status: trip.status,
        suggestedActivities: trip.suggestedActivities,
        destination: destinationInfo.destination,
        totalTripCost: Math.round(totalCost),
        agencyFees: Math.round(totalCost*.10),
        overallCost: Math.round(totalCost*1.1),
        destinationImage: destinationInfo.image,
        destinationAlt: destinationInfo.alt
      }
    })
  }

  filterPastTrips() {
    let userTripsData = this.tripsData.filter(trip => trip.userID === this.id && trip.status === "approved");

    let currentDay = moment();
    let filterPastTrips = userTripsData.filter(trip => {
      let endDate = moment(trip.date, 'YYYY/MM/DD').add(trip.duration, 'days').format('YYYY/MM/DD');
    return moment(currentDay).isAfter(endDate);
  })

    return filterPastTrips.map(trip => {
      let destinationInfo = this.destinationData.find(destinationData => trip.destinationID === destinationData.id);
      let totalCost = parseInt(this.calculateTotalTripCost(destinationInfo.estimatedFlightCostPerPerson, trip.travelers, trip.duration, destinationInfo.estimatedLodgingCostPerDay));

      return {
        id: trip.id,
        travelers: trip.travelers,
        date: trip.date,
        duration: trip.duration,
        status: trip.status,
        suggestedActivities: trip.suggestedActivities,
        destination: destinationInfo.destination,
        totalTripCost: Math.round(totalCost),
        agencyFees: Math.round(totalCost*.10),
        overallCost: Math.round(totalCost*1.1),
        destinationImage: destinationInfo.image,
        destinationAlt: destinationInfo.alt
      }
    })

  }

  filterUpcomingTrips() {
    let userTripsData = this.tripsData.filter(trip => trip.userID === this.id && trip.status === "approved");

    let currentDay = moment();
    let filterUpcomingTrips = userTripsData.filter(trip => {
      let startDate = moment(trip.date, 'YYYY/MM/DD');
    return moment(currentDay).isBefore(startDate);
  })

    return filterUpcomingTrips.map(trip => {
      let destinationInfo = this.destinationData.find(destinationData => trip.destinationID === destinationData.id);
      let totalCost = parseInt(this.calculateTotalTripCost(destinationInfo.estimatedFlightCostPerPerson, trip.travelers, trip.duration, destinationInfo.estimatedLodgingCostPerDay));

      return {
        id: trip.id,
        travelers: trip.travelers,
        date: trip.date,
        duration: trip.duration,
        status: trip.status,
        suggestedActivities: trip.suggestedActivities,
        destination: destinationInfo.destination,
        totalTripCost: Math.round(totalCost),
        agencyFees: Math.round(totalCost*.10),
        overallCost: Math.round(totalCost*1.1),
        destinationImage: destinationInfo.image,
        destinationAlt: destinationInfo.alt
      }
    })

  }

  filterPresentTrips() {
    let userTripsData = this.tripsData.filter(trip => trip.userID === this.id && trip.status === "approved");

    let currentDay = moment();
    let filterPresentTrips = userTripsData.filter(trip => {
      let startDate = moment(trip.date, 'YYYY/MM/DD');
      let endDate = moment(trip.date, 'YYYY/MM/DD').add(trip.duration, 'days').format('YYYY/MM/DD');
    return moment(currentDay).isBetween(startDate, endDate);
  })

    return filterPresentTrips.map(trip => {
      let destinationInfo = this.destinationData.find(destinationData => trip.destinationID === destinationData.id);
      let totalCost = parseInt(this.calculateTotalTripCost(destinationInfo.estimatedFlightCostPerPerson, trip.travelers, trip.duration, destinationInfo.estimatedLodgingCostPerDay));

      return {
        id: trip.id,
        travelers: trip.travelers,
        date: trip.date,
        duration: trip.duration,
        status: trip.status,
        suggestedActivities: trip.suggestedActivities,
        destination: destinationInfo.destination,
        totalTripCost: Math.round(totalCost),
        agencyFees: Math.round(totalCost*.10),
        overallCost: Math.round(totalCost*1.1),
        destinationImage: destinationInfo.image,
        destinationAlt: destinationInfo.alt
      }
    })

  }


}

export default Traveler;
