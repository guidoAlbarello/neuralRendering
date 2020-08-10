// Scene which displays a plane that covers the whole canvas. This scene is used to model
// only with a fragment shader.
class RaymarcherScene extends Scene {
    RAYMARCHER_SHADER = "../materials/shaders/fragmentShaders/raymarcher.glsl";

    camera;
    scene;
    raymarcher;

    async build() {
        this.camera = new THREE.OrthographicCamera(
            -1, // left
             1, // right
             1, // top
            -1, // bottom
            -1, // near,
             1, // far
          );
          this.scene = new THREE.Scene();
          let plane = new THREE.PlaneBufferGeometry(2, 2);
          this.raymarcher = await new RaymarcherMaterial().load(this.RAYMARCHER_SHADER);

          this.scene.add(new THREE.Mesh(plane, this.raymarcher.getMaterial()));
    }

    update(time, canvas) {
        time *= 0.001; // Convert to seconds.

        this.raymarcher.uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
        this.raymarcher.uniforms.iTime.value = time;
    }

    getCamera() {
        return this.camera;
    }

    getScene() {
        return this.scene;
    }
}