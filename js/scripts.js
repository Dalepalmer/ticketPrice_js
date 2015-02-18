var Ticket = {
  theaterName: "Kennedy School Theater",
  price: 3,
  ticketPrice: function() {
    if (this.movieTime >= 17) {
      this.price += 3;
    }
    if (this.movie.firstRelease) {
      this.price += 4;
    }
    if (this.age >= 55) {
      this.price -= 2;
    }
    return this.price;
  }
};

var Movie = {
  movieName: "",
  firstRelease: false,
  showingTimes: []
};

var createMovie = function(name, firstRelease, showingTimes) {
  var movie = Object.create(Movie);
  movie.name = name;
  movie.firstRelease = firstRelease;
  movie.showingTimes = showingTimes;
  return movie;
}



$(document).ready(function(event) {

  var movies = [];
  movies.push(createMovie(name, firstRelease, showingTimes));



  $('select#movie-name').selectToAutocomplete();




  event.preventDefault();
});
