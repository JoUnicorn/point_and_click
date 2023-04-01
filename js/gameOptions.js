// CONFIGURABLE GAME OPTIONS
 
const zoomapplied=.34;

export const GameOptions = {
 
  gameWidth:1000,
  gameHeight:1000,
  worldScaleParam:30,
  worldGravity:3,
  zoomapplied:zoomapplied,
  zout:1/zoomapplied,
  gamesteps:10, // the lower the faster the game is
  densityPart:300, // the bigger the more impactful the particule is
  partpropagationtime:150, // the longer the bigger the bomb propagate particules
  limiteVerticalJeu:1/zoomapplied,
  limiteHoriJeu:2*1/zoomapplied,
  fps:61,
  versiongame:Date.now(),
  
  numRays:32,
  DEGTORAD:0.0174532925199432957

}