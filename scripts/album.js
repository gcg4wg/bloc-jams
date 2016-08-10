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
        
	   var songNumber = parseInt($(this).attr('data-song-number'));

	   if (currentlyPlayingSongNumber !== null) {
		var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
		currentlyPlayingCell.html(currentlyPlayingSongNumber);
        updatePlayerBarSong();
	   }
        
	   if (currentlyPlayingSongNumber !== songNumber) {
		$(this).html(pauseButtonTemplate);
		setSong(songNumber);
        currentSoundFile.play();
        updateSeekBarWhileSongPlays();
        updatePlayerBarSong();
           var $volumeFill = $('.volume .fill');
           var $volumeThumb = $('.volume .thumb');
           $volumeFill.width(currentVolume + '%');
           $volumeThumb.css({left: currentVolume + '%'});
	   } else if (currentlyPlayingSongNumber === songNumber) {
		if (currentSoundFile.isPaused()) {
            $(this).html(pauseButtonTemplate);
            $playPauseButton.html(playerBarPauseButton);
            currentSoundFile.play();
            updateSeekBarWhileSongPlays();
        } else {
            $(this).html(playButtonTemplate);
            $playPauseButton.html(playerBarPlayButton);
            currentSoundFile.pause();
        }
	   }
    };
    
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
        }
    };
    
    $row.find('.song-item-number').click(clickHandler);
    
    $row.hover(onHover, offHover);
    
    return $row;
};

// populate album html elements with passed album attributes
var setCurrentAlbum = function(album) {
    currentAlbum = album;
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

// update seek bar with live duration
var updateSeekBarWhileSongPlays = function() {
    if (currentSoundFile) {
        currentSoundFile.bind('timeupdate', function(event) {
            var seekBarFillRatio = this.getTime() / this.getDuration();
            var $seekBar = $('.seek-control .seek-bar');
            
            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
    }
};
// update seek/volume bars with event values(passed from setupSeekBars)
var updateSeekPercentage = function($seekbar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    // remove (< 0) and (> 100) percentages.
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
    // make percentage string to fill CSS
    var percetageString = offsetXPercent + "%";
    $seekbar.find('.fill').width(percetageString);
    $seekbar.find('.thumb').css({left: percetageString});  
};

// grab seek bar from event and calculate seekbar fill ratio
var setupSeekBars = function() {
    // grab both duration and volume seek bars
    var $seekBars = $('.player-bar .seek-bar');
    // set click event handler on seek bar and calculate offset distances
    $seekBars.click(function(event) {
        var offsetX = event.pageX - $(this).offset().left;
        var barWidth = $(this).width();
        var seekBarFillRatio = offsetX / barWidth;

        // condition check if track or volume bar
        if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());    
        } else {
            setVolume(seekBarFillRatio * 100);
        }
        
        updateSeekPercentage($(this), seekBarFillRatio);
    });
    
    // set drag event handler on seek thumb and calculate offset distances
    $seekBars.find('.thumb').mousedown(function(event) {
        // grab seekbar of mousedown event
        var $seekBar = $(this).parent();
        // update seekbar fill
        $(document).bind('mousemove.thumb', function(event){
             var offsetX = event.pageX - $seekBar.offset().left;
             var barWidth = $seekBar.width();
             var seekBarFillRatio = offsetX / barWidth;
 
             updateSeekPercentage($seekBar, seekBarFillRatio);
         });
        
        // remove event listener on thumbdown
        $(document).bind('mouseup.thumb', function() {
             $(document).unbind('mousemove.thumb');
             $(document).unbind('mouseup.thumb');
         });
     });
};

var setSong = function(songNumber) {
    // stop any playing songs before setting new one
    if (currentSoundFile) {
        currentSoundFile.stop();
    }
    
    currentlyPlayingSongNumber = parseInt(songNumber) || null;
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1] || null;
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
    
    setVolume(currentVolume);
};

// set track time to seek bar event
var seek = function(time) {
    if (currentSoundFile) {
        currentSoundFile.setTime(time);
    }
};

var setVolume = function(volume){
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
}
var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
}

var nextSong = function() {
    
    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
        currentSongIndex++;
    // wrap song index
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;    
    }
    
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();
    var $volumeFill = $('.volume .fill');
    var $volumeThumb = $('.volume .thumb');
    $volumeFill.width(currentVolume + '%');
    $volumeThumb.css({left: currentVolume + '%'});
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
        
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function () {
    
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
        console.log(index);
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    currentSongIndex--;
    // wrap song index
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();
    var $volumeFill = $('.volume .fill');
    var $volumeThumb = $('.volume .thumb');
    $volumeFill.width(currentVolume + '%');
    $volumeThumb.css({left: currentVolume + '%'});
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};
// populate song info into player bar
var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var togglePlayFromPlayerbar = function() {
    // grab the current song index
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
        currentSongIndex++;;
    // if player bar is clicked without song set, play first song
    if (currentSongIndex == 0) {
        setSong(1);
        updatePlayerBarSong();
        currentSoundFile.play();
        updateSeekBarWhileSongPlays();
        var $firstSongCell = getSongNumberCell(1);
        $firstSongCell.html(pauseButtonTemplate);
        $playPauseButton.html(playerBarPauseButton);
        var $volumeFill = $('.volume .fill');
        var $volumeThumb = $('.volume .thumb');
        $volumeFill.width(currentVolume + '%');
        $volumeThumb.css({left: currentVolume + '%'});
    } else {  var $songCell = getSongNumberCell(currentSongIndex);
            
        if (currentSoundFile.isPaused()) {   
            $songCell.html(pauseButtonTemplate);
            $playPauseButton.html(playerBarPauseButton);
            currentSoundFile.play()
            updateSeekBarWhileSongPlays();
        } else {
            $songCell.html(playButtonTemplate);
            $playPauseButton.html(playerBarPlayButton);
            currentSoundFile.pause();
        }
    }
};

// play button template applied to song rows
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
// pause button template applied to song rows
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// set current album; default to null
var currentAlbum = null;
// hold currently playing song; defaults to null
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playPauseButton = $('.main-controls .play-pause');

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    setupSeekBars();
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playPauseButton.click(togglePlayFromPlayerbar);

    var index = 1;
    var albums = [albumPicasso, albumMarconi, albumTheWall];
    $('.album-cover-art').click(function(event) {
        setCurrentAlbum(albums[index])
        index++;
        if (index == albums.length) {
            index = 0;
        }
     });
});