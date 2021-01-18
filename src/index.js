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

function loadQuadrilateralWithHole() {
  const geometry = new THREE.Geometry();

  geometry.vertices.push(new THREE.Vector3(-1.00, -1.00, 0));
  geometry.vertices.push(new THREE.Vector3(-0.33, -1.00, 0));
  geometry.vertices.push(new THREE.Vector3( 0.33, -1.00, 0));
  geometry.vertices.push(new THREE.Vector3( 1.00, -1.00, 0));

  geometry.vertices.push(new THREE.Vector3(-1.00, -0.33, 0));
  geometry.vertices.push(new THREE.Vector3(-0.33, -0.33, 0));
  geometry.vertices.push(new THREE.Vector3( 0.33, -0.33, 0));
  geometry.vertices.push(new THREE.Vector3( 1.00, -0.33, 0));

  geometry.vertices.push(new THREE.Vector3(-1.00,  0.33, 0));
  geometry.vertices.push(new THREE.Vector3(-0.33,  0.33, 0));
  geometry.vertices.push(new THREE.Vector3( 0.33,  0.33, 0));
  geometry.vertices.push(new THREE.Vector3( 1.00,  0.33, 0));

  geometry.vertices.push(new THREE.Vector3(-1.00,  1.00, 0));
  geometry.vertices.push(new THREE.Vector3(-0.33,  1.00, 0));
  geometry.vertices.push(new THREE.Vector3( 0.33,  1.00, 0));
  geometry.vertices.push(new THREE.Vector3( 1.00,  1.00, 0));

  geometry.faces.push(new THREE.Face3(0, 1, 4));
  geometry.faces.push(new THREE.Face3(1, 5, 4));

  geometry.faces.push(new THREE.Face3(1, 2, 5));
  geometry.faces.push(new THREE.Face3(2, 6, 5));

  geometry.faces.push(new THREE.Face3(2, 3, 6));
  geometry.faces.push(new THREE.Face3(3, 7, 6));

  geometry.faces.push(new THREE.Face3(4, 5, 8));
  geometry.faces.push(new THREE.Face3(5, 9, 8));

  // geometry.faces.push(new THREE.Face3(5, 6, 9));
  // geometry.faces.push(new THREE.Face3(6, 10, 9));

  geometry.faces.push(new THREE.Face3(6, 7, 10));
  geometry.faces.push(new THREE.Face3(7, 11, 10));

  geometry.faces.push(new THREE.Face3(8, 9, 12));
  geometry.faces.push(new THREE.Face3(9, 13, 12));

  geometry.faces.push(new THREE.Face3(9, 10, 13));
  geometry.faces.push(new THREE.Face3(10, 14, 13));

  geometry.faces.push(new THREE.Face3(10, 11, 14));
  geometry.faces.push(new THREE.Face3(11, 15, 14));

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

function loadBelt() {
  const geometry = new THREE.Geometry();

  const n = 100;
  for (let i = 0; i < n; i += 1) {
    const radians = i / n * 2 * Math.PI;
    geometry.vertices.push(new THREE.Vector3(Math.cos(radians), -0.2, Math.sin(radians)));
    geometry.vertices.push(new THREE.Vector3(Math.cos(radians),  0.2, Math.sin(radians)));

    const iNext = (i + 1) % n;
    geometry.faces.push(new THREE.Face3(i * 2, iNext * 2, i * 2 + 1));
    geometry.faces.push(new THREE.Face3(iNext * 2, iNext * 2 + 1, i * 2 + 1));
  }

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

loadBelt();
animate();

const shapePicker = document.getElementById('shape-picker');
shapePicker.addEventListener('change', () => {
  switch (shapePicker.value) {
    case 'quadrilateral':
      loadQuadrilateral();
      break;
    case 'cube':
      loadCube();
      break;
    case 'quadrilateral with hole':
      loadQuadrilateralWithHole();
      break;
    case 'belt':
      loadBelt();
      break;
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
