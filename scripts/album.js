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


var createSongRow = function(songNumber, songTitle, songLength) {
    var template = 
        '<tr class="album-view-song-item">'
    +   '   <td class="song-item-number">' + songNumber + '</td>'
    +   '   <td class="song-item-title">' + songTitle + '</td>'
    +   '   <td class="song-item-duration">' + songLength + '</td>'
    +   '</tr>'
    ;
    
    return template;
};

// grab htlm elements
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

// globally set album image
//albumImage.setAttribute('src', album.albumArtUrl);

var setCurrentAlbum = function(album) {
    
    // populate grabbed elements with object attributes
    albumTitle.firstChild.nodeValue = album.title;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
    // clear elements from working node
    albumSongList.innerHTML = '';
    // loop through song list to create html
    for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };
    
 window.onload = function() {
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
 };