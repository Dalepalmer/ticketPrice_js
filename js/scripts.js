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

  $("#chooseAdmin").click(function() {
    var password = prompt("What is the admin password?")
    if (password === "12345") {
      $(".user").hide();
      $(".admin").show();
    } else {
      alert("FAIL! STOP BREAKING IN.");
    }


  });

  $(".back").click(function() {
    $(".admin").hide();
    $("#movie-name").empty();
    $("#movie-name").append("<option value='' selected='selected'>Select Movie</option>");
    $("#movie-time").empty();
    $("#movie-time").append("<option value='' selected='selected'>Select Time</option>");
    $("#user-age").val("");
    $("#results span").empty();
    $("#results").hide();
    movies.forEach(function(movie) {
      var htmlToInsert = "<option value='" + movie.name + "'>" + movie.name + "</option>";
      $("#movie-name").append(htmlToInsert);
    })
    $(".user").show();
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
    $("#costText").text(userCost);
    $("#movieText").text(movieName);
    $("#timeText").text(time);
    $("#results").show();

    $("#movie-name").val("Select Movie");
    $("#movie-time").empty();
    $("#movie-time").append("<option value='' selected='selected'>Select Time</option>");
    $("#user-age").val("");

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
