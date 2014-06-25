'use strict';

var Preloader = function(game) {
    this.ready = false;
};

Preloader.prototype = {
    preload: function() {
        this.game.load.onLoadComplete.addOnce(this.onLoadComplete, this);

        this.game.load.image('tiles', 'media/tilesets/mountain_landscape_23.png');
    },

    update: function() {
        if(this.ready) {
            this.game.state.start('MainGame');
        }
    },

    onLoadComplete: function() {
        this.ready = true;
    }
};

//==============================================================================

var MainGame = function(game) {};

MainGame.prototype = {
    create: function() {
        this.game.add.sprite(0, 0, 'tiles');
    }
};

//==============================================================================

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container');

game.state.add('Preloader', Preloader);
game.state.add('MainGame', MainGame);

game.state.start('Preloader');
