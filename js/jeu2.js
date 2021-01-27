PIXIScene.image("background", "img/OFC-App-V3-Jeu2-02.png", 180, 320);
PIXIScene.image("bandeauhaut", "img/OFC-App-V3-Jeu2-10.png", 180, 25);
PIXIScene.image("chapeau1", "img/OFC-App-V3-Jeu2-13.png", 75, 195);
PIXIScene.image("chapeau2", "img/OFC-App-V3-Jeu2-13.png", 185, 195);
PIXIScene.image("chapeau3", "img/OFC-App-V3-Jeu2-13.png", 295, 195);
PIXIScene.image("chapeau4", "img/OFC-App-V3-Jeu2-13.png", 75, 320);
PIXIScene.image("chapeau5", "img/OFC-App-V3-Jeu2-13.png", 185, 320);
PIXIScene.image("chapeau6", "img/OFC-App-V3-Jeu2-13.png", 295, 320);
PIXIScene.image("chapeau7", "img/OFC-App-V3-Jeu2-13.png", 75, 440);
PIXIScene.image("chapeau8", "img/OFC-App-V3-Jeu2-13.png", 185, 440);
PIXIScene.image("chapeau9", "img/OFC-App-V3-Jeu2-13.png", 295, 440);
PIXIScene.image("bandeaubas", "img/OFC-App-V3-Jeu2-14.png", 180, 640 - 25);

PIXIScene.image("carte1", "img/OFC-App-V3-Jeu2-19.png", 0, 0, 0);
PIXIScene.image("carte2", "img/OFC-App-V3-Jeu2-20.png", 0, 0, 0);
PIXIScene.image("carte3", "img/OFC-App-V3-Jeu2-21.png", 0, 0, 0);
PIXIScene.image("carte4", "img/OFC-App-V3-Jeu2-22.png", 0, 0, 0);
PIXIScene.image("carte5", "img/OFC-App-V3-Jeu2-23.png", 0, 0, 0);
PIXIScene.image("carte6", "img/OFC-App-V3-Jeu2-24.png", 0, 0, 0);

PIXIScene.image("niv2", "img/OFC-App-V3-Jeu2-12.png", 0, 0);
PIXIScene.image("etoiles", "img/OFC-App-V3-Jeu2-17.png", 65, 640 - 15, 0);
PIXIScene.image("baguette", "img/OFC-App-V3-Jeu2-16.png", 0, 0);
PIXIScene.image("fondbaguette", "img/OFC-App-V3-Jeu2-15.png", 180, 640 - 25);

PIXIScene.image("splash", "img/OFC-App-V3-Jeu2-18.png", 295, 195 - 55, 0);

PIXIScene.sound("bouton", "resources/clicclac.mp3");
PIXIScene.sound("erreur", "resources/erreur.mp3");
PIXIScene.sound("tap", "resources/spell.mp3");
PIXIScene.sound("tada", "resources/tadadada.mp3");

PIXIScene.image("retourintro2", "img/OFC-App-V3-Jeu2-11.png", 45, 25);

PIXIScene.action("retourintro2", function (ev, assets, game) {
    assets.bouton.play();
    PIXIScene.buttonAnimation("retourintro2", "intro1");
});

PIXIScene.action("carte1", function (ev, assets, game) {
    jeu2.carteExplose("carte1", assets, game);
});

[].forEach.call([2, 3, 4, 5, 6], function (el) {
    PIXIScene.action("carte" + el, function (ev, assets, game) {
        jeu2.carteMauvaiseExplose("carte" + el, assets, game);
    });
});


PIXIScene.after(function (assets, game) {
    assets.splash.scale.x = assets.splash.scale.y = 0.1;
    PIXIScene.alignCenterTop(assets.bandeauhaut);
    PIXIScene.alignRightMiddle(assets.niv2, assets.bandeauhaut, {x: -20});
    PIXIScene.alignCenterBottom(assets.bandeaubas);
    PIXIScene.alignCenterMiddle(assets.fondbaguette, assets.bandeaubas);
    PIXIScene.alignLeftTop(assets.baguette, assets.fondbaguette);
    jeu2.carteNouveau();
    jeu2.carteApparait();
    jeu2.initPoints(1, assets, game);
});
