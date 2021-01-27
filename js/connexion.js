PIXIScene.image("fond", "img/OFC-App-V3-Bluetooth-01.png", 180, 320, 1);
PIXIScene.image("texte", "img/OFC-App-V3-Bluetooth-02.png", 180, 110, 1);
PIXIScene.image("main", "img/OFC-App-V3-Bluetooth-03A.png", 115, 305, 1);
PIXIScene.image("onde3", "img/OFC-App-V3-Bluetooth-03B3.png", 198, 360, 0);
PIXIScene.image("onde2", "img/OFC-App-V3-Bluetooth-03B2.png", 198, 360, 0);
PIXIScene.image("onde1", "img/OFC-App-V3-Bluetooth-03B1.png", 198, 360, 0);
PIXIScene.image("oeuf", "img/OFC-App-V3-Bluetooth-03C.png", 256, 477, 1);
PIXIScene.image("conoff", "img/OFC-App-V3-Bluetooth-05.png", 180, 270, 0);
PIXIScene.image("conon", "img/OFC-App-V3-Bluetooth-07.png", 180, 270, 0);
PIXIScene.image("texteconon", "img/OFC-App-V3-Bluetooth-06.png", 180, 365, 0);
PIXIScene.image("blue1", "img/OFC-App-V3-Bluetooth-08.png", 180, 450, 0);
PIXIScene.image("texteblue1", "img/OFC-App-V3-Bluetooth-09.png", 180, 540, 0);
PIXIScene.image("connecte", "img/OFC-App-V3-Bluetooth-10.png", 180, 250, 0);
PIXIScene.image("oeufc", "img/OFC-App-V3-Bluetooth-11.png", 180, 450, 0);

PIXIScene.image("fondgris", "img/OFC-App-V3-Bluetooth-01.png", 0, 0, 0);
PIXIScene.image("iconebt", "img/OFC-App-V3-Bluetooth-12.png", 0, 0, 0);
PIXIScene.image("nonconnecte", "img/OFC-App-V3-Bluetooth-13.png", 0, 0, 0);
PIXIScene.image("oeufgris", "img/OFC-App-V3-Bluetooth-14.png", 0, 0, 0);
PIXIScene.image("jeveuxjouer", "img/OFC-App-V3-Bluetooth-18.png", 0, 0, 0);
PIXIScene.image("reessayer", "img/OFC-App-V3-Bluetooth-15.png", 0, 0, 0);
PIXIScene.image("retour", "img/OFC-App-V3-Bluetooth-16.png", 0, 0, 0);

PIXIScene.sound("clicclac", "resources/clicclac.mp3");
PIXIScene.sound("zioup", "resources/zioup.wav");
PIXIScene.sound("wifi1", "resources/wifi3.mp3");
PIXIScene.sound("connectionbt", "resources/connectionbt.mp3");
PIXIScene.sound("nonconnectionbt", "resources/nonconnectionbt.mp3");

var connexion_next_screen = "intro1";

function createButton(game, text, callback, options) {
    callback = callback || undefined;
    options = options || undefined;
    var bouton = new PIXI.Container();
    var padding = options.padding || {x: 10, y: 5};
    var textes = new PIXI.TextStyle({
        fontFamily: options.font || 'Arial',
        fontSize: options.size || 18,
        fill: options.color || 0xffffff,
        align: options.align || 'center'
    });
    var textem = PIXI.TextMetrics.measureText(text, textes);
    game.stage.addChild(bouton);
    var rectangle = new PIXI.Graphics();
    var texte = new PIXI.Text(text, textes);
    bouton.addChild(rectangle);

    rectangle.beginFill(options.background | 0x000000, options.alpha || 1);
    rectangle.drawRoundedRect(0, 0, textem.width + padding.x * 2, textem.height + padding.y * 2, options.radius || 0);
    rectangle.endFill();
    bouton.addChild(texte);
    texte.position.x = padding.x;
    texte.position.y = padding.y;
    bouton.interactive = true;
    bouton.clic = bouton.tap = function () {
        PIXIScene.buttonAnimation(bouton,function(){
            callback();
        })
        // TweenMax.to(bouton, 0.2, {
        //     pixi: {scale: "-=0.05"},
        //     ease: Back.easeOut.config(1.7),
        //     onComplete: function () {
        //         callback();
        //     }
        // });
    };

    return bouton;
}

PIXIScene.after(function (assets, game) {

    var timeo;

    /**
     * Le bouton PASSER
     */
    var passer = createButton(game, "Passer", function () {
        assets.clicclac.play();
        PIXIScene.gotoScreen(connexion_next_screen, 250);
    }, {
        color: 0xffffff,
        background: 0xffffff,
        alpha: 0.4,
        radius: 5
    });

    /**
     * Positionnement des éléments
     */
    PIXIScene.alignRightBottom(passer, null, {x: -passer.width / 2 - 10, y: -passer.height / 2 - 10});

    /**
     * Animations #1
     */
    TweenMax.to(PIXIScene.asset("blue1"), 1, {repeat: -1, yoyo: true, pixi: {scaleX: "+=0.05", scaleY: "+=0.03"}});
    TweenMax.from(PIXIScene.asset("texte"), 1, {pixi: {x: -200}});
    TweenMax.from(PIXIScene.asset("main"), 1, {pixi: {x: -200, alpha: 0}, delay: 0.7});
    TweenMax.from(PIXIScene.asset("oeuf"), 1, {
        pixi: {x: 400, alpha: 0}, delay: 0.9, onComplete: function () {
            /**
             * Animation #2
             */
            var tl = new TimelineMax({repeat: -1, repeatDelay: 0.5});
            tl.to(PIXIScene.asset("onde1"), 0.2, {delay: 0.2, pixi: {alpha: 1}})
                .to(PIXIScene.asset("onde2"), 0.2, {pixi: {alpha: 1}})
                .to(PIXIScene.asset("onde3"), 0.2, {pixi: {alpha: 1}});

            var tla = new TimelineMax({delay: 1});
            tla.to([PIXIScene.asset("main"), PIXIScene.asset("onde3"), PIXIScene.asset("onde2"), PIXIScene.asset("onde1")], 1, {pixi: {rotation: "-=40"}})
                .to([PIXIScene.asset("main")], 1, {pixi: {y: "+=60", scale: "-=0.1"}}, "-=0.75")
                .to([PIXIScene.asset("onde3"), PIXIScene.asset("onde2"), PIXIScene.asset("onde1")], 1, {
                    pixi: {
                        x: "-=10",
                        y: "-=10",
                        scale: "-=0.2"
                    }
                }, "-=1")
                .to([PIXIScene.asset("oeuf")], 1, {pixi: {x: "+=20", y: "-=180", scale: "-=0.1"}}, "-=1")
                .to([PIXIScene.asset("texte")], 0.5, {pixi: {y: "-=300"}}, "-=0.5")
                .to([PIXIScene.asset("main"), PIXIScene.asset("onde3"), PIXIScene.asset("onde2"), PIXIScene.asset("onde1"), PIXIScene.asset("oeuf")], 1, {pixi: {y: "-=230"}}, "-=0.5")
                .to([PIXIScene.asset("conoff")], 0.5, {pixi: {alpha: 1}})
                .to([PIXIScene.asset("texteconon")], 0.5, {delay: 0.5, pixi: {alpha: 1}})
                .to([PIXIScene.asset("conon")], 0.5, {
                    delay: 0.5, pixi: {alpha: 1}, onStart: function () {
                        PIXIScene.asset("zioup").play();
                    }
                })
                .to([PIXIScene.asset("conoff")], 0.5, {pixi: {alpha: 0}}, "-=0.5")
                .to([PIXIScene.asset("blue1")], 0.5, {
                    delay: 1, pixi: {alpha: 1}
                })
                .to([PIXIScene.asset("texteblue1")], 0.5, {
                    onStart: function () {
                        PIXIScene.asset("wifi1").play();
                    }, pixi: {alpha: 1}, onComplete: function () {
                        Boomiz.connect(function () {
                            boomizIsConnected();
                            timeo = setTimeout(function () {
                                clearTimeout(timeo);
                                PIXIScene.gotoScreen(connexion_next_screen);
                            }, 10000);
                        }, function () {
                            showPlayEvenIfNotConnected();
                        });
                    }
                })
        }
    });

    /**
     * Erreur de connexion
     */
    function showPlayEvenIfNotConnected() {
        assets.nonconnectionbt.play();
        clearTimeout(timeo);
        TweenMax.killTweensOf([PIXIScene.asset("blue1"), PIXIScene.asset("onde1"), PIXIScene.asset("onde2"), PIXIScene.asset("onde3")]);
        PIXIScene.asset("wifi1").stop();
        TweenMax.staggerTo([PIXIScene.asset("main"), PIXIScene.asset("onde3"), PIXIScene.asset("onde2"), PIXIScene.asset("onde1"), PIXIScene.asset("oeuf"), PIXIScene.asset("conon"), PIXIScene.asset("texteconon"), PIXIScene.asset("blue1"), PIXIScene.asset("texteblue1"), PIXIScene.asset("onde1"), PIXIScene.asset("onde2"), PIXIScene.asset("onde3"), passer], 1, {pixi: {alpha: 0}}, 0.1);

        PIXIScene.alignCenterMiddle(assets.fondgris);
        PIXIScene.alignCenterMiddle(assets.oeufgris, null, {y: 40});
        PIXIScene.alignCenterTop(assets.nonconnecte, assets.oeufgris, {y: -assets.nonconnecte.height - 10});
        PIXIScene.alignCenterTop(assets.iconebt, assets.nonconnecte, {y: -assets.iconebt.height - 20});

        PIXIScene.alignCenterBottom(assets.jeveuxjouer, assets.oeufgris, {y: assets.jeveuxjouer.height + 30});
        var w = assets.reessayer.width + 10 + assets.retour.width + 10;
        PIXIScene.alignCenterBottom(assets.reessayer, assets.jeveuxjouer, {
            x: -assets.retour.width / 2 - 5,
            y: assets.jeveuxjouer.height + 10
        });
        PIXIScene.alignCenterBottom(assets.retour, assets.jeveuxjouer, {
            x: assets.reessayer.width / 2 + 5,
            y: assets.jeveuxjouer.height + 10
        });

        passer.interactive = false;
        TweenMax.to([passer], 1, {pixi: {alpha: 0}});
        TweenMax.staggerTo([assets.fondgris, assets.iconebt, assets.nonconnecte, assets.oeufgris, assets.retour], 1, {pixi: {alpha: 1}}, 0.1);
        TweenMax.staggerTo([assets.jeveuxjouer, assets.reessayer], 1, {
            pixi: {alpha: 1},
            delay: 1
        }, 0.25);

        assets.jeveuxjouer.interactive = true;
        assets.jeveuxjouer.tap = function (d) {
            assets.clicclac.play();
            PIXIScene.gotoScreen(connexion_next_screen, 250);
        };
        assets.reessayer.interactive = true;
        assets.reessayer.tap = function (d) {
            assets.clicclac.play();
            PIXIScene.gotoScreen("connexion", 250);
        };

        assets.retour.interactive = true;
        assets.retour.tap = function (d) {
            assets.clicclac.play();
            PIXIScene.gotoScreen("index", 250);
        };

    }

    /**
     * Connexion effectuée
     */
    function boomizIsConnected() {
        clearTimeout(timeo);
        TweenMax.killTweensOf(PIXIScene.asset("blue1"));
        var tlb = new TimelineMax({
            onComplete: function () {
                PIXIScene.gotoScreen(connexion_next_screen, 1000);
            }
        });
        tlb.to([PIXIScene.asset("main"), PIXIScene.asset("onde3"), PIXIScene.asset("onde2"), PIXIScene.asset("onde1"), PIXIScene.asset("oeuf"), PIXIScene.asset("conon"), PIXIScene.asset("texteconon"), PIXIScene.asset("blue1"), PIXIScene.asset("texteblue1")], 1, {
            onStart: function () {
                PIXIScene.asset("wifi1").stop();
                PIXIScene.asset("connectionbt").play();
            }, pixi: {y: "-=400"}
        })
            .to(PIXIScene.asset("texteblue1"), 1, {pixi: {alpha: 0}}, "-=1")
            .to(PIXIScene.asset("connecte"), 1, {pixi: {y: "-=20", alpha: 1}}, "-=0.5")
            .to(PIXIScene.asset("oeufc"), 0.5, {pixi: {scale: "+=0.2", alpha: 1}}, "-=0.5")
            .to(PIXIScene.asset("oeufc"), 0.25, {pixi: {scale: "-=0.2"}})
    }
});
