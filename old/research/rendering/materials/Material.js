// Represents a shader resource.
class Material {
    uniforms;
    material;

    // Loads a shader file.
    async load(pathname) {
        let shader = await new Promise(resolve => {
            $.get(
                pathname,
                function (data) {
                    resolve(data);
                },
                "text"
            );
        });

        this.compile(shader);
        return this;
    }

    // Compiles a shader to be able to be used by the renderer.
    compile(fragmentShader) {
        // TODO(guidoAlbarello): Remove hardcoded uniforms.
        let uniforms = {
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector3() },
          eyeOrientation : {value : 0},
          pos: {value :0}
        };
    
        this.uniforms = uniforms;
        this.material = new THREE.ShaderMaterial({
          fragmentShader,
          uniforms,
        });
      }

    // Returns a reference to the material.
    getMaterial() {
        return this.material;
    }
}