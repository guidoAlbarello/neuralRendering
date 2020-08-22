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
float sphereSDF(vec3 samplePoint) {
    return length(samplePoint) - 1.0;
}

/**
 * Signed distance function describing the scene.
 * 
 * Absolute value of the return value indicates the distance to the surface.
 * Sign indicates whether the point is inside or outside the surface,
 * negative indicating inside.
 */
float sceneSDF(vec3 samplePoint) {
    return sphereSDF(samplePoint);
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
float relu(float value) {
	 return max(0.0, value);
}

float evaluateNet(vec2 inputPoint) {
	 return relu(relu(relu(inputPoint.x * -3.9098724790936124 + inputPoint.y * 6.5877941323402665 + 2.368686702187851) * -3.2532645047152444 + relu(inputPoint.x * 6.432172647285785 + inputPoint.y * 6.758582828715058 + -2.685915971643346) * 3.1393486973325273 + relu(inputPoint.x * -0.7069428002444006 + inputPoint.y * -0.4179663179954718 + -0.2638580576581051) * -0.5265054568920823 + relu(inputPoint.x * 0.48071813812017666 + inputPoint.y * 5.64600279073223 + -3.079416593929616) * -1.9510758226135159 + relu(inputPoint.x * -0.7832225981075905 + inputPoint.y * -2.7731251451406265 + 2.09913815640905) * 8.155287497258058 + relu(inputPoint.x * -2.974781675197763 + inputPoint.y * 1.23570971819423 + 1.3756777890719165) * -1.4309284446994541 + relu(inputPoint.x * -0.44369366419787726 + inputPoint.y * -0.11694830104355931 + -0.5868361040660834) * -0.42202331040754787 + relu(inputPoint.x * -0.2184094252599168 + inputPoint.y * 0.0829996894829679 + -0.651874977063064) * -0.18990039634043623 + relu(inputPoint.x * -0.1459923773918468 + inputPoint.y * -0.5085680640373881 + -0.46693029853482115) * -0.3589318570342485 + relu(inputPoint.x * -1.7546852681735732 + inputPoint.y * -3.404192431276553 + 0.946299898910171) * -1.1504934721255908 + 1.5962293848564706) * 2.437697217324776 + relu(relu(inputPoint.x * -3.9098724790936124 + inputPoint.y * 6.5877941323402665 + 2.368686702187851) * 1.2704397572027417 + relu(inputPoint.x * 6.432172647285785 + inputPoint.y * 6.758582828715058 + -2.685915971643346) * 2.435670426220953 + relu(inputPoint.x * -0.7069428002444006 + inputPoint.y * -0.4179663179954718 + -0.2638580576581051) * 0.1959038928413798 + relu(inputPoint.x * 0.48071813812017666 + inputPoint.y * 5.64600279073223 + -3.079416593929616) * 2.477007187805014 + relu(inputPoint.x * -0.7832225981075905 + inputPoint.y * -2.7731251451406265 + 2.09913815640905) * -6.020918849322255 + relu(inputPoint.x * -2.974781675197763 + inputPoint.y * 1.23570971819423 + 1.3756777890719165) * -1.1608441750783083 + relu(inputPoint.x * -0.44369366419787726 + inputPoint.y * -0.11694830104355931 + -0.5868361040660834) * 0.49238925912948484 + relu(inputPoint.x * -0.2184094252599168 + inputPoint.y * 0.0829996894829679 + -0.651874977063064) * 0.02964057241829 + relu(inputPoint.x * -0.1459923773918468 + inputPoint.y * -0.5085680640373881 + -0.46693029853482115) * -0.39749661631354916 + relu(inputPoint.x * -1.7546852681735732 + inputPoint.y * -3.404192431276553 + 0.946299898910171) * 0.4072448193847059 + 12.245053469899503) * -11.245282908881613 + relu(relu(inputPoint.x * -3.9098724790936124 + inputPoint.y * 6.5877941323402665 + 2.368686702187851) * -0.9024628579549332 + relu(inputPoint.x * 6.432172647285785 + inputPoint.y * 6.758582828715058 + -2.685915971643346) * 1.7997490635851545 + relu(inputPoint.x * -0.7069428002444006 + inputPoint.y * -0.4179663179954718 + -0.2638580576581051) * -0.31589457492257833 + relu(inputPoint.x * 0.48071813812017666 + inputPoint.y * 5.64600279073223 + -3.079416593929616) * 0.31172543126085533 + relu(inputPoint.x * -0.7832225981075905 + inputPoint.y * -2.7731251451406265 + 2.09913815640905) * 5.096485143292411 + relu(inputPoint.x * -2.974781675197763 + inputPoint.y * 1.23570971819423 + 1.3756777890719165) * 7.10392941766505 + relu(inputPoint.x * -0.44369366419787726 + inputPoint.y * -0.11694830104355931 + -0.5868361040660834) * -0.05486833558215553 + relu(inputPoint.x * -0.2184094252599168 + inputPoint.y * 0.0829996894829679 + -0.651874977063064) * 0.4227770534240487 + relu(inputPoint.x * -0.1459923773918468 + inputPoint.y * -0.5085680640373881 + -0.46693029853482115) * 0.47388309157200054 + relu(inputPoint.x * -1.7546852681735732 + inputPoint.y * -3.404192431276553 + 0.946299898910171) * -5.790417209451364 + -11.156994767807141) * -10.176256559418823 + relu(relu(inputPoint.x * -3.9098724790936124 + inputPoint.y * 6.5877941323402665 + 2.368686702187851) * 0.0363309180890725 + relu(inputPoint.x * 6.432172647285785 + inputPoint.y * 6.758582828715058 + -2.685915971643346) * -0.7202844150061066 + relu(inputPoint.x * -0.7069428002444006 + inputPoint.y * -0.4179663179954718 + -0.2638580576581051) * -0.2568299563506881 + relu(inputPoint.x * 0.48071813812017666 + inputPoint.y * 5.64600279073223 + -3.079416593929616) * -0.13506154165403517 + relu(inputPoint.x * -0.7832225981075905 + inputPoint.y * -2.7731251451406265 + 2.09913815640905) * 0.3402100537309434 + relu(inputPoint.x * -2.974781675197763 + inputPoint.y * 1.23570971819423 + 1.3756777890719165) * -0.16552241129632878 + relu(inputPoint.x * -0.44369366419787726 + inputPoint.y * -0.11694830104355931 + -0.5868361040660834) * 0.08587124920926067 + relu(inputPoint.x * -0.2184094252599168 + inputPoint.y * 0.0829996894829679 + -0.651874977063064) * -0.1563526508480724 + relu(inputPoint.x * -0.1459923773918468 + inputPoint.y * -0.5085680640373881 + -0.46693029853482115) * 0.21560281328813474 + relu(inputPoint.x * -1.7546852681735732 + inputPoint.y * -3.404192431276553 + 0.946299898910171) * -0.2770319970091263 + -1.0671449718568145) * -0.5292190465711533 + relu(relu(inputPoint.x * -3.9098724790936124 + inputPoint.y * 6.5877941323402665 + 2.368686702187851) * -7.326616501927188 + relu(inputPoint.x * 6.432172647285785 + inputPoint.y * 6.758582828715058 + -2.685915971643346) * -0.20222221991113692 + relu(inputPoint.x * -0.7069428002444006 + inputPoint.y * -0.4179663179954718 + -0.2638580576581051) * -0.009231112375571688 + relu(inputPoint.x * 0.48071813812017666 + inputPoint.y * 5.64600279073223 + -3.079416593929616) * -2.2777587735789746 + relu(inputPoint.x * -0.7832225981075905 + inputPoint.y * -2.7731251451406265 + 2.09913815640905) * 3.3475568055662923 + relu(inputPoint.x * -2.974781675197763 + inputPoint.y * 1.23570971819423 + 1.3756777890719165) * -2.029127651252222 + relu(inputPoint.x * -0.44369366419787726 + inputPoint.y * -0.11694830104355931 + -0.5868361040660834) * -0.10063077315897359 + relu(inputPoint.x * -0.2184094252599168 + inputPoint.y * 0.0829996894829679 + -0.651874977063064) * 0.4475264233657684 + relu(inputPoint.x * -0.1459923773918468 + inputPoint.y * -0.5085680640373881 + -0.46693029853482115) * -0.4754214906706969 + relu(inputPoint.x * -1.7546852681735732 + inputPoint.y * -3.404192431276553 + 0.946299898910171) * 4.271262974151653 + -2.0440211827878416) * -5.7948488265302815 + relu(relu(inputPoint.x * -3.9098724790936124 + inputPoint.y * 6.5877941323402665 + 2.368686702187851) * -0.29346858444927937 + relu(inputPoint.x * 6.432172647285785 + inputPoint.y * 6.758582828715058 + -2.685915971643346) * -0.08084372411467548 + relu(inputPoint.x * -0.7069428002444006 + inputPoint.y * -0.4179663179954718 + -0.2638580576581051) * -0.48926527440474155 + relu(inputPoint.x * 0.48071813812017666 + inputPoint.y * 5.64600279073223 + -3.079416593929616) * 0.039189758575572484 + relu(inputPoint.x * -0.7832225981075905 + inputPoint.y * -2.7731251451406265 + 2.09913815640905) * -0.3744980624996704 + relu(inputPoint.x * -2.974781675197763 + inputPoint.y * 1.23570971819423 + 1.3756777890719165) * 0.3679954147011295 + relu(inputPoint.x * -0.44369366419787726 + inputPoint.y * -0.11694830104355931 + -0.5868361040660834) * -0.2880716009562849 + relu(inputPoint.x * -0.2184094252599168 + inputPoint.y * 0.0829996894829679 + -0.651874977063064) * 0.1351338098631524 + relu(inputPoint.x * -0.1459923773918468 + inputPoint.y * -0.5085680640373881 + -0.46693029853482115) * 0.2798448700768026 + relu(inputPoint.x * -1.7546852681735732 + inputPoint.y * -3.404192431276553 + 0.946299898910171) * 0.042537165531993944 + -0.308527761074299) * -0.5788026751252913 + relu(relu(inputPoint.x * -3.9098724790936124 + inputPoint.y * 6.5877941323402665 + 2.368686702187851) * 4.6211138860398675 + relu(inputPoint.x * 6.432172647285785 + inputPoint.y * 6.758582828715058 + -2.685915971643346) * 5.262474804466237 + relu(inputPoint.x * -0.7069428002444006 + inputPoint.y * -0.4179663179954718 + -0.2638580576581051) * 0.08119151269851885 + relu(inputPoint.x * 0.48071813812017666 + inputPoint.y * 5.64600279073223 + -3.079416593929616) * 0.09272947018582901 + relu(inputPoint.x * -0.7832225981075905 + inputPoint.y * -2.7731251451406265 + 2.09913815640905) * 1.6831066195402558 + relu(inputPoint.x * -2.974781675197763 + inputPoint.y * 1.23570971819423 + 1.3756777890719165) * 1.2372180282401535 + relu(inputPoint.x * -0.44369366419787726 + inputPoint.y * -0.11694830104355931 + -0.5868361040660834) * 0.4418787310982003 + relu(inputPoint.x * -0.2184094252599168 + inputPoint.y * 0.0829996894829679 + -0.651874977063064) * -0.5303895808470298 + relu(inputPoint.x * -0.1459923773918468 + inputPoint.y * -0.5085680640373881 + -0.46693029853482115) * 0.2781065529913769 + relu(inputPoint.x * -1.7546852681735732 + inputPoint.y * -3.404192431276553 + 0.946299898910171) * -2.174415621567708 + -6.310778898203423) * 8.064119070158995 + relu(relu(inputPoint.x * -3.9098724790936124 + inputPoint.y * 6.5877941323402665 + 2.368686702187851) * -0.3055796393071795 + relu(inputPoint.x * 6.432172647285785 + inputPoint.y * 6.758582828715058 + -2.685915971643346) * -3.339930487217527 + relu(inputPoint.x * -0.7069428002444006 + inputPoint.y * -0.4179663179954718 + -0.2638580576581051) * -0.38698823587617154 + relu(inputPoint.x * 0.48071813812017666 + inputPoint.y * 5.64600279073223 + -3.079416593929616) * 7.417046301015195 + relu(inputPoint.x * -0.7832225981075905 + inputPoint.y * -2.7731251451406265 + 2.09913815640905) * -2.0433470845766593 + relu(inputPoint.x * -2.974781675197763 + inputPoint.y * 1.23570971819423 + 1.3756777890719165) * -1.0587931410157005 + relu(inputPoint.x * -0.44369366419787726 + inputPoint.y * -0.11694830104355931 + -0.5868361040660834) * 0.08071157909257774 + relu(inputPoint.x * -0.2184094252599168 + inputPoint.y * 0.0829996894829679 + -0.651874977063064) * 0.4704234356353902 + relu(inputPoint.x * -0.1459923773918468 + inputPoint.y * -0.5085680640373881 + -0.46693029853482115) * 0.46339869889798696 + relu(inputPoint.x * -1.7546852681735732 + inputPoint.y * -3.404192431276553 + 0.946299898910171) * -5.198684673100647 + 10.47657075439285) * 6.318565945176615 + relu(relu(inputPoint.x * -3.9098724790936124 + inputPoint.y * 6.5877941323402665 + 2.368686702187851) * -0.4175499886662323 + relu(inputPoint.x * 6.432172647285785 + inputPoint.y * 6.758582828715058 + -2.685915971643346) * -1.377101215680099 + relu(inputPoint.x * -0.7069428002444006 + inputPoint.y * -0.4179663179954718 + -0.2638580576581051) * 0.09782900547643203 + relu(inputPoint.x * 0.48071813812017666 + inputPoint.y * 5.64600279073223 + -3.079416593929616) * 0.15386605406095763 + relu(inputPoint.x * -0.7832225981075905 + inputPoint.y * -2.7731251451406265 + 2.09913815640905) * 0.2276706913558766 + relu(inputPoint.x * -2.974781675197763 + inputPoint.y * 1.23570971819423 + 1.3756777890719165) * 0.37070277832850207 + relu(inputPoint.x * -0.44369366419787726 + inputPoint.y * -0.11694830104355931 + -0.5868361040660834) * -0.5445765535438564 + relu(inputPoint.x * -0.2184094252599168 + inputPoint.y * 0.0829996894829679 + -0.651874977063064) * 0.20911643596196586 + relu(inputPoint.x * -0.1459923773918468 + inputPoint.y * -0.5085680640373881 + -0.46693029853482115) * 0.2317130324493055 + relu(inputPoint.x * -1.7546852681735732 + inputPoint.y * -3.404192431276553 + 0.946299898910171) * -0.16472139613437076 + -0.21314694021353067) * -2.0463919189346607 + relu(relu(inputPoint.x * -3.9098724790936124 + inputPoint.y * 6.5877941323402665 + 2.368686702187851) * 0.9710532238228565 + relu(inputPoint.x * 6.432172647285785 + inputPoint.y * 6.758582828715058 + -2.685915971643346) * -4.411234384148817 + relu(inputPoint.x * -0.7069428002444006 + inputPoint.y * -0.4179663179954718 + -0.2638580576581051) * 0.2188236292408793 + relu(inputPoint.x * 0.48071813812017666 + inputPoint.y * 5.64600279073223 + -3.079416593929616) * 6.438998541064831 + relu(inputPoint.x * -0.7832225981075905 + inputPoint.y * -2.7731251451406265 + 2.09913815640905) * 1.04694355497771 + relu(inputPoint.x * -2.974781675197763 + inputPoint.y * 1.23570971819423 + 1.3756777890719165) * 0.6906016926076171 + relu(inputPoint.x * -0.44369366419787726 + inputPoint.y * -0.11694830104355931 + -0.5868361040660834) * 0.12832541848323278 + relu(inputPoint.x * -0.2184094252599168 + inputPoint.y * 0.0829996894829679 + -0.651874977063064) * 0.5447881682144523 + relu(inputPoint.x * -0.1459923773918468 + inputPoint.y * -0.5085680640373881 + -0.46693029853482115) * -0.4115892406307407 + relu(inputPoint.x * -1.7546852681735732 + inputPoint.y * -3.404192431276553 + 0.946299898910171) * 7.153089615015678 + 7.636129130630426) * -3.801786160256335 + -1.5045394744422163);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{   
    float density = evaluateNet(vec2(fragCoord.x/iResolution.x, 1.0 -fragCoord.y/iResolution.y));
    fragColor = vec4(density, density * sin(iTime * sin(iTime) * 2.0), density * sin(iTime), 1.0);
}

void main() {
   mainImage(gl_FragColor, gl_FragCoord.xy);
}

/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec3 dir = rayDirection(45.0, iResolution.xy, fragCoord);
    vec3 eye = vec3(0.0, 0.0, 5.0);
    float dist = shortestDistanceToSurface(eye, dir, MIN_DIST, MAX_DIST);
    
    if (dist > MAX_DIST - EPSILON) {
        // Didn't hit anything
        fragColor = vec4(0.0, 0.0, 0.0, 0.0);
		return;
    }
    
    // The closest point on the surface to the eyepoint along the view ray
    vec3 p = eye + dist * dir;
    
    vec3 K_a = vec3(0.2, 0.2, 0.2);
    vec3 K_d = vec3(0.7, 0.2, 0.2);
    vec3 K_s = vec3(1.0, 1.0, 1.0);
    float shininess = 10.0;
    
    vec3 color = phongIllumination(K_a, K_d, K_s, shininess, p, eye);
    
    fragColor = vec4(color, 1.0);
}*/