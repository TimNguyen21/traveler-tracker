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

}

export default Agency;
