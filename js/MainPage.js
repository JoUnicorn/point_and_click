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

        this.startPlay=this.add.text(GameOptions.gameWidth/2-100, GameOptions.gameHeight/2, 'MOVE', { fill: '#0f0' })
        .setFontSize(100)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        this.startPlay.on('pointerup',  function () {
                this.scene.start('PlayGame');
            }, this);

    }
  
    update ()
    {

    }
      
        
  };
  