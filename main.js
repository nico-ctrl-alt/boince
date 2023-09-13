import './style.css'

import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({canvas: document.querySelector('#bg'),});

renderer.setPixelRatio();
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);
scene.background = new THREE.Color(1,1,1,1);
let desiredColor = new THREE.Color(0,0,0,0);
const icogeo = new THREE.IcosahedronGeometry(5, 1, 16, 100);
const icosmaterial = new THREE.MeshToonMaterial( {color: 0x00ff00 });
const icos = new THREE.Mesh(icogeo, icosmaterial);
let icoshover = 0;

scene.add(icos);

const video = document.getElementById('video');
const tv = document.getElementById('tv');
const play = document.getElementById('play');
const ff = document.getElementById('ff');
const reverse = document.getElementById('reverse');

const videotex = new THREE.VideoTexture( video );
videotex.colorSpace = THREE.SRGBColorSpace;
videotex.minFilter = THREE.NearestFilter;
videotex.magFilter = THREE.NearestFilter;

const tvtex = new THREE.Texture(tv);
tvtex.needsUpdate = true;
tvtex.minFilter = THREE.NearestFilter;
tvtex.magFilter = THREE.NearestFilter;
tvtex.colorSpace = THREE.SRGBColorSpace;

const playtex = new THREE.Texture(play);
playtex.needsUpdate = true;
playtex.minFilter = THREE.NearestFilter;
playtex.magFilter = THREE.NearestFilter;
playtex.colorSpace = THREE.SRGBColorSpace;

const fftex = new THREE.Texture(ff);
fftex.needsUpdate = true;
fftex.minFilter = THREE.NearestFilter;
fftex.magFilter = THREE.NearestFilter;
fftex.colorSpace = THREE.SRGBColorSpace;

const reversetex = new THREE.Texture(reverse);
reversetex.needsUpdate = true;
reversetex.minFilter = THREE.NearestFilter;
reversetex.magFilter = THREE.NearestFilter;
reversetex.colorSpace = THREE.SRGBColorSpace;

const planegeo = new THREE.PlaneGeometry(4.5, 4, 1, 1);

const planematerial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, map: videotex});
const videoplane = new THREE.Mesh(planegeo, planematerial);
videoplane.position.set(0,-110,-100);
let desiredplanepos = new THREE.Vector3(0,0,0);

const tvgeo = new THREE.PlaneGeometry(7, 7, 1, 1);

const tvmat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, map: tvtex, alphaTest: .5, transparent: true});
const tvplane = new THREE.Mesh(tvgeo, tvmat);
tvplane.position.set(0,-110,-100);

const playmat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, map: playtex, alphaTest: .5, transparent: true});
const ffmat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, map: fftex, alphaTest: .5, transparent: true});
const reversemat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, map: reversetex, alphaTest: .5, transparent: true});

const playgeo = new THREE.PlaneGeometry(1,1);
const playbutton = new THREE.Mesh(playgeo, playmat);
const ffbutton = new THREE.Mesh(playgeo.clone(), ffmat);
const reversebutton = new THREE.Mesh(playgeo.clone(), reversemat);
let playhover = 1;
let ffhover = 1;
let reversehover = 1;

scene.add(videoplane, tvplane, playbutton, ffbutton, reversebutton);

const color1 = 0xFFFFFF;
const intensity1 = 2;
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

const smoothvaluevec4 = function(value, targetValue, damping)
{
  const diffx = (targetValue.x - value.x)/damping; 
  const diffy = (targetValue.y - value.y)/damping; 
  const diffz = (targetValue.z - value.z)/damping; 
  const diffw = (targetValue.w - value.w)/damping; 

  const smoothedValue = new THREE.Vector4(value.x + diffx, value.y + diffy, value.z + diffz, value.w + diffw);

  return smoothedValue;
}

const smoothvaluecolor = function(value, targetValue, damping)
{
  const diffx = (targetValue.r - value.r)/damping; 
  const diffy = (targetValue.g - value.g)/damping; 
  const diffz = (targetValue.b - value.b)/damping; 
  const diffw = (targetValue.a - value.a)/damping; 

  const smoothedValue = new THREE.Color(value.r + diffx, value.g + diffy, value.b + diffz, value.a + diffw);

  return smoothedValue;
}

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
      icoshover = 50;
      icos.position.set(8,10,icos.position.z);
    }
    if(timer > 100 && timer < 200)
    {
      icoshover = -100;
      icos.position.set(-8,-10,icos.position.z);
    }
    if(timer > 0 && timer < 100)
    {
      icoshover = 250;
      icos.position.set(0,0,icos.position.z);
    }
    if(timer < 1)
    {
      desiredColor = new THREE.Color('green');
      sceneint = 1;
    }
  }
}

function scene1()
{
  const buttons = [playbutton, ffbutton, reversebutton];
  const targetValues = [playhover, ffhover, reversehover];
  for(let i = 0; i < buttons.length; i++)
  {
    const scale = buttons[i].scale;
    if(buttons[i].scale != new THREE.Vector3(1, 1, 1) * targetValues[i])
    {
      const scaling = smoothvalue(scale.x, targetValues[i], 10);
      buttons[i].scale.set(scaling, scaling, scaling);
    }
  }

  desiredplanepos = new THREE.Vector3(0,0,26.5);
    if(desiredplanepos != videoplane.position)
    {
        const smoothpos = smoothvaluevec3(videoplane.position, desiredplanepos, 10);
        videoplane.position.set(smoothpos.x, smoothpos.y, smoothpos.z);
        tvplane.position.set(smoothpos.x, smoothpos.y, smoothpos.z);
        playbutton.position.set(smoothpos.x, smoothpos.y-2.2, smoothpos.z);
        ffbutton.position.set(smoothpos.x+2, smoothpos.y-2, smoothpos.z);
        reversebutton.position.set(smoothpos.x-2, smoothpos.y-2, smoothpos.z);
    }

}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);

  if(scene.background != desiredColor)
  {
    scene.background = smoothvaluecolor(scene.background, desiredColor, 20);
  }

  if(sceneint == 0)
  scene0();

  if(sceneint == 1)
  scene1();
}

animate();

const button0 = document.getElementById('button0');
button0.addEventListener('click', () => {change0();});

function change0()
{ 
  if(sceneint == 0)
  {timer = 300; console.log('change0 function called'); button0.hidden = true;}
}

button0.addEventListener('mouseover', () => {
  icoshover = 10;
  console.log('hovering');
});

button0.addEventListener('mouseout', () => {
  icoshover = 0;
  console.log('nah');
});

const playpause = document.getElementById('playpause');
playpause.addEventListener('click', () => {playpausevideo()})

function playpausevideo()
{
  if(video.paused)
  video.play();
  else
  video.pause();
}

const fastforward = document.getElementById('fastforward');
fastforward.addEventListener('mousedown', () => {
video.playbackRate += .1;
});

const reverseb = document.getElementById('reverseb');
reverseb.addEventListener('mousedown', () => {
  video.playbackRate = -1;
  });

playpause.addEventListener('mouseover', () => {playhover = 1.5;});
playpause.addEventListener('mouseout', () => {playhover = 1;});
fastforward.addEventListener('mouseover', () => {ffhover = 1.5;});
fastforward.addEventListener('mouseout', () => {ffhover = 1;});
reverseb.addEventListener('mouseover', () => {reversehover = 1.5;});
reverseb.addEventListener('mouseout', () => {reversehover = 1;});


