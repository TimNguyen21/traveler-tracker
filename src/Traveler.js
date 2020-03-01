class Traveler {
  constructor(travelerData, tripsData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.tripsData = tripsData;
  }

  filterTravelerTrips(destinationData) {
    let userTripsData = this.tripsData.filter(trip => trip.userID === this.id);

    return userTripsData.map(trip => {
      let destinationInfo = destinationData.find(destinationData => trip.destinationID === destinationData.id);

      return {
        id: trip.id,
        travelers: trip.travelers,
        date: trip.date,
        duration: trip.duration,
        status: trip.status,
        suggestedActivities: trip.suggestedActivities,
        destination: destinationInfo.destination,
        totalTripCost: this.calculateTotalTripCost(destinationInfo.estimatedFlightCostPerPerson, trip.travelers, trip.duration, destinationInfo.estimatedLodgingCostPerDay).toFixed(2),
        agencyFees: (this.calculateTotalTripCost(destinationInfo.estimatedFlightCostPerPerson, trip.travelers, trip.duration, destinationInfo.estimatedLodgingCostPerDay)*.10).toFixed(2),
        overallCost: (this.calculateTotalTripCost(destinationInfo.estimatedFlightCostPerPerson, trip.travelers, trip.duration, destinationInfo.estimatedLodgingCostPerDay)*1.1).toFixed(2),
        destinationImage: destinationInfo.image,
        destinationAlt: destinationInfo.alt
      }
    })
  }

  calculateTotalTripCost(costPerPerson, totalTravelers, duration, lodgingCostPerDay) {
    return (costPerPerson * totalTravelers) + (duration * lodgingCostPerDay)
  }

}

export default Traveler;
