// constants to store block types
const TERRAIN = 0;
const BREAKABLE = 1;
const UNBREAKABLE = 2;

// constant to store all block types imported from Tiled
export const BLOCKTYPES = {
    "Terrain": {
        color: 0x049b15,
        dynamic: false,
        type: TERRAIN
    },
    "Stars": {
        color: 0x049b15,
        dynamic: false,
        type: TERRAIN
    },
    "BreakableRect": {
        color: 0x6e5d42,
        dynamic: true,
        type: BREAKABLE
    },
    "BreakableCircle": {
        color: 0xfff43a,
        dynamic: true,
        type: BREAKABLE
    },
    "Unbreakable": {
        color: 0x3b3b3b,
        dynamic: true,
        type: UNBREAKABLE
    }
}      

