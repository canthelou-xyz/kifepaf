PIXIScene.image("background", "img/OFC-App-V3-Jeu1-01.png", 180, 320);
PIXIScene.image("bandeau", "img/OFC-App-V3-Jeu1-04.png", 180, 200);
PIXIScene.image("txt1", "img/OFC-App-V3-Jeu1-05.png", 180, 180);
PIXIScene.image("txt2", "img/OFC-App-V3-Jeu1-06.png", 180, 230);
PIXIScene.image("txt3", "img/OFC-App-V3-Jeu1-07.png", 180, 320);
PIXIScene.image("fleche", "img/Jeu 1-04.png", 180, 390);
PIXIScene.image("colombe", "img/OFC-App-V3-Jeu1-09.png", 180, 440);
PIXIScene.sound("scintillements", "resources/spell.mp3");

PIXIScene.action("background", function (ev, assets, game) {
    endMe(assets);
});

function endMe(assets) {
    assets.scintillements.play();
    var tl = new TimelineMax({
        onComplete: function () {
            PIXIScene.gotoScreen("jeu1");
        }
    });
    tl.to(assets.colombe, 0.5, {
        pixi: {x: "-=360"}, onStart: function () {
            TweenMax.set(assets.colombe, {pixi: {blur: 10}});
        }
    })
        .to(assets.fleche, 0.5, {pixi: {alpha: 0}})
        .staggerTo([assets.txt1, assets.txt2, assets.txt3], 0.5, {pixi: {x: "+=360"}}, 0.25)
        .to([assets.bandeau], 0.5, {pixi: {y: "-=560"}}, "-=0.25")

}

PIXIScene.after(function (assets) {
    TweenMax.to(g("colombe"), 0.5, {delay:0.2, repeat: -1, yoyo:true, pixi: {scaleX: "+=0.02",scaleY: "+=0.005"}});
    TweenMax.to(assets.fleche, 0.5, {repeat: -1, yoyo: true, pixi: {y: "-=10"}});
    TweenMax.to(assets.colombe, 0.25, {
        delay: 5,
        onComplete: function () {
            endMe(assets);
        }
    });
});
