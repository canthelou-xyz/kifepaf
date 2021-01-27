var Boomiz = (function () {
    var _device, _service, _charact;
    var SERVICE_UUID = "0000dfb0-0000-1000-8000-00805f9b34fb";
    var CHARACT_UUID = "0000dfb1-0000-1000-8000-00805f9b34fb";

    var SERVICE2_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
    var CHARACT2_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';

    var CMD_EXPLOSE = "a".charCodeAt();
    var CMD_ERREUR = "a".charCodeAt();
    var MAX_ESSAIS = 3;
    var _device_connected = false;

    function connectToDevice(do_when_ok, do_on_error) {
        _device_connected = false;
        var to = setTimeout(function () {
            if (!_device && !_device_connected) {
                evothings.ble.stopScan();
                navigator.notification.alert("Le Kifépaf n'est pas branché ?", function () {
                    if (!!do_on_error) {
                        do_on_error();
                    }
                    else if (!!do_when_ok) {
                        do_when_ok();
                    }
                }, "Kifépaf", "Fermer");
            }
        }, 10000);
        evothings.ble.startScan(
            function (device) {
                if (device.name && device.name === "CHOCOBOUM") {
                    window.localStorage.removeItem("essais");
                    evothings.ble.stopScan();
                    clearTimeout(to);
                    evothings.ble.connectToDevice(
                        device,
                        function (device) {
                            _device = device;
                            _device_connected = true;
                            if (!!do_when_ok) do_when_ok();
                        },
                        function (device) {
                            clearTimeout(to);
                            _device_connected = false;
                            evothings.ble.close(_device);
                            navigator.notification.alert("Le Kifépaf est déconnecté ?", function () {
                                if (!!do_on_error) {
                                    do_on_error();
                                }
                                else if (!!do_when_ok) {
                                    do_when_ok();
                                }
                            }, "Kifépaf", "Fermer");
                        },
                        function (device) {
                            clearTimeout(to);
                            _device_connected = false;
                            evothings.ble.close(_device);
                            navigator.notification.alert("Le Kifépaf a rencontré une erreur ?", function () {
                                if (!!do_on_error) {
                                    do_on_error();
                                }
                                else if (!!do_when_ok) {
                                    do_when_ok();
                                }
                            }, "Kifépaf", "Fermer");
                        }
                    )
                }
            },
            function (error_code) {
                clearTimeout(to);
                _device_connected = false;
                /*navigator.notification.alert("Le Kifépaf n'a pas été trouvé ?", function () {*/
                    if (!!do_on_error) {
                        do_on_error();
                    }
                    else if (!!do_when_ok) {
                        do_when_ok();
                    }
                /*}, "Kifépaf", "Fermer");*/
            }
        );
    }

    function sendCommand(unint, is_ok, is_nok) {
        var charact;
        if(!!evothings.ble.getService(_device, SERVICE_UUID)) {
            charact = evothings.ble.getCharacteristic(evothings.ble.getService(_device, SERVICE_UUID), CHARACT_UUID);
        } else {
            charact = evothings.ble.getCharacteristic(evothings.ble.getService(_device, SERVICE2_UUID), CHARACT2_UUID);
        }
        evothings.ble.writeCharacteristic(
            _device,
            charact,
            new Uint8Array([unint]),
            function () {
                is_ok();
            },
            function (errorCode) {
                is_nok(error_code);
            });
    }

    function canSendErrorCommands() {
        return false;
    }

    return {
        isConnected: function () {
            return (!!_device_connected);
        },

        connect: function (do_when_ok, do_when_error) {
            if (!_device) {
                connectToDevice(do_when_ok, do_when_error);
            } else {
                do_when_ok();
            }
        },

        repeatUntilConnect: function (do_when_ok, trials) {
            if (trials > 0) {
                if (!_device) {
                    connectToDevice(do_when_ok, function () {
                        Boomiz.repeatUntilConnect(do_when_ok, trials - 1);
                    });
                } else {
                    do_when_ok();
                }
            } else {
                navigator.notification.alert("Le Kifépaf n'a pas pu être joint \n :(", function () {
                    PIXIScene.gotoScreen("index");
                }, "Kifépaf", "Fermer");
            }
        },

        try_to_explose: function (show_error, show_ok) {
            if (!!_device) {
                var essais = window.localStorage.getItem("essais");
                if (essais === null) essais = 0;
                essais = parseInt(essais) + 1;
                if (essais < MAX_ESSAIS) {
                    window.localStorage.setItem("essais", essais);
                    if (canSendErrorCommands()) {
                        sendCommand(CMD_ERREUR);
                    }
                    show_error();
                } else if (essais === MAX_ESSAIS) {
                    window.localStorage.setItem("essais", essais + 1);
                    show_ok();
                }
            }
        },

        explose: function () {
            if (!!_device) {
                sendCommand(CMD_EXPLOSE, function () {
                    navigator.vibrate(2000);
                }, function (error_code) {
                    navigator.notification.alert("Le Kifépaf n'est pas branché ?", function () {

                    }, "Kifépaf", "Fermer");
                });
            }
        }
    }
})();
