import Phaser from 'phaser';

export default class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PauseScene' });
  }

  create() {
    // надо прописать сохранение состояния игры
    // ...

    const background = this.add.graphics();
    background.fillStyle(0x000000, 0.7);
    background.fillRect(0, 0, 800, 600);

    this.add.text(300, 250, 'Пауза', { fontSize: '32px', fill: '#fff' });
    this.add.text(250, 300, 'Нажмите P для продолжения', { fontSize: '20px', fill: '#fff' });

    this.input.keyboard.once('keydown-P', (event) => {
      event.preventDefault(); // Отменяем поведение по умолчанию
      this.scene.stop();

      // надо прописать загрузку сохраненного состояния игры
      // ...

      this.scene.start('MainScene'); // Возвращает к основной сцене
    });
  }
}
