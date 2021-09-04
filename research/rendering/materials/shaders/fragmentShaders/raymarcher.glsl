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
 float smoothUnion(float a, float b) {
    float k = 0.1;
 float h = max( k-abs(a-b), 0.0 )/k;
return min( a, b ) - h*h*k*(1.0/4.0); }
float sphereSDF(vec3 p, vec3 pos, float r) { return length(pos - p) - r; }

float soil0SDF(vec3 inputPoint) {
return smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.0, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.0, 0.1), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.0, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.0, 0.1), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.0, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.0, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.0, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.05, 0.2), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.0, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.05, 0.2), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.1, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.1, 0.05), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.05, 0.1), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.1, 0.05), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.05, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.05, 0.1), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.05, 0.2), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.0, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.1, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.1, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.0, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.0, 0.2), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.1, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.15, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.1, 0.1), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.0, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.1, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.0, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.15, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.1, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.05, 0.05), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.0, 0.2), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.0, 0.15), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.0, 0.2), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.0, 0.0), 0.1118033988749895), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.0, 0.1), 0.1118033988749895), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.0, 0.0), 0.1224744871391589), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.0, 0.0), 0.1414213562373095), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.0, 0.0), 0.1414213562373095), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.0, 0.0), 0.1414213562373095), sphereSDF(inputPoint, vec3(0.8, 0.0, 0.05), 0.15)))))))))))))))))))))))))))))))))))))))));
}

float soil1SDF(vec3 inputPoint) {
return smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.35, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.05, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.35, 0.1), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.25, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.3, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.2, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.2, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.2, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.2, 0.3), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.2, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.35, 0.1), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.15, 0.4), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.05, 0.35), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.1, 0.35), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.05, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.15, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.25, 0.2), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.4, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.2, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.2, 0.2), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.2, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.4, 0.05), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.45, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.35, 0.05), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.3, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.3, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.35, 0.05), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.2, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.05, 0.35), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.15, 0.35), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.0, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.35, 0.1), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.35, 0.1), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.3, 0.1), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.25, 0.2), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.2, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.25, 0.2), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.35, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.2, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.3, 0.1), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.25, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.1, 0.35), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.25, 0.2), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.2, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.3, 0.05), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.4, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.2, 0.3), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.1, 0.4), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.0, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.4, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.3, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.2, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.25, 0.35), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.25, 0.2), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.3, 0.2), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.3, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.1, 0.3), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.15, 0.3), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.45, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.1, 0.35), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.3, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.25, 0.1), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.4, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.0, 0.55), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.3, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.1, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.35, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.4, 0.05), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.25, 0.2), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.5, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.1, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.0, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.0, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.3, 0.3), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.25, 0.1), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.0, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.3, 0.15), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.1, 0.35), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.35, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.4, 0.0), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.1, 0.3), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.05, 0.15), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.0, 0.15), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.05, 0.1), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.1, 0.1), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.0, 0.5), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.0, 0.45), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.5, 0.0), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.1, 0.1), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.1, 0.05), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.0, 0.4), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.0, 0.2), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.05, 0.15), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.0, 0.5), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.15, 0.0), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.15, 0.1), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.15, 0.05), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.0, 0.4), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.0, 0.4), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.0, 0.5), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.0, 0.3), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.0, 0.4), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.1, 0.05), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.0, 0.35), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.05, 0.0), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.0, 0.4), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.35, 0.0), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.0, 0.35), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.0, 0.45), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.4, 0.0), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.15, 0.05), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.1, 0.25), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.1, 0.3), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.4, 0.0), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.2, 0.1), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.15, 0.15), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.15, 0.2), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.3, 0.0), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.15, 0.2), 0.0866025403784438), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.15, 0.15), 0.0866025403784438), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.0, 0.3), 0.0866025403784438), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.1, 0.2), 0.0866025403784438), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.1, 0.25), 0.0999999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.4, 0.0), 0.1), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.2, 0.0), 0.1), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.0, 0.25), 0.1), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.0, 0.35), 0.1), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.2, 0.15), 0.1), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.0, 0.3), 0.1), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.2, 0.1), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.0, 0.25), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.1, 0.2), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.1, 0.3), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.25, 0.0), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.0, 0.4), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.25, 0.0), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.25, 0.0), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.2, 0.1), 0.1118033988749895), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.15, 0.15), 0.1118033988749895), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.15, 0.15), 0.1118033988749895), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.15, 0.25), 0.1118033988749895), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.2, 0.1), 0.1224744871391588), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.1, 0.2), 0.1224744871391589), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.25, 0.0), 0.15), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.25, 0.0), 0.15), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.25, 0.0), 0.1581138830084189), sphereSDF(inputPoint, vec3(0.0, 0.0, 0.3), 0.1732050807568877)))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
}

float soil2SDF(vec3 inputPoint) {
return smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.3, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.2, 0.7000000000000001), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.4, 0.05), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.75, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.2, 0.4), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.65, 0.6000000000000001), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.4, 0.1), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.15, 0.4), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.2, 0.35), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.35, 0.2), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.4, 0.05), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.8, 0.95), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.35, 0.2), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.8, 0.05), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.4, 0.05), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.4, 0.05), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.4, 0.1), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.2, 0.5), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.8, 0.95), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.2, 0.35), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.35, 0.15), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.15, 0.4), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.15, 0.4), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.35, 0.7000000000000001), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.75, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.35, 0.1), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.3, 0.2), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.7000000000000001, 0.95), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.2, 0.75), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.35, 0.1), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.8, 0.8500000000000001), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.65, 0.6000000000000001), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.8, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.2, 0.35), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.2, 0.4), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.15, 0.4), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.2, 0.5), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.2, 0.35), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.4, 0.15), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.25, 0.65), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.4, 0.15), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.65, 0.05), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.75, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.5, 0.65), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.1, 0.4), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.55, 0.8500000000000001), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.45, 0.0), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.75, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.1, 0.35), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.55, 0.5), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.0, 0.55), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.55, 0.55), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.55, 0.65), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.1, 0.5), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.1, 0.35), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.05, 0.5), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.5, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.4, 0.1), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.1, 0.35), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.8500000000000001, 0.0), 0.0707106781186546), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.45, 0.7000000000000001), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.65, 0.75), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.65, 0.25), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.8500000000000001, 0.0), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.2, 0.95), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.05, 0.5), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.8500000000000001, 0.95), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.7000000000000001, 0.0), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.25, 0.4), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.55, 0.8), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.7000000000000001, 0.3), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.8500000000000001, 0.95), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.55, 0.75), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.6000000000000001, 0.95), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.4, 0.55), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.8, 0.05), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.4, 0.65), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.6000000000000001, 0.45), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.15, 0.5), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.4, 0.05), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.6000000000000001, 0.6000000000000001), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.1, 0.45), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.45, 0.1), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.35, 0.15), 0.0707106781186548), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.5, 0.95), 0.0707106781186548), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.15, 0.4), 0.0707106781186548), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.8, 0.95), 0.0707106781186548), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.35, 0.65), 0.0707106781186548), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.2, 0.35), 0.0707106781186548), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.45, 0.7000000000000001), 0.0866025403784438), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.7000000000000001, 0.0), 0.0866025403784438), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.45, 0.7000000000000001), 0.0866025403784438), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.65, 0.7000000000000001), 0.0866025403784439), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.8, 0.0), 0.0866025403784439), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.5, 0.4), 0.0866025403784439), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.75, 0.95), 0.0999999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.25, 0.8), 0.0999999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.8, 0.35), 0.0999999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.75, 0.95), 0.0999999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.8, 0.25), 0.0999999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.45, 0.55), 0.1), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.7000000000000001, 0.0), 0.1), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.35, 0.25), 0.1), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.95, 0.95), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.25, 0.4), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.45, 0.2), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.45, 0.15), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.0, 0.65), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.95, 0.0), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.8, 0.95), 0.1118033988749895), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.35, 0.15), 0.1118033988749895), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.35, 0.6000000000000001), 0.1118033988749895), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.3, 0.35), 0.1118033988749895), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.5, 0.1), 0.1118033988749895), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.5, 0.5), 0.1118033988749895), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.5, 0.15), 0.1224744871391588), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.35, 0.75), 0.1224744871391588), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.4, 0.4), 0.1224744871391589), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.55, 0.15), 0.1414213562373094), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.25, 0.5), 0.1414213562373094), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.1, 0.65), 0.1414213562373095), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.35, 0.35), 0.1414213562373095), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.35, 0.3), 0.1414213562373095), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.5, 0.15), 0.1499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.35, 0.95), 0.1499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.15, 0.55), 0.1499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.6000000000000001, 0.1), 0.1499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.35, 0.3), 0.1499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.45, 0.25), 0.15), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.15, 0.6000000000000001), 0.15), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.55, 0.0), 0.15), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.55, 0.0), 0.15), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.5, 0.7000000000000001), 0.158113883008419), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.05, 0.65), 0.158113883008419), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.65, 0.0), 0.1658312395177699), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.0, 0.95), 0.1802775637731994), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.35, 0.55), 0.1802775637731994), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.0, 0.75), 0.1802775637731995), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.35, 0.45), 0.1802775637731995), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.45, 0.3), 0.187082869338697), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.65, 0.0), 0.187082869338697), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.25, 0.5), 0.1870828693386971), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.4, 0.6000000000000001), 0.223606797749979), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.4, 0.65), 0.229128784747792), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.6000000000000001, 0.3), 0.2449489742783177), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.55, 0.95), 0.2449489742783178), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.55, 0.95), 0.2449489742783178), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.0, 0.95), 0.291547594742265), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.8, 0.0), 0.291547594742265), sphereSDF(inputPoint, vec3(0.2, 0.1, 0.95), 0.458257569495584))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
}

float soil3SDF(vec3 inputPoint) {
return smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.6000000000000001, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.6000000000000001, 0.2), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.95, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.95, 0.4), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.6000000000000001, 0.5), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.55, 0.65), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.55, 0.3), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.55, 0.35), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.55, 0.8500000000000001), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.8500000000000001, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.55, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.55, 0.9), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.55, 0.95), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.55, 0.55), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.55, 0.6000000000000001), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.95, 0.8500000000000001), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.8, 0.8500000000000001), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.8, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.8, 0.8500000000000001), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.65, 0.7000000000000001), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.65, 0.65), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.25, 0.8500000000000001), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.25, 0.8), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.65, 0.55), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.65, 0.6000000000000001), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.65, 0.55), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.8, 0.5), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.65, 0.4), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.65, 0.45), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.25, 0.8500000000000001), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.6000000000000001, 0.25), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.8, 0.75), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.8, 0.65), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.2, 0.8500000000000001), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.6000000000000001, 0.35), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.8, 0.5), 0.0499999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.65, 0.3), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.95, 0.0), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.95, 0.95), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.95, 0.3), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.95, 0.0), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.95, 0.3), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.95, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.8, 0.75), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.8500000000000001, 0.05), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.8, 0.05), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.6000000000000001, 0.35), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.8, 0.1), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.8, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.7000000000000001, 0.65), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.7000000000000001, 0.5), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.9, 0.55), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.9, 0.1), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.95, 0.45), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.7000000000000001, 0.15), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.7000000000000001, 0.75), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.95, 0.55), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.05, 0.75, 0.55), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.9, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.8500000000000001, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.6000000000000001, 0.35), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.55, 0.6000000000000001), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.55, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.55, 0.55), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.55, 0.65), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.55, 0.75), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.55, 0.5), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.55, 0.55), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.55, 0.65), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.55, 0.75), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.55, 0.95), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.55, 0.5), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.55, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.6000000000000001, 0.35), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.55, 0.5), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.55, 0.45), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.35, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.3, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.35, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.95, 0.0), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.8, 0.2), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.45, 0.9), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.8500000000000001, 0.4), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.5, 0.8500000000000001), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.55, 0.35), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.8, 0.15), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.8500000000000001, 0.95), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.8, 0.15), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.8500000000000001, 0.55), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.8500000000000001, 0.6000000000000001), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.8500000000000001, 0.15), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.6000000000000001, 0.2), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.95, 0.0), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.8, 0.8), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.6000000000000001, 0.55), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.8500000000000001, 0.3), 0.05), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.8, 0.75), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.7000000000000001, 0.25), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.25, 0.8, 0.7000000000000001), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.8500000000000001, 0.1), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.95, 0.8500000000000001), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.95, 0.05), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.8500000000000001, 0.15), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.9, 0.95, 0.05), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.95, 0.9), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.75, 0.5), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.8500000000000001, 0.8), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.75, 0.65), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.65, 0.3), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.6000000000000001, 0.75), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.55, 0.8500000000000001), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.6000000000000001, 0.4), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.65, 0.55), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.6000000000000001, 0.6000000000000001), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.65, 0.6000000000000001, 0.5), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.65, 0.65), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.7000000000000001, 0.6000000000000001), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.8500000000000001, 0.35, 0.8500000000000001), 0.0707106781186547), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.55, 0.95), 0.0707106781186548), smoothUnion(sphereSDF(inputPoint, vec3(0.3, 0.95, 0.25), 0.0707106781186548), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.7000000000000001, 0.6000000000000001), 0.0707106781186548), smoothUnion(sphereSDF(inputPoint, vec3(0.7000000000000001, 0.6000000000000001, 0.7000000000000001), 0.0707106781186548), smoothUnion(sphereSDF(inputPoint, vec3(0.35, 0.95, 0.15), 0.0707106781186548), smoothUnion(sphereSDF(inputPoint, vec3(0.6000000000000001, 0.7000000000000001, 0.75), 0.0707106781186548), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.9, 0.8), 0.0866025403784438), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.35, 0.9), 0.0866025403784438), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.75, 0.15), 0.0866025403784438), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.75, 0.55), 0.0866025403784438), smoothUnion(sphereSDF(inputPoint, vec3(0.1, 0.95, 0.4), 0.0866025403784439), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.7000000000000001, 0.25), 0.0866025403784439), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.95, 0.4), 0.0866025403784439), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.75, 0.95), 0.0999999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.95, 0.05), 0.0999999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.8, 0.65, 0.95), 0.0999999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.8500000000000001, 0.5), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.15, 0.8, 0.65), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.75, 0.65), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.65, 0.8), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.4, 0.7000000000000001, 0.4), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.95, 0.15), 0.1118033988749894), smoothUnion(sphereSDF(inputPoint, vec3(0.5, 0.75, 0.5), 0.1224744871391589), smoothUnion(sphereSDF(inputPoint, vec3(0.75, 0.95, 0.15), 0.1224744871391589), smoothUnion(sphereSDF(inputPoint, vec3(0.2, 0.95, 0.7000000000000001), 0.1581138830084189), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.7000000000000001, 0.8500000000000001), 0.16583123951777), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.65, 0.35), 0.16583123951777), smoothUnion(sphereSDF(inputPoint, vec3(0.45, 0.95, 0.65), 0.1802775637731995), smoothUnion(sphereSDF(inputPoint, vec3(0.0, 0.95, 0.6000000000000001), 0.1999999999999999), smoothUnion(sphereSDF(inputPoint, vec3(0.95, 0.95, 0.95), 0.223606797749979), smoothUnion(sphereSDF(inputPoint, vec3(0.55, 0.9, 0.3), 0.25), sphereSDF(inputPoint, vec3(0.8500000000000001, 0.95, 0.55), 0.3937003937005905))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
}



float vmax(vec3 v){

     return max(max(v.x, v.y), v.z);

}



float sdf_boxcheap(vec3 c, vec3 p, vec3 s){

     return vmax(abs(p-c) - s);

}



float cubeSDFFinal(vec3 inputPoint) {
return min(sdf_boxcheap(inputPoint, vec3(0.25, 0.25, 0.05), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.2, 0.30000000000000004, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.7000000000000001, 0.35000000000000003, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.25, 0.30000000000000004, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.30000000000000004, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.30000000000000004, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.0, 0.30000000000000004, 0.05), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.05, 0.30000000000000004, 0.05), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.1, 0.30000000000000004, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.1, 0.30000000000000004, 0.05), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.35000000000000003, 0.30000000000000004, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.4, 0.30000000000000004, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.05, 0.35000000000000003, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.25, 0.05), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.45, 0.30000000000000004, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.5, 0.30000000000000004, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.55, 0.30000000000000004, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.6000000000000001, 0.30000000000000004, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.7000000000000001, 0.30000000000000004, 0.05), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.0, 0.30000000000000004, 0.0), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.2, 0.1), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.25, 0.2, 0.1), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.35000000000000003, 0.2, 0.1), vec3(0.04999999999999999, 0.04999999999999999, 0.04999999999999999)), min(sdf_boxcheap(inputPoint, vec3(0.2, 0.25, 0.0), vec3(0.05, 0.05, 0.05)), min(sdf_boxcheap(inputPoint, vec3(0.35000000000000003, 0.25, 0.05), vec3(0.05, 0.05, 0.05)), min(sdf_boxcheap(inputPoint, vec3(0.65, 0.30000000000000004, 0.0), vec3(0.05, 0.05, 0.05)), min(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.25, 0.05), vec3(0.05, 0.05, 0.05)), min(sdf_boxcheap(inputPoint, vec3(0.05, 0.25, 0.1), vec3(0.05000000000000002, 0.05000000000000002, 0.05000000000000002)), min(sdf_boxcheap(inputPoint, vec3(0.0, 0.25, 0.1), vec3(0.05000000000000002, 0.05000000000000002, 0.05000000000000002)), min(sdf_boxcheap(inputPoint, vec3(0.1, 0.25, 0.1), vec3(0.05000000000000002, 0.05000000000000002, 0.05000000000000002)), min(sdf_boxcheap(inputPoint, vec3(0.25, 0.2, 0.05), vec3(0.07071067811865474, 0.07071067811865474, 0.07071067811865474)), min(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.2, 0.05), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), min(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.25, 0.0), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), min(sdf_boxcheap(inputPoint, vec3(0.35000000000000003, 0.2, 0.05), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), min(sdf_boxcheap(inputPoint, vec3(0.25, 0.25, 0.0), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), min(sdf_boxcheap(inputPoint, vec3(0.05, 0.30000000000000004, 0.0), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), min(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.25, 0.0), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), min(sdf_boxcheap(inputPoint, vec3(0.1, 0.25, 0.05), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), min(sdf_boxcheap(inputPoint, vec3(0.35000000000000003, 0.25, 0.0), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), min(sdf_boxcheap(inputPoint, vec3(0.0, 0.25, 0.05), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), min(sdf_boxcheap(inputPoint, vec3(0.05, 0.25, 0.05), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), min(sdf_boxcheap(inputPoint, vec3(0.25, 0.2, 0.0), vec3(0.08660254037844385, 0.08660254037844385, 0.08660254037844385)), min(sdf_boxcheap(inputPoint, vec3(0.1, 0.25, 0.0), vec3(0.0866025403784439, 0.0866025403784439, 0.0866025403784439)), min(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.0, 0.2), vec3(0.11180339887498948, 0.11180339887498948, 0.11180339887498948)), min(sdf_boxcheap(inputPoint, vec3(0.6000000000000001, 0.0, 0.2), vec3(0.12247448713915896, 0.12247448713915896, 0.12247448713915896)), min(sdf_boxcheap(inputPoint, vec3(0.95, 0.0, 0.25), vec3(0.14142135623730948, 0.14142135623730948, 0.14142135623730948)), min(sdf_boxcheap(inputPoint, vec3(0.95, 0.1, 0.2), vec3(0.15, 0.15, 0.15)), min(sdf_boxcheap(inputPoint, vec3(0.0, 0.0, 0.2), vec3(0.15000000000000002, 0.15000000000000002, 0.15000000000000002)), min(sdf_boxcheap(inputPoint, vec3(0.6000000000000001, 0.05, 0.15000000000000002), vec3(0.15000000000000008, 0.15000000000000008, 0.15000000000000008)), sdf_boxcheap(inputPoint, vec3(0.95, 0.15000000000000002, 0.0), vec3(0.1870828693386971, 0.1870828693386971, 0.1870828693386971)))))))))))))))))))))))))))))))))))))))))))))))))));
}



/**
 * Signed distance function describing the scene.
 * 
 * Absolute value of the return value indicates the distance to the surface.
 * Sign indicates whether the point is inside or outside the surface,
 * negative indicating inside.
 */
float sceneSDF(vec3 samplePoint) {
    float dist = max(cubeSDFFinal(samplePoint), cubeSDF(samplePoint));
    /* float dist = max(min(min(soil2SDF(samplePoint), min(soil0SDF(samplePoint), soil1SDF(samplePoint))), soil3SDF(samplePoint)), cubeSDF(samplePoint));*/
    
    dist = max(dist, -sphereSDF(samplePoint, vec3(sin(iTime), cos(iTime),sin(iTime)), sin(0.23*3.0*iTime)));

    return dist;
}

/**
 * Return the shortest distance from the eyepoint to the scene surface along
 * the marching direction. If no part of the surface is found between start and end,
 * return end.
 * 
 * eye: the eye point, acting as the origin of the ray
 * marchingDirection: the normalized direction to march in
 * start: the starting distance away from the eye
 * end: the max distance away from the ey to march before giving up
 */
float shortestDistanceToSurface(vec3 eye, vec3 marchingDirection, float start, float end) {
    float depth = start;
    for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
        float dist = sceneSDF(eye + depth * marchingDirection);
        if (dist < EPSILON) {
			return depth;
        }
        depth += dist;
        if (depth >= end) {
            return end;
        }
    }
    return end;
}
            

/**
 * Return the normalized direction to march in from the eye point for a single pixel.
 * 
 * fieldOfView: vertical field of view in degrees
 * size: resolution of the output image
 * fragCoord: the x,y coordinate of the pixel in the output image
 */
vec3 rayDirection(float fieldOfView, vec2 size, vec2 fragCoord) {
    vec2 xy = fragCoord - size / 2.0;
    float z = size.y / tan(radians(fieldOfView) / 2.0);
    return normalize(vec3(xy, -z));
}

/**
 * Using the gradient of the SDF, estimate the normal on the surface at point p.
 */
vec3 estimateNormal(vec3 p) {
    return normalize(vec3(
        sceneSDF(vec3(p.x + EPSILON, p.y, p.z)) - sceneSDF(vec3(p.x - EPSILON, p.y, p.z)),
        sceneSDF(vec3(p.x, p.y + EPSILON, p.z)) - sceneSDF(vec3(p.x, p.y - EPSILON, p.z)),
        sceneSDF(vec3(p.x, p.y, p.z  + EPSILON)) - sceneSDF(vec3(p.x, p.y, p.z - EPSILON))
    ));
}

/**
 * Lighting contribution of a single point light source via Phong illumination.
 * 
 * The vec3 returned is the RGB color of the light's contribution.
 *
 * k_a: Ambient color
 * k_d: Diffuse color
 * k_s: Specular color
 * alpha: Shininess coefficient
 * p: position of point being lit
 * eye: the position of the camera
 * lightPos: the position of the light
 * lightIntensity: color/intensity of the light
 *
 * See https://en.wikipedia.org/wiki/Phong_reflection_model#Description
 */
vec3 phongContribForLight(vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye,
                          vec3 lightPos, vec3 lightIntensity) {
    vec3 N = estimateNormal(p);
    vec3 L = normalize(lightPos - p);
    vec3 V = normalize(eye - p);
    vec3 R = normalize(reflect(-L, N));
    
    float dotLN = dot(L, N);
    float dotRV = dot(R, V);
    
    if (dotLN < 0.0) {
        // Light not visible from this point on the surface
        return vec3(0.0, 0.0, 0.0);
    } 
    
    if (dotRV < 0.0) {
        // Light reflection in opposite direction as viewer, apply only diffuse
        // component
        return lightIntensity * (k_d * dotLN);
    }
    return lightIntensity * (k_d * dotLN + k_s * pow(dotRV, alpha));
}

/**
 * Lighting via Phong illumination.
 * 
 * The vec3 returned is the RGB color of that point after lighting is applied.
 * k_a: Ambient color
 * k_d: Diffuse color
 * k_s: Specular color
 * alpha: Shininess coefficient
 * p: position of point being lit
 * eye: the position of the camera
 *
 * See https://en.wikipedia.org/wiki/Phong_reflection_model#Description
 */
vec3 phongIllumination(vec3 k_a, vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye) {
    const vec3 ambientLight = 0.5 * vec3(1.0, 1.0, 1.0);
    vec3 color = ambientLight * k_a;
    
    vec3 light1Pos = vec3(4.0 * sin(iTime),
                          2.0,
                          4.0 * cos(iTime));
    vec3 light1Intensity = vec3(0.4, 0.4, 0.4);
    
    color += phongContribForLight(k_d, k_s, alpha, p, eye,
                                  light1Pos,
                                  light1Intensity);
    
    vec3 light2Pos = vec3(2.0 * sin(0.37 * iTime),
                          2.0 * cos(0.37 * iTime),
                          2.0);
    vec3 light2Intensity = vec3(0.4, 0.4, 0.4);
    
    color += phongContribForLight(k_d, k_s, alpha, p, eye,
                                  light2Pos,
                                  light2Intensity);    
    return color;
}

mat4 viewMatrixs(vec3 eye, vec3 center, vec3 up) {
    // Based on gluLookAt man page
    vec3 f = normalize(center - eye);
    vec3 s = normalize(cross(f, up));
    vec3 u = cross(s, f);
    return mat4(
        vec4(s, 0.0),
        vec4(u, 0.0),
        vec4(-f, 0.0),
        vec4(0.0, 0.0, 0.0, 1)
    );
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float angle = iTime*0.5;
    mat3 rotation = mat3(
            vec3(cos(angle), 0.0, -sin(angle)),
            vec3(0.0, 1.0, 0.0),
            vec3(sin(angle), 0.0, cos(angle))
        );
    vec3 dir = normalize(rotation*rayDirection(45.0, iResolution.xy, fragCoord));
    vec3 eye = rotation*vec3(0.0,0.0,10.0);

    float dist = shortestDistanceToSurface(eye, dir, MIN_DIST, MAX_DIST);
    
    if (dist > MAX_DIST - EPSILON) {
        // Didn't hit anything
        fragColor = vec4(0.0, 0.0, 0.0, 0.0);
		return;
    }

    // The closest point on the surface to the eyepoint along the view ray
    vec3 p = eye + dir * dist;

    float sdf1 = soil0SDF(p);
    float sdf2 = soil1SDF(p);
    float sdf3 = soil2SDF(p);
    float sdf4 = soil3SDF(p);

    float minSdf = min(sdf1, min(sdf2, min(sdf3, sdf4)));

    vec3 K_d = vec3(0.7, 0.7, 0.7);
    if (abs(sdf1 - minSdf) < 0.1) {
        K_d = vec3(72.0/255.0,209.0/255.0,204.0/255.0);
    } 

    if (abs(sdf2 - minSdf) < 0.1) {
        K_d = vec3(124.0/255.0,252.0/255.0,0.0);
    }    
    
    if (abs(sdf3 - minSdf) < 0.1) {
        K_d = vec3(1.0,1.0,161.0/255.0);
    }

    if (abs(sdf4 - minSdf) < 0.1) {
        K_d = vec3(152.0/255.0,116.0/255.0,86.0/255.0);
    }
    
    vec3 K_a = vec3(0.2, 0.2, 0.2);
    vec3 K_s = vec3(1.0, 1.0, 1.0);
    float shininess = 1.0;
    
    vec3 color = K_d;//phongIllumination(K_a, K_d, K_s, shininess, p, eye);
    
    fragColor = vec4(color * length(p), 1.0);
}

void main() {
   mainImage(gl_FragColor, gl_FragCoord.xy);
}