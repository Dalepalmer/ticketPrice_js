describe("Ticket", function() {
  describe("ticketPrice", function() {

    it("gives the base price back to us", function() {
      var testTicket = Object.create(Ticket);
      testTicket.movieName = "Selma";
      testTicket.age = 24;
      testTicket.movieTime = 15;
      expect(testTicket.ticketPrice()).to.equal(3);
    });
    it("gives the price for a senior ticket", function() {
      var testTicket = Object.create(Ticket);
      testTicket.movieName = "Selma";
      testTicket.age = 55;
      testTicket.movieTime = 15;
      expect(testTicket.ticketPrice()).to.equal(1);
    });
    it("gives the price for a first run ticket", function() {
      var testTicket = Object.create(Ticket);
      testTicket.movieName = "Fifty Shades of Grey";
      testTicket.age = 24;
      testTicket.movieTime = 15;
      expect(testTicket.ticketPrice()).to.equal(7);
    });
    it("gives the price for a prime time ticket", function() {
      var testTicket = Object.create(Ticket);
      testTicket.movieName = "Selma";
      testTicket.age = 24;
      testTicket.movieTime = 19;
      expect(testTicket.ticketPrice()).to.equal(6);
    });
    it("gives the price for a prime time first run ticket for an old person", function() {
      var testTicket = Object.create(Ticket);
      testTicket.movieName = "Fifty Shades of Grey";
      testTicket.age = 99;
      testTicket.movieTime = 23;
      expect(testTicket.ticketPrice()).to.equal(8);
    });



  });
});
