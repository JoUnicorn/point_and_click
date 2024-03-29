//https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/

// CONFIGURABLE GAME OPTIONS

export const GameOptions = {
 
  gameWidth:window.innerWidth,
  gameHeight:window.innerHeight,
  screenGameWidth:3500,
  screenGameHeight:3500,
  worldScaleParam:30,
  worldGravity:3,
  tiledHeightSize:70,
  tiledMenuHeightSize:504,
  maginmenu:300,
  gamesteps:10, // the lower the faster the game is
  densityPart:300, // the bigger the more impactful the particule is
  partpropagationtime:150, // the longer the bigger the bomb propagate particules
  fps:61,
  numberOfLevels:4,
  versiongame:Date.now(),
  maxBomb:[3,3,5,5],
  menuBottomMargin:50,
  
  numRays:32,
  DEGTORAD:0.0174532925199432957

}