import { GameOptions } from './gameOptions.js';

export class MainPage extends Phaser.Scene{
    constructor(){
        super("MainPage");
    }
    
    create ()
    {
        const UICam = this.cameras.add(0, 0, GameOptions.gameWidth, GameOptions.gameHeight);
        var camera = this.cameras.main;
        /////// sky ////////////////
        this.sky=this.add.image(0, 0, 'sky').setOrigin(0);
        /////// end sky ////////////////

        this.startPlay=this.add.text(GameOptions.gameWidth/4, GameOptions.gameHeight-100, 'STAGE 1', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        this.startPlay.on('pointerup',  function () {
                this.scene.start('PlayGame',{ level: "level1",maxBomb:3 });
            }, this);
        
        this.startPlay=this.add.text(GameOptions.gameWidth/4*2, GameOptions.gameHeight-100*2, 'STAGE 2', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        this.startPlay.on('pointerup',  function () {
                this.scene.start('PlayGame',{ level: "level2",maxBomb:6 });
            }, this);

        this.startPlay=this.add.text(GameOptions.gameWidth/4, GameOptions.gameHeight-100*3, 'STAGE 3', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        this.startPlay.on('pointerup',  function () {
                this.scene.start('PlayGame',{ level: "level3",maxBomb:6 });
            }, this);
    
    }
  
    update ()
    {

    }
      
        
  };
  