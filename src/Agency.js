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

  calculateAgencyEarnings(year) {
    let approvedTrips = this.tripsData.filter(trip => trip.status === "approved" && trip.date.includes(year));

    let costOfTrips = approvedTrips.map(trip => {
      let destinationInfo = this.destinationData.find(destinationData => trip.destinationID === destinationData.id);
      let totalCost = parseInt(this.calculateTotalTripCost(destinationInfo.estimatedFlightCostPerPerson, trip.travelers, trip.duration, destinationInfo.estimatedLodgingCostPerDay));
      return {
        date: trip.date,
        agencyFees: Math.round(totalCost*.10)
        // id: trip.id,
        // travelers: trip.travelers,
        // duration: trip.duration,
        // status: trip.status,
        // suggestedActivities: trip.suggestedActivities,
        // destination: destinationInfo.destination,
        // totalTripCost: Math.round(totalCost),
        // overallCost: Math.round(totalCost*1.1),
        // destinationImage: destinationInfo.image,
        // destinationAlt: destinationInfo.alt
      }
    })
    return costOfTrips.reduce((totalEarning, trip) => {
      return totalEarning += trip.agencyFees;
    },0)
  }

  calculateTotalTripCost(costPerPerson, totalTravelers, duration, lodgingCostPerDay) {
    return (costPerPerson * totalTravelers) + (duration * lodgingCostPerDay)
  }

}

export default Agency;
