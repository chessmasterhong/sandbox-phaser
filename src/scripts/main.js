'use strict';

requirejs.config({
    baseUrl: 'scripts',
    paths: {
        Phaser: 'bower_components/phaser/index',

        Boot: 'game/states/boot',
        Preloader: 'game/states/preloader',
        MainGame: 'game/states/maingame'
    }
});

define([
    'require',
    'Phaser',
    'Boot',
    'Preloader',
    'MainGame'
], function(require) {
    var Phaser = require('Phaser'),
        Boot = require('Boot'),
        Preloader = require('Preloader'),
        MainGame = require('MainGame');

    var game = new Phaser.Game(800, 600, Phaser.CANVAS);

    game.state.add('Boot', Boot);
    game.state.add('Preloader', Preloader);
    game.state.add('MainGame', MainGame);

    game.state.start('Boot');

    window.game = game || {};
    console.log(window.game.state.states);

    return game;
});

