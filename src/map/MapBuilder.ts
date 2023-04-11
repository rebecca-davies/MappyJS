import * as THREE from 'three';

export default class MapBuilder {

  scene: THREE.Scene = null;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.create();
  }
  create() {
    var mapGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(64, 64, 64, 64);
    var mapMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial();
    mapMaterial.color = new THREE.Color(255, 255, 255);
    mapGeometry.computeVertexNormals();
    var plane: THREE.Mesh = new THREE.Mesh(mapGeometry, mapMaterial);
    plane.position.set(0, -5, 0);
    plane.rotateX(-Math.PI / 2);
    this.scene.add(plane);
  }
}
