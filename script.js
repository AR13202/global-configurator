import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.160.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.1/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'https://unpkg.com/three@0.160.1/examples/jsm/loaders/RGBELoader.js';


let currentModel = null;

let currentShadow = null;
let currentLight = null;

let loadedModels = {
  car: null,
  truck: null
}

THREE.TextureLoader.prototype.crossOrigin = "anonymous";
const textureLoader = new THREE.TextureLoader();
textureLoader.crossOrigin = "anonymous";
const textureCache = {};

const materialData = {
  "car": {
    "Full_Wrap_Body": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    },
    "Full_Hood": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    },
    "Full_Fenders": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    },
    "Front_Bumper": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    },
    "Side_Mirrors": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    },
    "Half_Bonnet": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    },
    "Door_Cups": {
      "Heliodor Yellow": {
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    },
    "Door_Edge": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    }
  },
  "truck": {
    "Full_Wrap_Body": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    },
    "Full_Hood": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    },
    "Full_Fenders": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    },
    "Front_Bumper": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    },
    "Side_Mirrors": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    },
    "Half_Bonnet": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    },
    "Door_Edge": {
      "Heliodor Yellow": {
        color: "#ffff00",
        baseMap: "./assets/Set_1/Heliodor_Yellow_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Carnelion Red": {
        color: "#ff0000",
        baseMap: "./assets/Set_1/Carnelion Red_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Azurite Blue": {
        color: "#2973ff",
        baseMap: "./assets/Set_1/Azurite_Blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Eclipse Black Matte": {
        color: "#000000",
        baseMap: "./assets/Set_3/Eclipse_Matte_Black_Diffuse.png",
        metalnessMap: "./assets/Set_3/Eclipse_Matte_Black_Metalness.png",
        roughnessMap: "./assets/Set_3/Eclipse_Matte_Black_Roughness.png",
        clearcoatMap: "./assets/Set_3/Eclipse_Matte_Black_Clearcoat.png"
      },
      "Lunaris Metallic Silver": {
        color: "#daeaea",
        baseMap: "./assets/Set_2/Lunaris_Metallic_Silver_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Oblivion Black": {
        color: "#000000",
        baseMap: "./assets/Set_1/Oblivion_Black_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Polaris White": {
        color: "#ffffff",
        baseMap: "./assets/Set_1/Polaris_White_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      "Cobalt Blue": {
        color: "#03144c",
        baseMap: "./assets/Set_1/Cobalt_blue_Diffuse.png",
        metalnessMap: "./assets/Set_1/ACCH_Metalness.png",
        roughnessMap: "./assets/Set_1/ACCH_Roughness.png",
        clearcoatMap: "./assets/Set_1/ACCH_Clearcoat.png"
      },
      
      
      "Sparkle Chameleon": {
        color: "#5c752e",
        baseMap: "./assets/Set_2/Astralite_Sparkle_Chameleon_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Purple": {
        color: "#2e1633",
        baseMap: "./assets/Set_2/Iris_Sparkle_Purple_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
      "Sparkle Red": {
        color: "#3c0000",
        baseMap: "./assets/Set_2/Rubinite_Sparkle_Red_Diffuse.png",
        metalnessMap: "./assets/Set_2/LIAR_Metalness.png",
        roughnessMap: "./assets/Set_2/LIAR_Roughness.png",
        clearcoatMap: "./assets/Set_2/LIAR_Clearcoat.png"
      },
    }
  }
}

const baseMaterial = {
  color:"#c40000",
  baseMap:"./assets/Base_Mat/Base_Mat_Diffuse.png",
  metalnessMap:"./assets/Base_Mat/Base_Mat_Metalness.png",
  roughnessMap:"./assets/Base_Mat/Base_Mat_Roughness.png",
  clearcoatMap:"/assets/Base_Mat/Base_Mat_Clearcoat.png"
}
const baseMaterialCT = {
  color:"#8e8e8e",
  baseMap:"./assets/Base_Mat_Cybertruck/Base_Mat_CT_Diffuse.png",
  metalnessMap:"./assets/Base_Mat_Cybertruck/Base_Mat_CT_Metalness.png",
  roughnessMap:"./assets/Base_Mat_Cybertruck/Base_Mat_CT_Roughness.png",
  clearcoatMap:"/assets/Base_Mat_Cybertruck/Base_Mat_CT_Clearcoat.png"
}

// Renderer
const canvas = document.getElementById('canvas-section');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// ✅ Agx tone mapping
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1;
// renderer.outputColorSpace = THREE.SRGBColorSpace;


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

// preload models
let preloadPromise = null;
function preLoadModels() {
  if (preloadPromise) return preloadPromise; // prevent duplicate calls

  const loader = new GLTFLoader();

  preloadPromise = Promise.all([
    new Promise((resolve, reject) => {
      loader.load('./assets/Ferrari.glb',
        (gltf) => {
          loadedModels.car = gltf.scene;
          console.log("car preloaded")
          resolve();
        },
        undefined,
        (err) => reject(err)
      );
    }),
    new Promise((resolve, reject) => {
      loader.load('./assets/CyberTruck.glb',
        (gltf) => {
          console.log("truck preloaded")
          loadedModels.truck = gltf.scene;
          resolve();
        },
        undefined,
        (err) => reject(err)
      );
    })
  ]);
  return preloadPromise;
}

// load model on canvas on click
async function loadModel(type) {
  console.log(type, loadedModels[type]);
  removeCurrentModel();

  if (!loadedModels[type]) {
    console.log(`Waiting for preload of ${type}...`);
    await preLoadModels(); // wait until models ready
  }

  const model = loadedModels[type];
  if (!model) {
    console.error(`Model ${type} not available after preload`);
    return;
  }
  console.log("model", model)
  removeCurrentModel();
  // const model = loadedModels[type];

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
  const { widthFactor, heightFactor } = getWidthAndHeightFactor();
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
  if (window.innerWidth < 600) {
    heightFactor = 0.35;
  } else if (window.innerWidth < 1024) {
    heightFactor = 0.35;
  } else if (window.innerWidth < 1300) {
    widthFactor = 0.65;
    heightFactor = 0.85;
  } else if (window.innerWidth < 1600) {
    widthFactor = 0.68;
    heightFactor = 0.85;
  } else if (window.innerWidth < 1800) {
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
    // scene.environmentIntensity = 1.5;
    // scene.background = texture; // uncomment if you want the HDR visible
  },
  undefined,
  (err) => {
    console.error('Error loading HDR environment', err);
  }
);

animate();
preLoadModels().then(() => {
  // 👇 choose which model to load first
  loadModel("car");  // or "truck"
});

function materialUpdate(vechileType, materialName, partName) {
  if (currentModel) {
    currentModel.traverse((child) => {
      if (child.isMesh) {
        if (child.name == partName) {
          const material = materialData[vechileType][partName][materialName];
          if (material) {
            console.log("updating material for", vechileType, materialName, partName);
            updateMaterial(material, child.material);
          }
        }
      }
    });
  }
}

const applyCachedTexture = async (url) => {
  if (!url) return null;
  if(textureCache[url]){
    return textureCache[url];
  }else{
    const texture = await textureLoader.loadAsync(url);
    texture.flipY = false;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    textureCache[url] = texture;
    return texture;
  }
};

async function updateMaterial(updates, materialRef) {
  if (!updates) return;

  const {
    color,
    baseMap,
    metalnessMap,
    roughnessMap,
    clearcoatMap
  } = updates;

  if (color) {
    materialRef.color = new THREE.Color(color);
  }

  // Load all maps in parallel
  const [base, metalness, roughness, clearcoat] = await Promise.all([
    applyCachedTexture(baseMap),
    applyCachedTexture(metalnessMap),
    applyCachedTexture(roughnessMap),
    applyCachedTexture(clearcoatMap)
  ]);

  // Assign maps once all are ready
  materialRef.map = base || null;
  materialRef.metalnessMap = metalness || null;
  materialRef.roughnessMap = roughness || null;
  materialRef.clearcoatMap = clearcoat || null;

  // Now update once
  materialRef.needsUpdate = true;
}

function applyBaseMaterial(){
  const targets = [
                "Full_Hood","Full_Fenders","Side_Mirrors",
                "Half_Bonnet","Front_Bumper","Door_Cups",
                "Door_Edge","Full_Wrap_Body"
              ]
  if(currentModel)[
    currentModel.traverse((child)=>{
      if(child.isMesh){
        if(targets.includes(child.name)){
          if(window.vechile_type=='car'){
            const material = baseMaterial
            updateMaterial(material, child.material);
          }else{
            const material = baseMaterialCT
            updateMaterial(material, child.material);

          }
        }
      }
    })
  ]
}

window.resizeThreeCanvas = resizeRenderer; // expose globally
window.getWidthAndHeightFactor = getWidthAndHeightFactor; // expose globally
window.increaseCameraDistance = smoothAdjustCameraDistance; // expose globally
window.materialUpdate = materialUpdate; // expose globally
window.applyBaseMaterial = applyBaseMaterial; //expose globally
// const newMaterial = new THREE.MeshPhysicalMaterial({
//   metalnessMap:"",
//   roughnessMap:"",
//   clearcoatMap:"",
//   map:"",
//   color:""
// })