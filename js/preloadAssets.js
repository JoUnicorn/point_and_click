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
    this.load.tilemapTiledJSON("level1", "assets/maps/level1.json");
    this.load.atlas('explosion', 'assets/particles/explosion.png', 'assets/particles/explosion.json');
  }

  create ()
  {
    this.scene.start('MainPage');
  }

};
