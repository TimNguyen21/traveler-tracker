var moment = require('moment');

class Agency {
  constructor(id, travelData, tripsData, destinationData) {
    this.id = id;
    this.travelData = travelData;
    this.tripsData = tripsData;
    this.destinationData = destinationData;
  }

  filterNewTripRequest() {
    return this.tripsData.filter(trip => trip.status === "pending")
  }

  calculateAgencyEarningsforYear(year) {
    let approvedTrips = this.tripsData.filter(trip => trip.status === "approved" && trip.date.includes(year));

    let costOfTrips = approvedTrips.map(trip => {
      let destinationInfo = this.destinationData.find(destinationData => trip.destinationID === destinationData.id);
      let totalCost = parseInt(this.calculateTotalTripCost(destinationInfo.estimatedFlightCostPerPerson, trip.travelers, trip.duration, destinationInfo.estimatedLodgingCostPerDay));

      return this.tripSummaryCard(trip, destinationInfo, totalCost)
    })
    return costOfTrips.reduce((totalEarning, trip) => {
      return totalEarning += trip.agencyFees;
    },0)
  }

  calculateTotalTripCost(costPerPerson, totalTravelers, duration, lodgingCostPerDay) {
    return (costPerPerson * totalTravelers) + (duration * lodgingCostPerDay)
  }

  currentUsersOnTrip() {
    let userTripsData = this.tripsData.filter(trip => trip.status === "approved");
    let currentDay = moment();

    let filterPresentTrips = userTripsData.filter(trip => {
      let startDate = moment(trip.date, 'YYYY/MM/DD');
      let endDate = moment(trip.date, 'YYYY/MM/DD').add(trip.duration, 'days').format('YYYY/MM/DD');
    return moment(currentDay).isBetween(startDate, endDate);
    })

    return filterPresentTrips.map(trip => {
      let destinationInfo = this.destinationData.find(destinationData => trip.destinationID === destinationData.id);
      let totalCost = parseInt(this.calculateTotalTripCost(destinationInfo.estimatedFlightCostPerPerson, trip.travelers, trip.duration, destinationInfo.estimatedLodgingCostPerDay));

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
      agencyFees: Math.round(totalCost*.10),
      overallCost: Math.round(totalCost*1.1),
      destinationImage: destinationInfo.image,
      destinationAlt: destinationInfo.alt
    }
  }

}

export default Agency;
