import * as THREE from 'three';

export default class MapBuilder {
  constructor(scene) {
    this.scene = scene;
    this.create();
  }
  create() {
    var mapGeometry = new THREE.PlaneGeometry(64, 64, 64, 64);
    var mapMaterial = new THREE.MeshPhongMaterial();
    mapMaterial.color = new THREE.Color(255, 255, 255);
    mapGeometry.computeVertexNormals();
    var plane = new THREE.Mesh(mapGeometry, mapMaterial);
    plane.position.set(0, -5, 0);
    plane.rotateX(-Math.PI / 2);
    this.scene.add(plane);
  }
}
