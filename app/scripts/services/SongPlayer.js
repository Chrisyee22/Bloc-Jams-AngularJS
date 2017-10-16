(function() {
     function SongPlayer() {
          var SongPlayer = {};

          var currentSong = null;
          //@desc Buzz object audio file
          // @type {Object}

          var currentBuzzObject = null;

          // @fucntion setSong
          // @desc Stops currently palying song and loads new audio file as currentBuzzObject
          //@param {Object} song

          var setSong = function(song) {
            if (currentBuzzObject) {
              currentBuzzObject.stop();
              currentSong.playing = null;
              }

            var playSong = function(song)  {
              if (currentBuzzObject){
              currentBuzzObject.play();
              song.playing = true;
              }
            }

          currentBuzzObject = new buzz.sound(song.audioUrl, {
              formats: ['mp3'],
                preload: true
              });

                currentSong = song;
              };

          SongPlayer.currentSong = null;

          SongPlayer.play = function(song) {
            if (currentSong !== song) {

                  setSong(song);
                   currentBuzzObject.play();
                   song.playing = true;
                 }
               };

        SongPlayer.pause = function(song) {
              currentBuzzObject.pause();
              song.playing = false;
              };




          return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);


 })();
