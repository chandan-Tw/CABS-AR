import * as THREE from 'https://unpkg.com/three@0.146.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/GLTFLoader.js';

const mindarThree = new window.MINDAR.FACE.MindARThree({
    container: document.querySelector(".tryon-container"),
});

const { renderer, scene, camera } = mindarThree;

const light = new THREE.AmbientLight( 0x404040 );


renderer.outputEncoding = THREE.sRGBEncoding;
const start = async () => {
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}

start();

const remove = () => {
    while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const list = ["clownHat"];
    const visibles = [false];
    const setVisible = (button, visible) => {
        const anchor = mindarThree.addAnchor(168);
        let character;
        const gltfLoader = new GLTFLoader();
        if (visible) {
            button.classList.add("selected");
            gltfLoader.load("https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.5/examples/face-tracking/assets/glasses2/scene.gltf", (gltf) => {
            character = gltf.scene;   //rotation="0 -0 0" position="0 -0.2 -0.5" scale="0.008 0.008 0.008"
            character.position.set(0, -0.2, -0.5);
            character.rotation.set(0, -0, 0);
            character.scale.set(0.8, 0.8, 0.8);
            character.visible = visible;
            anchor.group.add(character);
            scene.add( light );
        });
        } else {
            button.classList.remove("selected");
            remove();
        }
    }

    list.forEach((item, index) => {
        const button = document.querySelector("#" + item);

        button.addEventListener('click', () => {
            visibles[index] = !visibles[index];
            let flag = visibles[index];
            setVisible(button, flag);
        });
    });
})