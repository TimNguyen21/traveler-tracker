class Trip {
  constructor(travelerData, tripsData, destinationData) {
    this.travelData = travelerData;
    this.tripsData = tripsData;
    this.destinationData = destinationData;
  }

  searchDestination(searchWord) {
    return this.destinationData.filter(destination => destination.destination
      .toLowerCase().includes(searchWord.toLowerCase()));
  }
}

export default Trip;
