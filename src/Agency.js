var moment = require('moment');

class Agency {
  constructor(id, travelData, tripsData, destinationData) {
    this.id = id;
    this.travelData = travelData;
    this.tripsData = tripsData;
    this.destinationData = destinationData;
  }

  searchTravelerSummary(travelerName) {
    let userInfo = this.travelData
      .find(person => person.name.toLowerCase()
        .includes(travelerName.toLowerCase()));
    if (userInfo === undefined) {
      return undefined
    }
    let userTripsTaken = this.tripsData
      .filter(trip => trip.userID === userInfo.id);
    let currentDay = moment();

    let overallUserTripSummary = userTripsTaken.map(trip => {
      let currentDestination = this.destinationData
        .find(destination => trip.destinationID === destination.id);

      return {tripID: trip.id,
        travelerID: trip.userID,
        date: trip.date,
        travelerName: this.travelData
          .find(user => trip.userID === user.id).name,
        destinationID: currentDestination.id,
        destinationName: currentDestination.destination,
        travelers: trip.travelers,
        duration: trip.duration,
        status: trip.status,
        estimatedLodgingCostPerDay:
          currentDestination.estimatedLodgingCostPerDay,
        estimatedFlightCostPerPerson:
          currentDestination.estimatedFlightCostPerPerson,
        totalCostPlusAgentFees:
          Math.round(
            ((currentDestination.estimatedLodgingCostPerDay * trip.duration)
              + (currentDestination.estimatedFlightCostPerPerson
                * trip.travelers)
            ) * 1.1),
        destinationImage: currentDestination.image,
        imageAlt: currentDestination.alt
      }
    })

    return overallUserTripSummary.filter(trip => {
      let startDate = moment(trip.date, 'YYYY/MM/DD');
      return moment(currentDay).isBefore(startDate);
    })
  }

  filterNewTripRequest() {
    return this.tripsData.filter(trip => trip.status === "pending")
  }

  calculateAgencyEarningsforYear(year) {
    let approvedTrips = this.tripsData
      .filter(trip => trip.status === "approved" && trip.date.includes(year));

    let costOfTrips = approvedTrips.map(trip => {
      let destinationInfo = this.destinationData
        .find(destinationData => trip.destinationID === destinationData.id);
      let totalCost =
        parseInt(this.calculateTotalTripCost(
          destinationInfo.estimatedFlightCostPerPerson,
          trip.travelers, trip.duration,
          destinationInfo.estimatedLodgingCostPerDay));

      return this.tripSummaryCard(trip, destinationInfo, totalCost)
    })
    return costOfTrips.reduce((totalEarning, trip) => {
      return totalEarning += trip.agencyFees;
    }, 0)
  }

  calculateTotalTripCost(costPerPerson, totalTravelers,
    duration, lodgingCostPerDay) {
    return (costPerPerson * totalTravelers) + (duration * lodgingCostPerDay)
  }

  currentUsersOnTrip() {
    let userTripsData = this.tripsData
      .filter(trip => trip.status === "approved");
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
      this.destinationData.find(destinationData =>
        trip.destinationID === destinationData.id);
      let totalCost =
      parseInt(this.calculateTotalTripCost(
        destinationInfo.estimatedFlightCostPerPerson,
        trip.travelers, trip.duration,
        destinationInfo.estimatedLodgingCostPerDay));

      return this.tripSummaryCard(trip, destinationInfo, totalCost);
    })
  }

  tripSummaryCard(tripInfo, destinationInfo, totalCost) {
    return {
      requestID: tripInfo.id,
      userID: tripInfo.userID,
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

export default Agency;
