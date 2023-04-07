import { GameOptions } from './gameOptions.js';

export class MainPage extends Phaser.Scene{
    constructor(){
        super("MainPage");
    }
    
    create ()
    {
        var camera = this.cameras.main;
        camera.setBounds(0, 0, GameOptions.screenGameWidth, GameOptions.screenGameHeight);
        camera.centerOnY((GameOptions.screenGameHeight-GameOptions.gameHeight)+GameOptions.gameHeight/2);
        //camera.setZoom(1); //<1 => zoom out

        var dragScale = this.plugins.get('rexpinchplugin').add(this);
        dragScale
            .on('drag1', function (dragScale) {
                var drag1Vector = dragScale.drag1Vector;
                camera.scrollY -= drag1Vector.y / camera.zoom;
                //camera.scrollX -= drag1Vector.x / camera.zoom;
            })
  

        /////// sky ////////////////
        this.add.image(0, 0, 'sky').setOrigin(0);
        /////// end sky ////////////////

        this.startPlay=this.add.text(GameOptions.gameWidth/4, GameOptions.screenGameHeight-100, 'STAGE 1', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        this.startPlay.on('pointerup',  function () {
                this.scene.start('PlayGame',{ level: "level1",maxBomb:3 });
            }, this);
        
        this.startPlay=this.add.text(GameOptions.gameWidth/4*2, GameOptions.screenGameHeight-100*2, 'STAGE 2', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        this.startPlay.on('pointerup',  function () {
                this.scene.start('PlayGame',{ level: "level2",maxBomb:6 });
            }, this);

        this.startPlay=this.add.text(GameOptions.gameWidth/4, GameOptions.screenGameHeight-100*3, 'STAGE 3', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        this.startPlay.on('pointerup',  function () {
                this.scene.start('PlayGame',{ level: "level3",maxBomb:6 });
            }, this);

        this.startPlay=this.add.text(GameOptions.gameWidth/4*2, GameOptions.screenGameHeight-100*4, 'STAGE 4', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        this.startPlay.on('pointerup',  function () {
                this.scene.start('PlayGame',{ level: "level4",maxBomb:6 });
            }, this);

        this.startPlay=this.add.text(GameOptions.gameWidth/4, GameOptions.screenGameHeight-100*5, 'STAGE 5', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        this.startPlay.on('pointerup',  function () {
                this.scene.start('PlayGame',{ level: "level5",maxBomb:6 });
            }, this);
            
    }
  
    update ()
    {

    }
        
  };
  