import './lukkid.css';
import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
  
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));
  
    star.position.set(x, y, z);
    scene.add(star);
  }

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('img/desktop-1920x1080.jpg');
scene.background = spaceTexture;

const viewSphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry( 1, 32, 16 ),
    new THREE.MeshBasicMaterial({
        map: spaceTexture,
    })
)
viewSphere.scale.set(-1, 1, 1);
viewSphere.position.set(5, 5, 5);
scene.add(viewSphere);




const icelandTexture = new THREE.TextureLoader().load('/img/iceland.gif');

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { map:icelandTexture } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

cube.position.z = -1;
cube.position.x = 1;

// function moveCamera() {
//     const t = document.body.getBoundingClientRect().top;

  
//     camera.position.z = t * -0.01;
//     camera.position.x = t * -0.0002;
//     camera.rotation.y = t * -0.0002;
//   }
  
// document.body.onscroll = moveCamera;
// moveCamera();

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
}
animate();
