(function() {
     function SongPlayer($rootScope, Fixtures) {
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

          // @desc Current playback time (in seconds) of currently playing song
          //@type {Number}
          SongPlayer.currentTime = null;

          //@desc current volume of song that's playing
          //@type {percent}
          SongPlayer.volume = 80;

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

          currentBuzzObject.bind('timeupdate', function() {
              $rootScope.$apply(function() {
                  SongPlayer.currentTime = currentBuzzObject.getTime();
                });
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

        //@function setCurrentTime
        //@desc Set current time (in seconds) of currently playing song
        //@param {Number} time
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);

          }
        };
            //@function setCurrentVolume
            //@desc Set current volume of playing song
            //@param {percent} volume
        SongPlayer.setCurrentVolume = function(volume){
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
        }
        //@function SongPlayer.next
        //@desc plays next song when next button is clicked
        //@param {object} currentSong
        SongPlayer.next = function(){
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;

          if (currentSongIndex >= currentAlbum.songs.length){
            stopSong(SongPlayer.currentSong);

          } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);

          }
          // SongPlayer.setCurrentTime = function(time) {
          //     if (currentBuzzObject) {
          //         currentBuzzObject.setTime(time);
          //     }



        };


          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);


 })();
