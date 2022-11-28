import * as THREE from 'https://unpkg.com/three@0.146.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/GLTFLoader.js';

const mindarThree = new window.MINDAR.FACE.MindARThree({
    container: document.querySelector(".tryon-container"),
});

const { renderer, scene, camera } = mindarThree;

let accessoriesMap;
fetch("js/accessoriesList.json")
    .then(response => {
        return response.json();
    })
    .then(data => accessoriesMap = data);

const light = new THREE.AmbientLight(0x404040);


renderer.outputEncoding = THREE.sRGBEncoding;
const start = async () => {
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}

start();

const remove = (item, anchor) => {
    const selectedObj = scene.getObjectByName(item);
    selectedObj.visible = false;
    anchor.group.add(selectedObj);
}

document.addEventListener("DOMContentLoaded", function () {
    const list = ["clownHat", "christmasHat", "topHat", "wizardHat", "blackGlass", "partyGlass", "aviatorGlass", "pixelGlass"];
    const visibles = [false, false, false, false, false, false, false, false];
    const setVisible = (button, visible, item) => {
        const anchor = mindarThree.addAnchor(accessoriesMap[item].anchorIdx);
        let character;
        const gltfLoader = new GLTFLoader();
        if (visible) {
            button.classList.add("selected");
            gltfLoader.load(accessoriesMap[item].model, (gltf) => {
                character = gltf.scene;
                character.position.set(accessoriesMap[item].xPos, accessoriesMap[item].yPos, accessoriesMap[item].zPos);
                character.rotation.set(accessoriesMap[item].xRot, accessoriesMap[item].yRot, accessoriesMap[item].zRot);
                character.scale.set(accessoriesMap[item].scale, accessoriesMap[item].scale, accessoriesMap[item].scale);
                character.visible = visible;
                character.name = item;
                anchor.group.add(character);
                scene.add(light);
            });
        } else {
            button.classList.remove("selected");
            remove(item, anchor);
        }
    }

    list.forEach((item, index) => {
        const button = document.querySelector("#" + item);

        button.addEventListener('click', () => {
            visibles[index] = !visibles[index];
            let flag = visibles[index];
            setVisible(button, flag, item);
        });
    });
})