import { GameOptions } from './gameOptions.js';
import { BLOCKTYPES } from './BLOCKTYPES.js';
import { createComponent } from './createComponent.js';
import { createBomb } from './createBomb.js';
import { createExplosion } from './createExplosion.js';

export class PlayGame extends Phaser.Scene{
    constructor(){
        super("PlayGame");
    }

    init(data){
      this.levelChosen=data.level;
      this.levelMaxBomb=data.maxBomb;
    }

    create ()
    {

      // get the number of tiles height and set zoom
      let map = this.make.tilemap({key: this.levelChosen});
      var zoomappliedwidth=(window.innerWidth/(map.width*GameOptions.tiledHeightSize));
      var zoomapplied=(window.innerHeight/(map.height*GameOptions.tiledHeightSize));
      var limiteHoriJeu=(zoomapplied/zoomappliedwidth)/zoomapplied;
      var limiteVerticalJeu=1/zoomapplied;

      const UICam = this.cameras.add(0, 0, GameOptions.gameWidth, GameOptions.gameHeight);
      /// zoom/////
      var dragScale = this.plugins.get('rexpinchplugin').add(this);
      //dragScale.bounds=rect;
      var camera = this.cameras.main;
      var refcamerazoom=camera.zoom;
      dragScale
          .on('drag1', function (dragScale) {
              if(!bombbool){
                var drag1Vector = dragScale.drag1Vector;
                camera.scrollX -= drag1Vector.x / camera.zoom;
                camera.scrollY -= drag1Vector.y / camera.zoom;
              }
          })
          .on('pinch', function (dragScale) {
              var scaleFactor = dragScale.scaleFactor;
              this.myzoom.setText('zoom: '+camera.zoom);
              camera.zoom *= scaleFactor;
            }, this)
      /// end zoom/////
  
      /////// camera /////
      camera.setOrigin(1);
      console.log(GameOptions.gameWidth,GameOptions.gameHeight);
      console.log(GameOptions.gameWidth*limiteHoriJeu,GameOptions.gameHeight*limiteVerticalJeu);
      camera.setBounds(0, 0, GameOptions.gameWidth*limiteHoriJeu, GameOptions.gameHeight*limiteVerticalJeu);
      camera.setZoom(zoomappliedwidth); //<1 => zoom out
      /////// end camera /////
  
      //////// planck.js box2d /////////////
      // Box2D works with meters. We need to convert meters to pixels.
      // let's say 30 pixels = 1 meter.
      this.worldScale = GameOptions.worldScaleParam;
  
      // world gravity, as a Vec2 object. It's just a x, y vector (x=gravity horizontal, y gravity vertical)
      let gravity = planck.Vec2(0, GameOptions.worldGravity);
      // this is how we create a Box2D world
      this.world = planck.World(gravity);
  
      /////// sky ////////////////
      this.sky=this.add.image(0, 0, 'sky').setOrigin(0);
      /////// end sky ////////////////
  
  
      // select all objects in Object Layer zero, the first - and only, at the moment - level
      let blocks = map.objects[0].objects;
  
      // looping through all blocks and execute addBlock method
      this.box2DBlock=[]
      blocks.forEach(blocks => this.addBlock(blocks));
      
      //cursor
      var pointer = this.input.activePointer;
  
      var pospointerdown=0
      this.input.on('pointerdown', function (pointer) {
          pospointerdown=pointer.x;
      }, this);
  
      // ball
      let balls=[];
      let bombbool=false;
      let bombexception=true;
      this.bombToExplose=[];
      this.input.on('pointerup', function (pointer) {
        if(balls.length<this.levelMaxBomb){
          if(bombbool & bombexception){
            balls.push(new createBomb(this,pointer.worldX, pointer.worldY, 30));
          }  
        }
        bombexception=true;
      }, this);
  
      // events
      this.world.on('begin-contact', function(contact) {
        let bodyA=contact.getFixtureA().getBody();
        let bodyB=contact.getFixtureB().getBody();
        if((bodyB.getFixtureList().getFilterGroupIndex()==-1)&(bodyA.getFixtureList().getFilterGroupIndex()==8)){
          for (var i = 0; i < balls.length; i++)
          {
            if(balls[i].bomb.getPosition().x==bodyA.getPosition().x)
            {
              this.bombToExplose.push(balls[i]);
              balls.splice(i, 1);// remove the ith ball
              break;
            }
          }
        }
        if((bodyA.getFixtureList().getFilterGroupIndex()==11)&(bodyB.getFixtureList().getFilterGroupIndex()==8)){
          for (var i = 0; i < balls.length; i++)
          {
            if(balls[i].bomb.getPosition().x==bodyB.getPosition().x)
            {
              this.bombToExplose.push(balls[i]);
              balls.splice(i, 1);// remove the ith ball
              break;
            }
          }
        }
        if((bodyA.getFixtureList().getFilterGroupIndex()==12)&(bodyB.getFixtureList().getFilterGroupIndex()==11)){
          if(bodyB.getLinearVelocity().x!=0){
            bodyB.getFixtureList().m_filterGroupIndex=13;
            // create a particle manager with the same image used for the ball
            let particleEmitter = new createExplosion(this);
            particleEmitter.explosion.emitParticleAt(bodyB.getPosition().x* this.worldScale, bodyB.getPosition().y* this.worldScale);
          }
        }
      }.bind(this));
  


      /////// UI
      this.userActions=this.add.text(20, GameOptions.gameHeight-100, 'MOVE', { fill: '#0f0' })
          .setFontSize(100)
          .setInteractive({ useHandCursor: true })
          .setStyle({ backgroundColor: '#111' })
      this.userActions.on('pointerup',  function () {
              if(bombbool){
                bombbool=false;
                this.userActions.setText('MOVE');
              }else{
                bombbool=true;
                this.userActions.setText('BOMB');
              }
              bombexception=false;
          }, this);
      
      this.explosionText=this.add.text(GameOptions.gameWidth-200, GameOptions.gameHeight-100, 'EXP', { fill: '#0f0' })
          .setFontSize(100)
          .setInteractive({ useHandCursor: true })
          .setStyle({ backgroundColor: '#111' })
          .setScrollFactor(0)
          .on('pointerup',  function () {
            if(balls.length>0){
              balls[balls.length-1].explosion(this);
              balls.pop();
            }
            bombexception=false;
          }, this);
  
      this.resetText=this.add.text(GameOptions.gameWidth -370, 50, 'RESET!'+GameOptions.versiongame, { fill: '#0f0' })
        .setFontSize(30)
        .setInteractive({ useHandCursor: true })
        .setStyle({ backgroundColor: '#111' })
        .setScrollFactor(0)
        .on('pointerup',  function () {
            this.scene.start('MainPage');
            bombexception=false;
        }, this);
    
      // actualFps
      this.myfps=this.add.text(10, 40, 'FPS', { fill: '#000000' }).setFontSize(30).setScrollFactor(0);
      this.myzoom=this.add.text(10, 10, 'zoom: '+refcamerazoom, { fill: '#000000' }).setFontSize(30);

      // camera scope
      UICam.ignore(this.children.list.filter(function (item){return item.type!="Text"}));
      camera.ignore(this.children.list.filter(function (item){return item.type=="Text"}));
    }
  
    update ()
    {
      // speed of the game (lower = faster)
      this.world.step(1 / GameOptions.gamesteps);

      if(this.bombToExplose.length>0){
        this.bombToExplose[0].explosion(this);
        this.bombToExplose.shift();
      }
  
      this.world.clearForces();
      for (let b = this.world.getBodyList(); b; b = b.getNext()){
        var filtergrpindex=b.getFixtureList().getFilterGroupIndex();
        if(filtergrpindex==13){
          b.getUserData().clear();
          this.world.destroyBody(b);
          this.box2DBlock.shift();
          if(this.box2DBlock.length==0){
             this.scene.start('MainPage');
          }
        }
        if(filtergrpindex!=9 & filtergrpindex!=13){
          let bodyPosition = b.getPosition();
          let bodyAngle = b.getAngle();
          let userData = b.getUserData();
          userData.x = bodyPosition.x * this.worldScale;
          userData.y = bodyPosition.y * this.worldScale;
          userData.rotation = bodyAngle;
        }
      }
  
      var loop = this.sys.game.loop;
      this.myfps.setText('actualFps: ' + loop.actualFps.toFixed(0));
    }
      
    // method to add a totem block
    addBlock(block) {
  
        // get block object
        let blockObject = BLOCKTYPES[block.type];
  
        // we store block coordinates inside a Phaser Rectangle just to get its center
        let rectangle = new Phaser.Geom.Rectangle(block.x, block.y, block.width, block.height);
  
        // create the Box2D block with old createBox method
        let output=new createComponent(block.type,this,rectangle.centerX, rectangle.centerY, block.width, 
        block.height, blockObject.dynamic, blockObject.color).Component;
        if(output=="Breakable"){
          this.box2DBlock.push("Breakable");
        }
    }
        
  };
  