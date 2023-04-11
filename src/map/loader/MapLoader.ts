import Tile from "../constuct/Tile";

var Buffer = require('buffer/').Buffer;
var bufferOffset: number = 0;
export var tiles: Array<Array<Array<Tile>>> = Array(4).fill(null).map(() => Array(64).fill(null).map(() => Array(64).fill(new Tile())));

export default class MapLoader {

    loaded: boolean = false;

    async load(map: number) {
        bufferOffset = 0;
        await read(map);
        this.loaded = true;
    }
}

async function read(map: number) {
    const byteArray = await MapDataCache.getByteArray(`data/maps/${map}.dat`);
    const buffer = new Buffer(byteArray);
    handleTiles(buffer);
}

function handleTiles(buffer: Buffer) {
    for(let y = 0; y < 4; y++) {
        for(let x = 0; x < 64; x++) {
            for(let z = 0; z < 64; z++) {
                readTile(tiles[y][x][z], buffer);
            }
        }
    }
}

function readTile(tile: Tile, buffer: Buffer) {
    while(true) {
        const type: number = buffer.readUInt8(bufferOffset++);
        if(type == 0) {
            break;
        }
        if(type == 1) {
            const height: number = buffer.readUInt8(bufferOffset++);
            tile.cacheHeight = height;
            tile.height = height;
            break;
        }
        if(type <= 49) {
            tile.opcode = type;
            tile.overlay = buffer.readUInt8(bufferOffset++);
            tile.overlayPath = Math.floor((type - 2) / 4);
            tile.overlayRotation = type - 2 & 3;
        } else if(type <= 81) {
            tile.settings = type - 49;
        } else {
            tile.underlay = type - 81;
        }
        break;
    }
}

const MapDataCache = {
    cache: new Map(),
    async getByteArray(url: string) {
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }
        const response = await window.fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const byteArray = new Int8Array(arrayBuffer);
        this.cache.set(url, byteArray);
        return byteArray;
    }
};