class RaymarcherMaterial extends Material {
  compile(fragmentShader) {
    let nodes = [${NODES}];
    let leaf_data = [${LEAF_DATA}]

    const data = new Float32Array( 4 * ${TOTAL_SPHERES});
    ${SPHERES_DATA}
	  let texture = new THREE.DataTexture( data, ${TOTAL_SPHERES}, 1 , THREE.RGBAFormat, THREE.FloatType);
	  texture.needsUpdate = true;

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
        value: texture
      },
    };

    this.uniforms = uniforms;
    this.material = new THREE.ShaderMaterial({
      fragmentShader,
      uniforms,
    });
  }
}