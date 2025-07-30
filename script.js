import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.1/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://unpkg.com/three@0.160.1/examples/jsm/loaders/RGBELoader.js';

let isFlipped = false;

const preset = {
    src: "",
    parts: {
        partName: "materialName"
    },
};

const sports_car = {
    src: "",
    materials: {
        materialName: {

        }
    },
    menu: [
        {
            title: "Full Wrap",
            parts: [],
            options: [
                {
                    label: "",
                    materialName: "",
                    image: "",
                },
                {
                    label: "",
                    materialName: "",
                    image: "",
                },
                {
                    label: "",
                    materialName: "",
                    image: "",
                },
                {
                    label: "",
                    materialName: "",
                    image: "",
                },
                {
                    label: "",
                    materialName: "",
                    image: "",
                },
                {
                    label: "",
                    materialName: "",
                    image: "",
                },
                {
                    label: "",
                    materialName: "",
                    image: "",
                }
            ]
        },
    ]
}

// update material on model
function materialUpdate() {
    if (vechile_type == 'car') {

    } else {

    }
}

// setDefaultPreset
function setDefaultPreset() {

}
// setPrest
function setPreset(partName, materialName) {
    preset.parts[partName] = materialName;
    materialUpdate();
}

let currentModel = null;

let currentShadow = null;
let currentLight = null;

let loadedModels = {
  car:null,
  truck:null
}

// Renderer
const canvas = document.getElementById('canvas-section');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ✅ Neutral tone mapping
renderer.toneMapping = THREE.AgXToneMapping;
renderer.toneMappingExposure = 1.0; 

// shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // soft shadows


// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  canvas.clientWidth / canvas.clientHeight, // ← match renderer size
  0.1,
  1000
);
camera.position.set(0, 1.5, 3);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Zoom in/out with scroll
controls.enableZoom = true;
controls.minDistance = 3;   // how close you can zoom
controls.maxDistance = 5;  // how far you can zoom
controls.enablePan = true;

// ✅ restrict vertical rotation
controls.minPolarAngle = Math.PI / 6;   // lowest angle (30° from top)
controls.maxPolarAngle = Math.PI / 2;   // highest angle (90° = level with ground)

// allow horizontal rotation (full orbit)
controls.minAzimuthAngle = -Infinity;
controls.maxAzimuthAngle = Infinity;

controls.update();


const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(3, 10, 10);
scene.add(dirLight);

function setupRealShadows(model) {
  // Enable shadows
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // --- Bounding box for model ---
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  // --- Ground plane just below model ---
  const groundY = box.min.y - 0.01;
  const groundGeo = new THREE.PlaneGeometry(size.x * 3, size.z * 3);
  const groundMat = new THREE.ShadowMaterial({ opacity: 0.3 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = groundY;
  ground.receiveShadow = true;
  scene.add(ground);

  // --- Overhead light (only for shadows, not lighting) ---
  const sunLight = new THREE.DirectionalLight(0xffffff, 0.1); // very dim
  const lightHeight = Math.max(size.x, size.y, size.z) * 2;
  sunLight.position.set(center.x, center.y + lightHeight, center.z);
  sunLight.castShadow = true;

  // Shadow quality
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.bias = -0.0005;

  // Shadow camera bounds (tight around model)
  const shadowCamSize = Math.max(size.x, size.z) * 1.5;
  sunLight.shadow.camera.left = -shadowCamSize;
  sunLight.shadow.camera.right = shadowCamSize;
  sunLight.shadow.camera.top = shadowCamSize;
  sunLight.shadow.camera.bottom = -shadowCamSize;
  sunLight.shadow.camera.near = 0.1;
  sunLight.shadow.camera.far = lightHeight * 3;

  // Aim light at model
  sunLight.target.position.copy(center);
  scene.add(sunLight);
  scene.add(sunLight.target);

  // --- Model casts shadows ---
  model.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = false;
    }
  });

  // ✅ Save references for cleanup
  currentShadow = ground;
  currentLight = sunLight;
}

function preLoadModels(){
  const carModel = './assets/Ferrari.glb';
  const truckModel = './assets/CyberTruck.glb';
  const loader = new GLTFLoader();
  loader.load(carModel, (gltf) => {
    loadedModels.car = gltf.scene;
    console.log("Car model preloaded");
  }, undefined, (error) => {
    console.error('Error loading car model:', error);
  });
  loader.load(truckModel, (gltf) => {
    loadedModels.truck = gltf.scene;
    console.log("Truck model preloaded");
  }, undefined, (error) => {
    console.error('Error loading truck model:', error);
  });
}


function loadModel(type) {
  console.log(type, loadedModels[type]);
  removeCurrentModel();
  const model = loadedModels[type].clone();

  // --- Compute bounding box ---
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  // ✅ Shift model so it's centered at origin
  model.position.sub(center);

  scene.add(model);

  // --- Frame the model ---
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let cameraDist = maxDim / (2 * Math.tan(fov / 2));

  const padding = 1.2; // closer/farther control
  cameraDist *= padding;

  // Diagonal camera angle
  const angle = Math.PI / 4; // 45°
  const x = cameraDist * Math.sin(angle);
  const z = cameraDist * Math.cos(angle);
  const y = maxDim * 0.25; // lift above

  camera.position.set(x, y, z);
  camera.lookAt(0, 0, 0);

  // ✅ Orbit controls target at origin
  controls.target.set(0, 0, 0);
  controls.update();

  // --- Shadows and materials ---
  model.traverse((child) => {
    if (child.isMesh) {
      child.material.envMapIntensity = 1;
      child.material.needsUpdate = true;
      child.castShadow = true;
    }
  });

  currentModel = model;
  setupRealShadows(model);
}


function removeCurrentModel() {
  if (currentModel) {
    scene.remove(currentModel);

    currentModel.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => disposeMaterial(m));
        } else {
          disposeMaterial(child.material);
        }
      }
    });

    currentModel = null;
  }

  if (currentShadow) {
    scene.remove(currentShadow);
    currentShadow.geometry.dispose();
    disposeMaterial(currentShadow.material);
    currentShadow = null;
  }

  if (currentLight) {
    scene.remove(currentLight);
    if (currentLight.target) scene.remove(currentLight.target);
    currentLight = null;
  }
}


function disposeMaterial(material) {
  Object.keys(material).forEach((key) => {
    const value = material[key];
    if (value && typeof value.dispose === "function") {
      value.dispose();
    }
  });
  material.dispose();
}
 

function resizeRenderer(type) {
    const {widthFactor, heightFactor} = getWidthAndHeightFactor();
    const width = canvas.clientWidth || window.innerWidth * widthFactor;
    const height = canvas.clientHeight || window.innerHeight * heightFactor;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    loadModel(type);
}


// Resize
window.addEventListener('resize', () => {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

function getWidthAndHeightFactor() {
    let widthFactor = 1;
    let heightFactor = 1;
    if(window.innerWidth < 600) {
        heightFactor = 0.35;
    }else if(window.innerWidth < 1024) {
        heightFactor = 0.35;
    } else if(window.innerWidth < 1300) {
        widthFactor = 0.65;
        heightFactor = 0.85;
    } else if(window.innerWidth < 1600) {
        widthFactor = 0.68;
        heightFactor = 0.85;
    }else if(window.innerWidth < 1800) {
        widthFactor = 0.72;
        heightFactor = 0.85;
    } else {
        widthFactor = 0.72;
        heightFactor = 0.85;
    }
    return { widthFactor, heightFactor };
}

function smoothAdjustCameraDistance(delta = 0.5, duration = 500) {
  const offset = new THREE.Vector3()
    .subVectors(controls.object.position, controls.target);

  const startDistance = offset.length();
  let endDistance = startDistance + delta;

  // Clamp within min/max
  endDistance = Math.max(controls.minDistance, Math.min(controls.maxDistance, endDistance));

  const startTime = performance.now();

  function animate() {
    const now = performance.now();
    const elapsed = now - startTime;
    const t = Math.min(elapsed / duration, 1); // progress [0..1]

    // Smooth easing (easeOutQuad)
    const easedT = t * (2 - t);

    const currentDistance = THREE.MathUtils.lerp(startDistance, endDistance, easedT);

    // Reapply offset with new interpolated distance
    const newOffset = offset.clone().setLength(currentDistance);
    controls.object.position.copy(controls.target).add(newOffset);

    controls.update();

    if (t < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}


// adding environment map
const rgbeLoader = new RGBELoader();
rgbeLoader.load(
  './assets/neutral.hdr', // <-- put neutral.hdr in your /assets folder
  (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;

    // Apply environment to scene
    scene.environment = texture;
    // scene.background = texture; // uncomment if you want the HDR visible
  },
  undefined,
  (err) => {
    console.error('Error loading HDR environment', err);
  }
);

animate();
preLoadModels();

window.resizeThreeCanvas = resizeRenderer; // expose globally
window.getWidthAndHeightFactor = getWidthAndHeightFactor; // expose globally
window.increaseCameraDistance = smoothAdjustCameraDistance; // expose globally