(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};

          //@function SongPlayer
          //@desc injects fixtures service into SongPlayer service

          var currentAlbum = Fixtures.getAlbum();

          //@function getSongIndex
          //@desc gets the index of a song
          var getSongIndex = function(song){
              return currentAlbum.songs.indexOf(song);
          };

          SongPlayer.currentSong = null;
          //@desc Buzz object audio file
          // @type {Object}

          var currentBuzzObject = null;

          // @fucntion setSong
          // @desc Stops currently palying song and loads new audio file as currentBuzzObject
          //@param {Object} song

          var setSong = function(song) {
            if (currentBuzzObject) {
              
              stopSong(SongPlayer.currentSong);
              }


          currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
                preload: true
              });

                SongPlayer.currentSong = song;
              };
              //@fucntion playSong
              // @desc Plays song when SongPlayer.currentSong.playing = null
              //@param {object} song
              var playSong = function(song)  {

                currentBuzzObject.play();
                song.playing = true;
              }

              //@function stopSong
              //@desc Stops song when SongPlayer.currentSong.playing = true
              //@param {object} song
              var stopSong = function(song) {
                currentBuzzObject.stop();
                song.playing = null;
              }

          SongPlayer.currentSong = null;

          SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;

            if (SongPlayer.currentSong !== song) {

                  setSong(song);
                  playSong(song);
                } else if (SongPlayer.currentSong === song){
                    if (currentBuzzObject.isPaused()){
                        playSong(song);
                    }
                }

               };

        SongPlayer.pause = function(song) {
              song = song || SongPlayer.currentSong;
              currentBuzzObject.pause();
              song.playing = false;
            };

            //@function SongPlayer.previous
            //@desc plays previous song when previous button is clicked
            //@param {object} currentSong
        SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if(currentSongIndex <0){
            stopSong(song);

          } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
          }
        };

        //@function SongPlayer.next
        //@desc plays next song when next button is clicked
        //@param {object} currentSong
        SongPlayer.next = function(){
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if (currentSongIndex > 5){
            stopSong(song);

          } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);

          }
        };


          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);


 })();
