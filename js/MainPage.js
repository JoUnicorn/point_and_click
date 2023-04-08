import { GameOptions } from './gameOptions.js';

export class MainPage extends Phaser.Scene{
    constructor(){
        super("MainPage");
    }
    
    create ()
    {
        const UICam = this.cameras.add(0, 0, GameOptions.gameWidth, GameOptions.gameHeight);
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
        const sky=this.add.image(0, 0, 'sky').setOrigin(0);
        /////// end sky ////////////////

        ///// settings ////
        const settings=this.add.text(GameOptions.gameWidth-300, 50, 'Settings', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        .on('pointerup',  function () {

                // Create modal game object after click basePanel
                var modalGameObject = this.add.rectangle(0, 0, GameOptions.gameWidth/1.25, GameOptions.gameHeight/2, 0xffffff)
                    .on('destroy', function () {
                        console.log('parent destroy');
                    })
                // button will be destroyed after modal closing
                const closeButton=this.add.text(modalGameObject.width/2-180, -modalGameObject.height/2+10, 'Close', { fill: '#0f0' })
                .setFontSize(50)
                .setInteractive({ useHandCursor: true })
                .setStyle({ backgroundColor: '#111' })
                .on('pointerup',  function () {
                        modelBehavior.requestClose();
                    }, this);
                var container = this.add.container(GameOptions.gameWidth/2, GameOptions.gameHeight/2, [ modalGameObject, closeButton ]);
                camera.ignore(container);

                var modelBehavior = this.plugins.get('rexmodalplugin').add(container, {                    
                    touchOutsideClose: true,
                    duration: {
                        in: 500,
                        out: 500
                    },

                    // destroy: false
                })
                camera.ignore(modelBehavior);
            
            }, this);


        ///// les feuilles ////
        const feuille1=this.add.text(GameOptions.gameWidth/4, GameOptions.screenGameHeight-100, 'STAGE 1', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        .on('pointerup',  function () {
                this.scene.start('PlayGame',{ level: "level1",maxBomb:3 });
            }, this);
        
        const feuille2=this.add.text(GameOptions.gameWidth/4*2, GameOptions.screenGameHeight-100*2, 'STAGE 2', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        .on('pointerup',  function () {
                this.scene.start('PlayGame',{ level: "level2",maxBomb:6 });
            }, this);

        const feuille3=this.add.text(GameOptions.gameWidth/4, GameOptions.screenGameHeight-100*3, 'STAGE 3', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        .on('pointerup',  function () {
                this.scene.start('PlayGame',{ level: "level3",maxBomb:6 });
            }, this);

        const feuille4=this.add.text(GameOptions.gameWidth/4*2, GameOptions.screenGameHeight-100*4, 'STAGE 4', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        .on('pointerup',  function () {
                this.scene.start('PlayGame',{ level: "level4",maxBomb:6 });
            }, this);

        const feuille5=this.add.text(GameOptions.gameWidth/4, GameOptions.screenGameHeight-100*5, 'STAGE 5', { fill: '#0f0' })
        .setFontSize(50)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        .on('pointerup',  function () {
                this.scene.start('PlayGame',{ level: "level5",maxBomb:6 });
            }, this);

        //// ignore camera////
        UICam.ignore(sky);
        UICam.ignore(feuille1);
        UICam.ignore(feuille2);
        UICam.ignore(feuille3);
        UICam.ignore(feuille4);
        UICam.ignore(feuille5);
        camera.ignore(settings);
            
    }
  
    update ()
    {

    }
        
  };
  