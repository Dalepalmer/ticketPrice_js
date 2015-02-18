var Ticket = {
  theaterName: "This Great Theater",
  price: 3,
  ticketPrice: function() {

    if (this.time.getHours() >= 17) {
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

var movies = [];

$(document).ready(function() {


  $("#chooseUser").click(function() {
    $(".chooseRole").hide();
    $(".user").show();
    $("#movie-name").empty();
    $("#movie-name").append("<option value='' selected='selected'>Select Movie</option>");
    movies.forEach(function(movie) {
      var htmlToInsert = "<option value='" + movie.name + "'>" + movie.name + "</option>";
      $("#movie-name").append(htmlToInsert);
    })
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
    movies.push(createMovie(inputtedTitle, inputtedRelease, screenings));

    $(".form-control").val("");
    $("#new-release").prop("checked", false);
    event.preventDefault();
  });

 $("form#user-form").submit(function(event) {
    var movieName = $("#movie-name").val();
    var age = parseInt($("input#user-age").val());
    var time = new Date($("#movie-time").val());

    var ticket = Object.create(Ticket);
    ticket.age = age;
    ticket.time = time;
    movies.forEach(function(movie) {
      if (movie.name === movieName) {
        ticket.movie = movie;
      }
    });

    var userCost = ticket.ticketPrice();
    $("#costText").append(userCost);
    $("#movieText").append(movieName);
    $("#timeText").append(time);
    $("#results").show();

    event.preventDefault();
 });


  // $('select#movie-name').selectToAutocomplete();

  $("#movie-name").change(function() {
    var movieName = $("#movie-name").val();
    var selectedMovie;
    $(".hiddenBox").show();
    movies.forEach(function(movie) {
      if (movie.name === movieName) {
        selectedMovie = movie;
      }
    });
    $("#movie-time").empty();
    $("#movie-time").append("<option value='' selected='selected'>Select Time</option>");
    selectedMovie.showingTimes.forEach(function(time) {
      if (! isNaN(time)) {
        var htmlToInsert = "<option value='" + time + "'>" + time + "</option>";
        $("#movie-time").append(htmlToInsert);
      }
    })

  });

});
