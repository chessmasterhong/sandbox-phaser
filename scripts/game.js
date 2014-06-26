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

//==============================================================================

var MainGame = function(game) {
    this.KEY = {};
    this.camera = null;
    this.player = null;
    this.speed = 128;
};

MainGame.prototype = {
    create: function() {
        this.KEY.UP = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.KEY.DOWN = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.KEY.LEFT = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.KEY.RIGHT = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        var map = this.game.add.tilemap('grassy_plains_1');
        map.addTilesetImage('mountain_landscape_23', 'mountain_landscape_23');
        var layer = map.createLayer('ground');
        layer.resizeWorld();

        this.player = this.game.add.sprite(64, 64, 'main_player', 'MainPlayer');

        this.game.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);

        this.game.camera.follow(this.player);
    },

    update: function() {
        if(this.KEY.UP.isDown) {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = -this.speed;
        } else if(this.KEY.DOWN.isDown) {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = this.speed;
        } else if(this.KEY.LEFT.isDown) {
            this.player.body.velocity.x = -this.speed;
            this.player.body.velocity.y = 0;
        } else if(this.KEY.RIGHT.isDown) {
            this.player.body.velocity.x = this.speed;
            this.player.body.velocity.y = 0;
        } else {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
        }
    },

    render: function() {
        this.game.debug.cameraInfo(this.game.camera, 10, 20);
        this.game.debug.spriteInfo(this.player, 10, 100);
    }
};

//==============================================================================

var game = new Phaser.Game(800, 600, Phaser.AUTO);

game.state.add('Boot', Boot);
game.state.add('Preloader', Preloader);
game.state.add('MainGame', MainGame);

game.state.start('Boot');
