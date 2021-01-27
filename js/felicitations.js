PIXIScene.image("background", "img/OFC-App-V3-Jeu3-03.png", 180, 320);
PIXIScene.image("etoiles1", "img/OFC-App-V3-Jeu2-25.png", 180, 320, 0);
PIXIScene.image("etoiles2", "img/OFC-App-V3-Jeu2-25.png", 180, 320, 0);
PIXIScene.image("felicitation", "img/OFC-App-V3-Jeu3-24.png", 180, 180, 1);
PIXIScene.image("telcharge", "img/OFC-App-V3-Jeu3-25.png", 180, 320, 1);
PIXIScene.image("etoiles3", "img/OFC-App-V3-Jeu3-28.png", 180, 320, 1);
PIXIScene.image("etoiles4", "img/OFC-App-V3-Jeu3-23.png", 180, 320, 1);
PIXIScene.image("telseul", "img/OFC-App-V3-Demo-06.png", 180, 320, 1);

PIXIScene.sound("success1", "resources/success.mp3");
PIXIScene.sound("fire", "resources/feuartifice.mp3");

PIXIScene.action("felicitation", function () {
    PIXIScene.gotoScreen(felicitations_next_screen);
});

var felicitations_next_screen = "buzzer";

PIXIScene.after(function (assets, game) {
    TweenMax.set(assets.telseul, {pixi: {scale: "-=0.1"}});
    PIXIScene.alignCenterBottom(assets.telcharge, assets.felicitation, {y: assets.telcharge.height * 5 / 4});
    PIXIScene.alignCenterBottom(assets.telseul, assets.telcharge, {x: -30, y: assets.telseul.height + 20});
    PIXIScene.alignLeftTop(assets.etoiles1, assets.telseul);
    PIXIScene.alignRightBottom(assets.etoiles2, assets.telseul);


    PIXIScene.alignLeftBottom(assets.etoiles3);
    PIXIScene.alignRightTop(assets.etoiles4);
    var tl1 = new TimelineMax({
        onStart: function () {
            setTimeout(function () {
                PIXIScene.gotoScreen(felicitations_next_screen);
            }, 7000);

            PIXIScene.asset("success1").play();

        },
        onComplete: function () {
            PIXIScene.asset("fire").play();
            var tl2 = new TimelineMax({repeat: -1, repeatDelay: 1});
            tl2.fromTo(assets.etoiles1, 0.25, {pixi: {scale: 0, alpha: 0}}, {
                pixi: {scale: 0.5, alpha: 1},
                ease: Power0.easeNone
            })
                .to(assets.etoiles1, 3, {pixi: {scale: 5, blur: 20, alpha: 0}, ease: Power0.easeNone})
                .fromTo(assets.etoiles2, 0.25, {pixi: {scale: 0, alpha: 0}}, {
                    pixi: {scale: 0.5, alpha: 1},
                    ease: Power0.easeNone
                }, "-=3")
                .to(assets.etoiles2, 3, {pixi: {scale: 5, blur: 20, alpha: 0}, ease: Power0.easeNone}, "-=2.75")
                .to(assets.felicitation, 0.25, {pixi: {scale: "+=0.1"}, ease: Bounce.easeOut}, "-=3")
                .to(assets.felicitation, 1, {pixi: {scale: "-=0.1"}, ease: Bounce.easeOut}, "-=2.75")

        }
    });
    tl1.staggerFrom([assets.felicitation, assets.telcharge, assets.telseul], 1, {
        pixi: {x: -180},
        ease: Power1.easeOut
    }, 0.5);

    TweenMax.staggerFrom([assets.etoiles3, assets.etoiles4], 1, {pixi: {alpha: 0}, ease: Power1.easeOut}, 0.5);
});
