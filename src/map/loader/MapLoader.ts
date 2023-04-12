import Tile from "../constuct/Tile";
import "tsjagbuff";

export var tiles: Array<Array<Array<Tile>>> = Array(4).fill(null).map(() => Array(64).fill(null).map(() => Array(64).fill(new Tile())));

export default class MapLoader {

    loaded: boolean = false;

    async load(map: number) {
        await read(map);
        this.loaded = true;
    }
}

async function read(map: number) {
    const byteArray = await MapDataCache.getByteArray(`data/maps/${map}.dat`);
    const buffer: DataView = new DataView(byteArray);
    handleTiles(buffer);
}

function handleTiles(buffer: DataView) {
    for(let y = 0; y < 4; y++) {
        for(let x = 0; x < 64; x++) {
            for(let z = 0; z < 64; z++) {
                readTile(tiles[y][x][z], buffer);
            }
        }
    }
}

function readTile(tile: Tile, buffer: DataView) {
    while(true) {
        const type: number = buffer.g1();
        if(type == 0) {
            break;
        }
        if(type == 1) {
            const height: number = buffer.g1();
            tile.cacheHeight = height;
            tile.height = height;
            break;
        }
        if(type <= 49) {
            tile.opcode = type;
            tile.overlay = buffer.g1();
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
        this.cache.set(url, arrayBuffer);
        return arrayBuffer;
    }
};