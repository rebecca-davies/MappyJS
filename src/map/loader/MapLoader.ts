import Tile from "../constuct/Tile";
import { JagBuf } from "jagbuf";
import { ungzip } from "pako";

export var tiles: Array<Array<Array<Tile>>> = Array(4).fill(null).map(() => Array(64).fill(null).map(() => Array(64).fill(new Tile())));

export default class MapLoader {
    async load(map: number) {
        await read(map);
        return true;
    }
}

async function read(map: number) {
    const byteArray = await MapDataCache.getByteArray(`data/maps/${map}.dat`);
    console.log(byteArray);
    const buffer: JagBuf = new JagBuf(byteArray);
    handleTiles(buffer);
    console.log(tiles);
}

function handleTiles(buffer: JagBuf) {
    for(let z = 0; z < 64; z++) {
        for(let x = 0; x < 64; x++) {
            const tile = new Tile();
            readTile(tile, buffer);
            tiles[0][x][z] = tile;
        }
    }
}

function readTile(tile: Tile, buffer: JagBuf) {
    while(true) {
        const type: number = buffer.g1();
        if(type == 0) {
            break;
        }
        if(type == 1) {
            let height: number = buffer.g1();
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
    }
}

const MapDataCache = {
    cache: new Map(),
    async getByteArray(url: string) {
        if (this.cache.has(url)) {
            return this.cache.get(url);
        }
        const response = await window.fetch(url);
        let arrayBuffer = await response.arrayBuffer(); 
        arrayBuffer = ungzip(new Uint8Array(arrayBuffer));
        this.cache.set(url, arrayBuffer);
        return arrayBuffer;
    }
};