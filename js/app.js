const THREE = window.MINDAR.FACE.THREE;
const mindarThree = new window.MINDAR.FACE.MindARThree({
    container: document.querySelector("#container"),
});
const { renderer, scene, camera } = mindarThree;
const anchor = mindarThree.addAnchor(1);

const start = async () => {
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
    });
}
start();