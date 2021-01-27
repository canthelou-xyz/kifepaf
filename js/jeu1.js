PIXIScene.image("background", "img/OFC-App-V3-Jeu1-02.png", 180, 320);
PIXIScene.image("bandeauhaut", "img/OFC-App-V3-Jeu1-10.png", 180, 25);
PIXIScene.image("chapeau1", "img/OFC-App-V3-Jeu1-13.png", 75, 195);
PIXIScene.image("chapeau2", "img/OFC-App-V3-Jeu1-13.png", 185, 195);
PIXIScene.image("chapeau3", "img/OFC-App-V3-Jeu1-13.png", 295, 195);
PIXIScene.image("chapeau4", "img/OFC-App-V3-Jeu1-13.png", 75, 320);
PIXIScene.image("chapeau5", "img/OFC-App-V3-Jeu1-13.png", 185, 320);
PIXIScene.image("chapeau6", "img/OFC-App-V3-Jeu1-13.png", 295, 320);
PIXIScene.image("chapeau7", "img/OFC-App-V3-Jeu1-13.png", 75, 440);
PIXIScene.image("chapeau8", "img/OFC-App-V3-Jeu1-13.png", 185, 440);
PIXIScene.image("chapeau9", "img/OFC-App-V3-Jeu1-13.png", 295, 440);
PIXIScene.image("bandeaubas", "img/OFC-App-V3-Jeu1-14.png", 180, 640 - 25);
PIXIScene.image("niv1", "img/OFC-App-V3-Jeu1-12.png", 325, 25);
PIXIScene.image("etoiles", "img/OFC-App-V3-Jeu1-17.png", 65, 640 - 15, 0);
PIXIScene.image("baguette", "img/OFC-App-V3-Jeu1-16.png", 0, 0);
PIXIScene.image("fondbaguette", "img/OFC-App-V3-Jeu1-15.png", 180, 640 - 25);

PIXIScene.image("oiseau1", "img/OFC-App-V3-Jeu1-09.png", 75, 195 - 65, 0);
PIXIScene.image("oiseau2", "img/OFC-App-V3-Jeu1-09.png", 185, 195 - 65, 0);
PIXIScene.image("oiseau3", "img/OFC-App-V3-Jeu1-09.png", 295, 195 - 65, 0);
PIXIScene.image("splash", "img/Jeu 1-06.png", 295, 195 - 55, 0);

PIXIScene.sound("clicclac", "resources/clicclac.mp3");
PIXIScene.sound("cuicui", "resources/cuicui.wav");
PIXIScene.sound("tap", "resources/tap.wav");
PIXIScene.sound("spell", "resources/spell.mp3");
PIXIScene.sound("tada", "resources/tadadada.mp3");

PIXIScene.image("retourintro1", "img/OFC-App-V3-Jeu1-11.png", 45, 25);

PIXIScene.action("retourintro1", function (ev, assets, game) {
    assets.clicclac.play();
    PIXIScene.buttonAnimation("retourintro1", "connexion");
});

PIXIScene.action("oiseau1", function (ev, assets, game) {
    jeu1.oiseauExplose("oiseau1", assets, game);
});
PIXIScene.action("oiseau2", function (ev, assets, game) {
    jeu1.oiseauExplose("oiseau2", assets, game);
});
PIXIScene.action("oiseau3", function (ev, assets, game) {
    jeu1.oiseauExplose("oiseau3", assets, game);
});


PIXIScene.after(function (assets, game) {
    assets.splash.scale.x = assets.splash.scale.y = 0.1;
    PIXIScene.alignCenterTop(assets.bandeauhaut);

    PIXIScene.alignRightMiddle(assets.niv1, assets.bandeauhaut, {x: -20});
    PIXIScene.alignCenterBottom(assets.bandeaubas);
    PIXIScene.alignCenterMiddle(assets.fondbaguette, assets.bandeaubas);
    PIXIScene.alignLeftTop(assets.baguette, assets.fondbaguette);

    jeu1.oiseauNouveau();
    jeu1.oiseauApparait();
    jeu1.initPoints(0, assets, game);
});
