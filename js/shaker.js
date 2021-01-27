var Shaker = (function () {
    var SENSIBILITY = 20;
    var _device_connected = false;
    var _assets, _device_manager;
    var _shaking = false;

    function shaker() {
        if (!_shaking) {
            shake.stopWatch();
            _shaking = true;
            var tl = new TimelineMax({
                onComplete: function () {
                    _shaking = false;
                }
            });
            var tm = 0.15;
            var dpt = 20;

            function starExplosion(a) {
                TweenMax.set(a, {pixi: {alpha: 0, blur: 0, scale: 0.05}});
                var tli = new TimelineMax({
                    onComplete: function () {
                        sendCommand();
                    }
                });
                tli.to(a, tm * 1, {ease: Power0.easeNone, pixi: {alpha: 1, scale: 0.5, blur: 1}})
                    .to(a, tm * 2, {ease: Elastic.easeOut.config(2.5, 0.1), pixi: {alpha: 0, scale: 5, blur: 200}});
            }

            function moveBaguette() {
                tl.to(_assets.baguette, tm, {
                    pixi: {rotation: "-=" + dpt}, ease: Power3.easeOut
                })
                    .to(_assets.baguette, tm * 2, {
                        pixi: {rotation: "+=" + (2 * dpt)}, ease: Power3.easeOut, onStart: function () {
                            starExplosion(_assets.etoiles);
                        }
                    })
                    .to(_assets.baguette, tm, {pixi: {rotation: "-=" + dpt}, ease: Elastic.easeOut.config(1, 0.5)});
            }

            function sendCommand() {
                if (_device_manager.isConnected()) {
                    _device_manager.try_to_explose(function () {
                        _try_cb();
                        _shaking = false;
                        watch();
                    }, function () {
                        _end_cb();
                        _shaking = false;
                    });
                } else {
                    navigator.notification.alert("Allume ton Kifépaf avant de lancer ton sort");
                    _shaking = false;
                    watch();
                    _device_manager.connect();
                }
            }

            moveBaguette();
        }
    }

    function watch() {
        shake.startWatch(shaker, SENSIBILITY, function () {
            shake.stopWatch();
        });
    }

    return {
        start: function (assets, devicemanager, try_cb, end_cb) {
            _try_cb = try_cb;
            _end_cb = end_cb;
            _device_manager = devicemanager;
            _assets = assets;

            TweenMax.set(_assets.baguette, {pixi: {rotation: 90}});

            _device_manager.connect();

            watch();
        }
    }
})();
