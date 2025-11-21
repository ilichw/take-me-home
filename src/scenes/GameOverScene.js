import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  create() {
    this.add.text(300, 250, 'Игра окончена!', { fontSize: '32px', fill: '#fff' });
    this.add.text(300, 300, 'Нажмите R для перезапуска', { fontSize: '20px', fill: '#fff' });

    this.input.keyboard.once('keydown-R', (event) => {
      event.preventDefault(); // Отменяем поведение по умолчанию
      this.scene.start('MainScene'); // Перезапуск сцены
    });
  }
}
