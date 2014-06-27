define(function() {
    'use strict';

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
            //this.game.debug.cameraInfo(this.game.camera, 10, 20);
            //this.game.debug.spriteInfo(this.player, 10, 100);
            //this.game.debug.bodyInfo(this.player, 10, 20);
        }
    };

    return MainGame;
});
