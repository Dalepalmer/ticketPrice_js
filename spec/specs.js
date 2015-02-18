describe("Ticket", function() {
  describe("ticketPrice", function() {

    it("gives the base price back to us", function() {
      var testTicket = Object.create(Ticket);
      var testMovie = Object.create(Movie);
      testMovie.movieName = "Selma";
      testMovie.firstRelease = false;
      testTicket.movie = testMovie;
      testTicket.age = 24;
      testTicket.movieTime = 15;
      expect(testTicket.ticketPrice()).to.equal(3);
    });
    it("gives the price for a senior ticket", function() {
      var testTicket = Object.create(Ticket);
      var testMovie = Object.create(Movie);
      testMovie.movieName = "Selma";
      testMovie.firstRelease = false;
      testTicket.movie = testMovie;
      testTicket.age = 55;
      testTicket.movieTime = 15;
      expect(testTicket.ticketPrice()).to.equal(1);
    });
    it("gives the price for a first run ticket", function() {
      var testTicket = Object.create(Ticket);
      var testMovie = Object.create(Movie);
      testMovie.movieName = "Fifty Shades of Grey";
      testMovie.firstRelease = true;
      testTicket.movie = testMovie;
      testTicket.age = 24;
      testTicket.movieTime = 15;
      expect(testTicket.ticketPrice()).to.equal(7);
    });
    it("gives the price for a prime time ticket", function() {
      var testTicket = Object.create(Ticket);
      var testMovie = Object.create(Movie);
      testMovie.movieName = "Selma";
      testMovie.firstRelease = false;
      testTicket.movie = testMovie;
      testTicket.age = 24;
      testTicket.movieTime = 19;
      expect(testTicket.ticketPrice()).to.equal(6);
    });
    it("gives the price for a prime time first run ticket for an old person", function() {
      var testTicket = Object.create(Ticket);
      var testMovie = Object.create(Movie);
      testMovie.movieName = "Fifty Shades of Grey";
      testMovie.firstRelease = true;
      testTicket.movie = testMovie;
      testTicket.age = 99;
      testTicket.movieTime = 23;
      expect(testTicket.ticketPrice()).to.equal(8);
    });
  });

  describe("movie", function() {
    it("assigns movie to ticket", function() {
      var testTicket = Object.create(Ticket);
      var testMovie = Object.create(Movie);
      testMovie.movieName = "Fifty Shades of Grey";
      testTicket.movie = testMovie;
      expect(testTicket.movie.movieName).to.equal("Fifty Shades of Grey");
    });
  });

  describe("movies", function() {
    it("returns showing times for a movie", function() {
      var movies = [];
      var movie1 = createMovie("Virunga", false, [12, 15, 19]);
      var movie2 = createMovie("Selma", false, [17]);
      movies.push(movie1);
      movies.push(movie2);
      expect(movies).to.eql([movie1, movie2])
    });
  });


});
