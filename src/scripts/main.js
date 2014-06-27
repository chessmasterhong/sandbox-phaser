requirejs.config({
    baseUrl: 'scripts',
    paths: {
        phaser: 'bower_components/phaser/index'
    },
    shim: {
        phaser: { exports: 'Phaser' }
    }
});


require([
        'phaser',
        'game/states/boot',
        'game/states/preloader',
        'game/states/maingame'
    ], function(
        Phaser, Boot, Preloader, MainGame
    ) {
        var game = new Phaser.Game(800, 600, Phaser.CANVAS);

        game.state.add('Boot', Boot);
        game.state.add('Preloader', Preloader);
        game.state.add('MainGame', MainGame);

        game.state.start('Boot');

        return game;
});

