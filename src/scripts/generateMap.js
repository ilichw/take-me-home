import mapData from '../assets/level1.json' assert { type: 'json' };

export default function generateMap(mapWidth, mapHeight) {
  const tileArray = mapData.data;
  return tileArray;
}

function _generateMap(mapWidth, mapHeight) {
  const tileArray = [];

  for (let y = 0; y < mapHeight; y++) {
    tileArray[y] = [];

    // первая и последняя плитка в ряду всегда стена
    tileArray[y][0] = 0;
    tileArray[y][mapWidth - 1] = 0;

    for (let x = 1; x < mapWidth - 1; x++) {
      // первый и последний ряд всегда стены
      if (y === 0 || y === mapHeight - 1) {
        tileArray[y][x] = 0;
      }
      // для остальных генерация случайного типа плитки
      else {
        const tileType = getTileType(x, y, tileArray);
        tileArray[y][x] = tileType;
      }
    }
  }

  return tileArray;
}

function getTileType(x, y, tileArray) {
  if (tileArray[y][x - 1] !== 1 && tileArray[y - 1] !== undefined && tileArray[y - 1][x] !== 1) {
    return 1;
  }
  return Math.random() < 0.5 ? 0 : 1; // 0 - стена, 1 - пол
}
