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
let ball, cursors;

function preload() {
  this.load.image('ball', './src/assets/ball.png');
  cursors = this.input.keyboard.createCursorKeys();
}

function create() {
  ball = this.physics.add.sprite(50, 50, 'ball');
}

function update() {
  // Инициализация скорости
  let velocityX = 0;
  let velocityY = 0;

  if (cursors.left.isDown) {
    velocityX = -160;
  }
  if (cursors.right.isDown) {
    velocityX = 160;
  }
  if (cursors.up.isDown) {
    velocityY = -160;
  }
  if (cursors.down.isDown) {
    velocityY = 160;
  }

  // Устанавливаем скорость
  ball.setVelocityX(velocityX);
  ball.setVelocityY(velocityY);
}
