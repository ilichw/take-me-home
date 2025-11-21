import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });

    // Настройки генерации мира
    this.mapWidth = 40;
    this.mapHeight = 30;
    this.tileSize = 16;
    this.tileArray = [];
  }

  preload() {
    this.load.image('player', './src/assets/player.png');
    this.load.image('mob', './src/assets/mob.png');
    this.load.image('wall', './src/assets/wall.png');
    this.load.image('floor', './src/assets/floor.png');
  }

  create() {
    // Создание стен
    this.walls = this.physics.add.staticGroup();
    // this.createWalls(10);
    this.generateMap();

    // Создание игрока
    this.player = this.physics.add.sprite(96, 96, 'player');
    this.player.setCollideWorldBounds(true);

    // Создание мобов
    this.mobs = this.physics.add.group({
      key: 'mob',
      repeat: 5,
      setXY: { x: 480, y: 0, stepX: 240 }
    });

    this.mobs.children.iterate(function (mob) {
      //   mob.setOrigin(0, 0);
      mob.setVelocity(Phaser.Math.Between(-100, 100), 20);
      mob.setCollideWorldBounds(true);
      mob.setBounce(1);
    });

    this.physics.add.collider(this.player, this.walls);
    this.physics.add.collider(this.mobs, this.walls);
    this.physics.add.overlap(this.player, this.mobs, this.gameOver, null, this);

    // Настройка клавиш управления
    this.cursors = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on('keydown-P', (event) => {
      event.preventDefault();
      this.scene.pause();
      this.scene.launch('PauseScene');
    });
  }

  update() {
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

  generateMap() {
    for (let y = 0; y < this.mapHeight; y++) {
      this.tileArray[y] = [];
      for (let x = 0; x < this.mapWidth; x++) {
        // Генерация случайного типа плитки
        const tileType = Phaser.Math.Between(0, 1); // 0 - стена, 1 - пол
        this.tileArray[y][x] = tileType;

        const coef = this.tileSize / 2,
          xCen = x * this.tileSize - coef,
          yCen = y * this.tileSize - coef;
        if (tileType === 0) {
          this.walls.create(xCen, yCen, 'wall').setScale(1).refreshBody();
        } else {
          this.add.sprite(xCen, yCen, 'floor');
        }
      }
    }
  }
}
