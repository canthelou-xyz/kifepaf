PIXIScene.image("background", "img/OFC-App-V3-Buzzer-01.png", 180, 320);
PIXIScene.image("background2", "img/OFC-App-V3-Decompte-01.png", 180, 320, 0);
PIXIScene.image("etoilesjaunes1", "img/OFC-App-V3-Buzzer-02.png", 300, 500, 0);
PIXIScene.image("etoilesjaunestr1", "img/OFC-App-V3-Buzzer-02.png", 300, 500, 1);
PIXIScene.image("etoilesjauneslb1", "img/OFC-App-V3-Buzzer-14.png", 300, 500, 1);
PIXIScene.image("etoilesjaunestr2", "img/OFC-App-V3-Decompte-02.png", 300, 500, 0);
PIXIScene.image("etoilesjauneslb2", "img/OFC-App-V3-Decompte-03.png", 300, 500, 0);
PIXIScene.image("cestparti", "img/OFC-App-V3-Buzzer-03.png", 0, 0, 1);
PIXIScene.image("texte1", "img/OFC-App-V3-Buzzer-04.png", 0, 0, 1);
PIXIScene.image("boutonoff", "img/OFC-App-V3-Buzzer-05.png", 0, 0, 1);
PIXIScene.image("boutonon", "img/OFC-App-V3-Buzzer-06.png", 0, 0, 0);
PIXIScene.image("boutonrouge", "img/OFC-App-V3-Buzzer-07.png", 0, 0, 0);
PIXIScene.image("boutonnoir", "img/OFC-App-V3-Buzzer-08.png", 0, 0, 0);
PIXIScene.image("etoilesjaunes2a", "img/OFC-App-V3-Buzzer-10.png", 0, 0, 0);
PIXIScene.image("etoilesjaunes2b", "img/OFC-App-V3-Buzzer-10.png", 0, 0, 0);
PIXIScene.image("etoilesjaunes2c", "img/OFC-App-V3-Buzzer-10.png", 0, 0, 0);
PIXIScene.image("flechestrois", "img/OFC-App-V3-Buzzer-11.png", 0, 0);

PIXIScene.image("oeuf", "img/OFC-App-V3-Decompte-05.png", 0, 0, 0);
PIXIScene.image("flechestroisv", "img/OFC-App-V3-Decompte-06.png", 0, 0, 0);
PIXIScene.image("texte3", "img/OFC-App-V3-Decompte-07.png", 0, 0, 0);
PIXIScene.image("decouvre", "img/OFC-App-V3-Decompte-12.png", 0, 0, 0);

PIXIScene.sound("spell", "resources/spell.mp3");
PIXIScene.sound("bouton", "resources/bouton.mp3");
PIXIScene.sound("tadadada", "resources/tadadada.mp3");
PIXIScene.sound("zap", "resources/zap.wav");

PIXIScene.action("boutonoff", function (ev, assets, game) {
    assets.bouton.play();
    TweenMax.to(assets.boutonoff, 0.2, {
        pixi: {alpha: 0}, onComplete: function () {
            assets.boutonoff.destroy();
            TweenMax.staggerTo([assets.cestparti, assets.texte1, assets.flechestrois], 0.25, {pixi: {y: "-=400"}}, 0.1, function () {
                assets.spell.play();
                TweenMax.set([assets.etoilesjaunestr1, assets.etoilesjauneslb1], {pixi: {alpha: 0}});
                TweenMax.set([assets.etoilesjaunestr2, assets.etoilesjauneslb2], {pixi: {alpha: 1}});
                TweenMax.to(assets.etoilesjaunes2a, Math.random() * 0.2 + 0.2, {
                    repeat: 1,
                    yoyo: true,
                    ease: RoughEase.ease.config({
                        template: Power0.easeNone,
                        strength: 1,
                        points: 20,
                        taper: "none",
                        randomize: true,
                        clamp: false
                    }), pixi: {scale: "+=0.1", alpha: 1}
                });
                TweenMax.to(assets.etoilesjaunes2b, Math.random() * 0.2 + 0.2, {
                    repeat: 1,
                    yoyo: true,
                    ease: RoughEase.ease.config({
                        template: Power0.easeNone,
                        strength: 1,
                        points: 20,
                        taper: "none",
                        randomize: true,
                        clamp: false
                    }), pixi: {scale: "+=0.5", alpha: 1}
                });
                TweenMax.to(assets.etoilesjaunes2c, Math.random() * 0.2 + 0.2, {
                    repeat: 1,
                    yoyo: true,
                    ease: RoughEase.ease.config({
                        template: Power0.easeNone,
                        strength: 1,
                        points: 20,
                        taper: "none",
                        randomize: true,
                        clamp: false
                    }), pixi: {scale: "+=0.3", alpha: 1}
                });
                setTimeout(function () {
                    TweenMax.to(assets.background2, 2, {
                        pixi: {alpha: 1}, onComplete: function () {
                            setTimeout(function () {
                                PIXIScene.gotoScreen("decompte");
                            }, 3000);
                        }
                    });
                    var tl2 = new TimelineMax();
                    tl2.to(assets.boutonon, 0.2, {pixi: {alpha: 0, scaleX: "+=0.3"}})
                        .to(assets.flechestroisv, 0.2, {repeat: 1, yoyo: true, pixi: {alpha: 1, scaleY: "+=0.3"}})
                        .to(assets.flechestroisv, 0.1, {pixi: {alpha: 1}})
                        .to([assets.texte3, assets.decouvre], 0.2, {
                            repeat: 1,
                            yoyo: true,
                            pixi: {alpha: 1, scaleX: "+=0.1"}
                        })
                        .to([assets.texte3, assets.decouvre], 0.1, {pixi: {alpha: 1}})
                        .to(assets.oeuf, 0.2, {repeat: 1, yoyo: true, pixi: {alpha: 1, scale: "+=0.1"}})
                        .to(assets.oeuf, 0.1, {
                            pixi: {alpha: 1}
                        })
                }, 500);
            })
        }
    });
    TweenMax.to(assets.boutonon, 0.2, {pixi: {alpha: 1}});
});

PIXIScene.after(function (assets, game) {
    PIXIScene.alignRightTop(assets.etoilesjaunestr1);
    PIXIScene.alignLeftBottom(assets.etoilesjauneslb1);
    PIXIScene.alignRightTop(assets.etoilesjaunestr2);
    PIXIScene.alignLeftBottom(assets.etoilesjauneslb2);
    PIXIScene.alignCenterTop(assets.cestparti, null, {y: 100});
    PIXIScene.alignCenterBottom(assets.texte1, assets.cestparti, {y: assets.texte1.height * 5 / 4});
    PIXIScene.alignCenterBottom(assets.flechestrois, assets.texte1, {y: assets.flechestrois.height * 5 / 4});
    PIXIScene.alignCenterBottom(assets.boutonoff, assets.flechestrois, {y: assets.boutonoff.height + 20});
    PIXIScene.alignCenterBottom(assets.boutonon, assets.boutonoff);
    PIXIScene.alignCenterTop(assets.etoilesjaunes2a, assets.boutonon, {y: -assets.etoilesjaunes2a.height});
    PIXIScene.alignCenterTop(assets.etoilesjaunes2b, assets.boutonon, {y: -assets.etoilesjaunes2a.height * 6 / 4});
    PIXIScene.alignCenterTop(assets.etoilesjaunes2c, assets.boutonon, {y: -assets.etoilesjaunes2a.height * 7 / 4});

    PIXIScene.alignCenterMiddle(assets.flechestroisv, null, {y: 100});
    PIXIScene.alignCenterTop(assets.oeuf, assets.flechestroisv, {y: -assets.oeuf.height * 1.05});
    PIXIScene.alignCenterTop(assets.decouvre, assets.oeuf, {y: -assets.decouvre.height});
    PIXIScene.alignCenterBottom(assets.texte3, assets.flechestroisv, {y: assets.texte3.height * 5 / 4});


    TweenMax.to(assets.flechestrois, 0.5, {repeat: -1, yoyo: true, pixi: {y: "-=10"}});
    TweenMax.to(assets.flechestroisv, 0.5, {repeat: -1, yoyo: true, pixi: {y: "+=10"}});
    TweenMax.to(g("etoilesjaunestr", "etoilesjauneslb"), 10, {
        repeat: -1,
        yoyo: true,
        ease: RoughEase.ease.config({
            template: Power1.easeInOut,
            strength: Math.random() * 3 + 1,
            points: Math.random() * 10 + 10,
            taper: "none",
            randomize: true,
            clamp: false
        }),
        pixi: {scale: "+=0.05", alpha: "-=0.5", blur: 1}
    });

    var tl = new TimelineMax({
        onComplete: function () {
            assets.tadadada.play();
        }
    });
    tl.from(assets.cestparti, 0.3, {pixi: {scale: 0}})
        .from(assets.texte1, 0.3, {pixi: {scale: 0}}, "-=0.1")
        .from(assets.flechestrois, 0.3, {pixi: {scale: 0}}, "-=0.1")
        .from(assets.boutonoff, 0.3, {pixi: {scale: 0}}, "-=0.1")
});
