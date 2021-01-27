function consolelog(s) {
    document.getElementById("messages").innerHTML += "<p><small>" + s + "</small></p>";
}

var PIXIScene = (function () {
        var _name = "";
        var _assets = [];
        var _sounds = [];
        var _actions = [];
        var _game;

        var _after_scene_load = function (assets) {
        };

        function getScreenAligner() {
            var sa = _game.screen;
            sa.x = sa.width / 2;
            sa.y = sa.height / 2;
            return sa;
        }

        return {
            add: function (s) {
                _game.stage.addChild(s);
            },

            assets: function () {
                return _assets;
            },

            asset: function (name) {
                return _assets[name];
            },

            after: function (cb) {
                _after_scene_load = cb;
            },

            load: function (game, postcb) {
                _game = game;
                for (var ia = 0, max = _assets.length; ia < max; ia++) {
                    if (_assets[ia].file) {
                        PIXI.loader.add(_assets[ia].name, _assets[ia].file);
                    }
                }
                for (var is = 0, max = _sounds.length; is < max; is++) {
                    if (_sounds[is].file) {
                        PIXI.loader.add(_sounds[is].name, _sounds[is].file);
                    }
                }
                PIXI.loader.load(function (loader, resources) {
                    for (ia = 0, max = _assets.length; ia < max; ia++) {
                        var a;
                        if (_assets[ia].text) {
                            var style = new PIXI.TextStyle(_assets[ia].options);
                            a = new PIXI.Text(_assets[ia].text, style);
                            a.anchor.x = 0;
                            a.anchor.y = 0;
                            a.x = _assets[ia].x;
                            a.y = _assets[ia].y;
                        } else {
                            a = new PIXI.Sprite(resources[_assets[ia].name].texture);
                            if (_assets[ia].xy === true) {
                                a.anchor.x = 0;
                                a.anchor.y = 0;
                            } else {
                                a.anchor.x = 0.5;
                                a.anchor.y = 0.5;
                            }
                            a.x = _assets[ia].x;
                            a.y = _assets[ia].y;
                        }
                        a.alpha = _assets[ia].alpha;
                        a.scale = new PIXI.Point(0.5, 0.5);
                        if (_assets[ia].button) {
                            a.interactive = true;
                            a.buttonMode = true;
                        }
                        _assets[ia].sprite = a;
                        _assets[_assets[ia].name] = a;
                        game.stage.addChild(a);
                    }

                    [].forEach.call(_sounds, function (el, ia) {
                        if (resources[el.name] && resources[el.name].sound) {
                            _assets[el.name] = resources[el.name].sound;
                        }
                    });

                    [].forEach.call(_actions, function (el, ia) {
                        var tia = ia;
                        _assets[_actions[ia].sourcename].interactive = true;
                        _assets[_actions[ia].sourcename].buttonMode = true;
                        _assets[_actions[ia].sourcename].on(_actions[ia].actionname, function (ev) {
                            el.callback(ev, _assets, game);
                        });
                    });
                    _after_scene_load(_assets, game);
                    postcb(_assets, game);
                });
            },

            image: function (name, file, x, y, alpha) {
                _assets.push({
                    name: name,
                    file: file,
                    x: x,
                    y: y,
                    xy: false,
                    alpha: alpha || (alpha === 0 ? 0 : 1),
                    button: false
                })
            },

            imagexy: function (name, file, x, y, alpha) {
                _assets.push({
                    name: name,
                    file: file,
                    x: x,
                    y: y,
                    xy: true,
                    alpha: alpha || (alpha === 0 ? 0 : 1),
                    button: false
                })
            },

            button: function (name, file, x, y, alpha) {
                _assets.push({
                    name: name,
                    file: file,
                    x: x,
                    y: y,
                    xy: false,
                    alpha: alpha || (alpha === 0 ? 0 : 1),
                    button: true
                })
            },

            text: function (name, str, x, y, w, opt, file) {
                var options = Object.assign(opt, {
                    fontFamily: 'Arial',
                    fontSize: 42,
                    fill: '#ffffff',
                    wordWrap: true,
                    wordWrapWidth: w
                });
                if (file) {
                    _assets.push({
                        name: name,
                        file: file,
                        text: str,
                        x: x,
                        y: y,
                        options: options
                    })
                } else {
                    _assets.push({
                        name: name,
                        text: str,
                        x: x,
                        y: y,
                        options: options
                    })
                }
            },

            sound: function (name, file) {
                _sounds.push({
                    name: name,
                    file: file
                })
            },

            action: function (sourcename, cb, actionname) {
                _actions.push({
                    sourcename: sourcename,
                    callback: cb,
                    actionname: actionname || "tap"
                });
            },

            gotoScreen: function (name, delay) {
                var d = delay || 0;
                setTimeout(function () {
                    window.location.href = name + ".html";
                }, d);
            },

            alignLeft: function (toalign, aligner, plus) {
                aligner = aligner || getScreenAligner();
                plus = plus || 0;
                toalign.x = aligner.x - aligner.width / 2 + toalign.width / 2 + plus;
            },

            alignCenter: function (toalign, aligner, plus) {
                aligner = aligner || getScreenAligner();
                plus = plus || 0;
                toalign.x = aligner.x + plus;
            },

            alignRight: function (toalign, aligner, plus) {
                aligner = aligner || getScreenAligner();
                plus = plus || 0;
                toalign.x = aligner.x + aligner.width / 2 - toalign.width / 2 + plus;
            },

            alignTop: function (toalign, aligner, plus) {
                aligner = aligner || getScreenAligner();
                plus = plus || 0;
                toalign.y = aligner.y - aligner.height / 2 + toalign.height / 2 + plus;
            },

            alignMiddle: function (toalign, aligner, plus) {
                aligner = aligner || getScreenAligner();
                plus = plus || 0;
                toalign.y = aligner.y + plus;
            },

            alignBottom: function (toalign, aligner, plus) {
                aligner = aligner || getScreenAligner();
                plus = plus || 0;
                toalign.y = aligner.y + aligner.height / 2 - toalign.height / 2 + plus;
            },

            alignLeftTop: function (toalign, aligner, plus) {
                PIXIScene.alignLeft(toalign, aligner, plus && plus.x || 0);
                PIXIScene.alignTop(toalign, aligner, plus && plus.y || 0);
            },
            alignLeftMiddle: function (toalign, aligner, plus) {
                PIXIScene.alignLeft(toalign, aligner, plus && plus.x || 0);
                PIXIScene.alignMiddle(toalign, aligner, plus && plus.y || 0);
            },
            alignLeftBottom: function (toalign, aligner, plus) {
                PIXIScene.alignLeft(toalign, aligner, plus && plus.x || 0);
                PIXIScene.alignBottom(toalign, aligner, plus && plus.y || 0);
            },

            alignCenterTop: function (toalign, aligner, plus) {
                PIXIScene.alignCenter(toalign, aligner, plus && plus.x || 0);
                PIXIScene.alignTop(toalign, aligner, plus && plus.y || 0);
            },
            alignCenterMiddle: function (toalign, aligner, plus) {
                PIXIScene.alignCenter(toalign, aligner, plus && plus.x || 0);
                PIXIScene.alignMiddle(toalign, aligner, plus && plus.y || 0);
            },
            alignCenterBottom: function (toalign, aligner, plus) {
                PIXIScene.alignCenter(toalign, aligner, plus && plus.x || 0);
                PIXIScene.alignBottom(toalign, aligner, plus && plus.y || 0);
            },

            alignRightTop: function (toalign, aligner, plus) {
                PIXIScene.alignRight(toalign, aligner, plus && plus.x || 0);
                PIXIScene.alignTop(toalign, aligner, plus && plus.y || 0);
            },
            alignRightMiddle: function (toalign, aligner, plus) {
                PIXIScene.alignRight(toalign, aligner, plus && plus.x || 0);
                PIXIScene.alignMiddle(toalign, aligner, plus && plus.y || 0);
            },
            alignRightBottom: function (toalign, aligner, plus) {
                PIXIScene.alignRight(toalign, aligner, plus && plus.x || 0);
                PIXIScene.alignBottom(toalign, aligner, plus && plus.y || 0);
            },
            /**
             * Animation commune des boutons
             * @param button_name
             */
            buttonAnimation: function (a_button, on_complete_cb) {
                var obj = undefined;
                var complete_cb;
                if ("" + on_complete_cb === on_complete_cb) {
                    complete_cb = function () {
                        PIXIScene.gotoScreen(on_complete_cb);
                    };
                } else {
                    complete_cb = on_complete_cb || function () {
                    };
                }
                if ("" + a_button === a_button) {
                    obj = _assets[a_button];
                } else {
                    obj = a_button;
                }
                TweenMax.to(obj, 0.2, {
                    pixi: {scale: "-=0.05"},
                    ease: Back.easeOut.config(1.7),
                    onComplete: function () {
                        complete_cb();
                    }
                });
            }
        }
    }
)();


/*
 * Raccourcis pour Greensock
 *
 * TweenMax.to(gs("sprite1","sprite2"),...)
 *
 * **/
function g() {
    var newar = [];
    [].forEach.call(arguments, function (el) {
        newar.push(PIXIScene.asset(el));
    });
    return newar;
}


/**
 * Animation commune des écrans de félicitations
 * @param assets
 * @param dest
 */
function felicitations(assets, dest) {
    var tl1 = new TimelineMax();
    tl1.fromTo(assets.felicitation, 0.25, {pixi: {scale: 0, alpha: 0}}, {
        pixi: {scale: 0.5, alpha: 1},
        ease: Elastic.easeOut.config(1, 0.75)
    })
        .fromTo(assets.nivaccompli, 0.25, {pixi: {scale: 0, alpha: 0}}, {
            pixi: {scale: 0.5, alpha: 1},
            ease: Elastic.easeOut.config(1, 0.75)
        }, "-=0.2");
    var tl2 = new TimelineMax();
    tl2.fromTo(assets.etoiles1, 0.25, {pixi: {scale: 0, alpha: 0}}, {
        delay: 0, onStart: function () {
            assets.fire.play({
                complete: function () {
                    PIXIScene.gotoScreen(dest, 1000);
                }
            });
        }, pixi: {scale: 0.5, alpha: 1}, ease: Power0.easeNone
    })
        .to(assets.etoiles1, 3, {pixi: {scale: 2, alpha: 0, blur: 10}, ease: Power3.easeOut})
        .fromTo(assets.etoiles2, 0.25, {pixi: {scale: 0, alpha: 0}}, {
            pixi: {scale: 0.5, alpha: 1}, ease: Power0.easeNone
        }, "-=3.2")
        .to(assets.etoiles2, 3, {pixi: {scale: 3, alpha: 0, blur: 10}, ease: Power3.easeOut}, "-=3");
}
