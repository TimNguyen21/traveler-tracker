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

  approveTripRequest(id) {
    let approveRequest = {"id": parseInt(id), "status": "approved"}

    fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/updateTrip", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(approveRequest),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error.message))
  }

  submitTripRequest(userID, destinationID, travelers, date, duration) {
    let tripRequest = {"id": Date.now(),
      "userID": parseInt(userID),
      "destinationID": parseInt(destinationID),
      "travelers": parseInt(travelers),
      "date": date,
      "duration": parseInt(duration),
      "status": "pending",
      "suggestedActivities": []
    }

    console.log(tripRequest)

    fetch("https://fe-apps.herokuapp.com/api/v1/travel-tracker/1911/trips/trips", {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(tripRequest),
     })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error.message))
  }

  calculateTripTotal(lodgingPerDay, costPerPerson, travlers, duration) {
    return ((lodgingPerDay * duration)+(costPerPerson * travlers))*1.1
  }

}




export default Trip;
