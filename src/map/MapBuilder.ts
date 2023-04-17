import * as THREE from 'three';
import FloorLoader, { floors } from './loader/FloorLoader';
import { tiles } from './loader/MapLoader';

export default class MapBuilder {

  scene: THREE.Scene = null;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.create();
  }

  create() {
    var mapGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(64, 64, 64, 64);
    for(let x = 0; x < 64; x++) {
      for(let z = 0; z < 64; z ++) {
        let faceIndex = (z * 64 + x) * 2;
        if(tiles[0][x][z].overlay != 0) {
          mapGeometry.faces[faceIndex].vertexColors = [new THREE.Color(floors[tiles[0][x][z].overlay].rgbColour), new THREE.Color(floors[tiles[0][x][z].overlay].rgbColour), new THREE.Color(floors[tiles[0][x][z].overlay].rgbColour)];
          mapGeometry.faces[faceIndex + 1].vertexColors = [new THREE.Color(floors[tiles[0][x][z].overlay].rgbColour), new THREE.Color(floors[tiles[0][x][z].overlay].rgbColour), new THREE.Color(floors[tiles[0][x][z].overlay].rgbColour)];
        }
        if(tiles[0][x][z].underlay != 0) {
          mapGeometry.faces[faceIndex].vertexColors = [new THREE.Color(floors[tiles[0][x][z].underlay].rgbColour), new THREE.Color(floors[tiles[0][x][z].underlay].rgbColour), new THREE.Color(floors[tiles[0][x][z].underlay].rgbColour)];
          mapGeometry.faces[faceIndex + 1].vertexColors = [new THREE.Color(floors[tiles[0][x][z].underlay].rgbColour), new THREE.Color(floors[tiles[0][x][z].underlay].rgbColour), new THREE.Color(floors[tiles[0][x][z].underlay].rgbColour)];
        }
      }
    }
    mapGeometry.computeVertexNormals();
    var mapMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({vertexColors: true});
    var plane: THREE.Mesh = new THREE.Mesh(mapGeometry, mapMaterial);
    plane.position.set(0, -5, 0);
    plane.rotateX(-Math.PI / 2);
    this.scene.add(plane);
  }
}