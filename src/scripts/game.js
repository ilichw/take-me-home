import Phaser from 'phaser';

const config = {
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  id: 'game',
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

function preload() {
  // Загрузка активов
}

function create() {
  // Инициализация игры
}

function update() {
  // Логика обновления игры
}
