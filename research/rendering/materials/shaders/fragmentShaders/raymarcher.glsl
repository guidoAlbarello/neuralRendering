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
    return min( a, b ) - h*h*k*(1.0/4.0); 
}

float sphereSDF(vec3 p, vec3 pos, float r) {
    return length(pos - p) - r; 
}

float vmax(vec3 v){
     return max(max(v.x, v.y), v.z);
}
        
float sdf_boxcheap(vec3 c, vec3 p, vec3 s){
     return vmax(abs(p-c) - s);
}


float cubeSDFFinal0(vec3 inputPoint) {
return smoothUnion(sdf_boxcheap(inputPoint, vec3(0.95, 0.0, 0.05), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.0, 0.0), vec3(0.12247448713915893, 0.12247448713915893, 0.12247448713915893)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.0, 0.0), vec3(0.14142135623730953, 0.14142135623730953, 0.14142135623730953)), sdf_boxcheap(inputPoint, vec3(0.7000000000000001, 0.0, 0.0), vec3(0.15, 0.15, 0.15)))));
}
float cubeSDFFinal1(vec3 inputPoint) {
return smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.30000000000000004, 0.1), vec3(0.0707106781186547, 0.0707106781186547, 0.0707106781186547)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.9, 0.4, 0.0), vec3(0.0707106781186547, 0.0707106781186547, 0.0707106781186547)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.9, 0.30000000000000004, 0.1), vec3(0.0707106781186547, 0.0707106781186547, 0.0707106781186547)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.95, 0.30000000000000004, 0.1), vec3(0.0707106781186547, 0.0707106781186547, 0.0707106781186547)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.8500000000000001, 0.30000000000000004, 0.1), vec3(0.0707106781186547, 0.0707106781186547, 0.0707106781186547)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.2, 0.30000000000000004, 0.0), vec3(0.07071067811865471, 0.07071067811865471, 0.07071067811865471)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.30000000000000004, 0.0), vec3(0.07071067811865471, 0.07071067811865471, 0.07071067811865471)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.25, 0.30000000000000004, 0.0), vec3(0.07071067811865471, 0.07071067811865471, 0.07071067811865471)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.30000000000000004, 0.0), vec3(0.07071067811865471, 0.07071067811865471, 0.07071067811865471)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.35000000000000003, 0.30000000000000004, 0.0), vec3(0.07071067811865471, 0.07071067811865471, 0.07071067811865471)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.35000000000000003, 0.0), vec3(0.07071067811865474, 0.07071067811865474, 0.07071067811865474)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.25, 0.1), vec3(0.07071067811865474, 0.07071067811865474, 0.07071067811865474)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.45, 0.35000000000000003, 0.0), vec3(0.07071067811865474, 0.07071067811865474, 0.07071067811865474)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.4, 0.25, 0.1), vec3(0.07071067811865474, 0.07071067811865474, 0.07071067811865474)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.45, 0.25, 0.1), vec3(0.07071067811865474, 0.07071067811865474, 0.07071067811865474)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.45, 0.0), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.8, 0.4, 0.0), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.35000000000000003, 0.05), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.35000000000000003, 0.05), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.75, 0.35000000000000003, 0.0), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.8500000000000001, 0.4, 0.0), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.45, 0.0), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.7000000000000001, 0.35000000000000003, 0.0), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.4, 0.35000000000000003, 0.0), vec3(0.07071067811865475, 0.07071067811865475, 0.07071067811865475)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.4, 0.0), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.65, 0.0, 0.30000000000000004), vec3(0.07071067811865482, 0.07071067811865482, 0.07071067811865482)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.45, 0.30000000000000004, 0.0), vec3(0.08660254037844382, 0.08660254037844382, 0.08660254037844382)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.30000000000000004, 0.0), vec3(0.08660254037844382, 0.08660254037844382, 0.08660254037844382)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.2, 0.05), vec3(0.08660254037844384, 0.08660254037844384, 0.08660254037844384)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.4, 0.30000000000000004, 0.0), vec3(0.08660254037844385, 0.08660254037844385, 0.08660254037844385)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.35000000000000003, 0.0), vec3(0.08660254037844388, 0.08660254037844388, 0.08660254037844388)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.8, 0.35000000000000003, 0.0), vec3(0.08660254037844388, 0.08660254037844388, 0.08660254037844388)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.4, 0.25, 0.05), vec3(0.08660254037844388, 0.08660254037844388, 0.08660254037844388)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.65, 0.1, 0.25), vec3(0.08660254037844388, 0.08660254037844388, 0.08660254037844388)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.65, 0.15000000000000002, 0.15000000000000002), vec3(0.0866025403784439, 0.0866025403784439, 0.0866025403784439)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.4, 0.0), vec3(0.1, 0.1, 0.1)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.35000000000000003, 0.25, 0.0), vec3(0.1, 0.1, 0.1)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.4, 0.25, 0.0), vec3(0.1, 0.1, 0.1)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.4, 0.0, 0.25), vec3(0.1, 0.1, 0.1)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.95, 0.0, 0.35000000000000003), vec3(0.10000000000000003, 0.10000000000000003, 0.10000000000000003)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.30000000000000004, 0.05), vec3(0.11180339887498944, 0.11180339887498944, 0.11180339887498944)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.30000000000000004, 0.05), vec3(0.11180339887498944, 0.11180339887498944, 0.11180339887498944)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.25, 0.0), vec3(0.11180339887498948, 0.11180339887498948, 0.11180339887498948)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.35000000000000003, 0.0), vec3(0.11180339887498948, 0.11180339887498948, 0.11180339887498948)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.65, 0.2, 0.1), vec3(0.1118033988749895, 0.1118033988749895, 0.1118033988749895)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.95, 0.1, 0.30000000000000004), vec3(0.11180339887498952, 0.11180339887498952, 0.11180339887498952)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.65, 0.25, 0.0), vec3(0.12247448713915884, 0.12247448713915884, 0.12247448713915884)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.30000000000000004, 0.0), vec3(0.12247448713915887, 0.12247448713915887, 0.12247448713915887)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.95, 0.25, 0.0), vec3(0.15811388300841894, 0.15811388300841894, 0.15811388300841894)), sdf_boxcheap(inputPoint, vec3(0.0, 0.0, 0.30000000000000004), vec3(0.17320508075688773, 0.17320508075688773, 0.17320508075688773)))))))))))))))))))))))))))))))))))))))))))))))))));
}
float cubeSDFFinal2(vec3 inputPoint) {
return smoothUnion(sdf_boxcheap(inputPoint, vec3(0.9, 0.6000000000000001, 0.05), vec3(0.15000000000000008, 0.15000000000000008, 0.15000000000000008)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.75, 0.05), vec3(0.15811388300841892, 0.15811388300841892, 0.15811388300841892)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.9, 0.7000000000000001, 0.0), vec3(0.15811388300841894, 0.15811388300841894, 0.15811388300841894)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.8500000000000001, 0.7000000000000001, 0.0), vec3(0.15811388300841894, 0.15811388300841894, 0.15811388300841894)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.9, 0.1), vec3(0.15811388300841894, 0.15811388300841894, 0.15811388300841894)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.9, 0.1), vec3(0.15811388300841894, 0.15811388300841894, 0.15811388300841894)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.95, 0.7000000000000001, 0.0), vec3(0.15811388300841903, 0.15811388300841903, 0.15811388300841903)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.8500000000000001, 0.1), vec3(0.16583123951776996, 0.16583123951776996, 0.16583123951776996)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.8, 0.05), vec3(0.16583123951776998, 0.16583123951776998, 0.16583123951776998)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.75, 0.2), vec3(0.16583123951776998, 0.16583123951776998, 0.16583123951776998)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.8, 0.15000000000000002), vec3(0.1732050807568877, 0.1732050807568877, 0.1732050807568877)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.8500000000000001, 0.1), vec3(0.1802775637731994, 0.1802775637731994, 0.1802775637731994)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.8, 0.15000000000000002), vec3(0.1802775637731994, 0.1802775637731994, 0.1802775637731994)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.8500000000000001, 0.1), vec3(0.1802775637731994, 0.1802775637731994, 0.1802775637731994)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.9, 0.0), vec3(0.18027756377319945, 0.18027756377319945, 0.18027756377319945)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.8500000000000001, 0.0), vec3(0.18027756377319945, 0.18027756377319945, 0.18027756377319945)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.8500000000000001, 0.65, 0.0), vec3(0.18027756377319945, 0.18027756377319945, 0.18027756377319945)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.9, 0.65, 0.0), vec3(0.18027756377319945, 0.18027756377319945, 0.18027756377319945)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.95, 0.0), vec3(0.18027756377319945, 0.18027756377319945, 0.18027756377319945)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.75, 0.0), vec3(0.18027756377319945, 0.18027756377319945, 0.18027756377319945)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.95, 0.05), vec3(0.18027756377319948, 0.18027756377319948, 0.18027756377319948)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.75, 0.2), vec3(0.18027756377319948, 0.18027756377319948, 0.18027756377319948)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.75, 0.2), vec3(0.18027756377319948, 0.18027756377319948, 0.18027756377319948)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.9, 0.05), vec3(0.18027756377319948, 0.18027756377319948, 0.18027756377319948)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.95, 0.65, 0.0), vec3(0.18708286933869706, 0.18708286933869706, 0.18708286933869706)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.8500000000000001, 0.05), vec3(0.18708286933869706, 0.18708286933869706, 0.18708286933869706)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.8, 0.0), vec3(0.18708286933869706, 0.18708286933869706, 0.18708286933869706)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.8, 0.1), vec3(0.18708286933869706, 0.18708286933869706, 0.18708286933869706)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.8500000000000001, 0.0, 0.75), vec3(0.18708286933869708, 0.18708286933869708, 0.18708286933869708)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.75, 0.15000000000000002), vec3(0.18708286933869708, 0.18708286933869708, 0.18708286933869708)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.95, 0.05), vec3(0.2, 0.2, 0.2)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.95, 0.05), vec3(0.2, 0.2, 0.2)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.8, 0.1), vec3(0.20615528128088298, 0.20615528128088298, 0.20615528128088298)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.8, 0.05), vec3(0.20615528128088298, 0.20615528128088298, 0.20615528128088298)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.9, 0.05), vec3(0.20615528128088306, 0.20615528128088306, 0.20615528128088306)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.9, 0.05), vec3(0.20615528128088306, 0.20615528128088306, 0.20615528128088306)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.8, 0.1), vec3(0.2121320343559642, 0.2121320343559642, 0.2121320343559642)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.95, 0.0), vec3(0.21213203435596426, 0.21213203435596426, 0.21213203435596426)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.9, 0.0), vec3(0.21213203435596426, 0.21213203435596426, 0.21213203435596426)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.8500000000000001, 0.0), vec3(0.21794494717703367, 0.21794494717703367, 0.21794494717703367)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.8500000000000001, 0.05), vec3(0.22360679774997894, 0.22360679774997894, 0.22360679774997894)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.8500000000000001, 0.05), vec3(0.22360679774997894, 0.22360679774997894, 0.22360679774997894)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.8, 0.0), vec3(0.229128784747792, 0.229128784747792, 0.229128784747792)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.9, 0.0), vec3(0.25, 0.25, 0.25)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.95, 0.0), vec3(0.25, 0.25, 0.25)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.95, 0.0), vec3(0.25, 0.25, 0.25)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.9, 0.0), vec3(0.2549509756796392, 0.2549509756796392, 0.2549509756796392)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.8500000000000001, 0.0), vec3(0.2549509756796393, 0.2549509756796393, 0.2549509756796393)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.8500000000000001, 0.0), vec3(0.2692582403567252, 0.2692582403567252, 0.2692582403567252)), sdf_boxcheap(inputPoint, vec3(0.2, 0.1, 0.95), vec3(0.4582575694955841, 0.4582575694955841, 0.4582575694955841)))))))))))))))))))))))))))))))))))))))))))))))))));
}
float cubeSDFFinal3(vec3 inputPoint) {
return smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.95, 0.4), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.65, 0.55, 0.4), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.2, 0.95, 0.55), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.9, 0.55), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.95, 0.35000000000000003), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.2, 0.7000000000000001, 0.55), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.2, 0.95, 0.8), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.95, 0.45), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.95, 0.75), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.95, 0.5), vec3(0.07071067811865478, 0.07071067811865478, 0.07071067811865478)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.7000000000000001, 0.55), vec3(0.0707106781186548, 0.0707106781186548, 0.0707106781186548)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.95, 0.2), vec3(0.0707106781186548, 0.0707106781186548, 0.0707106781186548)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.8, 0.6000000000000001, 0.95), vec3(0.07071067811865482, 0.07071067811865482, 0.07071067811865482)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.55, 0.55, 0.30000000000000004), vec3(0.07071067811865482, 0.07071067811865482, 0.07071067811865482)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.95, 0.55), vec3(0.07071067811865482, 0.07071067811865482, 0.07071067811865482)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.95, 0.4), vec3(0.07071067811865482, 0.07071067811865482, 0.07071067811865482)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.95, 0.25), vec3(0.07071067811865482, 0.07071067811865482, 0.07071067811865482)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.9, 0.5), vec3(0.08660254037844381, 0.08660254037844381, 0.08660254037844381)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.9, 0.45), vec3(0.08660254037844382, 0.08660254037844382, 0.08660254037844382)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.30000000000000004, 0.9, 0.6000000000000001), vec3(0.08660254037844388, 0.08660254037844388, 0.08660254037844388)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.95, 0.35000000000000003, 0.9), vec3(0.08660254037844388, 0.08660254037844388, 0.08660254037844388)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.5, 0.55, 0.35000000000000003), vec3(0.0866025403784439, 0.0866025403784439, 0.0866025403784439)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.95, 0.4), vec3(0.0866025403784439, 0.0866025403784439, 0.0866025403784439)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.95, 0.4), vec3(0.0866025403784439, 0.0866025403784439, 0.0866025403784439)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.15000000000000002, 0.95, 0.55), vec3(0.0866025403784439, 0.0866025403784439, 0.0866025403784439)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.55, 0.55, 0.35000000000000003), vec3(0.08660254037844395, 0.08660254037844395, 0.08660254037844395)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.75, 0.6000000000000001), vec3(0.09999999999999998, 0.09999999999999998, 0.09999999999999998)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.4, 0.65, 0.35000000000000003), vec3(0.10000000000000003, 0.10000000000000003, 0.10000000000000003)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.45, 0.65, 0.4), vec3(0.11180339887498944, 0.11180339887498944, 0.11180339887498944)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.45, 0.65, 0.30000000000000004), vec3(0.11180339887498944, 0.11180339887498944, 0.11180339887498944)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.5, 0.6000000000000001, 0.30000000000000004), vec3(0.11180339887498948, 0.11180339887498948, 0.11180339887498948)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.6000000000000001, 0.6000000000000001, 0.35000000000000003), vec3(0.11180339887498954, 0.11180339887498954, 0.11180339887498954)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.55, 0.6000000000000001, 0.30000000000000004), vec3(0.11180339887498954, 0.11180339887498954, 0.11180339887498954)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.2, 0.95, 0.75), vec3(0.11180339887498957, 0.11180339887498957, 0.11180339887498957)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.95, 0.45), vec3(0.12247448713915887, 0.12247448713915887, 0.12247448713915887)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.5, 0.6000000000000001, 0.35000000000000003), vec3(0.12247448713915893, 0.12247448713915893, 0.12247448713915893)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.1, 0.95, 0.55), vec3(0.12247448713915896, 0.12247448713915896, 0.12247448713915896)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.55, 0.6000000000000001, 0.35000000000000003), vec3(0.122474487139159, 0.122474487139159, 0.122474487139159)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.5, 0.65, 0.30000000000000004), vec3(0.14142135623730948, 0.14142135623730948, 0.14142135623730948)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.65, 0.65, 0.35000000000000003), vec3(0.14142135623730948, 0.14142135623730948, 0.14142135623730948)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.95, 0.5), vec3(0.14142135623730948, 0.14142135623730948, 0.14142135623730948)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.55, 0.65, 0.30000000000000004), vec3(0.14142135623730953, 0.14142135623730953, 0.14142135623730953)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.6000000000000001, 0.65, 0.30000000000000004), vec3(0.14142135623730953, 0.14142135623730953, 0.14142135623730953)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.05, 0.8500000000000001, 0.6000000000000001), vec3(0.14142135623730964, 0.14142135623730964, 0.14142135623730964)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.6000000000000001, 0.65, 0.35000000000000003), vec3(0.15811388300841894, 0.15811388300841894, 0.15811388300841894)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.5, 0.7000000000000001, 0.35000000000000003), vec3(0.18708286933869706, 0.18708286933869706, 0.18708286933869706)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.0, 0.95, 0.6000000000000001), vec3(0.2, 0.2, 0.2)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.8, 0.75, 0.75), vec3(0.2121320343559642, 0.2121320343559642, 0.2121320343559642)), smoothUnion(sdf_boxcheap(inputPoint, vec3(0.8, 0.8, 0.7000000000000001), vec3(0.2499999999999999, 0.2499999999999999, 0.2499999999999999)), sdf_boxcheap(inputPoint, vec3(0.8, 0.95, 0.55), vec3(0.3937003937005905, 0.3937003937005905, 0.3937003937005905)))))))))))))))))))))))))))))))))))))))))))))))))));
}
/**
 
* Signed distance function describing the scene.
 
* 
 
* Absolute value of the return value indicates the distance to the surface.
 
* Sign indicates whether the point is inside or outside the surface,
 
* negative indicating inside.
 
*/
 
float sceneSDF(vec3 samplePoint) {

    float dist = max(min(min(min(cubeSDFFinal0(samplePoint), cubeSDFFinal1(samplePoint)), cubeSDFFinal2(samplePoint)), cubeSDFFinal3(samplePoint)), cubeSDF(samplePoint));
    
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



    vec3 K_d = vec3(0.7, 0.7, 0.7);

    
    float sdf0 = cubeSDFFinal0(p);
    float sdf1 = cubeSDFFinal1(p);
    float sdf2 = cubeSDFFinal2(p);
    float sdf3 = cubeSDFFinal3(p);
    float minSdf = min(min(min(min(sdf0, sdf0), sdf1), sdf2), sdf3);
    
    if (abs(sdf0 - minSdf) < 0.1) {
        K_d = vec3(72.0/255.0,209.0/255.0,204.0/255.0);
    }
    if (abs(sdf1 - minSdf) < 0.1) {
        K_d = vec3(124.0/255.0,252.0/255.0,0.0);
    }
    if (abs(sdf2 - minSdf) < 0.1) {
        K_d = vec3(1.0,1.0,161.0/255.0);
    }
    if (abs(sdf3 - minSdf) < 0.1) {
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