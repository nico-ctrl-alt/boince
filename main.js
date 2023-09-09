import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});

renderer.setPixelRatio(.2);

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const icogeo = new THREE.IcosahedronGeometry(5, 3, 16, 100);
const icosmaterial = new THREE.MeshToonMaterial( {color: 0x00ff00 });
const icos = new THREE.Mesh(icogeo, material);
let icoshover = false;
let icosscalex = 5;

scene.add(icos);

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

const color1 = 0xFFFFFF;
const intensity1 = 1;
const light1 = new THREE.DirectionalLight(color1, intensity1);
light1.position.set(0, 10, 0);
light1.target.position.set(-5, 0, 0);
scene.add(light1);
scene.add(light1.target);

let tomainmenu = false;
let timer = 0;
let sceneint = 0;

function animate() {
  requestAnimationFrame(animate);

  icos.rotation.x += .01;
  if(icoshover == true)
  {
    icos.position.set(icos.getWorldPosition().x, icos.getWorldPosition().y, smoothvalue(icos.getWorldPosition().z, 1, 10));
  }
  else
  {
    icos.position.set(icos.getWorldPosition().x, icos.getWorldPosition().y, smoothvalue(icos.getWorldPosition().z, -1, 0));
  }


  renderer.render(scene, camera);

  if(timer > 0 && sceneint == 0)
  {
    timer -= 1;
    if(timer > 200)
    {
      icos.position.set(8,10,0);
    }
    if(timer > 100 && timer < 200)
    {
      icos.position.set(-4,-10,10);
    }
    if(timer > 0 && timer < 100)
    {
      icos.position.set(0,-2,20);
    }
  }
}

animate();

const button0 = document.getElementById('button0');
button0.addEventListener('click', () => {change0();});
button0.addEventListener('hover', () => {hover0();});

function change0()
{  sceneint = 0; timer = 300; }

function hover0()
{  

}

const smoothvalue = function (value, speed, gotovalue)
{
  if(value != gotovalue)
  {
    value += speed;
  }
}


