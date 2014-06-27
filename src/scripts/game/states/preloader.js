'use strict';

var Preloader = function(game) {
    this.ready = false;
};

Preloader.prototype = {
    preload: function() {
        this.game.load.onLoadComplete.addOnce(this.onLoadComplete, this);

        this.game.load.image('mountain_landscape_23', 'media/tilesets/mountain_landscape_23.png');
        this.game.load.image('main_player', 'media/player.png');

        this.game.load.tilemap('grassy_plains_1', 'scripts/levels/demo.json', null, Phaser.Tilemap.TILED_JSON);
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
