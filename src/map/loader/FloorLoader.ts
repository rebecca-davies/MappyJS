import Floor from "../constuct/Floor";
import "tsjagbuff";

var bufferOffset: number = 0;
export var floors: Array<Floor> = Array(500).fill(new Floor())

export default class FloorLoader {

   async load() {
        
        await this.read();
   }

   static readData(buffer: DataView) {
    
        var floor = new Floor();
        while(true) {
            const opcode = buffer.g1();
            switch(opcode) {
                case 0:
                    return floor;
                case 1:
                    floor.rgbColour = buffer.g3();
                    break;
                case 2:
                    floor.textureId = buffer.g1();
                    break;
                case 3:
                case 5:
                    floor.occlude = false;
                    break;
                case 6:
                    floor.name = buffer.gjstr();
                    break;
                case 7:
                    let rgb = buffer.g3();
                    break;
            }
        }
   }

   async read() {
    const byteArray = await FloorCache.getByteArray(`data/flo.dat`);
    const buffer: DataView = new DataView(byteArray);
    const cacheSize: number = buffer.g2();
    floors = Array.from({length: cacheSize}, () => FloorLoader.readData(buffer));
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
