// to open the server with python
// python -m http.server 8080
// http://localhost:8080/

import { PreloadAssets } from './preloadAssets.js';
import { MainPage } from './MainPage.js';
import { PlayGame } from './PlayGame.js';
import { GameOptions } from './gameOptions.js';

let game;
window.onload = function() {
    let gameConfig = {
        type: Phaser.CANVAS,
        width: GameOptions.gameWidth,
        height: GameOptions.gameHeight,
        //pixelArt: true,
        fps: {
          forceSetTimeOut: true,
          // panicMax: 0,
          // smoothStep: false,
          target: GameOptions.fps
        },
        scene: [PreloadAssets, MainPage, PlayGame]
    }
    game = new Phaser.Game(gameConfig);
    window.focus();
}

