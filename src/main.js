import Phaser from 'phaser';
import MainScene from './scenes/MainScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import PauseScene from './scenes/PauseScene.js';
import defaultSettings from './config.js';

const config = {
  type: Phaser.AUTO,
  width: defaultSettings.fieldWidth,
  height: defaultSettings.fieldHeight,
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
