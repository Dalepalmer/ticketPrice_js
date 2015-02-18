var Ticket = {
  theaterName: "Kennedy School Theater",
  firstRelease: false,
  price: 3,
  ticketPrice: function() {
    this.isFirstRelease();
    if (this.movieTime >= 17) {
      this.price += 3;
    }
    if (this.firstRelease) {
      this.price += 4;
    }
    if (this.age >= 55) {
      this.price -= 2;
    }
    return this.price;
  },
  isFirstRelease: function() {
    var firstReleaseMovies = ["Fifty Shades of Grey", "Jupiter Ascending", "Seventh Son", "The Loft", "Mortdecai", "The Boy Next Door", "Strange Magic"];
    if (firstReleaseMovies.indexOf(this.movieName) !== -1) {
      this.firstRelease = true;
    }
  }
};
