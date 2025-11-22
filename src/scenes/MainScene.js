import Phaser from 'phaser';
import defaultSettings from '../config';
import generateMap from '../scripts/generateMap';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });

    // инициализация игровых настроек
    this.settings = {}; // настройки которые могут быть изменены
    // this.defaults = {}; // настройки которые не меняются в процессе игры

    // Настройки игрока
    this.settings.player = {};
    this.settings.player.startX = defaultSettings.player.startX;
    this.settings.player.startY = defaultSettings.player.startY;
    this.settings.player.velocityX = defaultSettings.player.velocityX;
    this.settings.player.velocityY = defaultSettings.player.velocityY;

    // Настройки мобов
    this.settings.mobs = {};
    this.settings.mobs.maxCount = defaultSettings.mobs.maxCount;

    // Настройки генерации мира
    this.tileSize = defaultSettings.tileSize;
    this.mapWidth = defaultSettings.fieldWidth / this.tileSize;
    this.mapHeight = defaultSettings.fieldHeight / this.tileSize;
    this.tileArray = [];
  }

  preload() {
    this.load.image('player', './src/assets/player.png');
    this.load.image('mob', './src/assets/mob.png');
    this.load.image('wall', './src/assets/wall.png');
    this.load.image('floor', './src/assets/floor.png');
    this.load.image('tiles', './src/assets/tileset.png');
    this.load.tilemapTiledJSON('map', './src/assets/lvl1.json');
  }

  create() {
    // Создание карты
    this.walls = this.physics.add.staticGroup();
    this.createMap();

    // Создание игрока
    // let startX = this.settings.player.startX,
    //   startY = this.settings.player.startY,
    //   setXCoef = (startX) => (this.mapWidth * this.tileSize) / startX - 1,
    //   setYCoef = (startY) => (this.mapHeight * this.tileSize) / startY - 1,
    //   xCoef = setXCoef(startX),
    //   yCoef = setYCoef(startY);

    // while (this.tileArray[yCoef][xCoef] !== 1) {
    //   startX -= this.tileSize;
    //   startY -= this.tileSize;
    //   xCoef = setXCoef(startX);
    //   yCoef = setYCoef(startY);
    // }

    // this.player = this.physics.add.sprite(startX, startY, 'player');
    // this.player.setCollideWorldBounds(true);

    // Создание игрока
    this.player = this.physics.add.sprite(
      this.settings.player.startX,
      this.settings.player.startY,
      'player'
    );
    this.player.setCollideWorldBounds(true);

    // Создание мобов
    this.mobs = this.physics.add.group({
      key: 'mob',
      repeat: this.settings.mobs.maxCount,
      setXY: { x: 480, y: 0, stepX: 240 }
    });

    this.mobs.children.iterate(function (mob) {
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
      velocityX = -this.settings.player.velocityX;
    }
    if (this.cursors.right.isDown) {
      velocityX = this.settings.player.velocityX;
    }
    if (this.cursors.up.isDown) {
      velocityY = -this.settings.player.velocityY;
    }
    if (this.cursors.down.isDown) {
      velocityY = this.settings.player.velocityY;
    }

    this.player.setVelocityX(velocityX);
    this.player.setVelocityY(velocityY);
  }

  gameOver() {
    this.scene.start('GameOverScene');
  }

  createMap() {
    this.tileArray = generateMap(this.mapWidth, this.mapHeight);

    // заполнение поля
    for (let y = 0; y < this.mapHeight; y++) {
      for (let x = 0; x < this.mapWidth; x++) {
        const tileType = this.tileArray[y][x];

        const coef = this.tileSize / 2, // для позиционирования
          xCen = x * this.tileSize + coef, // чтобы по центру
          yCen = y * this.tileSize + coef; // без setOrigin
        if (tileType === 0) {
          this.walls.create(xCen, yCen, 'wall').setScale(1).refreshBody();
        } else {
          this.add.sprite(xCen, yCen, 'floor');
        }
      }
    }
  }
}
