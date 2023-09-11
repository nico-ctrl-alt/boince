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
const icos = new THREE.Mesh(icogeo, icosmaterial);
let icoshover = 0;
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

let timer = 0;
let sceneint = 0;

const smoothvalue = function (value, targetValue, damping) {
  const diff = (targetValue - value)/damping;
  return value + diff;
}

const smoothvaluelist = function (values, targetValue, damping) {
  const smoothedValues = [];

  for (let i = 0; i < values.length; i++) {
    const value = values[i];

    const diff = (targetValue[i] - value) / damping;
    const smoothedValue = value + diff;

    smoothedValues.push(smoothedValue);
  }

  return smoothedValues;
};

const smoothvaluevec3 = function(value, targetValue, damping)
{
  const diffx = (targetValue.x - value.x)/damping; 
  const diffy = (targetValue.y - value.y)/damping; 
  const diffz = (targetValue.z - value.z)/damping; 

  const smoothedValue = new THREE.Vector3(value.x + diffx, value.y + diffy, value.z + diffz);

  return smoothedValue;
}

// Example usage:
const inputValues = [5, 10, 15, 20];
const targetValue = 20;
const damping = 10;

const smoothedResult = smoothvaluelist(inputValues, targetValue, damping);
console.log(smoothedResult);

function scene0()
{
  icos.rotation.x += .01;

  if(icos.position.z != icoshover)
   icos.position.set(icos.position.x, icos.position.y, smoothvalue(icos.position.z, icoshover, 50));

  if(timer > 0)
  {
    timer -= 5;
    if(timer > 200)
    {
      icoshover = 0;
      icos.position.set(8,10,icos.position.z);
    }
    if(timer > 100 && timer < 200)
    {
      icoshover = 10;
      icos.position.set(-8,-10,icos.position.z);
    }
    if(timer > 0 && timer < 100)
    {
      icoshover = 20;
      icos.position.set(0,-2,icos.position.z);
    }
    if(timer < 1)
    sceneint = 1;
  }
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  if(sceneint == 0)
  scene0();

  
}

animate();

const button0 = document.getElementById('button0');
button0.addEventListener('click', () => {change0();});

function change0()
{  sceneint = 0; timer = 300; console.log('change0 function called'); }

button0.addEventListener('mouseover', () => {
  icoshover = 10;
  console.log('hovering');
});

button0.addEventListener('mouseout', () => {
  icoshover = 0;
  console.log('nah');
});


