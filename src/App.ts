import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import MapBuilder from './map/MapBuilder';
import MapLoader from './map/loader/MapLoader';
import FloorLoader from './map/loader/FloorLoader';
import MovementController from './controller/MovementController';
import { MIDDLE_MOUSE_BUTTON, FOV, ASPECT_RATIO } from './Constants';
import { tiles } from './map/loader/MapLoader';

class App {

    floorLoader: FloorLoader = new FloorLoader();
    mapLoader: MapLoader = new MapLoader();
    camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, 0.1, 1000);
    scene: THREE.Scene = new THREE.Scene().add(new THREE.AmbientLight(0x404040, 5));
    renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
    movementController: MovementController = new MovementController();
    builder: MapBuilder = new MapBuilder(this.scene);
    controls: PointerLockControls = new PointerLockControls(this.camera, this.renderer.domElement);
    
    constructor() {
        this.init();
        this.floorLoader.load();
        this.mapLoader.load(624);
        this.initPointerLockControls();
        this.initMovementHandler();
        this.initResizeHandler();
        this.animate();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
    }

    initPointerLockControls() {
        document.body.addEventListener('mousedown', (event) => {
            switch(event.button) {
                case MIDDLE_MOUSE_BUTTON:
                    this.controls.lock(); 
                break;
            }
        });
        document.body.addEventListener('mouseup', (event) => {
            switch(event.button) {
                case MIDDLE_MOUSE_BUTTON:
                    this.controls.unlock(); 
                break;
            }
        });
    }
    
    initMovementHandler() {
        document.body.addEventListener('keydown', (event) => {
            switch(event.keyCode) {
                case 87: this.movementController.moveState[0] = true; break;
                case 83: this.movementController.moveState[1] = true; break;
                case 65: this.movementController.moveState[2] = true; break;
                case 68: this.movementController.moveState[3] = true; break;
            }
        });

        document.body.addEventListener('keyup', (event) => {
            switch(event.keyCode) {
                case 87: this.movementController.moveState[0] = false; break;
                case 83: this.movementController.moveState[1] = false; break;
                case 65: this.movementController.moveState[2] = false; break;
                case 68: this.movementController.moveState[3] = false; break;
            }
        });
    }

    initResizeHandler() {
        window.addEventListener('resize', () => {
            this.camera.aspect = ASPECT_RATIO;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        this.renderer.setAnimationLoop(() => {
            console.log(tiles);
            this.movementController.update(this.camera);
            this.renderer.render(this.scene, this.camera);
        });
    }
}

const app = new App();