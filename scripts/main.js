var game = new Phaser.Game(800, 600, Phaser.CANVAS);

game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('MainGame', MainGame);

game.state.start('Boot');
