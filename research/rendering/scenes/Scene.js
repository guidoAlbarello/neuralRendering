// A scene that is rendered. Describes the 3d model which is displayed on screen.
class Scene {
    // Builds a scene. All the operations to generate a scene is ovewritten in a inherited class.
    build() {}

    // Updates the scene. Every element of the scene is updated. 
    // Receives the time that passed between each update call
    // and a reference to the canvas.
    update(time, canvas) {}

    // Returns a reference to the camera of the scene.
    getCamera() {}

    // Returns a reference to the scene. 
    getScene() {}
}