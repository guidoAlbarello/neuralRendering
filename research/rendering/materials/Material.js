// Represents a shader resource.
class Material {
    uniforms;
    material;
    
    // Loads a shader file.
    async load(pathname) {
        let shader = await new Promise(resolve => {
			$.get(
				pathname,
				function(data) {
					resolve(data);
				},
				"text"
			);
        });
        
        this.compile(shader);
        return this;
    }

    // Compiles a shader to be able to be used by the renderer.
    compile() {}

    // Returns a reference to the material.
    getMaterial() {
        return this.material;
    }
}