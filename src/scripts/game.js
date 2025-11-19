import Phaser from 'phaser';

const config = {
  type: Phaser.CANVAS,
  width: 640,
  height: 480,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('ball', './src/assets/ball.png');
}

function create() {
  this.add.image(50, 50, 'ball');
}

function update() {
  // Логика обновления игры
}
