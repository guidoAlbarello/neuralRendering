// Class that represents a graphic application which displays a scene on screen.
class GraphicApplication {
  renderer;
  scene;

  // Inits the graphic application.
  async init(canvas) {
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.autoClearColor = false;

    this.scene = new RaymarcherScene();

    await this.scene.build();
    this.update();
  }

  // Updates the application every frame.
  update(time) {
    this.resizeRendererToDisplaySize(this.renderer);

    this.scene.update(time, this.renderer.domElement);
    this.renderer.render(this.scene.getScene(), this.scene.getCamera());

    requestAnimationFrame(step => this.update(step));
  }

  resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }
}
