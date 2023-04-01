// to open the server with python
// python -m http.server 8080
// http://localhost:8080/

import { PreloadAssets } from './preloadAssets.js';
import { PlayGame } from './playGame.js';
import { GameOptions } from './gameOptions.js';

let game;
window.onload = function() {
    let gameConfig = {
        type: Phaser.AUTO,
        width: GameOptions.gameWidth,
        height: GameOptions.gameHeight,
        //pixelArt: true,
        fps: {
          forceSetTimeOut: true,
          // panicMax: 0,
          // smoothStep: false,
          target: GameOptions.fps
        },
        scene: [PreloadAssets, PlayGame]
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}

