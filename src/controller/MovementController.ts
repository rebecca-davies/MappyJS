import * as THREE from 'three';

export default class MovementController {

    moveState: Array<boolean> = [false, false, false, false];
    moveSpeed: number = 0.1;

    update(camera: THREE.PerspectiveCamera) {
        let direction: THREE.Vector3 = new THREE.Vector3();
        let speed: number = 1.0;
        if(this.moveState[0]) direction.z -= speed;
        if(this.moveState[1]) direction.z += speed;
        if(this.moveState[2]) direction.x -= speed;
        if(this.moveState[3]) direction.x += speed;
        direction.normalize();
        direction.applyQuaternion(camera.quaternion);
        camera.position.addScaledVector(direction, this.moveSpeed);
    }
}