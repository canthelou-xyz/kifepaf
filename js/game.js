var Game = (function () {
    var _scenes = [];
    var _game;
    var _app;

    var _config = {
        width: 360,
        height: 640
    };


    return {
        game: function () {
            return _game;
        },
        app: function () {
            return _game;
        },
        run: function () {
            _app = {
                // Application Constructor
                initialize: function () {
                    document.addEventListener(
                        "deviceready",
                        this.onDeviceReady.bind(this),
                        false
                    );
                },

                // deviceready Event Handler
                //
                // Bind any cordova events here. Common events are:
                // 'pause', 'resume', etc.
                onDeviceReady: function () {
                    if(StatusBar) StatusBar.hide();
                    _game = new PIXI.Application(_config);
                    PIXIScene.load(_game, function (assets) {
                    });

                    document.querySelector("#app").appendChild(_game.view);
                    if (document.querySelector("#app canvas")) {
                        fit(document.querySelector("#app canvas"), document.querySelector("body"), {
                            cover: false,
                            watch: true
                        });
                    } else {
                        fit(document.querySelector("#app"), document.querySelector("body"), {
                            cover: false,
                            watch: true
                        });
                    }
                },

                // Update DOM on a Received Event
                receivedEvent: function (id) {
                    console.log("Received Event: " + id);
                }
            };

            _app.initialize();
        }
    };
})();
