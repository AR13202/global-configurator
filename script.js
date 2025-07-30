import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.1/examples/jsm/controls/OrbitControls.js';

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

// Renderer
const canvas = document.getElementById('canvas-section');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

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

// Lighting
const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(light);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(3, 10, 10);
scene.add(dirLight);


function loadModel(){
    const model = window.vechile_type == 'car' ? './assets/Corner_Right.glb' : './assets/Corner_Left.glb';
    
    // Load Model
    const loader = new GLTFLoader();
    loader.load(model, (gltf) => {
        const model = gltf.scene;

        // Compute the bounding box of the model
        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Offset the model so it's centered at (0, 0, 0)
        model.position.sub(center);

        // Optionally scale
        model.scale.set(1, 1, 1);

        scene.add(model);
        currentModel = model;
    }, undefined, (error) => {
    console.error('Error loading model:', error);
    });
}

function removeCurrentModel() {
  if (currentModel) {
    scene.remove(currentModel);
    currentModel.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        if (child.material.isMaterial) {
          disposeMaterial(child.material);
        } else {
          // if material is an array
          child.material.forEach(m => disposeMaterial(m));
        }
      }
    });
    currentModel = null;
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
 

function resizeRenderer() {
    const {widthFactor, heightFactor} = getWidthAndHeightFactor();
    const width = canvas.clientWidth || window.innerWidth * widthFactor;
    const height = canvas.clientHeight || window.innerHeight * heightFactor;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    removeCurrentModel();
    loadModel();
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
animate();

window.resizeThreeCanvas = resizeRenderer; // expose globally
window.getWidthAndHeightFactor = getWidthAndHeightFactor; // expose globally