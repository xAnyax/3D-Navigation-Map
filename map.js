import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

let controls;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let raycaster;
let isCanvasShow = true;

const velocity = new THREE.Vector3(); // moving speed
const direction = new THREE.Vector3(); // moving direction
let prevTime = Date.now();

// Set up Scene, Camera, and renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // Scene size
renderer.setClearColor(0xeeeeee); //set default color when no model in the scene
renderer.setPixelRatio(window.devicePixelRatio); //set ratio to different device

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 0);
camera.lookAt(scene.position);

// Load 3D model
function init(){
    const loader = new GLTFLoader().setPath('test/');
    loader.load('floor.gltf', function(gltf) {
        const mesh = gltf.scene;
        mesh.position.set(40,15,0);
        scene.add(mesh);
        const ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(0,50,0);
        scene.add(pointLight);
    } );
    document.getElementById("mapcontainer").appendChild(renderer.domElement);
    PLControls();
}

// Controller 
function PLControls(){
    controls = new PointerLockControls(camera, document.getElementById('mapcontainer'));
    controls.getObject().position.set(100, 30, -21);
    scene.add(controls.getObject());
    
    const threeDContainer = document.getElementById('mapcontainer');
    const blocker = document.getElementById('blocker'); // bug
    const instructions = document.getElementById('instructions');
    
    
    const havePointerLock = 
        'pointerLockElement' in document || 
        'mozPointerLockElement' in document ||
        'webkitPointerLockElement' in document;
        
    if (havePointerLock){
        threeDContainer.addEventListener(
            'click',
            function(){
              controls.lock();
            }, false);
        controls.addEventListener('lock', function() {
            console.log('Pointer locked');
            blocker.style.display = 'none';
            instructions.style.display = 'none';
        })
        controls.addEventListener('unlock', function() {
            console.log('Pointer unlocked');
            instructions.style.display = 'block';
            blocker.style.display = '';
        });
    };
    
    const onKeyDown = function (event) {
        switch (event.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;
            case 'Space':
                if (canJump === true) velocity.y += 70;
                canJump = false;
                break;
        }
    };
    
    const onKeyUp = function(event) {
        switch(event.code) {
            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;
            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;
        }
    };
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    
    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
}

function check(){
    if (controls.isLocked === true) {
        raycaster.ray.origin.copy(controls.getObject().position);
        const intersections = raycaster.intersectObjects(scene.children, true);
        const onObject = intersections.length > 0;
        const time = Date.now();
        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;
        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass (down speed)

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveLeft) - Number(moveRight);
        direction.normalize(); // Ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        if (onObject === true) {
            velocity.y = Math.max(0, velocity.y);
            canJump = true;
        }

        controls.getObject().translateX(velocity.x * delta);
        controls.getObject().translateY(velocity.y * delta);
        controls.getObject().translateZ(velocity.z * delta);

        if (controls.getObject().position.y < -100) {
            velocity.y = 0;
            controls.getObject().position.set(0, 0, 0);
            canJump = true;
        }
        prevTime = time;
    }
}

// Render the scene
function render() {
    requestAnimationFrame(render);
    check();
    renderer.render(scene, camera);
};

document.addEventListener("DOMContentLoaded", function(){
    function switchmap() {
        document.getElementById("switchmap").addEventListener("click", function(){
            if (isCanvasShow) {
                const canvas = document.querySelector('canvas');
                canvas.parentNode.removeChild(canvas);
                init();
                render();
                isCanvasShow = false;
            } else {
                const scene3D = document.getElementById('mapcontainer');
                while (scene3D.firstChild) {
                    scene3D.removeChild(scene3D.firstChild);
                }
                const newCanvas = document.createElement('canvas');
                newCanvas.width = window.innerWidth;
                newCanvas.height = window.innerHeight;
                scene3D.appendChild(newCanvas);
                setup();
                isCanvasShow = true;
            }
        });
    }
    switchmap();
})

// Resize window
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})