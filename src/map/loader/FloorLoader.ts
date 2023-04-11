import Floor from "../constuct/Floor";

var Buffer = require('buffer/').Buffer;
var bufferOffset: number = 0;
export var floors: Array<Floor> = Array(500).fill(new Floor())

export default class FloorLoader {

   async load() {
        bufferOffset = 0;
        await read();
   }

   static read(buffer: Buffer) {
        var floor = new Floor();
        while(true) {
            const opcode = buffer.readUInt8(bufferOffset++);
            switch(opcode) {
                case 0:
                    return floor;
                case 1:
                    break;
            }
        }
   }

}

async function read() {
    const byteArray = await FloorCache.getByteArray('data/flo.dat');
    const buffer = new Buffer(byteArray);
    const cacheSize = buffer.readInt16BE(bufferOffset+=2);
    floors = Array.from({ length: cacheSize}, () => FloorLoader.read(buffer))
}

const FloorCache = {
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
