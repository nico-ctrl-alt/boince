import './style.css'

import * as THREE from 'three';

const scene = new THREE.scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({canvas: document.querySelector('bg'),});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.IcosahedronGeometry(5, 3, 16, 100);
const material = new THREE.MeshToonMaterial( {color: 0x00ff00 });;
const icos = new THREE.Mesh(geometry, material);

scene.add(icos)

function animate() {
  requestAnimationFrame(animate);

  icos.rotation.x += .01;

  renderer.render(scene, camera);
}

animate()