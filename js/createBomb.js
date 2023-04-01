import { GameOptions } from './gameOptions.js';

export class createBomb{
  constructor(scene,posX, posY, width){
    this.bomb=this.createBomb(scene,posX, posY, width)
  }

  createBomb(scene,posX, posY, width){
    let circle = scene.world.createBody({
                                      type: 'dynamic',
                                      gravityScale: 0,
                                    });
    circle.createFixture({shape: planck.Circle(width/ scene.worldScale),
      density:100.0,
      friction:.2,
      filterGroupIndex:8,
      restitution:.4});
    circle.setPosition(planck.Vec2(posX / scene.worldScale, posY / scene.worldScale));
    var color = new Phaser.Display.Color();
    color.setTo(255, 0, 0);
    color.brighten(50).saturate(100);
    let userData = scene.add.graphics();
    userData.fillStyle(color.color, 1);
    userData.fillCircle(0, 0, width);

    circle.setUserData(userData);

    return circle;

  }

  explosion(scene){
    let posx=this.bomb.getPosition().x* scene.worldScale;
    let posy=this.bomb.getPosition().y* scene.worldScale;
    this.bomb.getUserData().clear();
    scene.world.destroyBody(this.bomb);
    let parts=[];
    for (var i = 0; i < GameOptions.numRays; i++)
    {
      var angle = (i / GameOptions.numRays) * 360 * GameOptions.DEGTORAD;
      var blastPower =90
      let rayDir = planck.Vec2(Math.sin(angle)*blastPower, Math.cos(angle)*blastPower);
      let part=this.createParticulesExpl(scene,posx, posy,5);
      part.setLinearVelocity(rayDir);
      parts.push(part);
    }
    scene.cameras.main.stopFollow();
    scene.time.addEvent({
        delay: GameOptions.partpropagationtime,
        callbackScope: scene,
        callback: function(){
          for (var i = 0; i < parts.length; i++)
          {
            parts[i].getUserData().clear();
            scene.world.destroyBody(parts[i]);
          }
          parts=[];
        },
        loop: false
    });

  }

  createParticulesExpl(scene,posX, posY, width){
  
    let part = scene.world.createBody({
                                      type: 'dynamic',
                                      fixedRotation: true,
                                      bullet: true,
                                      //linearDamping: 10, // arrete le mvt des que le rayon de projection est atteint
                                      //linearVelocity: rayDir,
                                      gravityScale: 0,
                                    });

    let circleShape = planck.Circle(width/ scene.worldScale);
    part.createFixture({
      shape: circleShape,
      density: GameOptions.densityPart,
      friction: 0,
      restitution: .99,
      filterGroupIndex:-1
    });

    part.setPosition(planck.Vec2(posX / scene.worldScale, posY / scene.worldScale));
    var color = new Phaser.Display.Color();
    color.random();
    color.brighten(50).saturate(100);
    let userData = scene.add.graphics();
    userData.fillStyle(color.color, 1);
    userData.fillCircle(0, 0, width);

    part.setUserData(userData);

    return part;

  }

}