class Traveler {
  constructor(travelerData, tripsData, destinationData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.tripsData = tripsData;
    this.destinationData = destinationData;
  }

  filterTravelerTrips() {
    let userTripsData = this.tripsData.filter(trip => trip.userID === this.id);

    return userTripsData.map(trip => {
      let destinationInfo = this.destinationData.find(destinationData => trip.destinationID === destinationData.id);
      let totalCost = this.calculateTotalTripCost(destinationInfo.estimatedFlightCostPerPerson, trip.travelers, trip.duration, destinationInfo.estimatedLodgingCostPerDay);

      return {
        id: trip.id,
        travelers: trip.travelers,
        date: trip.date,
        duration: trip.duration,
        status: trip.status,
        suggestedActivities: trip.suggestedActivities,
        destination: destinationInfo.destination,
        totalTripCost: totalCost.toFixed(2),
        agencyFees: (totalCost*.10).toFixed(2),
        overallCost: (totalCost*1.1).toFixed(2),
        destinationImage: destinationInfo.image,
        destinationAlt: destinationInfo.alt
      }
    })
  }

  calculateTotalTripCost(costPerPerson, totalTravelers, duration, lodgingCostPerDay) {
    return (costPerPerson * totalTravelers) + (duration * lodgingCostPerDay)
  }

  calculateTotalSpentOverall() {
    let travelerTrip = this.filterTravelerTrips();

    let totalSpentOverall = parseInt(travelerTrip.reduce((overallCost, trip) => {
      return overallCost += trip.overallCost
    }, ''))
    
    return totalSpentOverall.toFixed(2);
  }

}

export default Traveler;
