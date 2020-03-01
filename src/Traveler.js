class Traveler {
  constructor(travelerData, tripsData) {
    this.id = travelerData.id;
    this.name = travelerData.name;
    this.travelerType = travelerData.travelerType;
    this.tripsData = tripsData;
  }

  filterTravelerTrips() {
    return this.tripsData.filter(trip => trip.userID === this.id);
  }

}

export default Traveler;
