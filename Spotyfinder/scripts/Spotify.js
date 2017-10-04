var token = 'BQBtEhklulBSna2YY99pDV80JhQKV8xbJ5cuGu50AmlCeeQTiL5-isSqZpUwggtb5njfeQpLIZ1ZVvKlAJIb78dcK0A3pBpkyW2Dw0dK3xWAPGYmr3XMEXu8CGGM5N2WomLVHWHSu8w';

var $artists = $('#artists');
var $albums = $('#albums');
var $tracks = $('#tracks');

$artists.hide();
$albums.hide();
$tracks.hide();

var $artistsSelect = $('#artists select');
var $albumsSelect = $('#albums select');
var $tracksUl = $('#tracks ul');

$('#search').submit(function(e) {
   e.preventDefault();

   var query = $(this).find('input').val();

   $.ajax({
           url: 'https://api.spotify.com/v1/search',
           data: {
               q: query,
               type: 'artist'
           },
           headers: {
               Authorization: 'Bearer ' + token
           }
       })
       .then(function(results) {
           $artistsSelect.append('<option disabled selected>Select an artist...</option>');

           results.artists.items.forEach(function(artist) {
               $artistsSelect.append('<option value=' + artist.id + ' >' + artist.name + '</option>');
           });

           $artists.show();
           $albums.hide();
           $tracks.hide();
       })
       .fail(function(err) {
           console.error(err);
       });

});

$artistsSelect.change(function() {
   var idArtistSelected = $(this).val();
   var urlAlbums = 'https://api.spotify.com/v1/artists/' + idArtistSelected + '/albums';

   $.ajax({
           url: urlAlbums,
           headers: {
               Authorization: 'Bearer ' + token
           }
       })
       .then(function(results) {
           $albumsSelect.append('<option disabled selected>Select an album...</option>');

           results.items.forEach(function(album) {
               $albumsSelect.append('<option value=' + album.id + ' >' + album.name + '</option>');
           });

           $albums.show();
           $tracks.hide();
       })
       .fail(function(err) {
           console.error(err);
       });

});

$albumsSelect.change(function(results) {
   var idAlbumsSelected = $(this).val();

   var urlAlbums = 'https://api.spotify.com/v1/albums/' + idAlbumsSelected + '/tracks';

   $.ajax({
           url: urlAlbums,
           headers: {
               Authorization: 'Bearer ' + token
           }
       })
       .then(function(results) {
           results.items.forEach(function(tracks) {
               // $tracksUl.append('<li><a href="' + tracks.external_urls.spotify + '"target="_blank">' + tracks.name + '</a></li>')

               $tracksUl.append('<li><a href="' + tracks.external_urls.spotify + '"target="_blank"><div class="glyphicon glyphicon-volume-up"></div>'+ " " + '</a>' + tracks.name + '</li>')
              
           });

           $tracks.show();

       })
       .fail(function(err) {
           console.error(err);
       });

       $tracksUl.empty();

});


$(document).on('click', )