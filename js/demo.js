// PIXIScene.imagexy("test", "ecrans/OFC-App-Ecran-V2-10.png", 0, 0, 0);
PIXIScene.imagexy("background", "img/OFC-App-V3-Demo-01.png", 0, 0);
PIXIScene.imagexy("etoilesrouges1", "img/OFC-App-V3-Demo-04.png", 0, 0, 1);
PIXIScene.imagexy("etoilesrouges2", "img/OFC-App-V3-Demo-02.png", 0, 0, 1);
PIXIScene.imagexy("rempli", "img/OFC-App-V3-Demo-03.png", 26, 125, 0);
PIXIScene.imagexy("mainettel", "img/OFC-App-V3-Demo-05.png", 50, 230, 0);
PIXIScene.imagexy("mainetteletoiles", "img/OFC-App-V3-Demo-06.png", 49, 215, 0);
PIXIScene.imagexy("passerlademo", "img/OFC-App-V3-Demo-07.png", 321 / 2, 1177 / 2, 0);
PIXIScene.imagexy("ettuseraspret", "img/OFC-App-V3-Demo-08.png", 56 / 2, 255 / 2, 0);
PIXIScene.imagexy("teletoiles", "img/OFC-App-V3-Demo-10.png", 60 / 2, 390 / 2, 0);
PIXIScene.imagexy("etoilesjaunes", "img/OFC-App-V3-Demo-11.png", 297 / 2, 520 / 2, 0);
PIXIScene.imagexy("oeufbouge", "img/OFC-App-V3-Demo-12.png", 305 / 2, 649 / 2, 0);

PIXIScene.image("pourdecouvrir", "img/OFC-App-V3-Demo-13.png", 0, 0, 0);
PIXIScene.image("oeufimmobile", "img/OFC-App-V3-Demo-14.png", 0, 0, 0);

PIXIScene.sound("clicclac", "resources/clicclac.mp3");
PIXIScene.sound("zioup", "resources/zioup.wav");
PIXIScene.sound("spell", "resources/spell.mp3");
PIXIScene.sound("connect", "resources/wifi3.mp3");
PIXIScene.sound("music", "resources/bensound-buddy.mp3");

var demo_next_screen = "connexion";

PIXIScene.action("passerlademo", function (ev) {
    PIXIScene.asset("clicclac").play();
    PIXIScene.buttonAnimation("passerlademo", demo_next_screen);
    // PIXIScene.asset("clicclac").play({
    //     complete: function () {
    //         PIXIScene.gotoScreen(demo_next_screen);
    //     }
    // });
});

function step1(assets, game) {
    PIXIScene.alignCenterMiddle(assets.oeufimmobile, null);
    PIXIScene.alignCenterTop(assets.pourdecouvrir, assets.oeufimmobile, {y: -100});
    PIXIScene.alignRightBottom(assets.passerlademo, null, {
        x: -assets.passerlademo.width / 2 - 10,
        y: -assets.passerlademo.height / 2 - 10
    });

    var anim = new TimelineMax({
        onComplete: function () {
            step2(assets, game);
        }
    });

    anim.set([assets.oeufimmobile, assets.pourdecouvrir, assets.passerlademo], {pixi: {alpha: 0}})
        .to(assets.oeufimmobile, 0.5, {pixi: {alpha: 1}})
        .to([assets.pourdecouvrir, assets.passerlademo], 0.5, {pixi: {alpha: 1}})
        .to([assets.oeufimmobile, assets.pourdecouvrir], 0.5, {pixi: {alpha: 0}}, "+=3")
}

function step2(assets, game) {
    var tl1 = new TimelineMax();
    TweenMax.to(g("etoilesrouges1", "etoilesrouges2"), 10, {
        repeat: -1,
        yoyo: true,
        ease: Bounce.easeOut,
        pixi: {scale: "+=0.01", blur: 1}
    });

    tl1.to(g("etoilesrouges1"), 1, {
        pixi: {alpha: 1}, onStart: function () {
            assets.zioup.play()
        }
    })
        .to([assets.etoilesrouges], 1, {pixi: {alpha: 1}}, "-=0.7")
        .to(g("rempli"), 1, {
            pixi: {alpha: 1}, ease: Power3.easeOut
        }, "-=0.7")
        // .from(g("passerlademo"), 1, {
        //     pixi: {x: 500, alpha: 0},
        //     ease: Elastic.easeOut.config(1, 0.3)
        // }, "-=1.7")
        .from(g("mainettel"), 1, {
            pixi: {x: -400, alpha: 0}, ease: Power3.easeOut
        }, "-=0.7")
        .to(g("mainetteletoiles"), 1, {
            repeat: 2,
            yoyo: true,
            delay: 0.5,
            pixi: {alpha: 1},
            ease: Elastic.easeOut.config(3, 0.3), onStart: function () {
                assets.spell.play();
            }
        })
        .to(g("mainettel"), 1, {pixi: {alpha: 0}, ease: Power3.easeIn}, "-=1")
        .to(g("rempli"), 0.25, {
            pixi: {alpha: 0}, ease: Power3.easeIn
        }, "+=1")
        .to(g("ettuseraspret"), 1, {
            pixi: {alpha: 1, x: 180 - assets.ettuseraspret.width / 2},
            ease: Power3.easeOut
        }, "-=0.25")
        .to(g("mainetteletoiles"), 1, {pixi: {alpha: 0}, ease: Power3.easeIn}, "-=0.7")
        .to(g("oeufbouge"), 0.5, {pixi: {alpha: 1}, ease: Power3.easeIn}, "-=0.5")
        .to(g("teletoiles"), 0.5, {
            pixi: {alpha: 1}, ease: Power0.easeNone
        }, "-=0.5")
        .to(g("etoilesjaunes"), 0.25, {
            delay: 1,
            pixi: {alpha: 0.5, scale: 0.6},
            ease: Power3.easeIn,
            onStart: function () {
                assets.spell.play();
            }
        }, "+=0.5")
        .to(g("etoilesjaunes"), 0.7, {pixi: {alpha: 1, scale: 0.5}, ease: Elastic.easeOut.config(3, 0.1)})
        .to(g("etoilesjaunes"), 1, {
            pixi: {blur: 10, scale: 4, x: -200, y: -100, alpha: 0},
            ease: Power4.easeOut, onStart: function () {
                assets.spell.play();
            }
        }, "-=0.2")
        .to(g("oeufbouge"), 1, {pixi: {blurX: 10}, ease: Elastic.easeOut.config(3, 0.1)}, "-=1")
        .to(g("oeufbouge"), 0.5, {pixi: {blur: 0, scaleX: 0.5}, ease: Power0.easeNone})
        .to(g("etoilesjaunes", "oeufbouge", "teletoiles", "ettuseraspret", "etoilesrouges1", "etoilesrouges2", "passerlademo"), 1, {
            pixi: {alpha: 0}, onComplete: function () {
                var interv = setInterval(function () {
                    assets.music.volume -= 0.1;
                    if (assets.music.volume <= 0) {
                        clearInterval(interv);
                        PIXIScene.gotoScreen(demo_next_screen);
                    }
                }, 25);
            }
        })

}

PIXIScene.after(function (assets, game) {
    assets.music.play();
    PIXIScene.alignLeftBottom(assets.etoilesrouges1, null, {x: -assets.etoilesrouges1.width/2, y: -assets.etoilesrouges1.height/2});
    PIXIScene.alignRightTop(assets.etoilesrouges2, null, {x: -assets.etoilesrouges2.width/2, y: -assets.etoilesrouges2.height/2});
    step1(assets, game);
});
