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

  removeTripRequest(id) {
    let removeRequest = {"id": parseInt(id)}

    fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(removeRequest),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error.message))
  }
}

export default Trip;
