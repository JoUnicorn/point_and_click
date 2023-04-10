import { GameOptions } from './gameOptions.js';
import { BLOCKTYPES } from './BLOCKTYPES.js';

export class MainPage extends Phaser.Scene{
    constructor(){
        super("MainPage");
    }
    
    create ()
    {

        let menu = this.make.tilemap({key: "menu"});
        var zoomappliedwidth=(window.innerWidth/(menu.width*GameOptions.tiledMenuHeightSize+GameOptions.maginmenu));
        var limite=1/zoomappliedwidth;

        const UICam = this.cameras.add(0, 0, GameOptions.gameWidth, GameOptions.gameHeight);
        var camera = this.cameras.main;
        camera.setBounds(0, 0, GameOptions.screenGameWidth, GameOptions.screenGameHeight*limite);
        camera.centerOnY((GameOptions.screenGameHeight*limite-GameOptions.gameHeight*limite)+GameOptions.gameHeight*limite/2);
        camera.setZoom(zoomappliedwidth); //<1 => zoom out

        var dragScale = this.plugins.get('rexpinchplugin').add(this);
        dragScale
            .on('drag1', function (dragScale) {
                var drag1Vector = dragScale.drag1Vector;
                camera.scrollY -= drag1Vector.y / camera.zoom;
                //camera.scrollX -= drag1Vector.x / camera.zoom;
            })
  

        /////// sky ////////////////
        const sky=this.add.image(0, 0, 'sky').setOrigin(0).setScale(limite);
        /////// end sky ////////////////

        ///// settings ////
        var scale=.25;
        const settings=this.add.image(GameOptions.gameWidth-300, 70, 'gears').setScale(scale);
        settings.setPosition(GameOptions.gameWidth-settings.width*scale/2-10, GameOptions.gameHeight-settings.height*scale/2-10)
        .setInteractive({ useHandCursor: true })
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
                const volume=this.add.image(0, 0, 'volume').setScale(scale)
                .setInteractive({ useHandCursor: true })
                .on('pointerup',  function () {
                        volume.visible=false;
                        mute.visible=true;
                    }, this);
                const mute=this.add.image(0, 0, 'mute').setScale(scale);
                mute.visible=false;
                mute.setInteractive({ useHandCursor: true })
                .on('pointerup',  function () {
                        mute.visible=false;
                        volume.visible=true;
                    }, this);
                var container = this.add.container(GameOptions.gameWidth/2, GameOptions.gameHeight/2, [ modalGameObject, closeButton, volume, mute ]);
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

        const interro_mark=this.add.image(GameOptions.gameWidth-300, 70, 'interrogation-mark').setScale(scale);
        interro_mark.setPosition(GameOptions.gameWidth-interro_mark.width*1.8*scale-10, GameOptions.gameHeight-interro_mark.height*scale/2-10)
        .setInteractive({ useHandCursor: true })
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


        /////// menu ////////////////
        this.offset=GameOptions.screenGameHeight*limite-menu.height*GameOptions.tiledMenuHeightSize-settings.height*scale*limite-GameOptions.menuBottomMargin;
        let base_menu = this.add.image(GameOptions.maginmenu/2, this.offset, 'base_menu').setOrigin(0);
        let stars = menu.objects[1].objects;
        stars.forEach(stars => this.addStar(stars));  
        for(var i=0;i<stars.length;i++){
            UICam.ignore(stars[i]);
        }
        let doors = menu.objects[0].objects;
        //doors.forEach(doors => this.addDoor(doors)); 
        for(var i=0;i<doors.length;i++){
            this.addDoor(doors[i],i,GameOptions.maxBomb[i]);
            UICam.ignore(doors[i]);
        }
        let arrows = menu.objects[2].objects;
        var actualLevel=2;
        for(var i=0;i<arrows.length;i++){
            if(actualLevel==i+1){
                this.addArrow(arrows[i],actualLevel);
                UICam.ignore(arrows[i]);    
            }
        }
        /////// end menu ////////////////


        //// ignore camera////
        UICam.ignore(sky);
        UICam.ignore(base_menu);
        camera.ignore(settings);
        camera.ignore(interro_mark);
            
    }
  
    update ()
    {

    }
        
    addStar(block) {
        
        let rectangle = new Phaser.Geom.Rectangle(block.x+GameOptions.maginmenu/2, block.y+this.offset, block.width, block.height);
        var r1 = this.add.star(rectangle.centerX, rectangle.centerY, 5, 48, 96, 0xFFFF00,0);
        r1.setStrokeStyle(10, 0xefc53f);
  
    }

    addArrow(block,actualLevel) {
  
        var data = [ 0,20, 84,20, 84,0, 120,50, 84,100, 84,80, 0,80 ];
        let rectangle = new Phaser.Geom.Rectangle(block.x+GameOptions.maginmenu/2, block.y+this.offset, block.width, block.height);
        var r1 = this.add.polygon(rectangle.centerX, rectangle.centerY, data, 0xFF0000).setScale(1.5);
        if(actualLevel% 2 == 0){
            r1.setRotation(Math.PI);
        }
        r1.setStrokeStyle(4, 0xefc53f);
        this.tweens.add({

            targets: r1,
            alpha: 0.2,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
    
        });        
  
    }

    addDoor(block,i,mbomb) {
        i=i+1;
        let rectangle = new Phaser.Geom.Rectangle(block.x+GameOptions.maginmenu/2, block.y+this.offset, block.width, block.height);
        this.add.rectangle(rectangle.centerX, rectangle.centerY-rectangle.height, rectangle.width, rectangle.height, 0x6666ff,0)
        .setInteractive({ useHandCursor: true })
        .on('pointerup',  function () {
            this.scene.start('PlayGame',{ level: "level"+i,maxBomb:mbomb });
        }, this);

    }

  };
  