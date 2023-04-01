export class createBomb{
  constructor(posX, posY, width){
    this.bomb=this.createGround(posX, posY, width)
  }

  createBomb(posX, posY, width){
    let circle = this.world.createBody({
                                      type: 'dynamic',
                                      gravityScale: 0,
                                    });
    circle.createFixture({shape: planck.Circle(width/ this.worldScale),
      density:100.0,
      friction:.2,
      filterGroupIndex:8,
      restitution:.4});
    circle.setPosition(planck.Vec2(posX / this.worldScale, posY / this.worldScale));
    var color = new Phaser.Display.Color();
    color.setTo(255, 0, 0);
    color.brighten(50).saturate(100);
    let userData = this.add.graphics();
    userData.fillStyle(color.color, 1);
    userData.fillCircle(0, 0, width);

    circle.setUserData(userData);

    return circle;

  }

  explosion(){
    let posx=this.bomb.getPosition().x* this.worldScale;
    let posy=this.bomb.getPosition().y* this.worldScale;
    this.bomb.getUserData().clear();
    this.world.destroyBody(this.bomb);
    var numRays=32;
    var DEGTORAD=0.0174532925199432957;
    let parts=[];
    for (var i = 0; i < numRays; i++)
    {
      var angle = (i / numRays) * 360 * DEGTORAD;
      var blastPower =90
      let rayDir = planck.Vec2(Math.sin(angle)*blastPower, Math.cos(angle)*blastPower);
      let part=this.createParticulesExpl(posx, posy,5);
      part.setLinearVelocity(rayDir);
      parts.push(part);
    }
    this.cameras.main.stopFollow();
    this.time.addEvent({
        delay: GameOptions.partpropagationtime,
        callbackScope: this,
        callback: function(){
          for (var i = 0; i < parts.length; i++)
          {
            parts[i].getUserData().clear();
            this.world.destroyBody(parts[i]);
          }
          parts=[];
        },
        loop: false
    });

  }

  createParticulesExpl(posX, posY, width){
  
    let part = this.world.createBody({
                                      type: 'dynamic',
                                      fixedRotation: true,
                                      bullet: true,
                                      //linearDamping: 10, // arrete le mvt des que le rayon de projection est atteint
                                      //linearVelocity: rayDir,
                                      gravityScale: 0,
                                    });

    let circleShape = planck.Circle(width/ this.worldScale);
    part.createFixture({
      shape: circleShape,
      density: GameOptions.densityPart,
      friction: 0,
      restitution: .99,
      filterGroupIndex:-1
    });

    part.setPosition(planck.Vec2(posX / this.worldScale, posY / this.worldScale));
    var color = new Phaser.Display.Color();
    color.random();
    color.brighten(50).saturate(100);
    let userData = this.add.graphics();
    userData.fillStyle(color.color, 1);
    userData.fillCircle(0, 0, width);

    part.setUserData(userData);

    return part;

  }

}