var Preloader = function(game) {};

Preloader.prototype = {
    preload: function() {
        this.game.load.image('tiles', 'media/tilesets/mountain_landscape_23.png');
    },

    update: function() {
        this.game.state.start('MainGame');
    }
}

//==============================================================================

var MainGame = function(game) {};

MainGame.prototype = {
    create: function() {
        this.game.add.sprite(0, 0, 'tiles');
    }
}

//==============================================================================

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container');

game.state.add('Preloader', Preloader);
game.state.add('MainGame', MainGame);

game.state.start('Preloader');
