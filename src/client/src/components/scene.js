//import React, { useEffect, useState } from "react";
import * as THREE from 'three';
import Material from './material'

class Scene {
    RAYMARCHER_SHADER = "./raymarcher.glsl";

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
        let plane = new THREE.PlaneBufferGeometry(2,2);
        this.raymarcher = await new Material().load(this.RAYMARCHER_SHADER);

        this.scene.add(new THREE.Mesh(plane, this.raymarcher.getMaterial()));
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

export default Scene;
