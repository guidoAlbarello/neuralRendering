// A material that represents a raymarcher.
class RaymarcherMaterial extends Material {
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
}