import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
    this.isPaused = false;
  }

  preload() {
    this.load.image('player', './src/assets/player.png');
    this.load.image('mob', './src/assets/mob.png');
    this.load.image('wall', './src/assets/wall.png');
  }

  create() {
    this.walls = this.physics.add.staticGroup();
    this.createWalls(10);

    this.player = this.physics.add.sprite(100, 100, 'player');
    this.player.setCollideWorldBounds(true);

    this.mobs = this.physics.add.group({
      key: 'mob',
      repeat: 5,
      setXY: { x: 400, y: 0, stepX: 200 }
    });

    this.mobs.children.iterate(function (mob) {
      mob.setVelocity(Phaser.Math.Between(-100, 100), 20);
      mob.setCollideWorldBounds(true);
      mob.setBounce(1);
    });

    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.mobs, this.walls);
    this.physics.add.overlap(this.player, this.mobs, this.gameOver, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on('keydown-P', (event) => {
      event.preventDefault();
      this.scene.pause();
      this.scene.launch('PauseScene');
    });
  }

  update() {
    // Не обновлять если игра на паузе
    if (this.isPaused) return;

    // Обработка движения игрока
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown) {
      velocityX = -160;
    }
    if (this.cursors.right.isDown) {
      velocityX = 160;
    }
    if (this.cursors.up.isDown) {
      velocityY = -160;
    }
    if (this.cursors.down.isDown) {
      velocityY = 160;
    }

    this.player.setVelocityX(velocityX);
    this.player.setVelocityY(velocityY);
  }

  gameOver() {
    this.scene.start('GameOverScene');
  }

  createWalls(numberOfWalls) {
    for (let i = 0; i < numberOfWalls; i++) {
      const x = Phaser.Math.Between(100, 700);
      const y = Phaser.Math.Between(100, 500);
      this.walls.create(x, y, 'wall').setScale(1).refreshBody();
    }
  }
}

class GameOverScene extends Phaser.Scene {
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

class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PauseScene' });
  }

  create() {
    const background = this.add.graphics();
    background.fillStyle(0x000000, 0.7);
    background.fillRect(0, 0, 800, 600);

    this.add.text(300, 250, 'Пауза', { fontSize: '32px', fill: '#fff' });
    this.add.text(250, 300, 'Нажмите P для продолжения', { fontSize: '20px', fill: '#fff' });

    this.input.keyboard.once('keydown-P', (event) => {
      event.preventDefault(); // Отменяем поведение по умолчанию
      this.scene.stop();
      this.scene.start('MainScene'); // Возвращает к основной сцене
    });
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      debug: false
    }
  },
  scene: [MainScene, GameOverScene, PauseScene]
};

const game = new Phaser.Game(config);
