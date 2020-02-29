class Login {
  constructor(userName, password) {
    this.userName = userName;
    this.password = password;
  }

  checkUserStatus(travelersData) {
    if(this.userName.toLowerCase() === 'agent' && this.password === 'password2020') {
      return this.userName.toLowerCase();
    } else if(this.checkTraveler(travelersData) === true && this.password === 'password2020') {
      return parseInt(this.userName.slice(8));
    } else {
      return "invalid login"
    }
  }

  checkTraveler(travelersData) {
    let userID = this.userName.slice(8);
    let personData = travelersData.filter(traveler => traveler.id == userID);
    if (personData.length === 1) {
      return true;
    } else {
      return false;
    }
  }

}

export default Login;
