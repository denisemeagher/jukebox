function init (){
var options = {
    ovalWidth: 400,
    ovalHeight: 50,
    offsetX: 100,
    offsetY: 325,
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
    console.info(data);
  });
    //do something with $(item)
});

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
  })
});

// Function that will return the album mockup html
function albumHtml(value){
  if (value.id === 1) {
    var active = "active";
  }
  return '<li class="item '+active+'" data-id="'+ value.id +'">'+
    '<div class="albumimage">'+
      '<img src="' + value.cover_photo_url + '" alt="1" />'+
    '</div>'+
    // '<div>' +
      '<h4>' + value.name + '</h4>'+
      '<h6>' + value.artist_name + '</h6>'+
    // '</div>' +
  '</li>';
}
// Another function that will return song  html mockup
function songHtml(){

}
