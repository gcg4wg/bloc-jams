// Album #1
var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };

// Album #2
var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

// album #3
var albumTheWall = {
     title: 'The Wall',
     artist: 'Pink Floyd',
     label: 'Harvest - Columbia',
     year: '1979',
     albumArtUrl: 'https://upload.wikimedia.org/wikipedia/en/7/76/TheWallImmersion.jpg',
     songs: [
         { title: "In the Flesh?" , duration: '3:16' },
         { title: "Another Brick in the Wall (Part I)"   , duration: '2:27' },
         { title: "The Happiest Days of Our Lives" , duration: '3:21'},
         { title: 	"Another Brick in the Wall (Part II)" , duration: '1:46' },
         { title: 	"Mother", duration: '5:32'}
     ]
 };

// template to populate album song rows
var createSongRow = function(songNumber, songTitle, songLength) {
    var template = 
        '<tr class="album-view-song-item">'
    +   '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    +   '   <td class="song-item-title">' + songTitle + '</td>'
    +   '   <td class="song-item-duration">' + songLength + '</td>'
    +   '</tr>'
    ;
    var $row = $(template);
    
    // handle play button click events   
    var clickHandler = function() {
	   var songNumber = $(this).attr('data-song-number');

	   if (currentlyPlayingSong !== null) {
		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
		currentlyPlayingCell.html(currentlyPlayingSong);
	   }
	   if (currentlyPlayingSong !== songNumber) {
		$(this).html(pauseButtonTemplate);
		currentlyPlayingSong = songNumber;
	   } else if (currentlyPlayingSong === songNumber) {
		$(this).html(playButtonTemplate);
		currentlyPlayingSong = null;
	   }
    };
    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    
    $row.hover(onHover, offHover);
    
    return $row;
};

// populate album html elements with passed object attributes
var setCurrentAlbum = function(album) {
    var $albumTitle = $('.album-view-title');
    var $albumArtist = $('.album-view-artist');
    var $albumReleaseInfo = $('.album-view-release-info');
    var $albumImage = $('.album-cover-art');
    var $albumSongList = $('.album-view-song-list');
    
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);
    
    $albumSongList.empty();
    // loop through song list to create html
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
 };

// play button template applied to song rows
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
// pause button template applied to song rows
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
// hold currently playing song; defaults to null
var currentlyPlayingSong = null;
// traverse up through DOM to find parent of specified name

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    
    var index = 1;
     var albums = [albumPicasso, albumMarconi, albumTheWall];
     albumImage.addEventListener('click', function(event) {
        setCurrentAlbum(albums[index])
        index++;
        if (index == albums.length) {
            index = 0;
        }
     });
});