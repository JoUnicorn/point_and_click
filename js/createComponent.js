export class createComponent{
  constructor(componentType,scene,posX, posY, width, height, isDynamic, color){
    if(componentType=="Terrain"){
      this.createGround(scene,posX, posY, width, height, isDynamic, color,12)
    }
    if(componentType=="BreakableRect"){
      this.createRect(scene,posX, posY, width, height, isDynamic, color,11)
    }
    if(componentType=="BreakableCircle"){
      this.createCircle(scene,posX, posY, width, isDynamic, color,11)
    }
  }

  createGround(scene,posX, posY, width, height, isDynamic, color,filterGroupIndex){
    let box = scene.world.createBody();
    if(isDynamic){
        box.setDynamic();
    }
    box.createFixture({shape: planck.Box(width / 2 / scene.worldScale, height / 2 / scene.worldScale),
      density:10.0,filterGroupIndex:filterGroupIndex});
    box.setPosition(planck.Vec2(posX / scene.worldScale, posY / scene.worldScale));

    let borderColor = Phaser.Display.Color.IntegerToColor(color);
    borderColor.darken(20);

    let userData = scene.add.graphics();
    userData.fillStyle(color, 1);
    userData.fillRect(- width / 2, - height / 2, width, height);
    userData.lineStyle(4, borderColor.color)
    userData.strokeRect(- width / 2 + 2, - height / 2 + 2, width - 4, height - 4);
    box.setUserData(userData);
    return box;
  }

  createRect(scene,posX, posY, width, height, isDynamic, color,filterGroupIndex){
    let box = scene.world.createBody();
    if(isDynamic){
        box.setDynamic();
    }
    box.createFixture({shape: planck.Box(width / 2 / scene.worldScale, height / 2 / scene.worldScale),
      density:10.0,filterGroupIndex:filterGroupIndex});
    box.setPosition(planck.Vec2(posX / scene.worldScale, posY / scene.worldScale));

    let borderColor = Phaser.Display.Color.IntegerToColor(color);
    borderColor.darken(20);

    let userData = scene.add.graphics();
    userData.fillStyle(color, 1);
    userData.fillRect(- width / 2, - height / 2, width, height);
    userData.lineStyle(4, borderColor.color)
    userData.strokeRect(- width / 2 + 2, - height / 2 + 2, width - 4, height - 4);
    box.setUserData(userData);
    return box;
  }

  createCircle(scene,posX, posY, width, isDynamic, color,filterGroupIndex){
    let box = scene.world.createBody();
    if(isDynamic){
        box.setDynamic();
    }
    box.createFixture({shape: planck.Circle(width/2/ scene.worldScale),
      density:10.0,filterGroupIndex:filterGroupIndex});
    box.setPosition(planck.Vec2(posX / scene.worldScale, posY / scene.worldScale));

    let borderColor = Phaser.Display.Color.IntegerToColor(color);
    borderColor.darken(20);

    let userData = scene.add.graphics();
    userData.fillStyle(color, 1);
    userData.fillCircle(0, 0, width/2);
    userData.lineStyle(4, borderColor.color)
    userData.strokeCircle(0, 0, width/2 - 4);
    box.setUserData(userData);
    return box;
  }

}