PIXIScene.image("background", "img/OFC-App-V3-Jeu2-03.png", 180, 320);
PIXIScene.image("felicitation", "img/OFC-App-V3-Jeu2-26.png", 180, 320, 0);
PIXIScene.image("nivaccompli", "img/OFC-App-V3-Jeu2-27.png", 180, 320, 0);
PIXIScene.image("etoiles1", "img/OFC-App-V3-Jeu2-25.png", 180, 320, 0);
PIXIScene.image("etoiles2", "img/OFC-App-V3-Jeu2-25.png", 180, 320, 0);
PIXIScene.image("etoiles3", "img/OFC-App-V3-Jeu2-28.png", 180, 320, 1);
PIXIScene.image("etoiles4", "img/OFC-App-V3-Jeu2-29.png", 180, 320, 1);
PIXIScene.sound("fire", "resources/feuartifice.mp3");

PIXIScene.after(function (assets, game) {
    PIXIScene.alignCenterBottom(assets.nivaccompli, assets.felicitation, {y: assets.nivaccompli.height * 5 / 4});
    PIXIScene.alignRightTop(assets.etoiles1, assets.felicitation, {y: -assets.etoiles1.height});
    PIXIScene.alignLeftBottom(assets.etoiles2, assets.nivaccompli, {x: -20, y: assets.etoiles2.height});
    PIXIScene.alignLeftBottom(assets.etoiles3);
    PIXIScene.alignRightTop(assets.etoiles4);

    felicitations(assets, "intro3");
});
