import Phaser from 'phaser';

const config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
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
let player, cursors, platforms;

function preload() {
  this.load.image('player', './src/assets/player.png');
  this.load.image('ground', './src/assets/ground.png');
  // this.load.image('myTexture', 'assets/myTexture.png'); // Загружаем текстуру

  cursors = this.input.keyboard.createCursorKeys();
}

function create() {
  platforms = this.physics.add.staticGroup();

  platforms.create(25, 25, 'ground').setOrigin(0, 0); // верхняя граница
  platforms
    .create(800 - 25, 25, 'ground')
    .setOrigin(0, 0)
    .setAngle(90); // правая
  platforms.create(0, 600 - 25, 'ground').setOrigin(0, 0); // нижняя
  platforms.create(50, 25, 'ground').setOrigin(0, 0).setAngle(90); // левая

  player = this.physics.add.sprite(100, 100, 'player');

  // Создаем Graphics для рисования, но не будем заполнять текстурой
  // const graphics = this.add.graphics();
  // Создаем спрайт с текстурой, которая будет повторяться
  const rectangleSprite = this.physics.add.sprite(200, 200, 'myTexture');

  // Определяем размеры и позицию прямоугольника
  const width = 500;
  const height = 100;
  // const x = 200;
  // const y = 200;
  rectangleSprite.setDisplaySize(width, height); // Устанавливаем размеры спрайта

  // Используем Repeat для текстуры
  rectangleSprite.setTexture('myTexture');
  rectangleSprite.displayWidth = width; // Устанавливаем ширину
  rectangleSprite.displayHeight = height; // Устанавливаем высоту

  // Устанавливаем текстуру как повторяющуюся
  rectangleSprite.setScale(width / rectangleSprite.width, height / rectangleSprite.height);
  // Рисуем прямоугольник (если нужно, можете использовать цвет)
  // graphics.fillStyle(0xffffff, 1); // Если нужно, цвет фона (можно убрать)
  // graphics.fillRect(x, y, width, height); // Рисуем графику, предпочтительным вариантом будет задать цвет

  // Удаляем графику, если она не нужна
  // graphics.destroy();

  // Создаем спрайт для текстуры
  // const rectangleSprite = this.physics.add.sprite(x, y, 'ground');
  // rectangleSprite.setDisplaySize(width, height); // Устанавливаем размеры спрайта в соответствии с прямоугольником
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
  player.setVelocityX(velocityX);
  player.setVelocityY(velocityY);
}
