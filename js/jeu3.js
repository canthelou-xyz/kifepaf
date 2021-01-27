PIXIScene.image("background", "img/OFC-App-V3-Jeu3-02.png", 180, 320);
PIXIScene.image("bandeauhaut", "img/OFC-App-V3-Jeu3-10.png", 180, 25, 1);
PIXIScene.image("chapeau1", "img/OFC-App-V3-Jeu3-13.png", 75, 195);
PIXIScene.image("chapeau2", "img/OFC-App-V3-Jeu3-13.png", 185, 195);
PIXIScene.image("chapeau3", "img/OFC-App-V3-Jeu3-13.png", 295, 195);
PIXIScene.image("chapeau4", "img/OFC-App-V3-Jeu3-13.png", 75, 320);
PIXIScene.image("chapeau5", "img/OFC-App-V3-Jeu3-13.png", 185, 320);
PIXIScene.image("chapeau6", "img/OFC-App-V3-Jeu3-13.png", 295, 320);
PIXIScene.image("chapeau7", "img/OFC-App-V3-Jeu3-13.png", 75, 440);
PIXIScene.image("chapeau8", "img/OFC-App-V3-Jeu3-13.png", 185, 440);
PIXIScene.image("chapeau9", "img/OFC-App-V3-Jeu3-13.png", 295, 440);
PIXIScene.image("bandeaubas", "img/OFC-App-V3-Jeu3-14.png", 180, 640 - 25);


PIXIScene.image("niv3", "img/OFC-App-V3-Jeu3-12.png", 0, 0);
PIXIScene.image("etoiles", "img/OFC-App-V3-Jeu3-17.png", 65, 640 - 15, 0);
PIXIScene.image("baguette", "img/OFC-App-V3-Jeu3-16.png", 0, 0);
PIXIScene.image("fondbaguette", "img/OFC-App-V3-Jeu3-15.png", 180, 640 - 25);

PIXIScene.image("lapin1", "img/OFC-App-V3-Jeu3-18.png",0,0,0);
PIXIScene.image("lapin2", "img/OFC-App-V3-Jeu3-19.png",0,0,0);
PIXIScene.image("lapin3", "img/OFC-App-V3-Jeu3-20.png",0,0,0);
PIXIScene.image("lapin4", "img/OFC-App-V3-Jeu3-21.png",0,0,0);
PIXIScene.image("lapin5", "img/OFC-App-V3-Jeu3-20.png",0,0,0);
PIXIScene.image("lapin6", "img/OFC-App-V3-Jeu3-21.png",0,0,0);

PIXIScene.image("splash", "img/Jeu 1-06.png", 295, 195 - 55, 0);

PIXIScene.sound("bouton", "resources/clicclac.mp3");
PIXIScene.sound("erreur", "resources/erreur.mp3");
PIXIScene.sound("tap", "resources/spell.mp3");
PIXIScene.sound("tada", "resources/tadadada.mp3");

PIXIScene.sound("magic", "resources/spell.mp3");

PIXIScene.image("retourintro3", "img/OFC-App-V3-Jeu3-11.png", 45, 25);

PIXIScene.action("retourintro3", function (ev, assets, game) {
    assets.bouton.play();
    PIXIScene.buttonAnimation("retourintro3", "intro2");
});

[].forEach.call([1, 2], function (el) {
    PIXIScene.action("lapin" + el, function (ev, assets, game) {
        jeu3.lapinExplose("lapin" + el, assets, game);
    });
});

[].forEach.call([3,4,5,6], function (el) {
    PIXIScene.action("lapin" + el, function (ev, assets, game) {
        jeu3.lapinMauvaisExplose("lapin" + el, assets, game);
    });
});


PIXIScene.after(function (assets, game) {
    assets.splash.scale.x = assets.splash.scale.y = 0.1;
    PIXIScene.alignCenterTop(assets.bandeauhaut);

    PIXIScene.alignRightMiddle(assets.niv3, assets.bandeauhaut, {x: -20});
    PIXIScene.alignCenterBottom(assets.bandeaubas);
    PIXIScene.alignCenterMiddle(assets.fondbaguette, assets.bandeaubas);
    PIXIScene.alignLeftTop(assets.baguette, assets.fondbaguette);

    jeu3.lapinNouveau();
    jeu3.lapinApparait();
    jeu3.initPoints(1, assets, game);
});
