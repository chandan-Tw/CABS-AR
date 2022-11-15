import * as THREE from 'https://unpkg.com/three@0.146.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/GLTFLoader.js';

const mindarThree = new window.MINDAR.FACE.MindARThree({
    container: document.querySelector(".example-container"),
});

const { renderer, scene, camera } = mindarThree;

const light = new THREE.AmbientLight( 0x404040 );
scene.add( light );

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
    const list = ["hat1"];
    const visibles = [false];
    const setVisible = (button, visible) => {
        const anchor = mindarThree.addAnchor(10);
        let character;
        const gltfLoader = new GLTFLoader();
        if (visible) {
            button.classList.add("selected");
            gltfLoader.load("assets/clownHat/scene.gltf", (gltf) => {
            character = gltf.scene;
            character.position.set(0, 1.0, -0.5);
            character.rotation.set(0, -0, 0);
            character.scale.set(0.25, 0.25, 0.25);
            character.visible = visible;
            anchor.group.add(character);
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