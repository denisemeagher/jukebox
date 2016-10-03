function init (){
//var options came with carousel but adjustments made to reposition items (albums)//
var options = {
    ovalWidth: 275,
    ovalHeight: 50,
    offsetX: 50,
    offsetY: 380,
    angle: 0,
    activeItem: 0,
    duration: 350,
    className: 'item'
  }

var carousel = $('.carousel').CircularCarousel( options );

/* Fires after an item finishes it's activate animation */
carousel.on('itemActive', function(e, activeItem) {
  var album_id = $(activeItem).data("id");
  $.ajax({
    url: "https://stg-resque.hakuapp.com/songs.json?album_id=" + album_id,
    method: "GET",
    dataType: 'jsonp'
  })
  .done(function( data ) {
    $(".list-group").html("");
    $.each(data, function(index, value){
      $(".list-group").append('<li class="list-group-item">' +
      '<span class="song-id">' + value.id + '</span>' +
      '<a data-toggle="tooltip" title="mark as favorite" class="glyphicon glyphicon-star btn-lg" aria-hidden="true">' + '</a>' +
      '<span class="songname">' + value.song_name + '</span>' +
      //need to do an if/else to check to see if the song label exists otherwise leave empty. Also display the two labels separately.
      '<span class="songlabel">' + value.song_label + '</span>' +
      '<span class="songtime">' + value.song_duration + '</span>' + '</l1>');
    });
  });
});


/* Fires when an item is about to start it's activate animation */
carousel.on('itemBeforeActive', function(e, item) {
});

// after changing left and right position of albums 2 and 5 to match the mockup. I console logged which items were affected during this transition so I could try to make changes so the transition worked for all following albums but couldn't get it acceptable enough to submit. Leaving the commented out lines below so I can revisit it later.//

/* Fires after an item finishes it's activate animation */
carousel.on('itemActive', function(e, item) {
  console.log("itemActive=======> ", item);
  // $(item).removeClass("positionRight");
  console.log($(item).data("album_id"));
  // $(item).next().addClass("positionRight");
  // $(item).removeClass("positionRight");
  // $(item).removeClass("positionLeft");
});

/* Fires when an active item starts it's de-activate animation */
carousel.on('itemBeforeDeactivate', function(e, item) {
    // console.log("itemBeforeDeactivate=======> ", $(item).addClass("positionRight"));
    // $(item).removeClass("positionRight");
    // $(item).addClass("positionLeft");
})

/* Fires after an active item has finished it's de-activate animation */
carousel.on('itemAfterDeactivate', function(e, item) {
  // console.log("itemAfterDeactivate=======> ", item);
  // $(item).addClass("positionRight");
  // $(item).removeClass("positionRight");
  // $(item).next().next().removeClass("positionLeft");

})

/* Previous button */
$('.controls .previous').click(function(e) {
	carousel.cycleActive('previous');
	e.preventDefault();
});

  /* Next button */
  $('.controls .next').click(function(e) {
  	carousel.cycleActive('next');
  	e.preventDefault();
  });

  /* Manaully click an item anywhere in the carousel */
  $('.carousel .item').click(function(e) {
  	var index = $(this).index('li');
  	carousel.cycleActiveTo(index);
  	e.preventDefault();
  });
};

$(function(){
  $.ajax({
    url: "https://stg-resque.hakuapp.com/albums.json",
    method: "GET",
    dataType: 'jsonp'
  })
  .done(function( data ) {
    $.each(data, function(index, value){
      $(".carousel").append(albumHtml(value));
    })
  }).success(function(){
    init();
  });
});

// Function for returning the album html/info//
function albumHtml(value){
  if (value.id === 1) {
    var active = "active";
  }else if (value.id === 5){
    active = "positionRight"
  }else if (value.id === 2){
    active = "positionRight"
  }
  return '<li class="item '+ active +'" data-id="'+ value.id +'">'+
    '<div class="albumimage">'+
      '<img src="' + value.cover_photo_url + '"alt="album photo" />'+
    '</div>'+
    '<div>' +
      '<h4>' + value.name + '</h4>'+
      '<h6>' + value.artist_name + '</h6>'+
    '</div>' +
  '</li>';
}

//trying to add tooltip toggle from bootstrap to display 'mark as favorite' when hovering over stars. the message will appear, just not functioning correctly. I can get it right if I keep it in the html file, but not in the js file. Will continue to work with it.
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
