class RaymarcherMaterial extends Material {
  compile(fragmentShader) {
    let nodes = [${NODES}];
    let leaf_data = [${LEAF_DATA}]
    let spheres_array = [${SPHERES}];

    let uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3() },
      eyeOrientation : {value : 0},
      pos: {value :0},
      node: {
        value: nodes
      },
      leafData: {
        value: leaf_data
      },
      spheres: {
        value: spheres_array
      },
    };

    this.uniforms = uniforms;
    this.material = new THREE.ShaderMaterial({
      fragmentShader,
      uniforms,
    });
  }
}