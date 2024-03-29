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

    this.load.image('base_menu', 'assets/maps/menu.png')
    this.load.tilemapTiledJSON("menu", "assets/maps/menu.json");
    for (var i = 1; i < GameOptions.numberOfLevels+1; i++)
    {
      this.load.tilemapTiledJSON("level"+i, "assets/maps/level"+i+".json");
    }
    this.load.atlas('explosion', 'assets/particles/explosion.png', 'assets/particles/explosion.json');
    this.load.image('gears', 'assets/images/setting.png');
    this.load.image('volume', 'assets/images/volume.png');
    this.load.image('mute', 'assets/images/mute.png');
    this.load.image('interrogation-mark', 'assets/images/interrogation-mark.png');
  }

  create ()
  {
    this.scene.start('MainPage');
  }

};
