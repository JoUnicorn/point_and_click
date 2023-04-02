//https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/

// CONFIGURABLE GAME OPTIONS
 
export const GameOptions = {
 
  gameWidth:window.innerWidth,
  gameHeight:window.innerHeight,
  worldScaleParam:30,
  worldGravity:3,
  tiledHeightSize:70,
  gamesteps:10, // the lower the faster the game is
  densityPart:300, // the bigger the more impactful the particule is
  partpropagationtime:150, // the longer the bigger the bomb propagate particules
  fps:61,
  numberOfLevels:3,
  versiongame:Date.now(),
  
  numRays:32,
  DEGTORAD:0.0174532925199432957

}