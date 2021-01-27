var jeu1 = (function () {
    var max_oiseaux = Math.ceil(Math.random() * 5) + 5;
    var num = max_oiseaux;
    var oiseau = "oiseau1";
    var chapeau = 1;
    var timeout = undefined;
    var upy = 60;
    var max_wait = 2;
    var max_lapse = 2000;
    var min_lapse = 1000;
    var points = 0;
    var max_points = 4;
    var progress, fond;


    return {
        initPoints: function (p, assets, game) {
            progress = new PIXI.Graphics();
            progress.beginFill(0xdd0000);
            progress.drawRect(assets.fondbaguette.x - assets.fondbaguette.width / 2 + 4, assets.fondbaguette.y - 10, 0, 20);
            progress.endFill();

            game.stage.addChild(progress);
        },

        // getPoints: function () {
        //     return window.localStorage.getItem("points");
        // },
        addPoints: function (assets, game) {
            points++;
            var percent = points / max_points * 0.3333;
            var p = assets.fondbaguette.width * percent;

            //window.localStorage.setItem("points", percent);

            function drawBarre() {
                progress.beginFill(0xaa0000);
                progress.drawRect(assets.fondbaguette.x - assets.fondbaguette.width / 2 + 4, assets.fondbaguette.y - 10, p - 7, 20);
                progress.endFill();
            }

            if (points == max_points) {
                TweenMax.set(PIXIScene.asset("etoiles"), {pixi: {x: p, alpha: 0, scaleX: 0, scaleY: 0, blur: 1}});
                TweenMax.to(PIXIScene.asset("etoiles"), 0.2, {pixi: {alpha: 1}});
                TweenMax.to(PIXIScene.asset("etoiles"), 0.3, {
                    pixi: {scaleX: 2, scaleY: 2, blur: 1}, ease: Elastic.easeOut.Power1, onComplete: function () {
                        drawBarre();
                        TweenMax.to(PIXIScene.asset("etoiles"), 2, {
                            pixi: {scaleX: 3, scaleY: 3, blur: 20, alpha: 0}
                        });
                    }
                });
            } else {
                TweenMax.set(PIXIScene.asset("etoiles"), {
                    pixi: {
                        x: p + assets.fondbaguette.x - assets.fondbaguette.width / 2 + 4,
                        alpha: 0,
                        scaleX: 0,
                        scaleY: 0,
                        blur: 1
                    }
                });
                var tla = new TimelineMax();
                tla.to(PIXIScene.asset("etoiles"), 0.2, {pixi: {alpha: 1}})
                    .to(PIXIScene.asset("etoiles"), 0.3, {
                        pixi: {scaleX: 0.5, scaleY: 0.5, blur: 1},
                        ease: Elastic.easeOut.Power1,
                        onStart: function () {
                            drawBarre();
                        }
                    })
                    .to(PIXIScene.asset("etoiles"), 1, {
                        pixi: {scaleX: 0.6, scaleY: 0.6, blur: 20, alpha: 0},
                        ease: Elastic.easeOut.Power1
                    });
            }
        },

        oiseauNouveau: function () {
            if (points == max_points) {
                return false;
            }else{
                chapeau += Math.ceil(Math.random() * (max_oiseaux / 2));
                if (chapeau >= max_oiseaux) chapeau = Math.ceil(Math.random() * (max_oiseaux / 2));
                return true;
            }
            // if (num > 1) {
            //     num--;
            // }
            return false;
        },

        oiseauApparait: function () {
            PIXIScene.asset(oiseau).interactive = false;
            TweenMax.set(PIXIScene.asset(oiseau), {pixi: {alpha: 0, x: 0, y: 0}});
            oiseau = "oiseau" + (Math.ceil(Math.random() * 2) + 1);
            PIXIScene.asset(oiseau).x = PIXIScene.asset("chapeau" + chapeau).x;
            PIXIScene.asset(oiseau).y = PIXIScene.asset("chapeau" + chapeau).y;
            var dur = 0.1;
            var wait = Math.floor(Math.random() * max_wait) + 1;
            PIXIScene.asset(oiseau).interactive = true;


            TweenMax.to(PIXIScene.asset(oiseau), dur, {
                pixi: {alpha: 1, y: "-=" + upy}, delay: wait, onComplete: function () {
                    PIXIScene.asset("cuicui").play();
                    TweenMax.to(PIXIScene.asset("chapeau" + chapeau), 0.1, {
                        repeat: 1,
                        yoyo: true,
                        pixi: {scaleY: "+=0.05"}
                    });
                    var lapse = Math.floor(Math.random() * (max_lapse - min_lapse)) + min_lapse + 1;
                    timeout = setTimeout(function () {
                        jeu1.oiseauDisparait();
                    }, lapse);
                }
            });
        },

        oiseauDisparait: function () {
            clearTimeout(timeout);
            PIXIScene.asset(oiseau).interactive = false;
            TweenMax.to(PIXIScene.asset(oiseau), 0.1, {pixi: {alpha: 0, y: "+=" + upy}});
            TweenMax.to(PIXIScene.asset("chapeau" + chapeau), 0.1, {repeat: 1, yoyo: true, pixi: {scaleX: "+=0.05"}});
            TweenMax.to(PIXIScene.asset("splash"), 0.15, {
                pixi: {
                    alpha: 0,
                    scaleX: 0,
                    scaleY: 0
                },
                ease: Elastic.easeOut.config(1, 0.1),
                onComplete: function () {
                    if (jeu1.oiseauNouveau()) {
                        jeu1.oiseauApparait();
                    } else {
                        jeu1.fin();
                    }
                }
            });
        },

        oiseauExplose: function (n, assets, game) {
            clearTimeout(timeout);
            TweenMax.to(PIXIScene.asset(n), 0.25, {pixi: {alpha: 0, y: "+=" + upy}});
            PIXIScene.asset("splash").x = PIXIScene.asset("chapeau" + chapeau).x;
            PIXIScene.asset("splash").y = PIXIScene.asset("chapeau" + chapeau).y - 20;
            TweenMax.to(PIXIScene.asset("chapeau" + chapeau), 0.25, {
                ease: Elastic.easeOut.config(1, 0.1),
                repeat: 1,
                yoyo: true,
                pixi: {scaleX: "+=0.1", rotation: "+=" + (10 - 20 * Math.random())}
            });
            PIXIScene.asset("spell").play();
            TweenMax.to(PIXIScene.asset("splash"), 0.5, {
                pixi: {
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1
                },
                ease: Elastic.easeOut.config(1, 0.1),
                onComplete: function () {

                    jeu1.addPoints(assets, game);

                    TweenMax.to(PIXIScene.asset("splash"), 0.15, {
                        pixi: {
                            alpha: 0,
                            scaleX: 0,
                            scaleY: 0
                        },
                        ease: Elastic.easeOut.config(1, 0.1),
                        onComplete: function () {
                            if (jeu1.oiseauNouveau()) {
                                jeu1.oiseauApparait();
                            } else {
                                jeu1.fin();
                            }
                        }
                    });
                }
            });
        },

        fin: function () {
            PIXIScene.asset(oiseau).interactive = false;
            TweenMax.set(PIXIScene.asset("etoiles"), {pixi: {alpha: 0, scaleX: 0, scaleY: 0, blur: 1}});
            TweenMax.to(PIXIScene.asset("etoiles"), 0.2, {pixi: {alpha: 1}});
            TweenMax.to(PIXIScene.asset("etoiles"), 0.3, {
                pixi: {scaleX: 2, scaleY: 2, blur: 1}, ease: Elastic.easeOut.Power1, onComplete: function () {
                    PIXIScene.asset("tada").play();
                    TweenMax.to(PIXIScene.asset("etoiles"), 2, {
                        pixi: {scaleX: 3, scaleY: 3, blur: 20, alpha: 0},
                        onComplete: function () {
                            PIXIScene.gotoScreen("felicitations1");
                        }
                    });
                }
            });
            TweenMax.set(PIXIScene.asset(oiseau), {pixi: {alpha: 0, y: 0, x: 0}});
        }
    }
})();


var jeu2 = (function () {
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    var fake_randomize = shuffle([1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6]);
    var max_cartes = fake_randomize.length;
    var num = max_cartes;
    var carte = ["carte1", "carte2"];
    var chapeau = [1, 3];
    var timeout = undefined;
    var upy = 60;
    var max_wait = 1;
    var max_lapse = 1500;
    var min_lapse = 1000;
    var points = 0, starting_points = 0, max_points = 3;
    var progress, fond;

    function random_array_minus(c, m, moreof, perc) {
        perc = perc || 50;
        var new_array = _.difference(c, m);
        var n = new_array[Math.floor(Math.random() * (new_array.length))];
        if ((_.indexOf(new_array, moreof) !== -1) && (Math.random() * 100 > (100 - perc))) n = moreof;
        console.log(c, m, new_array, "i", n);
        return n;
    }

    function oneShouldBe(arr, elt) {
        if (_.indexOf(arr, elt) > 0) {
        } else {
            arr[0] = elt;
        }
        return arr;
    }

    var autreChapeau = function (forbidden) {
        c1 = random_array_minus(_.range(1, 10), chapeau);
        c2 = random_array_minus(_.range(1, 10), _.concat(chapeau, c1));
        return [c1, c2];
    };

    var autreCarte = function (forbidden) {
        c1 = random_array_minus(["carte1", "carte2", "carte3", "carte4", "carte5", "carte6"], carte, "carte1", 90);
        c2 = random_array_minus(["carte1", "carte2", "carte3", "carte4", "carte5", "carte6"], _.concat(carte, c1), "carte1", 90);

        return oneShouldBe([c1, c2], "carte1");
    };

    return {
        // getPoints: function () {
        //     return window.localStorage.getItem("points");
        // },
        initPoints: function (p, assets, game) {
            starting_points = 1 * p;
            p = assets.fondbaguette.width * 0.3333;
            progress = new PIXI.Graphics();
            progress.beginFill(0xaa0000);
            progress.drawRect(assets.fondbaguette.x - assets.fondbaguette.width / 2 + 4, assets.fondbaguette.y - 10, p - 7, 20);
            progress.endFill();
            game.stage.addChild(progress);
        },
        addPoints: function (assets, game) {
            points++;
            var percent = 1 * points / max_points * 0.3333;
            var p = assets.fondbaguette.width * (0.3333 + percent);

            // window.localStorage.setItem("points", percent);

            function drawBarre() {
                progress.beginFill(0xaa0000);
                progress.drawRect(assets.fondbaguette.x - assets.fondbaguette.width / 2 + 4, assets.fondbaguette.y - 10, p - 7, 20);
                progress.endFill();
            }

            TweenMax.set(PIXIScene.asset("etoiles"), {
                pixi: {
                    x: p + assets.fondbaguette.x - assets.fondbaguette.width / 2 + 4,
                    alpha: 0,
                    scaleX: 0,
                    scaleY: 0,
                    blur: 1
                }
            });
            var tla = new TimelineMax();
            tla.to(PIXIScene.asset("etoiles"), 0.2, {pixi: {alpha: 1}})
                .to(PIXIScene.asset("etoiles"), 0.3, {
                    pixi: {scaleX: 0.5, scaleY: 0.5, blur: 1},
                    ease: Elastic.easeOut.Power1,
                    onStart: function () {
                        drawBarre();
                    }
                })
                .to(PIXIScene.asset("etoiles"), 0.5, {
                    pixi: {scaleX: 0.6, scaleY: 0.6, blur: 20, alpha: 0},
                    ease: Elastic.easeOut.Power1
                });
        },

        carteNouveau: function () {
            if (points === max_points) return false;
            chapeau = autreChapeau(chapeau);
            return true;
        },

        carteApparait: function () {
            PIXIScene.asset(carte[0]).interactive = false;
            PIXIScene.asset(carte[1]).interactive = false;
            TweenMax.set([PIXIScene.asset(carte[0]), PIXIScene.asset(carte[1])], {pixi: {alpha: 0, x: 0, y: 0}});
            carte = autreCarte(carte);

            PIXIScene.asset(carte[0]).chapeau = chapeau[0];
            PIXIScene.asset(carte[1]).chapeau = chapeau[1];

            PIXIScene.asset(carte[0]).x = PIXIScene.asset("chapeau" + chapeau[0]).x;
            PIXIScene.asset(carte[0]).y = PIXIScene.asset("chapeau" + chapeau[0]).y;
            PIXIScene.asset(carte[1]).x = PIXIScene.asset("chapeau" + chapeau[1]).x;
            PIXIScene.asset(carte[1]).y = PIXIScene.asset("chapeau" + chapeau[1]).y;
            PIXIScene.asset(carte[0]).interactive = true;
            PIXIScene.asset(carte[1]).interactive = true;

            var dur = 0.1;
            var wait = Math.floor(Math.random() * max_wait) + 1;

            TweenMax.to([PIXIScene.asset(carte[0]), PIXIScene.asset(carte[1])], dur, {
                pixi: {alpha: 1, y: "-=" + upy}, delay: wait, onComplete: function () {
                    TweenMax.to([PIXIScene.asset("chapeau" + chapeau[0]), PIXIScene.asset("chapeau" + chapeau[1])], 0.1, {
                        repeat: 1,
                        yoyo: true,
                        pixi: {scaleY: "+=0.05"}
                    });
                    var lapse = Math.floor(Math.random() * (max_lapse - min_lapse)) + min_lapse + 1;
                    timeout = setTimeout(function () {
                        jeu2.carteDisparait();
                    }, lapse);
                }
            });
        },

        carteDisparait: function () {
            clearTimeout(timeout);
            PIXIScene.asset(carte[0]).interactive = false;
            PIXIScene.asset(carte[1]).interactive = false;
            TweenMax.to([PIXIScene.asset(carte[0]), PIXIScene.asset(carte[1])], 0.1, {pixi: {alpha: 0, y: "+=" + upy}});
            TweenMax.to([PIXIScene.asset("chapeau" + chapeau[0]), PIXIScene.asset("chapeau" + chapeau[1])], 0.1, {
                repeat: 1,
                yoyo: true,
                pixi: {scaleX: "+=0.05"}
            });
            TweenMax.to(PIXIScene.asset("splash"), 0.15, {
                pixi: {
                    alpha: 0,
                    scaleX: 0,
                    scaleY: 0
                },
                ease: Elastic.easeOut.config(1, 0.1),
                onComplete: function () {
                    if (jeu2.carteNouveau()) {
                        jeu2.carteApparait();
                    } else {
                        jeu2.fin();
                    }
                }
            });
        },

        carteExplose: function (n, assets, game) {

            clearTimeout(timeout);
            TweenMax.to(PIXIScene.asset(n), 0.25, {pixi: {alpha: 0, y: "+=" + upy}});
            PIXIScene.asset("splash").x = PIXIScene.asset("chapeau" + chapeau[0]).x;
            PIXIScene.asset("splash").y = PIXIScene.asset("chapeau" + chapeau[0]).y - 20;
            TweenMax.to(PIXIScene.asset("chapeau" + chapeau[0]), 0.25, {
                ease: Elastic.easeOut.config(1, 0.1),
                repeat: 1,
                yoyo: true,
                pixi: {scaleX: "+=0.1", rotation: "+=" + (10 - 20 * Math.random())}
            });
            PIXIScene.asset("tap").play();
            TweenMax.to(PIXIScene.asset("splash"), 0.5, {
                pixi: {
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1
                },
                ease: Elastic.easeOut.config(1, 0.1),
                onComplete: function () {
                    jeu2.addPoints(assets, game);
                    TweenMax.to(PIXIScene.asset("splash"), 0.15, {
                        pixi: {
                            alpha: 0,
                            scaleX: 0,
                            scaleY: 0
                        },
                        ease: Elastic.easeOut.config(1, 0.1),
                        onComplete: function () {
                            if (jeu2.carteNouveau()) {
                                jeu2.carteApparait();
                            } else {
                                _.delay(function () {
                                    jeu2.fin();
                                }, 1000);
                            }
                        }
                    });
                }
            });
        },

        carteMauvaiseExplose: function (n, assets, game) {
            navigator.vibrate(25);
            clearTimeout(timeout);
            TweenMax.to(PIXIScene.asset(n), 0.25, {pixi: {alpha: 0, y: "+=" + upy}});
            PIXIScene.asset("splash").x = PIXIScene.asset("chapeau" + assets[n].chapeau).x;
            PIXIScene.asset("splash").y = PIXIScene.asset("chapeau" + assets[n].chapeau).y - 20;
            TweenMax.to(PIXIScene.asset("chapeau" + assets[n].chapeau), 0.25, {
                ease: Elastic.easeOut.config(1, 0.1),
                repeat: 1,
                yoyo: true,
                pixi: {scaleX: "+=0.1", rotation: "+=" + (10 - 20 * Math.random())}
            });

            // PIXIScene.asset("splash").x = PIXIScene.asset("chapeau" + chapeau[1]).x;
            // PIXIScene.asset("splash").y = PIXIScene.asset("chapeau" + chapeau[1]).y - 20;
            // TweenMax.to(PIXIScene.asset("chapeau" + chapeau[1]), 0.25, {
            //     ease: Elastic.easeOut.config(1, 0.1),
            //     repeat: 1,
            //     yoyo: true,
            //     pixi: {scaleX: "+=0.1", rotation: "+=" + (10 - 20 * Math.random())}
            // });

            PIXIScene.asset("erreur").play();
            TweenMax.to(PIXIScene.asset("splash"), 0.5, {
                pixi: {
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1
                },
                ease: Elastic.easeOut.config(1, 0.1),
                onComplete: function () {
                    TweenMax.to(PIXIScene.asset("splash"), 0.15, {
                        pixi: {
                            alpha: 0,
                            scaleX: 0,
                            scaleY: 0
                        },
                        ease: Elastic.easeOut.config(1, 0.1),
                        onComplete: function () {
                            if (jeu2.carteNouveau()) {
                                jeu2.carteApparait();
                            } else {
                                jeu2.fin();
                            }
                        }
                    });
                }
            });
        },

        fin: function () {
            // PIXIScene.asset(lapin).interactive = false;
            TweenMax.set(PIXIScene.asset("etoiles"), {pixi: {alpha: 0, scaleX: 0, scaleY: 0, blur: 1}});
            TweenMax.to(PIXIScene.asset("etoiles"), 0.2, {pixi: {alpha: 1}});
            TweenMax.to(PIXIScene.asset("etoiles"), 0.3, {
                pixi: {scaleX: 2, scaleY: 2, blur: 1}, ease: Elastic.easeOut.Power1, onComplete: function () {
                    PIXIScene.asset("tada").play();
                    TweenMax.to(PIXIScene.asset("etoiles"), 2, {
                        pixi: {scaleX: 3, scaleY: 3, blur: 20, alpha: 0},
                        onComplete: function () {
                            PIXIScene.gotoScreen("felicitations2");
                        }
                    });
                }
            });
            TweenMax.set([PIXIScene.asset(carte[0]), PIXIScene.asset(carte[1])], {pixi: {alpha: 0, y: 0, x: 0}});
        }
    }
})();


var jeu3 = (function () {
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    var fake_randomize = shuffle([1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6]);
    var max_lapins = fake_randomize.length;
    var num = max_lapins;
    var lapin = ["lapin1", "lapin3"];
    var chapeau = [1, 3];
    var timeout = undefined;
    var upy = 60;
    var max_wait = 0.5;
    var max_lapse = 1200;
    var min_lapse = 600;
    var points = 0, starting_points = 0, max_points = 3;
    var progress, fond;

    function random_array_minus(c, m, moreof, perc) {
        perc = perc || 50;
        var new_array = _.difference(c, m);
        var n = new_array[Math.floor(Math.random() * (new_array.length))];
        if ((_.indexOf(new_array, moreof) !== -1) && (Math.random() * 100 > (100 - perc))) n = moreof;
        console.log(c, m, new_array, "i", n);
        return n;
    }

    var autreChapeau = function (forbidden) {
        c1 = random_array_minus(_.range(1, 10), chapeau);
        c2 = random_array_minus(_.range(1, 10), _.concat(chapeau, c1));
        return [c1, c2];
    };

    var autreLapin = function (forbidden) {
        c1 = random_array_minus(["lapin1", "lapin2", "lapin3", "lapin4", "lapin5", "lapin6"], lapin, "lapin1", 80);
        c2 = random_array_minus(["lapin3", "lapin4", "lapin5", "lapin6"], _.concat(lapin, c1));

        return [c1, c2];
    };

    return {
        // getPoints: function () {
        //     return window.localStorage.getItem("points");
        // },
        initPoints: function (p, assets, game) {
            starting_points = 1 * p;
            p = assets.fondbaguette.width * 0.66;
            progress = new PIXI.Graphics();
            progress.beginFill(0xaa0000);
            progress.drawRect(assets.fondbaguette.x - assets.fondbaguette.width / 2 + 4, assets.fondbaguette.y - 10, p - 7, 20);
            progress.endFill();
            game.stage.addChild(progress);
        },
        addPoints: function (assets, game) {
            points++;
            var percent = 1 * points / max_points * 0.333333;
            var p = assets.fondbaguette.width * (0.66 + percent);

            // window.localStorage.setItem("points", percent);

            function drawBarre() {
                progress.beginFill(0xaa0000);
                progress.drawRect(assets.fondbaguette.x - assets.fondbaguette.width / 2 + 4, assets.fondbaguette.y - 10, p - 7, 20);
                progress.endFill();
            }

            TweenMax.set(PIXIScene.asset("etoiles"), {
                pixi: {
                    x: p + assets.fondbaguette.x - assets.fondbaguette.width / 2 + 4,
                    alpha: 0,
                    scaleX: 0,
                    scaleY: 0,
                    blur: 1
                }
            });
            var tla = new TimelineMax();
            tla.to(PIXIScene.asset("etoiles"), 0.2, {pixi: {alpha: 1}})
                .to(PIXIScene.asset("etoiles"), 0.3, {
                    pixi: {scaleX: 0.5, scaleY: 0.5, blur: 1},
                    ease: Elastic.easeOut.Power1,
                    onStart: function () {
                        drawBarre();
                    }
                })
                .to(PIXIScene.asset("etoiles"), 0.5, {
                    pixi: {scaleX: 0.6, scaleY: 0.6, blur: 20, alpha: 0},
                    ease: Elastic.easeOut.Power1
                });
        },

        lapinNouveau: function () {
            if (points === max_points) return false;
            chapeau = autreChapeau(chapeau);
            return true;
        },

        lapinApparait: function () {
            PIXIScene.asset(lapin[0]).interactive = false;
            PIXIScene.asset(lapin[1]).interactive = false;
            TweenMax.set([PIXIScene.asset(lapin[0]), PIXIScene.asset(lapin[1])], {pixi: {alpha: 0, x: 0, y: 0}});
            lapin = autreLapin(lapin);

            PIXIScene.asset(lapin[0]).chapeau = chapeau[0];
            PIXIScene.asset(lapin[1]).chapeau = chapeau[1];

            PIXIScene.asset(lapin[0]).x = PIXIScene.asset("chapeau" + chapeau[0]).x;
            PIXIScene.asset(lapin[0]).y = PIXIScene.asset("chapeau" + chapeau[0]).y;
            PIXIScene.asset(lapin[1]).x = PIXIScene.asset("chapeau" + chapeau[1]).x;
            PIXIScene.asset(lapin[1]).y = PIXIScene.asset("chapeau" + chapeau[1]).y;
            PIXIScene.asset(lapin[0]).interactive = true;
            PIXIScene.asset(lapin[1]).interactive = true;

            var dur = 0.1;
            var wait = Math.floor(Math.random() * max_wait) + 0.5;

            TweenMax.to([PIXIScene.asset(lapin[0]), PIXIScene.asset(lapin[1])], dur, {
                pixi: {alpha: 1, y: "-=" + upy}, delay: wait, onComplete: function () {
                    TweenMax.to([PIXIScene.asset("chapeau" + chapeau[0]), PIXIScene.asset("chapeau" + chapeau[1])], 0.1, {
                        repeat: 1,
                        yoyo: true,
                        pixi: {scaleY: "+=0.05"}
                    });
                    var lapse = Math.floor(Math.random() * (max_lapse - min_lapse)) + min_lapse + 1;
                    timeout = setTimeout(function () {
                        jeu3.lapinDisparait();
                    }, lapse);
                }
            });
        },

        lapinDisparait: function () {
            clearTimeout(timeout);
            PIXIScene.asset(lapin[0]).interactive = false;
            PIXIScene.asset(lapin[1]).interactive = false;
            TweenMax.to([PIXIScene.asset(lapin[0]), PIXIScene.asset(lapin[1])], 0.1, {pixi: {alpha: 0, y: "+=" + upy}});
            TweenMax.to([PIXIScene.asset("chapeau" + chapeau[0]), PIXIScene.asset("chapeau" + chapeau[1])], 0.1, {
                repeat: 1,
                yoyo: true,
                pixi: {scaleX: "+=0.05"}
            });
            TweenMax.to(PIXIScene.asset("splash"), 0.15, {
                pixi: {
                    alpha: 0,
                    scaleX: 0,
                    scaleY: 0
                },
                ease: Elastic.easeOut.config(1, 0.1),
                onComplete: function () {
                    if (jeu3.lapinNouveau()) {
                        jeu3.lapinApparait();
                    } else {
                        jeu3.fin();
                    }
                }
            });
        },

        lapinExplose: function (n, assets, game) {
            clearTimeout(timeout);
            TweenMax.to(PIXIScene.asset(n), 0.25, {pixi: {alpha: 0, y: "+=" + upy}});
            PIXIScene.asset("splash").x = PIXIScene.asset("chapeau" + assets[n].chapeau).x;
            PIXIScene.asset("splash").y = PIXIScene.asset("chapeau" + assets[n].chapeau).y - 20;
            TweenMax.to(PIXIScene.asset("chapeau" + assets[n].chapeau), 0.25, {
                ease: Elastic.easeOut.config(1, 0.1),
                repeat: 1,
                yoyo: true,
                pixi: {scaleX: "+=0.1", rotation: "+=" + (10 - 20 * Math.random())}
            });
            PIXIScene.asset("tap").play();
            TweenMax.to(PIXIScene.asset("splash"), 0.5, {
                pixi: {
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1
                },
                ease: Elastic.easeOut.config(1, 0.1),
                onComplete: function () {
                    jeu3.addPoints(assets, game);
                    TweenMax.to(PIXIScene.asset("splash"), 0.15, {
                        pixi: {
                            alpha: 0,
                            scaleX: 0,
                            scaleY: 0
                        },
                        ease: Elastic.easeOut.config(1, 0.1),
                        onComplete: function () {
                            if (jeu3.lapinNouveau()) {
                                jeu3.lapinApparait();
                            } else {
                                _.delay(function () {
                                    jeu3.fin();
                                }, 1000);
                            }
                        }
                    });
                }
            });
        },

        lapinMauvaisExplose: function (n, assets, game) {
            navigator.vibrate(25);
            clearTimeout(timeout);
            TweenMax.to(PIXIScene.asset(n), 0.25, {pixi: {alpha: 0, y: "+=" + upy}});
            PIXIScene.asset("splash").x = PIXIScene.asset("chapeau" + assets[n].chapeau).x;
            PIXIScene.asset("splash").y = PIXIScene.asset("chapeau" + assets[n].chapeau).y - 20;
            TweenMax.to(PIXIScene.asset("chapeau" + assets[n].chapeau), 0.25, {
                ease: Elastic.easeOut.config(1, 0.1),
                repeat: 1,
                yoyo: true,
                pixi: {scaleX: "+=0.1", rotation: "+=" + (10 - 20 * Math.random())}
            });

            // PIXIScene.asset("splash").x = PIXIScene.asset("chapeau" + chapeau[1]).x;
            // PIXIScene.asset("splash").y = PIXIScene.asset("chapeau" + chapeau[1]).y - 20;
            // TweenMax.to(PIXIScene.asset("chapeau" + chapeau[1]), 0.25, {
            //     ease: Elastic.easeOut.config(1, 0.1),
            //     repeat: 1,
            //     yoyo: true,
            //     pixi: {scaleX: "+=0.1", rotation: "+=" + (10 - 20 * Math.random())}
            // });

            PIXIScene.asset("erreur").play();
            TweenMax.to(PIXIScene.asset("splash"), 0.5, {
                pixi: {
                    alpha: 1,
                    scaleX: 1,
                    scaleY: 1
                },
                ease: Elastic.easeOut.config(1, 0.1),
                onComplete: function () {
                    TweenMax.to(PIXIScene.asset("splash"), 0.15, {
                        pixi: {
                            alpha: 0,
                            scaleX: 0,
                            scaleY: 0
                        },
                        ease: Elastic.easeOut.config(1, 0.1),
                        onComplete: function () {
                            if (jeu3.lapinNouveau()) {
                                jeu3.lapinApparait();
                            } else {
                                jeu3.fin();
                            }
                        }
                    });
                }
            });
        },

        fin: function () {
            // PIXIScene.asset(lapin).interactive = false;
            TweenMax.set(PIXIScene.asset("etoiles"), {pixi: {alpha: 0, scaleX: 0, scaleY: 0, blur: 1}});
            TweenMax.to(PIXIScene.asset("etoiles"), 0.2, {pixi: {alpha: 1}});
            TweenMax.to(PIXIScene.asset("etoiles"), 0.3, {
                pixi: {scaleX: 2, scaleY: 2, blur: 1}, ease: Elastic.easeOut.Power1, onComplete: function () {
                    PIXIScene.asset("tada").play();
                    TweenMax.to(PIXIScene.asset("etoiles"), 2, {
                        pixi: {scaleX: 3, scaleY: 3, blur: 20, alpha: 0},
                        onComplete: function () {
                            PIXIScene.gotoScreen("felicitations");
                        }
                    });
                }
            });
            TweenMax.set([PIXIScene.asset(lapin[0]), PIXIScene.asset(lapin[1])], {pixi: {alpha: 0, y: 0, x: 0}});
        }
    }
})();
