class RaymarcherMaterial extends Material {
  compile(fragmentShader) {
    let nodes = [{
			bbox:new THREE.Vector3(32.0,32.0,32.0),
			center: new THREE.Vector3(32.0,32.0,32.0),
			depth: 0
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,16.0,16.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,16.0,48.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,48.0,16.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,48.0,48.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,16.0,16.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,16.0,48.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,48.0,16.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,48.0,48.0),
			depth: 1
		}];
    let leaf_data = [{
			start_sdf1: 0,
			start_sdf2: 1,
			start_sdf3: 2,
			start_sdf4: 3,
			end_sdf: 4
		},{
			start_sdf1: 4,
			start_sdf2: 5,
			start_sdf3: 6,
			start_sdf4: 7,
			end_sdf: 7
		},{
			start_sdf1: 7,
			start_sdf2: 8,
			start_sdf3: 9,
			start_sdf4: 10,
			end_sdf: 11
		},{
			start_sdf1: 11,
			start_sdf2: 12,
			start_sdf3: 13,
			start_sdf4: 14,
			end_sdf: 14
		},{
			start_sdf1: 14,
			start_sdf2: 15,
			start_sdf3: 16,
			start_sdf4: 17,
			end_sdf: 18
		},{
			start_sdf1: 18,
			start_sdf2: 19,
			start_sdf3: 20,
			start_sdf4: 21,
			end_sdf: 21
		},{
			start_sdf1: 21,
			start_sdf2: 22,
			start_sdf3: 23,
			start_sdf4: 24,
			end_sdf: 25
		},{
			start_sdf1: 25,
			start_sdf2: 26,
			start_sdf3: 27,
			start_sdf4: 28,
			end_sdf: 28
		}]
    let spheres_array = [new THREE.Vector4(0.35, 0.45, 1.2000000000000002, 8.0),
			new THREE.Vector4(1.4, 1.5, 0.9, 2.0),
			new THREE.Vector4(1.3, 1.05, 1.05, 5.0),
			new THREE.Vector4(1.2000000000000002, 0.8500000000000001, 0.35, 8.0),
			new THREE.Vector4(0.6000000000000001, 0.6000000000000001, 2.5, 12.0),
			new THREE.Vector4(1.4, 1.5, 1.7000000000000002, 2.0),
			new THREE.Vector4(1.2000000000000002, 1.35, 1.75, 3.0),
			new THREE.Vector4(0.35, 2.8000000000000003, 1.2000000000000002, 8.0),
			new THREE.Vector4(1.4, 1.7000000000000002, 1.05, 2.0),
			new THREE.Vector4(1.3, 2.2, 1.05, 5.0),
			new THREE.Vector4(1.2000000000000002, 2.45, 0.35, 8.0),
			new THREE.Vector4(0.55, 2.5500000000000003, 2.5, 12.0),
			new THREE.Vector4(1.4, 1.7000000000000002, 1.85, 2.0),
			new THREE.Vector4(1.4500000000000002, 2.0500000000000003, 1.8, 3.0),
			new THREE.Vector4(2.75, 0.4, 1.2000000000000002, 8.0),
			new THREE.Vector4(1.65, 1.4500000000000002, 1.2000000000000002, 2.0),
			new THREE.Vector4(1.8, 0.95, 1.0, 5.0),
			new THREE.Vector4(2.8000000000000003, 0.8500000000000001, 0.35, 8.0),
			new THREE.Vector4(2.5500000000000003, 0.55, 2.6, 12.0),
			new THREE.Vector4(1.65, 1.4500000000000002, 2.0500000000000003, 2.0),
			new THREE.Vector4(2.0500000000000003, 1.35, 1.75, 3.0),
			new THREE.Vector4(2.8000000000000003, 2.75, 1.2000000000000002, 8.0),
			new THREE.Vector4(1.7000000000000002, 1.7000000000000002, 1.05, 3.0),
			new THREE.Vector4(2.0500000000000003, 2.0, 1.15, 5.0),
			new THREE.Vector4(2.8000000000000003, 2.45, 0.35, 8.0),
			new THREE.Vector4(2.6, 2.6, 2.5, 12.0),
			new THREE.Vector4(1.7000000000000002, 1.7000000000000002, 1.95, 3.0),
			new THREE.Vector4(1.9, 1.95, 1.7000000000000002, 3.0)];

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