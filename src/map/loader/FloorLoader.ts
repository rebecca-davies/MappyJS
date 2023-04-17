import Floor from "../constuct/Floor";
import { JagBuf } from "jagbuf";

export var floors: Array<Floor> = [];
for (let i = 0; i < 500; i++) {
    floors.push(new Floor());
}

export default class FloorLoader {
    async load() {
        await read();
        return true;
    }
}

async function read() {
    const byteArray = await FloorCache.getByteArray(`data/flo.dat`);
    const buffer: JagBuf = new JagBuf(byteArray);
    const cacheSize: number = buffer.g2();
    for(var i = 0; i < cacheSize; i++) {
        readData(floors[i], buffer);
    }
}

function readData(floor: Floor, buffer: JagBuf) {
    while(true) {
        const type: number = buffer.g1();
        if(type == 0) {
            break;
        }
        if(type == 1) {
            const rgb = buffer.g3();
            floor.rgbColour = rgb;
        }
        if(type == 2) {
            const textureId = buffer.g1();
            floor.textureId = textureId;
        }
        if(type == 3 || type == 5) {
            floor.occlude = false;
        }
        if(type == 6) {
            floor.name = buffer.gjstr();
        }
        if(type == 7) {
            buffer.g3();
        }
    }
}

const FloorCache = {
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
