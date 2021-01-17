import * as THREE from 'three';
import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls';

// https://steemit.com/utopian-io/@clayjohn/learning-3d-graphics-with-three-js-or-procedural-geometry

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0.9, 0.9, 0.9), 1);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new TrackballControls(camera, renderer.domElement);
controls.rotateSpeed = 5;

let geometry;
let mesh;

// --------------------------------------------------------------------------- 

function loadQuadrilateral() {
  const geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(-1, -1, 0));
  geometry.vertices.push(new THREE.Vector3( 1, -1, 0));
  geometry.vertices.push(new THREE.Vector3(-1,  1, 0));
  geometry.vertices.push(new THREE.Vector3( 1,  1, 0));

  geometry.faces.push(new THREE.Face3(0, 1, 2));
  geometry.faces.push(new THREE.Face3(1, 3, 2));

  loadMesh(geometry);
}

// --------------------------------------------------------------------------- 

function loadCube() {
  const geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(-1, -1, 1));
  geometry.vertices.push(new THREE.Vector3( 1, -1, 1));
  geometry.vertices.push(new THREE.Vector3(-1,  1, 1));
  geometry.vertices.push(new THREE.Vector3( 1,  1, 1));

  geometry.vertices.push(new THREE.Vector3(-1, -1, -1));
  geometry.vertices.push(new THREE.Vector3( 1, -1, -1));
  geometry.vertices.push(new THREE.Vector3(-1,  1, -1));
  geometry.vertices.push(new THREE.Vector3( 1,  1, -1));

  // Front
  geometry.faces.push(new THREE.Face3(0, 1, 2));
  geometry.faces.push(new THREE.Face3(1, 3, 2));

  // Right
  geometry.faces.push(new THREE.Face3(1, 5, 3));
  geometry.faces.push(new THREE.Face3(5, 7, 3));

  // Left
  geometry.faces.push(new THREE.Face3(4, 0, 6));
  geometry.faces.push(new THREE.Face3(0, 2, 6));

  // Top
  geometry.faces.push(new THREE.Face3(2, 3, 6));
  geometry.faces.push(new THREE.Face3(3, 7, 6));

  // Bottom
  geometry.faces.push(new THREE.Face3(4, 5, 0));
  geometry.faces.push(new THREE.Face3(5, 1, 0));

  // Back
  geometry.faces.push(new THREE.Face3(5, 4, 7));
  geometry.faces.push(new THREE.Face3(4, 6, 7));

  loadMesh(geometry);
}

// --------------------------------------------------------------------------- 

function loadMesh(geometry) {
  geometry.computeFaceNormals();
  geometry.normalsNeedUpdate = true;

  if (mesh) {
    mesh.geometry.dispose();
    mesh.material.dispose();
    scene.remove(mesh);
  }

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}

// --------------------------------------------------------------------------- 

const material = new THREE.MeshPhongMaterial({
  color: 0xFF0000,
  shininess: 100,
  specular: 0xFFFFFF,
  side: THREE.DoubleSide,
});

const light = new THREE.PointLight(0xFFFFFF, 1);
light.position.set(10, 10, 100);
camera.add(light);
scene.add(camera);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

loadQuadrilateral();
animate();

const shapePicker = document.getElementById('shape-picker');
shapePicker.addEventListener('change', () => {
  if (shapePicker.value === 'quadrilateral') {
    loadQuadrilateral();
  } else if (shapePicker.value === 'cube') {
    loadCube();
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
