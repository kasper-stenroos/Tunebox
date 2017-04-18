(function() {
    angular
        .module('TuneBox')
        /*.run(function() {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        })
        */
        .config(['$httpProvider', function($httpProvider) {
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }])
        .service('youtubeService', youtubeService);

    youtubeService.$inject = ['$window', '$rootScope', '$log', '$timeout'];

    function youtubeService($window, $rootScope, $log, $timeout) {
        var service = this;

        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var youtube = {
            ready: false,
            player: null,
            playerId: null,
            videoId: null,
            videoTitle: null,
            playerHeight: '100%',
            playerWidth: '100%',
            state: 'stopped'
        };
        var results = [];
        var history = [];

        $window.onYouTubeIframeAPIReady = function() {
            $log.info('Youtube API is ready');
            youtube.ready = true;
            service.bindPlayer('placeholder');
            service.loadPlayer();
            $rootScope.$apply();
        };

        this.secondRun = function() {
            if (youtube.ready) {
                console.log('Ready');
                /*service.bindPlayer('placeholder');
                service.loadPlayer();
                $timeout(function (){
                    $rootScope.$apply();
                }, 100);*/
                $window.location.reload();

            } else {
                console.log('Not ready');
                //return false;
            }
        };

        this.bindPlayer = function(elementId) {
            $log.info('Binding to ' + elementId);
            youtube.playerId = elementId;
        };

        this.createPlayer = function() {
            $log.info('Creating a new Youtube player for DOM id ' + youtube.playerId + ' and video ' + youtube.videoId);
            return new YT.Player(youtube.playerId, {
                height: youtube.playerHeight,
                width: youtube.playerWidth,
                playerVars: {
                    rel: 0,
                    showinfo: 0
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange,
                    'onError': onError
                }
            });
        };

        this.loadPlayer = function() {
            if (youtube.ready && youtube.playerId) {
                if (youtube.player) {
                    youtube.player.destroy();
                }
                youtube.player = service.createPlayer();
            }
        };

        this.launchPlayer = function(id, title) {
            console.log("ID:" + id + " TITLE: " + title);
            youtube.player.loadVideoById(id);
            youtube.videoId = id;
            youtube.videoTitle = title;
            return youtube;
        }

        this.launchPlaylist = function(playlist) {
            console.log(playlist);
        }

        this.listResults = function(data, append) {
            if (!append) {
                results.length = 0;
            }
            for (var i = data.items.length - 1; i >= 0; i--) {
                results.push({
                    id: data.items[i].id.videoId,
                    title: data.items[i].snippet.title,
                    description: data.items[i].snippet.description,
                    thumbnail: data.items[i].snippet.thumbnails.default.url,
                    author: data.items[i].snippet.channelTitle
                });
            }
            results.reverse();
            return results;
        }

        this.archiveVideo = function(video) {
            history.unshift(video);
            return history;
        };

        this.getYoutube = function() {
            return youtube;
        };

        this.getResults = function() {
            return results;
        };

        this.getHistory = function() {
            return history;
        };

    }

})();