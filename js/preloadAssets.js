import { GameOptions } from './gameOptions.js';

export class PreloadAssets extends Phaser.Scene{
  constructor(){
      super("PreloadAssets");
  }

  preload ()
  {
    this.load.image('sky', 'assets/images/sky.png');
    this.load.image('ground', 'assets/images/platform.png');
    var url = 'js/rexpinchplugin.min.js';
    this.load.plugin('rexpinchplugin', url, true);
    url = 'js/rexmodalplugin.min.js';
    this.load.plugin('rexmodalplugin', url, true);

    for (var i = 1; i < GameOptions.numberOfLevels+1; i++)
    {
      this.load.tilemapTiledJSON("level"+i, "assets/maps/level"+i+".json");
    }
    this.load.atlas('explosion', 'assets/particles/explosion.png', 'assets/particles/explosion.json');
  }

  create ()
  {
    this.scene.start('MainPage');
  }

};
