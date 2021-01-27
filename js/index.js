// PIXIScene.image("background", "img/OFC-App-V3-Elements-01.png", 180, 320);
// PIXIScene.image("chapeau", "img/OFC-App-V3-Elements-02.png", 180, 350, 0);
//
// PIXIScene.sound("tirlibibi", "resources/tirlibibi.mp3");
// PIXIScene.sound("deviensmagicien", "resources/deviensmagicien.mp3");
// PIXIScene.sound("clicclac", "resources/clicclac.mp3");
//
// PIXIScene.button("bouton", "img/OFC-App-V3-Elements-04.png", 0, 0, 1);
//
// PIXIScene.action("bouton", function (ev) {
//     PIXIScene.asset("clicclac").play();
//     PIXIScene.buttonAnimation("bouton", "demo");
// });
//
// PIXIScene.after(function (assets, game) {
//     assets.tirlibibi.play();
//     TweenMax.set(assets.chapeau, {pixi: {scale: 0.44}});
//
//     PIXIScene.alignCenterMiddle(assets.chapeau,null,{y:-20});
//     PIXIScene.alignCenterBottom(assets.bouton, assets.chapeau, {x:580,y: 140});
//
//     _.delay(function () {
//         TweenMax.to(assets.chapeau, 1, {pixi: {alpha: 1, scale: 0.5}, ease: Elastic.easeOut.config(1, 0.3)});
//         TweenMax.to(PIXIScene.asset("bouton"), 1, {pixi: {x: 180, alpha: 1}, delay: 1});
//         TweenMax.set(PIXIScene.asset("chapeau"), {pixi: {scale: 0.43}});
//     }, 3000)
//
// });

PIXIScene.image("background", "img/OFC-App-V3-Elements-01.png", 180, 320);
PIXIScene.image("bienvenue", "img/OFC-App-V3-Elements-05.png", 180, 190, 1);
// PIXIScene.image("logo", "img/Elements-02a.png", 180, 190, 0);
// PIXIScene.image("etoile1", "img/Elements-06.png", 95, 385, 0);
// PIXIScene.image("etoile2", "img/Elements-06.png", 260, 260, 0);
PIXIScene.image("chapeau", "img/OFC-App-V3-Elements-02.png", 180, 350, 0);

PIXIScene.sound("tirlibibi", "resources/tirlibibi.mp3");
PIXIScene.sound("deviensmagicien", "resources/deviensmagicien.mp3");
PIXIScene.sound("clicclac", "resources/clicclac.mp3");

PIXIScene.button("bouton", "img/OFC-App-V3-Elements-04.png", 580, 540, 0);

PIXIScene.action("bouton", function (ev) {
    PIXIScene.asset("clicclac").play();
    PIXIScene.buttonAnimation("bouton", "demo");
});

PIXIScene.after(function (assets, game) {
    assets.tirlibibi.play();
    PIXIScene.alignCenterMiddle(assets.bienvenue);
    TweenMax.set(assets.chapeau, {pixi: {scale: 0.44}});
    PIXIScene.alignCenterMiddle(assets.chapeau, null, {y: -2-0});
    // PIXIScene.alignCenterTop(assets.logo, assets.chapeau, {y: -55});

    _.delay(function () {
        TweenMax.to(assets.bienvenue, 1, {
            pixi: {alpha: 0}, onComplete: function () {
                assets.deviensmagicien.play();
            }
        });
        TweenMax.to(assets.chapeau, 1, {pixi: {alpha: 1, scale: 0.5}, ease: Elastic.easeOut.config(1, 0.3)});
        // TweenMax.set(PIXIScene.asset("logo"), {pixi: {scale: 0}});
        // TweenMax.to(PIXIScene.asset("logo"), 2, {
        //     pixi: {scale: 0.5, alpha: 1},
        //     ease: Elastic.easeOut.config(1, 0.3),
        //     delay: 0.5
        // });
        // TweenMax.to(PIXIScene.asset("etoile1"), 5, {
        //     repeat: -1,
        //     yoyo: true,
        //     pixi: {scale: "-=0.1"},
        //     delay: Math.random()
        // });
        // TweenMax.to(PIXIScene.asset("etoile1"), 2, {repeat: -1, yoyo: true, pixi: {alpha: 0.3}, delay: Math.random()});
        // TweenMax.to(PIXIScene.asset("etoile2"), 5, {
        //     repeat: -1,
        //     yoyo: true,
        //     pixi: {scale: "-=0.1"},
        //     delay: Math.random()
        // });
        // TweenMax.to(PIXIScene.asset("etoile2"), 2, {repeat: -1, yoyo: true, pixi: {alpha: 0.8}, delay: Math.random()});
        TweenMax.to(PIXIScene.asset("bouton"), 1, {pixi: {x: 180, alpha: 1}, delay: 1});
        TweenMax.set(PIXIScene.asset("chapeau"), {pixi: {scale: 0.43}});
    }, 5000);

});
