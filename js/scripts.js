
var countries = [["Bosnia", 0, 1, 1],["Japan", 1, 1, 1],["China", 2, 1, 1],["Chile", 3, 1, 1],["Madagascar", 4, 1, 1],["Canada", 5, 1, 1],["Latvia", 6, 1, 1],["Russia", 7, 1, 1],["Germany", 8, 1, 1]];
var dummyCountries = [];

// Main Classes =================

function Game(countries, players) {
  // The Game class contains the player objects and the country objects
  this.countries = countries;
  this.players = players;
  this.playing = false;
};

function Player(playerName, playerId) {
  this.playerName = playerName;
  this.playerId = playerId;
  this.reinforcements = 0;
  this.countryArray = [];
  this.active = true;
};

function Country(countryName, countryId, continent, adjacent) {
  this.countryName = countryName;
  this.countryId = countryId;
  this.continent = continent;
  this.owner;
  this.unitCount = 0;
  this.adjacent = adjacent;
};

function Turn(player) {
  this.currentPlayer = player;
  this.currentGame = currentGame;
  this.stage = 0;
};

// prototype functions ==========================

Game.prototype.setup = function() {
  // This function will randomly assign countries to players
  var countriesIdArray = []
  //creates an array of the index locations of the countries, so that countries can be spliced out as they are assigned
  for (var item = 0; item < this.countries.length; item++) {
    countriesIdArray.push(item);
  }
  var numberOfPlayers = this.players.length;
  // checks for an unevenly assigned number of countries and takes out the remainder
  var numberOfCountries = this.countries.length;
  var remainderCountries = numberOfCountries % numberOfPlayers;
  var countriesPerPlayer = (numberOfCountries - remainderCountries) / numberOfPlayers;
  for (var playerIndex = 0; playerIndex < numberOfPlayers; playerIndex++) {
    //iterates through the players and assigns the whole product number of countries randomly
    for (var index = 0; index < countriesPerPlayer; index++) {
      var randomIndex = Math.floor(Math.random() * countriesIdArray.length);
      newCountryId = countriesIdArray[randomIndex];
      this.players[playerIndex].countryArray.push(this.countries[newCountryId]);
      this.countries[newCountryId].owner = this.players[playerIndex].playerName;
      countriesIdArray.splice(randomIndex,1);
      console.log("added " + this.countries[newCountryId].countryName + " to " + this.players[playerIndex].playerName);
    }
  }
  for (var remainder = 0; remainder < remainderCountries; remainder++) {
    // assigns the remainder countries randomly starting with the last player
    var randomIndex = Math.floor(Math.random() * countriesIdArray.length);
    newCountryId = countriesIdArray[randomIndex];
    this.players[this.players.length-(remainder+1)].countryArray.push(this.countries[newCountryId]);
    this.countries[newCountryId].owner = this.players[this.players.length-(remainder+1)].playerName;
    countriesIdArray.splice(randomIndex,1);
    console.log("added " + this.countries[newCountryId].countryName + " to " + this.players[this.players.length-(remainder+1)].playerName);
  }
}

var countryAssigner = function(arrayOfCountries) {
  // this is a test function to grab countries from the dummy country list and make them objects
  for (var index = 0; index < arrayOfCountries.length; index++) {
    var makeCountry = new Country(arrayOfCountries[index][0], arrayOfCountries[index][1], arrayOfCountries[index][2], arrayOfCountries[index][3]);
    dummyCountries.push(makeCountry);
  }
}

countryAssigner(countries);

var player1 = new Player('Keven', 1);
var player2 = new Player('ziggle', 2);

var playerList = [player1, player2];

var game1 = new Game(dummyCountries, playerList);

game1.setup();
console.log(player1.countryArray);

Turn.prototype.movement = function(troopLooser, troopGainer) {
  troopLooser--;
  troopGainer++;
};

Turn.prototype.combat = function(attacker, defender) {
  // This function will execut
}
