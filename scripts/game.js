var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container', {
    preload: preload,
    create: create
});

function preload() {
    game.load.image('tiles', 'media/tilesets/mountain_landscape_23.png');
}

function create() {
    game.add.sprite(0, 0, 'tiles');
}
