var Ticket = {
  theaterName: "Kennedy School Theater",
  price: 3,
  ticketPrice: function() {

    if (this.movie.movieTime.getHours() >= 17) {
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

function parseTime(timeStr, dt) {
  if (!dt) {
    dt = new Date();
  }

  var time = timeStr.match(/(\d+)(?::(\d\d))?\s*(p?)/i);
  if (!time) {
    return NaN;
  }
  var hours = parseInt(time[1], 10);
  if (hours == 12 && !time[3]) {
    hours = 0;
  }
  else {
    hours += (hours < 12 && time[3]) ? 12 : 0;
  }

  dt.setHours(hours);
  dt.setMinutes(parseInt(time[2], 10) || 0);
  dt.setSeconds(0, 0);
  return dt;
}



$(document).ready(function() {

  $("#chooseUser").click(function() {
    $(".chooseRole").hide();
    $(".user").show();
  });

  $("#chooseAdmin").click(function() {
    $(".chooseRole").hide();
    $(".admin").show();
  });

  $(".back").click(function() {
    $(".user").hide();
    $(".admin").hide();
    $(".chooseRole").show();
  });

  $("form#admin-form").submit(function(event) {
    var inputtedTitle = $("input#new-title").val();
    var inputtedScreenings = ($("input#new-times").val()).split(" ");
    var inputtedRelease = $("input#new-release").is(':checked') ? true : false;
    var screenings = [];
    inputtedScreenings.forEach(function(time) {
      screenings.push(parseTime(time))
    });

    debugger;

    event.preventDefault();

  });


  $('select#movie-name').selectToAutocomplete();

});
