const THREE = window.MINDAR.FACE.THREE;
const mindarThree = new window.MINDAR.FACE.MindARThree({
    container: document.querySelector("#container"),
});

const { renderer, scene, camera } = mindarThree;

const start = async () => {
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}

start();

document.addEventListener("DOMContentLoaded", function () {
    const list = ["glasses1", "glasses2", "hat1", "hat2", "earring"];
    const visibles = [false, false, false, false, false];
    const setVisible = (button, entities, visible) => {
        if (visible) {
            button.classList.add("selected");
        } else {
            button.classList.remove("selected");
        }
        entities.forEach((entity) => {
            entity.setAttribute("visible", visible);
        });
    }
    list.forEach((item, index) => {
        const button = document.querySelector("#" + item);
        const entities = document.querySelectorAll("." + item + "-entity");
        setVisible(button, entities, visibles[index]);
        button.addEventListener('click', () => {
            visibles[index] = !visibles[index];
            setVisible(button, entities, visibles[index]);
        });
    });
})