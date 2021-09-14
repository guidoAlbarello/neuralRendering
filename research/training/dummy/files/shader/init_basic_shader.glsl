uniform vec3 iResolution;
uniform float iTime;

/**
 * Part 2 Challenges
 * - Change the diffuse color of the sphere to be blue
 * - Change the specual color of the sphere to be green
 * - Make one of the lights pulse by having its intensity vary over time
 * - Add a third light to the scene
 */

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float EPSILON = 0.0001;

/**
 * Signed distance function for a sphere centered at the origin with radius 1.0;
 */

float cubeSDF(vec3 p) {
    vec3 d = abs(p) - vec3(1.0, 1.0, 1.0);
    return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}

float sphereSDF(vec3 p, vec3 pos, float r) {
    return length(pos - p) - r; 
}

