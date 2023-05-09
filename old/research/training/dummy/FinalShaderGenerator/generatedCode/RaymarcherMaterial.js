class RaymarcherMaterial extends Material {
  compile(fragmentShader) {
    let nodes = [{
			bbox:new THREE.Vector3(64.0,64.0,64.0),
			center: new THREE.Vector3(64.0,64.0,64.0),
			depth: 0
		}];
    let leaf_data = [{
			start_sdf1: 0, 	end_sdf1: 20,
			start_sdf2: 20, 	end_sdf2: 40,
			start_sdf3: 40, 	end_sdf3: 60,
			start_sdf4: 60, 	end_sdf4: 80
		}]
    let spheres_array = [new THREE.Vector4(76.0, 15.0, 119.0, 16.0),
			new THREE.Vector4(20.0, 15.0, 47.0, 16.0),
			new THREE.Vector4(20.0, 15.0, 63.0, 16.0),
			new THREE.Vector4(70.0, 16.0, 2.0, 16.0),
			new THREE.Vector4(20.0, 15.0, 20.0, 16.0),
			new THREE.Vector4(20.0, 15.0, 106.0, 16.0),
			new THREE.Vector4(20.0, 15.0, 122.0, 16.0),
			new THREE.Vector4(20.0, 16.0, 0.0, 16.0),
			new THREE.Vector4(20.0, 15.0, 89.0, 16.0),
			new THREE.Vector4(70.0, 16.0, 58.0, 16.0),
			new THREE.Vector4(70.0, 16.0, 32.0, 16.0),
			new THREE.Vector4(70.0, 16.0, 89.0, 16.0),
			new THREE.Vector4(77.0, 16.0, 74.0, 16.0),
			new THREE.Vector4(77.0, 16.0, 17.0, 16.0),
			new THREE.Vector4(109.0, 15.0, 83.0, 16.0),
			new THREE.Vector4(109.0, 15.0, 99.0, 16.0),
			new THREE.Vector4(109.0, 15.0, 56.0, 16.0),
			new THREE.Vector4(109.0, 16.0, 14.0, 16.0),
			new THREE.Vector4(109.0, 16.0, 30.0, 16.0),
			new THREE.Vector4(109.0, 15.0, 125.0, 16.0),
			new THREE.Vector4(76.0, 47.0, 119.0, 16.0),
			new THREE.Vector4(20.0, 47.0, 47.0, 16.0),
			new THREE.Vector4(20.0, 47.0, 63.0, 16.0),
			new THREE.Vector4(70.0, 48.0, 2.0, 16.0),
			new THREE.Vector4(20.0, 47.0, 20.0, 16.0),
			new THREE.Vector4(20.0, 47.0, 106.0, 16.0),
			new THREE.Vector4(20.0, 47.0, 122.0, 16.0),
			new THREE.Vector4(20.0, 48.0, 0.0, 16.0),
			new THREE.Vector4(20.0, 47.0, 89.0, 16.0),
			new THREE.Vector4(70.0, 48.0, 58.0, 16.0),
			new THREE.Vector4(70.0, 48.0, 32.0, 16.0),
			new THREE.Vector4(70.0, 48.0, 89.0, 16.0),
			new THREE.Vector4(77.0, 48.0, 74.0, 16.0),
			new THREE.Vector4(77.0, 48.0, 17.0, 16.0),
			new THREE.Vector4(109.0, 47.0, 83.0, 16.0),
			new THREE.Vector4(109.0, 47.0, 99.0, 16.0),
			new THREE.Vector4(109.0, 47.0, 56.0, 16.0),
			new THREE.Vector4(109.0, 48.0, 14.0, 16.0),
			new THREE.Vector4(109.0, 48.0, 30.0, 16.0),
			new THREE.Vector4(109.0, 47.0, 125.0, 16.0),
			new THREE.Vector4(76.0, 79.0, 119.0, 16.0),
			new THREE.Vector4(20.0, 79.0, 47.0, 16.0),
			new THREE.Vector4(20.0, 79.0, 63.0, 16.0),
			new THREE.Vector4(70.0, 80.0, 2.0, 16.0),
			new THREE.Vector4(20.0, 79.0, 20.0, 16.0),
			new THREE.Vector4(20.0, 79.0, 106.0, 16.0),
			new THREE.Vector4(20.0, 79.0, 122.0, 16.0),
			new THREE.Vector4(20.0, 80.0, 0.0, 16.0),
			new THREE.Vector4(20.0, 79.0, 89.0, 16.0),
			new THREE.Vector4(70.0, 80.0, 58.0, 16.0),
			new THREE.Vector4(70.0, 80.0, 32.0, 16.0),
			new THREE.Vector4(70.0, 80.0, 89.0, 16.0),
			new THREE.Vector4(77.0, 80.0, 74.0, 16.0),
			new THREE.Vector4(77.0, 80.0, 17.0, 16.0),
			new THREE.Vector4(109.0, 79.0, 83.0, 16.0),
			new THREE.Vector4(109.0, 79.0, 99.0, 16.0),
			new THREE.Vector4(109.0, 79.0, 56.0, 16.0),
			new THREE.Vector4(109.0, 80.0, 14.0, 16.0),
			new THREE.Vector4(109.0, 80.0, 30.0, 16.0),
			new THREE.Vector4(109.0, 79.0, 125.0, 16.0),
			new THREE.Vector4(76.0, 111.0, 119.0, 16.0),
			new THREE.Vector4(20.0, 111.0, 47.0, 16.0),
			new THREE.Vector4(20.0, 111.0, 63.0, 16.0),
			new THREE.Vector4(70.0, 112.0, 2.0, 16.0),
			new THREE.Vector4(20.0, 111.0, 20.0, 16.0),
			new THREE.Vector4(20.0, 111.0, 106.0, 16.0),
			new THREE.Vector4(20.0, 111.0, 122.0, 16.0),
			new THREE.Vector4(20.0, 112.0, 0.0, 16.0),
			new THREE.Vector4(20.0, 111.0, 89.0, 16.0),
			new THREE.Vector4(70.0, 112.0, 58.0, 16.0),
			new THREE.Vector4(70.0, 112.0, 32.0, 16.0),
			new THREE.Vector4(70.0, 112.0, 89.0, 16.0),
			new THREE.Vector4(77.0, 112.0, 74.0, 16.0),
			new THREE.Vector4(77.0, 112.0, 17.0, 16.0),
			new THREE.Vector4(109.0, 111.0, 83.0, 16.0),
			new THREE.Vector4(109.0, 111.0, 99.0, 16.0),
			new THREE.Vector4(109.0, 111.0, 56.0, 16.0),
			new THREE.Vector4(109.0, 112.0, 14.0, 16.0),
			new THREE.Vector4(109.0, 112.0, 30.0, 16.0),
			new THREE.Vector4(109.0, 111.0, 125.0, 16.0)];

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