uniform vec3 iResolution;
uniform float iTime;
uniform float eyeOrientation;
uniform float pos;

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float EPSILON = 0.0001;

struct Circle {
    vec2 coord;
    float r;
};


float sphereSD(vec2 p, vec2 pos, float r) { return length(pos - p) - r; }
float sceneSDF(vec2 inputPoint) {
return min(sphereSD(inputPoint, vec2(417.0, 22.0), 5.0), min(sphereSD(inputPoint, vec2(325.0, 22.0), 5.0), min(sphereSD(inputPoint, vec2(369.0, 19.0), 5.0), min(sphereSD(inputPoint, vec2(328.0, 17.0), 5.0), min(sphereSD(inputPoint, vec2(331.0, 13.0), 5.0), min(sphereSD(inputPoint, vec2(354.0, 11.0), 5.0), min(sphereSD(inputPoint, vec2(335.0, 10.0), 5.0), min(sphereSD(inputPoint, vec2(347.0, 8.0), 5.0), min(sphereSD(inputPoint, vec2(638.0, 5.0), 5.0), min(sphereSD(inputPoint, vec2(624.0, 5.0), 5.0), min(sphereSD(inputPoint, vec2(162.0, 702.0), 6.0), min(sphereSD(inputPoint, vec2(256.0, 650.0), 6.0), min(sphereSD(inputPoint, vec2(591.0, 627.0), 6.0), min(sphereSD(inputPoint, vec2(350.0, 623.0), 6.0), min(sphereSD(inputPoint, vec2(544.0, 616.0), 6.0), min(sphereSD(inputPoint, vec2(258.0, 612.0), 6.0), min(sphereSD(inputPoint, vec2(263.0, 607.0), 6.0), min(sphereSD(inputPoint, vec2(507.0, 599.0), 6.0), min(sphereSD(inputPoint, vec2(577.0, 596.0), 6.0), min(sphereSD(inputPoint, vec2(264.0, 586.0), 6.0), min(sphereSD(inputPoint, vec2(258.0, 580.0), 6.0), min(sphereSD(inputPoint, vec2(541.0, 577.0), 6.0), min(sphereSD(inputPoint, vec2(546.0, 573.0), 6.0), min(sphereSD(inputPoint, vec2(585.0, 570.0), 6.0), min(sphereSD(inputPoint, vec2(566.0, 540.0), 6.0), min(sphereSD(inputPoint, vec2(570.0, 534.0), 6.0), min(sphereSD(inputPoint, vec2(576.0, 530.0), 6.0), min(sphereSD(inputPoint, vec2(138.0, 428.0), 6.0), min(sphereSD(inputPoint, vec2(185.00000000000003, 422.99999999999994), 6.0), min(sphereSD(inputPoint, vec2(251.00000000000003, 416.0), 6.0), min(sphereSD(inputPoint, vec2(262.0, 407.00000000000006), 6.0), min(sphereSD(inputPoint, vec2(274.0, 372.00000000000006), 6.0), min(sphereSD(inputPoint, vec2(261.0, 370.00000000000006), 6.0), min(sphereSD(inputPoint, vec2(324.0, 361.0), 6.0), min(sphereSD(inputPoint, vec2(201.0, 344.0), 6.0), min(sphereSD(inputPoint, vec2(334.0, 342.0), 6.0), min(sphereSD(inputPoint, vec2(340.0, 330.0), 6.0), min(sphereSD(inputPoint, vec2(217.0, 329.0), 6.0), min(sphereSD(inputPoint, vec2(134.0, 306.0), 6.0), min(sphereSD(inputPoint, vec2(22.0, 303.0), 6.0), min(sphereSD(inputPoint, vec2(139.0, 301.0), 6.0), min(sphereSD(inputPoint, vec2(410.0, 277.0), 6.0), min(sphereSD(inputPoint, vec2(594.0, 191.99999999999997), 6.0), min(sphereSD(inputPoint, vec2(599.0, 187.00000000000003), 6.0), min(sphereSD(inputPoint, vec2(504.0, 181.0), 6.0), min(sphereSD(inputPoint, vec2(170.0, 177.0), 6.0), min(sphereSD(inputPoint, vec2(557.0, 175.0), 6.0), min(sphereSD(inputPoint, vec2(587.0, 172.0), 6.0), min(sphereSD(inputPoint, vec2(553.0, 168.0), 6.0), min(sphereSD(inputPoint, vec2(484.99999999999994, 165.0), 6.0), min(sphereSD(inputPoint, vec2(327.0, 152.0), 6.0), min(sphereSD(inputPoint, vec2(449.0, 141.0), 6.0), min(sphereSD(inputPoint, vec2(392.0, 138.0), 6.0), min(sphereSD(inputPoint, vec2(382.0, 134.0), 6.0), min(sphereSD(inputPoint, vec2(377.00000000000006, 130.0), 6.0), min(sphereSD(inputPoint, vec2(421.0, 127.0), 6.0), min(sphereSD(inputPoint, vec2(508.0, 126.0), 6.0), min(sphereSD(inputPoint, vec2(347.0, 118.0), 6.0), min(sphereSD(inputPoint, vec2(508.0, 99.0), 6.0), min(sphereSD(inputPoint, vec2(511.0, 76.0), 6.0), min(sphereSD(inputPoint, vec2(262.0, 47.99999999999999), 6.0), min(sphereSD(inputPoint, vec2(463.99999999999994, 45.0), 6.0), min(sphereSD(inputPoint, vec2(389.0, 22.0), 6.0), min(sphereSD(inputPoint, vec2(341.0, 8.0), 6.0), min(sphereSD(inputPoint, vec2(157.0, 697.0), 7.0), min(sphereSD(inputPoint, vec2(604.0, 676.0), 7.0), min(sphereSD(inputPoint, vec2(600.0, 670.0), 7.0), min(sphereSD(inputPoint, vec2(356.00000000000006, 650.0), 7.0), min(sphereSD(inputPoint, vec2(589.0, 637.0), 7.0), min(sphereSD(inputPoint, vec2(558.0, 631.0), 7.0), min(sphereSD(inputPoint, vec2(543.0, 609.0), 7.0), min(sphereSD(inputPoint, vec2(553.0, 570.0), 7.0), min(sphereSD(inputPoint, vec2(322.0, 550.0), 7.0), min(sphereSD(inputPoint, vec2(217.0, 426.99999999999994), 7.0), min(sphereSD(inputPoint, vec2(264.0, 400.0), 7.0), min(sphereSD(inputPoint, vec2(7.0, 375.0), 7.0), min(sphereSD(inputPoint, vec2(22.0, 338.0), 7.0), min(sphereSD(inputPoint, vec2(28.0, 334.0), 7.0), min(sphereSD(inputPoint, vec2(194.0, 331.0), 7.0), min(sphereSD(inputPoint, vec2(33.0, 327.0), 7.0), min(sphereSD(inputPoint, vec2(359.99999999999994, 299.0), 7.0), min(sphereSD(inputPoint, vec2(389.0, 285.0), 7.0), min(sphereSD(inputPoint, vec2(297.0, 257.0), 7.0), min(sphereSD(inputPoint, vec2(389.0, 253.0), 7.0), min(sphereSD(inputPoint, vec2(225.00000000000003, 188.00000000000003), 7.0), min(sphereSD(inputPoint, vec2(184.0, 185.00000000000003), 7.0), min(sphereSD(inputPoint, vec2(233.0, 184.00000000000003), 7.0), min(sphereSD(inputPoint, vec2(578.0, 180.0), 7.0), min(sphereSD(inputPoint, vec2(238.0, 179.0), 7.0), min(sphereSD(inputPoint, vec2(491.99999999999994, 169.0), 7.0), min(sphereSD(inputPoint, vec2(264.0, 167.0), 7.0), min(sphereSD(inputPoint, vec2(154.0, 162.0), 7.0), min(sphereSD(inputPoint, vec2(553.0, 161.0), 7.0), min(sphereSD(inputPoint, vec2(195.0, 148.0), 7.0), min(sphereSD(inputPoint, vec2(200.0, 143.0), 7.0), min(sphereSD(inputPoint, vec2(205.99999999999997, 139.0), 7.0), min(sphereSD(inputPoint, vec2(338.0, 135.0), 7.0), min(sphereSD(inputPoint, vec2(631.0, 7.0), 7.0), min(sphereSD(inputPoint, vec2(313.0, 699.0), 8.0), min(sphereSD(inputPoint, vec2(354.0, 696.0), 8.0), min(sphereSD(inputPoint, vec2(507.0, 591.0), 8.0), min(sphereSD(inputPoint, vec2(242.0, 568.0), 8.0), min(sphereSD(inputPoint, vec2(627.0, 546.0), 8.0), min(sphereSD(inputPoint, vec2(267.0, 543.0), 8.0), min(sphereSD(inputPoint, vec2(623.0, 536.0), 8.0), min(sphereSD(inputPoint, vec2(142.0, 387.99999999999994), 8.0), min(sphereSD(inputPoint, vec2(147.0, 381.0), 8.0), min(sphereSD(inputPoint, vec2(285.0, 371.0), 8.0), min(sphereSD(inputPoint, vec2(223.0, 295.0), 8.0), min(sphereSD(inputPoint, vec2(272.0, 164.0), 8.0), min(sphereSD(inputPoint, vec2(373.0, 123.0), 8.0), min(sphereSD(inputPoint, vec2(443.00000000000006, 122.0), 8.0), min(sphereSD(inputPoint, vec2(196.0, 120.0), 8.0), min(sphereSD(inputPoint, vec2(188.0, 115.00000000000001), 8.0), min(sphereSD(inputPoint, vec2(526.0, 91.0), 8.0), min(sphereSD(inputPoint, vec2(441.0, 41.0), 8.0), min(sphereSD(inputPoint, vec2(432.0, 38.0), 8.0), min(sphereSD(inputPoint, vec2(361.0, 19.0), 8.0), min(sphereSD(inputPoint, vec2(581.0, 632.0), 9.0), min(sphereSD(inputPoint, vec2(330.0, 613.0), 9.0), min(sphereSD(inputPoint, vec2(576.0, 568.0), 9.0), min(sphereSD(inputPoint, vec2(509.00000000000006, 563.0), 9.0), min(sphereSD(inputPoint, vec2(139.0, 399.0), 9.0), min(sphereSD(inputPoint, vec2(9.0, 383.99999999999994), 9.0), min(sphereSD(inputPoint, vec2(154.0, 375.0), 9.0), min(sphereSD(inputPoint, vec2(346.0, 311.0), 9.0), min(sphereSD(inputPoint, vec2(365.0, 291.0), 9.0), min(sphereSD(inputPoint, vec2(411.99999999999994, 268.0), 9.0), min(sphereSD(inputPoint, vec2(306.0, 254.0), 9.0), min(sphereSD(inputPoint, vec2(212.0, 188.99999999999997), 9.0), min(sphereSD(inputPoint, vec2(255.0, 168.0), 9.0), min(sphereSD(inputPoint, vec2(316.0, 153.0), 9.0), min(sphereSD(inputPoint, vec2(411.99999999999994, 127.0), 9.0), min(sphereSD(inputPoint, vec2(160.0, 77.0), 9.0), min(sphereSD(inputPoint, vec2(225.00000000000003, 75.0), 9.0), min(sphereSD(inputPoint, vec2(486.0, 70.0), 9.0), min(sphereSD(inputPoint, vec2(477.0, 65.0), 9.0), min(sphereSD(inputPoint, vec2(326.0, 31.0), 9.0), min(sphereSD(inputPoint, vec2(359.0, 687.0), 10.0), min(sphereSD(inputPoint, vec2(285.0, 672.0), 10.0), min(sphereSD(inputPoint, vec2(320.0, 609.0), 10.0), min(sphereSD(inputPoint, vec2(626.0, 575.0), 10.0), min(sphereSD(inputPoint, vec2(317.0, 559.0), 10.0), min(sphereSD(inputPoint, vec2(197.00000000000003, 321.0), 10.0), min(sphereSD(inputPoint, vec2(251.00000000000003, 284.0), 10.0), min(sphereSD(inputPoint, vec2(289.0, 263.0), 10.0), min(sphereSD(inputPoint, vec2(568.0, 181.0), 10.0), min(sphereSD(inputPoint, vec2(589.0, 162.0), 10.0), min(sphereSD(inputPoint, vec2(281.0, 159.0), 10.0), min(sphereSD(inputPoint, vec2(477.0, 158.0), 10.0), min(sphereSD(inputPoint, vec2(514.0, 134.0), 10.0), min(sphereSD(inputPoint, vec2(159.0, 110.0), 10.0), min(sphereSD(inputPoint, vec2(498.0, 103.0), 10.0), min(sphereSD(inputPoint, vec2(305.0, 691.0), 11.0), min(sphereSD(inputPoint, vec2(278.0, 663.0), 11.0), min(sphereSD(inputPoint, vec2(570.0, 630.0), 11.0), min(sphereSD(inputPoint, vec2(264.0, 554.0), 11.0), min(sphereSD(inputPoint, vec2(614.0, 528.0), 11.0), min(sphereSD(inputPoint, vec2(151.0, 424.99999999999994), 11.0), min(sphereSD(inputPoint, vec2(11.0, 401.0), 11.0), min(sphereSD(inputPoint, vec2(297.0, 367.0), 11.0), min(sphereSD(inputPoint, vec2(11.0, 337.0), 11.0), min(sphereSD(inputPoint, vec2(229.0, 335.0), 11.0), min(sphereSD(inputPoint, vec2(338.0, 319.0), 11.0), min(sphereSD(inputPoint, vec2(11.0, 305.0), 11.0), min(sphereSD(inputPoint, vec2(349.0, 300.0), 11.0), min(sphereSD(inputPoint, vec2(263.0, 279.0), 11.0), min(sphereSD(inputPoint, vec2(466.0, 156.0), 11.0), min(sphereSD(inputPoint, vec2(153.0, 151.0), 11.0), min(sphereSD(inputPoint, vec2(456.0, 150.0), 11.0), min(sphereSD(inputPoint, vec2(258.0, 638.0), 12.0), min(sphereSD(inputPoint, vec2(338.0, 623.0), 12.0), min(sphereSD(inputPoint, vec2(565.0, 573.0), 12.0), min(sphereSD(inputPoint, vec2(229.0, 422.0), 12.0), min(sphereSD(inputPoint, vec2(238.99999999999997, 414.0), 12.0), min(sphereSD(inputPoint, vec2(176.0, 357.0), 12.0), min(sphereSD(inputPoint, vec2(209.0, 320.0), 12.0), min(sphereSD(inputPoint, vec2(505.99999999999994, 169.0), 12.0), min(sphereSD(inputPoint, vec2(243.0, 168.0), 12.0), min(sphereSD(inputPoint, vec2(336.0, 123.0), 12.0), min(sphereSD(inputPoint, vec2(514.0, 88.0), 12.0), min(sphereSD(inputPoint, vec2(452.0, 47.99999999999999), 12.0), min(sphereSD(inputPoint, vec2(418.0, 37.0), 12.0), min(sphereSD(inputPoint, vec2(255.0, 567.0), 13.0), min(sphereSD(inputPoint, vec2(248.0, 375.0), 13.0), min(sphereSD(inputPoint, vec2(308.0, 359.0), 13.0), min(sphereSD(inputPoint, vec2(264.0, 61.0), 13.0), min(sphereSD(inputPoint, vec2(341.0, 702.0), 14.0), min(sphereSD(inputPoint, vec2(298.0, 678.0), 14.0), min(sphereSD(inputPoint, vec2(363.00000000000006, 673.0), 14.0), min(sphereSD(inputPoint, vec2(512.0, 577.0), 14.0), min(sphereSD(inputPoint, vec2(624.0, 561.0), 14.0), min(sphereSD(inputPoint, vec2(142.0, 414.0), 14.0), min(sphereSD(inputPoint, vec2(168.0, 370.00000000000006), 14.0), min(sphereSD(inputPoint, vec2(186.99999999999997, 348.0), 14.0), min(sphereSD(inputPoint, vec2(198.99999999999997, 182.0), 14.0), min(sphereSD(inputPoint, vec2(238.0, 296.0), 15.0), min(sphereSD(inputPoint, vec2(278.0, 276.0), 15.0), min(sphereSD(inputPoint, vec2(321.0, 255.0), 15.0), min(sphereSD(inputPoint, vec2(169.0, 162.0), 15.0), min(sphereSD(inputPoint, vec2(174.0, 105.0), 15.0), min(sphereSD(inputPoint, vec2(462.0, 61.0), 15.0), min(sphereSD(inputPoint, vec2(277.0, 52.0), 15.0), min(sphereSD(inputPoint, vec2(272.0, 647.0), 16.0), min(sphereSD(inputPoint, vec2(344.0, 639.0), 16.0), min(sphereSD(inputPoint, vec2(318.0, 346.0), 16.0), min(sphereSD(inputPoint, vec2(403.0, 30.0), 16.0), min(sphereSD(inputPoint, vec2(606.0, 635.0), 17.0), min(sphereSD(inputPoint, vec2(247.0, 399.0), 17.0), min(sphereSD(inputPoint, vec2(17.0, 321.0), 17.0), min(sphereSD(inputPoint, vec2(395.0, 269.0), 17.0), min(sphereSD(inputPoint, vec2(321.0, 136.0), 17.0), min(sphereSD(inputPoint, vec2(497.0, 86.0), 17.0), min(sphereSD(inputPoint, vec2(295.0, 47.99999999999999), 17.0), min(sphereSD(inputPoint, vec2(322.0, 328.0), 18.0), min(sphereSD(inputPoint, vec2(571.0, 163.0), 18.0), min(sphereSD(inputPoint, vec2(344.0, 26.0), 18.0), min(sphereSD(inputPoint, vec2(563.0, 612.0), 19.0), min(sphereSD(inputPoint, vec2(526.0, 591.0), 19.0), min(sphereSD(inputPoint, vec2(229.0, 314.0), 19.0), min(sphereSD(inputPoint, vec2(188.0, 166.0), 19.0), min(sphereSD(inputPoint, vec2(178.00000000000003, 86.0), 19.0), min(sphereSD(inputPoint, vec2(276.0, 570.0), 20.0), min(sphereSD(inputPoint, vec2(394.00000000000006, 118.0), 20.0), min(sphereSD(inputPoint, vec2(556.0, 592.0), 21.0), min(sphereSD(inputPoint, vec2(606.0, 549.0), 21.0), min(sphereSD(inputPoint, vec2(585.0, 549.0), 21.0), min(sphereSD(inputPoint, vec2(238.99999999999997, 356.0), 21.0), min(sphereSD(inputPoint, vec2(498.99999999999994, 149.0), 21.0), min(sphereSD(inputPoint, vec2(276.0, 625.0), 22.0), min(sphereSD(inputPoint, vec2(296.0, 142.0), 22.0), min(sphereSD(inputPoint, vec2(299.0, 598.0), 23.0), min(sphereSD(inputPoint, vec2(299.0, 575.0), 23.0), min(sphereSD(inputPoint, vec2(372.0, 269.0), 23.0), min(sphereSD(inputPoint, vec2(321.0, 54.0), 23.0), min(sphereSD(inputPoint, vec2(217.0, 163.0), 26.0), min(sphereSD(inputPoint, vec2(205.0, 94.00000000000001), 27.0), min(sphereSD(inputPoint, vec2(167.0, 401.0), 28.0), min(sphereSD(inputPoint, vec2(344.0, 272.0), 28.0), min(sphereSD(inputPoint, vec2(477.0, 127.0), 31.0), min(sphereSD(inputPoint, vec2(331.0, 671.0), 32.0), min(sphereSD(inputPoint, vec2(465.0, 95.99999999999999), 33.0), min(sphereSD(inputPoint, vec2(308.0, 643.0), 36.0), min(sphereSD(inputPoint, vec2(312.0, 292.0), 37.0), min(sphereSD(inputPoint, vec2(207.0, 385.99999999999994), 42.0), min(sphereSD(inputPoint, vec2(422.00000000000006, 82.0), 45.0), min(sphereSD(inputPoint, vec2(275.0, 325.0), 47.0), min(sphereSD(inputPoint, vec2(298.0, 94.99999999999999), 47.0), min(sphereSD(inputPoint, vec2(252.0, 118.0), 50.0), sphereSD(inputPoint, vec2(371.0, 71.0), 52.0))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
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
float shortestDistanceToSurface(vec2 eye, vec2 marchingDirection, float start, float end) {
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

vec2 rayDirection(vec2 fragCoord, vec2 eye) {
   // vec2 xy = fragCoord - size / 2.0;
  //  float z = size.y / tan(radians(fieldOfView) / 2.0);
   // return normalize(xy);
   return normalize(fragCoord - eye);
}

/**
 * Using the gradient of the SDF, estimate the normal on the surface at point p.
 *//*
vec3 estimateNormal(vec3 p) {
    return normalize(vec3(
        sceneSDF(vec3(p.x + EPSILON, p.y, p.z)) - sceneSDF(vec3(p.x - EPSILON, p.y, p.z)),
        sceneSDF(vec3(p.x, p.y + EPSILON, p.z)) - sceneSDF(vec3(p.x, p.y - EPSILON, p.z)),
        sceneSDF(vec3(p.x, p.y, p.z  + EPSILON)) - sceneSDF(vec3(p.x, p.y, p.z - EPSILON))
    ));
}*/

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 eye = vec2(iResolution.x/2.0, iResolution.y/2.0);
    // Paint the eye with color red. 
    if (length(fragCoord - eye) < 4.0) {
        fragColor = vec4(1.0, 0.0, 0.0, 1.0);
        return;
    }
    mat2 orientation;
    orientation[0] = vec2(cos(iTime), -sin(iTime));
    orientation[1] = vec2(sin(iTime), cos(iTime));
    vec2 viewDir = orientation * vec2(1.0, 0.0);
    float fov = 45.0;
	vec2 rayDir  = rayDirection(fragCoord, eye);
    float raySimilarity = dot(rayDir, viewDir);
    float nearPlane = 10.0;
    if (raySimilarity < cos(radians(fov)/2.0)) {
        fragColor = vec4(0.01, 0.95, 0.95, 0.0);
        return;
    }

    //float dist = shortestDistanceToSurface(eye, rayDir, MIN_DIST, MAX_DIST);
    float dist = sceneSDF(vec2(fragCoord.x/iResolution.x, fragCoord.y/iResolution.y));
    if (abs(dist) < 1.0) {
        fragColor = vec4(0.0,0.0,0.0, 1.0);
        return;
    }

    if (dist > MAX_DIST - EPSILON) {
        // Didn't hit anything
        fragColor = vec4(viewDir, 0.7, 0.0);
		return;
    }
    //n
    fragColor = vec4(1.0, dist, 0.0, 1.0);
}


void sampleRaymarcher(out vec4 fragColor, in vec2 fragCoord) {
    float dist = sceneSDF(fragCoord);
    fragColor = vec4(-dist, dist, 0.0, 1.0);
    if (abs(dist) < EPSILON) {
        fragColor = vec4(0.1, 0.0, 1.0, 1.0);
    }
}

void main() {
   //mainImage(gl_FragColor, gl_FragCoord.xy);
   sampleRaymarcher(gl_FragColor, gl_FragCoord.xy);
}