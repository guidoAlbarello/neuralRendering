// Scene which displays a plane that covers the whole canvas. This scene is used to model
// only with a fragment shader.
class RaymarcherScene extends Scene {
    RAYMARCHER_SHADER = "../materials/shaders/fragmentShaders/raymarcher2d.glsl";

    camera;
    scene;
    raymarcher;
    eyeAngle = 0;
    pos = 0;

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

        $(document).keydown(event => {
            let keyCode = event.keyCode ? event.keyCode :event.which;
            // If keyCode is minus letter, convert to upper
            if (keyCode <= 122 && keyCode >=97) {
                keycode -= 32;
            }

            if (keyCode == 65) { this.eyeAngle += 0.1; }
            if (keyCode == 68) { this.eyeAngle -= 0.1; }
            if (keyCode == 83) { this.pos += 0.1; }
            if (keyCode == 87) { this.pos -= 0.1; }
        });
    }

    update(time, canvas) {
        time *= 0.001; // Convert to seconds.

        this.raymarcher.uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
        this.raymarcher.uniforms.iTime.value = time;
        this.raymarcher.uniforms.pos = this.pos;
        this.raymarcher.uniforms.eyeOrientation = this.eyeAngle;
    }

    getCamera() {
        return this.camera;
    }

    getScene() {
        return this.scene;
    }
}