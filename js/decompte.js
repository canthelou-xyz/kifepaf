PIXIScene.image("background", "img/OFC-App-V3-Decompte-04.png", 180, 320);
// PIXIScene.image("background2", "img/OFC-App-V3-Jeu3-01.png", 180, 320, 1);
// PIXIScene.image("etoilesjaunestr", "img/OFC-App-V3-Buzzer-02.png", 300, 500, 1);
// PIXIScene.image("etoilesjauneslb", "img/OFC-App-V3-Buzzer-02.png", 300, 500, 1);

// PIXIScene.image("etoilesh", "img/OFC-App-V3-Decompte-07.png", 0, 0, 0);
// PIXIScene.image("etoilesb", "img/OFC-App-V3-Decompte-07.png", 0, 0, 0);
// PIXIScene.image("decompte1", "img/OFC-App-V3-Decompte-12.png", 0, 0, 0);
// PIXIScene.image("decompte2", "img/OFC-App-V3-Decompte-11.png", 0, 0, 0);
// PIXIScene.image("decompte3", "img/OFC-App-V3-Decompte-10.png", 0, 0, 0);
// PIXIScene.image("decompte4", "img/OFC-App-V3-Decompte-09.png", 0, 0, 0);
// PIXIScene.image("decompte5", "img/OFC-App-V3-Decompte-08.png", 0, 0, 0);
PIXIScene.image("explode", "img/OFC-App-V3-Decompte-10.png", 0, 0, 0);

PIXIScene.sound("bouton", "resources/bouton.mp3");
PIXIScene.sound("zap", "resources/zap.wav");
// PIXIScene.sound("beep", "resources/beep.mp3");
// PIXIScene.sound("decompte", "resources/decompteseconde.mp3");
PIXIScene.sound("say_0", "resources/h_say_0.mp3");
PIXIScene.sound("say_1", "resources/h_say_1.mp3");
PIXIScene.sound("say_2", "resources/h_say_2.mp3");
PIXIScene.sound("say_3", "resources/h_say_3.mp3");
PIXIScene.sound("say_4", "resources/h_say_4.mp3");
PIXIScene.sound("say_5", "resources/h_say_5.mp3");
PIXIScene.sound("pop", "resources/pop.wav");

PIXIScene.after(function (assets, game) {
    // TweenMax.set(assets.etoilesb, {pixi: {rotation: 180}});
    TweenMax.set(assets.explode, {pixi: {scale: 0}});
    // PIXIScene.alignRightTop(assets.etoilesjaunestr);
    // PIXIScene.alignLeftBottom(assets.etoilesjauneslb);
    // PIXIScene.alignCenterMiddle(assets.decompte5);
    // PIXIScene.alignCenterMiddle(assets.decompte4);
    // PIXIScene.alignCenterMiddle(assets.decompte3);
    // PIXIScene.alignCenterMiddle(assets.decompte2);
    // PIXIScene.alignCenterMiddle(assets.decompte1);
    PIXIScene.alignCenterMiddle(assets.explode);
    // PIXIScene.alignCenterTop(assets.etoilesh, assets.decompte5, {y: -assets.etoilesh.height});
    // PIXIScene.alignCenterBottom(assets.etoilesb, assets.decompte5, {y: assets.etoilesb.height});


    // TweenMax.to(g("etoilesjaunestr", "etoilesjauneslb"), 10, {
    //     repeat: -1,
    //     yoyo: true,
    //     ease: RoughEase.ease.config({
    //         template: Power1.easeInOut,
    //         strength: Math.random() * 3 + 1,
    //         points: Math.random() * 10 + 10,
    //         taper: "none",
    //         randomize: true,
    //         clamp: false
    //     }),
    //     pixi: {scale: "+=0.05", alpha: "-=0.5", blur: 1}
    // });
    // var tletoiles = new TimelineMax();
    // tletoiles.to(g("etoilesh", "etoilesb"), 0.2, {
    //     repeat: 2,
    //     yoyo: true,
    //     ease: RoughEase.ease.config({
    //         template: Power1.easeInOut,
    //         strength: Math.random() * 3 + 1,
    //         points: Math.random() * 10 + 10,
    //         taper: "none",
    //         randomize: true,
    //         clamp: false
    //     }),
    //     pixi: {scale: "+=0.05", alpha: 1, blur: 3}
    // })
    //     .to(g("etoilesh", "etoilesb"), 0.2, {
    //         ease: RoughEase.ease.config({
    //             template: Power1.easeInOut,
    //             strength: Math.random() * 3 + 1,
    //             points: Math.random() * 10 + 10,
    //             taper: "none",
    //             randomize: true,
    //             clamp: false
    //         }),
    //         pixi: {scale: "-=0.05", alpha: 0, blur: 0}
    //     });
    // tletoiles.pause();


    var cpt = 5;
    Boomiz.connect();
    // assets.decompte.play();
    var interv = setInterval(function () {
        // if (cpt == 1) {
        //     // TweenMax.to([assets.background, assets.etoilesjaunestr, assets.etoilesjauneslb], 0.9, {
        //     //     delay: 0.5,
        //     //     pixi: {alpha: 0}
        //     // });
        //     // TweenMax.to(assets.background2, 0.9, {delay: 0.6, pixi: {alpha: 1}});
        // }
        if (cpt == -1) {
            // assets.beep.play();
            // TweenMax.to(assets.decompte1, 0.2, {pixi: {alpha: 0}});
            clearInterval(interv);
            Boomiz.explose();
            TweenMax.to(assets.explode, 0.2, {
                repeat: 3,
                yoyo: true,
                ease: RoughEase.ease.config({
                    template: Power1.easeInOut,
                    strength: Math.random() * 3 + 1,
                    points: Math.random() * 10 + 10,
                    taper: "none",
                    randomize: true,
                    clamp: false
                }),
                pixi: {scale: 1, alpha: 1, blur: 1},
                onComplete: function () {
                    assets.pop.play();
                }
            });
            // assets.pop.play();
            PIXIScene.gotoScreen("index", 5000);
        } else {
            assets["say_" + cpt].play();
            // TweenMax.to(assets["decompte" + cpt], 0.2, {pixi: {alpha: 1}});
            // tletoiles.restart();
            // if (cpt < 5) TweenMax.to(assets["decompte" + (cpt + 1)], 0.2, {pixi: {alpha: 0}});
            cpt--
        }
    }, 1000);
});
