'use strict';

var Boot = function(game) {};

Boot.prototype = {
    create: function() {
        this.game.input.maxPointers = 1;

        if(this.game.device.desktop) {
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;

            this.game.scale.refresh();
        } else {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.game.scale.minWidth = 480;
            this.game.scale.maxWidth = 640;

            this.game.scale.minHeight = 260;
            this.game.scale.maxHeight = 480;

            this.game.scale.forceLandscape = true;

            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;

            this.game.scale.setScreenSize(true);
        }

        this.game.state.start('Preloader');
    }
};

//==============================================================================

var Preloader = function(game) {
    this.ready = false;
};

Preloader.prototype = {
    preload: function() {
        this.game.load.onLoadComplete.addOnce(this.onLoadComplete, this);

        this.load.image('mountain_landscape_23', 'media/tilesets/mountain_landscape_23.png');
        this.load.image('main_player', 'media/player.png');

        this.load.tilemap('grassy_plains_1', 'scripts/levels/demo.json', null, Phaser.Tilemap.TILED_JSON);
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
        var map = this.add.tilemap('grassy_plains_1');
        map.addTilesetImage('mountain_landscape_23', 'mountain_landscape_23');
        var layer = map.createLayer('ground');
        layer.resizeWorld();

        this.add.sprite(64, 64, 'main_player', 'MainPlayer');
    }
};

//==============================================================================

var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('MainGame', MainGame);

game.state.start('Boot');
