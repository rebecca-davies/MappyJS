import * as THREE from 'three';

export default class MovementController {

    moveState = [false, false, false, false];
    moveSpeed = 0.1;

    update(camera) {
        let direction = new THREE.Vector3();
        let speed = 1.0;
        if(this.moveState[0]) direction.z -= speed;
        if(this.moveState[1]) direction.z += speed;
        if(this.moveState[2]) direction.x -= speed;
        if(this.moveState[3]) direction.x += speed;
        direction.normalize();
        direction.applyQuaternion(camera.quaternion);
        camera.position.addScaledVector(direction, this.moveSpeed);
    }
}