class RaymarcherMaterial extends Material {
  compile(fragmentShader) {
    let nodes = [{
			bbox:new THREE.Vector3(64.0,64.0,64.0),
			center: new THREE.Vector3(64.0,64.0,64.0),
			depth: 0
		},{
			bbox:new THREE.Vector3(32.0,32.0,32.0),
			center: new THREE.Vector3(32.0,32.0,32.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(32.0,32.0,32.0),
			center: new THREE.Vector3(32.0,32.0,96.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(32.0,32.0,32.0),
			center: new THREE.Vector3(32.0,96.0,32.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(32.0,32.0,32.0),
			center: new THREE.Vector3(32.0,96.0,96.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(32.0,32.0,32.0),
			center: new THREE.Vector3(96.0,32.0,32.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(32.0,32.0,32.0),
			center: new THREE.Vector3(96.0,32.0,96.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(32.0,32.0,32.0),
			center: new THREE.Vector3(96.0,96.0,32.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(32.0,32.0,32.0),
			center: new THREE.Vector3(96.0,96.0,96.0),
			depth: 1
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,16.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,16.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,48.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,48.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,16.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,16.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,48.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,48.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,16.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,16.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,48.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,48.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,16.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,16.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,48.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,48.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,80.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,80.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,112.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,112.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,80.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,80.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,112.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,112.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,80.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,80.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,112.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(16.0,112.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,80.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,80.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,112.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(48.0,112.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,16.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,16.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,48.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,48.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,16.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,16.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,48.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,48.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,16.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,16.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,48.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,48.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,16.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,16.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,48.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,48.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,80.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,80.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,112.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,112.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,80.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,80.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,112.0,16.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,112.0,48.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,80.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,80.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,112.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(80.0,112.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,80.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,80.0,112.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,112.0,80.0),
			depth: 2
		},{
			bbox:new THREE.Vector3(16.0,16.0,16.0),
			center: new THREE.Vector3(112.0,112.0,112.0),
			depth: 2
		}];
    let leaf_data = [{
			start_sdf1: 0,
			start_sdf2: 20,
			start_sdf3: 20,
			start_sdf4: 20,
			end_sdf: 20
		},{
			start_sdf1: 20,
			start_sdf2: 40,
			start_sdf3: 40,
			start_sdf4: 40,
			end_sdf: 40
		},{
			start_sdf1: 40,
			start_sdf2: 40,
			start_sdf3: 60,
			start_sdf4: 60,
			end_sdf: 60
		},{
			start_sdf1: 60,
			start_sdf2: 60,
			start_sdf3: 80,
			start_sdf4: 80,
			end_sdf: 80
		},{
			start_sdf1: 80,
			start_sdf2: 100,
			start_sdf3: 100,
			start_sdf4: 100,
			end_sdf: 100
		},{
			start_sdf1: 100,
			start_sdf2: 120,
			start_sdf3: 120,
			start_sdf4: 120,
			end_sdf: 120
		},{
			start_sdf1: 120,
			start_sdf2: 120,
			start_sdf3: 140,
			start_sdf4: 140,
			end_sdf: 140
		},{
			start_sdf1: 140,
			start_sdf2: 140,
			start_sdf3: 160,
			start_sdf4: 160,
			end_sdf: 160
		},{
			start_sdf1: 160,
			start_sdf2: 180,
			start_sdf3: 180,
			start_sdf4: 180,
			end_sdf: 180
		},{
			start_sdf1: 180,
			start_sdf2: 200,
			start_sdf3: 200,
			start_sdf4: 200,
			end_sdf: 200
		},{
			start_sdf1: 200,
			start_sdf2: 200,
			start_sdf3: 220,
			start_sdf4: 220,
			end_sdf: 220
		},{
			start_sdf1: 220,
			start_sdf2: 220,
			start_sdf3: 240,
			start_sdf4: 240,
			end_sdf: 240
		},{
			start_sdf1: 240,
			start_sdf2: 260,
			start_sdf3: 260,
			start_sdf4: 260,
			end_sdf: 260
		},{
			start_sdf1: 260,
			start_sdf2: 280,
			start_sdf3: 280,
			start_sdf4: 280,
			end_sdf: 280
		},{
			start_sdf1: 280,
			start_sdf2: 280,
			start_sdf3: 300,
			start_sdf4: 300,
			end_sdf: 300
		},{
			start_sdf1: 300,
			start_sdf2: 300,
			start_sdf3: 320,
			start_sdf4: 320,
			end_sdf: 320
		},{
			start_sdf1: 320,
			start_sdf2: 320,
			start_sdf3: 320,
			start_sdf4: 340,
			end_sdf: 340
		},{
			start_sdf1: 340,
			start_sdf2: 340,
			start_sdf3: 340,
			start_sdf4: 360,
			end_sdf: 360
		},{
			start_sdf1: 360,
			start_sdf2: 360,
			start_sdf3: 360,
			start_sdf4: 360,
			end_sdf: 380
		},{
			start_sdf1: 380,
			start_sdf2: 380,
			start_sdf3: 380,
			start_sdf4: 380,
			end_sdf: 400
		},{
			start_sdf1: 400,
			start_sdf2: 400,
			start_sdf3: 400,
			start_sdf4: 420,
			end_sdf: 420
		},{
			start_sdf1: 420,
			start_sdf2: 420,
			start_sdf3: 420,
			start_sdf4: 440,
			end_sdf: 440
		},{
			start_sdf1: 440,
			start_sdf2: 440,
			start_sdf3: 440,
			start_sdf4: 440,
			end_sdf: 460
		},{
			start_sdf1: 460,
			start_sdf2: 460,
			start_sdf3: 460,
			start_sdf4: 460,
			end_sdf: 480
		},{
			start_sdf1: 480,
			start_sdf2: 480,
			start_sdf3: 480,
			start_sdf4: 500,
			end_sdf: 500
		},{
			start_sdf1: 500,
			start_sdf2: 500,
			start_sdf3: 500,
			start_sdf4: 520,
			end_sdf: 520
		},{
			start_sdf1: 520,
			start_sdf2: 520,
			start_sdf3: 520,
			start_sdf4: 520,
			end_sdf: 540
		},{
			start_sdf1: 540,
			start_sdf2: 540,
			start_sdf3: 540,
			start_sdf4: 540,
			end_sdf: 560
		},{
			start_sdf1: 560,
			start_sdf2: 560,
			start_sdf3: 560,
			start_sdf4: 580,
			end_sdf: 580
		},{
			start_sdf1: 580,
			start_sdf2: 580,
			start_sdf3: 580,
			start_sdf4: 600,
			end_sdf: 600
		},{
			start_sdf1: 600,
			start_sdf2: 600,
			start_sdf3: 600,
			start_sdf4: 600,
			end_sdf: 620
		},{
			start_sdf1: 620,
			start_sdf2: 620,
			start_sdf3: 620,
			start_sdf4: 620,
			end_sdf: 640
		},{
			start_sdf1: 640,
			start_sdf2: 660,
			start_sdf3: 660,
			start_sdf4: 660,
			end_sdf: 660
		},{
			start_sdf1: 660,
			start_sdf2: 680,
			start_sdf3: 680,
			start_sdf4: 680,
			end_sdf: 680
		},{
			start_sdf1: 680,
			start_sdf2: 680,
			start_sdf3: 700,
			start_sdf4: 700,
			end_sdf: 700
		},{
			start_sdf1: 700,
			start_sdf2: 700,
			start_sdf3: 720,
			start_sdf4: 720,
			end_sdf: 720
		},{
			start_sdf1: 720,
			start_sdf2: 740,
			start_sdf3: 740,
			start_sdf4: 740,
			end_sdf: 740
		},{
			start_sdf1: 740,
			start_sdf2: 760,
			start_sdf3: 760,
			start_sdf4: 760,
			end_sdf: 760
		},{
			start_sdf1: 760,
			start_sdf2: 760,
			start_sdf3: 780,
			start_sdf4: 780,
			end_sdf: 780
		},{
			start_sdf1: 780,
			start_sdf2: 780,
			start_sdf3: 800,
			start_sdf4: 800,
			end_sdf: 800
		},{
			start_sdf1: 800,
			start_sdf2: 820,
			start_sdf3: 820,
			start_sdf4: 820,
			end_sdf: 820
		},{
			start_sdf1: 820,
			start_sdf2: 840,
			start_sdf3: 840,
			start_sdf4: 840,
			end_sdf: 840
		},{
			start_sdf1: 840,
			start_sdf2: 840,
			start_sdf3: 860,
			start_sdf4: 860,
			end_sdf: 860
		},{
			start_sdf1: 860,
			start_sdf2: 860,
			start_sdf3: 880,
			start_sdf4: 880,
			end_sdf: 880
		},{
			start_sdf1: 880,
			start_sdf2: 900,
			start_sdf3: 900,
			start_sdf4: 900,
			end_sdf: 900
		},{
			start_sdf1: 900,
			start_sdf2: 920,
			start_sdf3: 920,
			start_sdf4: 920,
			end_sdf: 920
		},{
			start_sdf1: 920,
			start_sdf2: 920,
			start_sdf3: 940,
			start_sdf4: 940,
			end_sdf: 940
		},{
			start_sdf1: 940,
			start_sdf2: 940,
			start_sdf3: 960,
			start_sdf4: 960,
			end_sdf: 960
		},{
			start_sdf1: 960,
			start_sdf2: 960,
			start_sdf3: 960,
			start_sdf4: 980,
			end_sdf: 980
		},{
			start_sdf1: 980,
			start_sdf2: 980,
			start_sdf3: 980,
			start_sdf4: 1000,
			end_sdf: 1000
		},{
			start_sdf1: 1000,
			start_sdf2: 1000,
			start_sdf3: 1000,
			start_sdf4: 1000,
			end_sdf: 1020
		},{
			start_sdf1: 1020,
			start_sdf2: 1020,
			start_sdf3: 1020,
			start_sdf4: 1020,
			end_sdf: 1040
		},{
			start_sdf1: 1040,
			start_sdf2: 1040,
			start_sdf3: 1040,
			start_sdf4: 1060,
			end_sdf: 1060
		},{
			start_sdf1: 1060,
			start_sdf2: 1060,
			start_sdf3: 1060,
			start_sdf4: 1080,
			end_sdf: 1080
		},{
			start_sdf1: 1080,
			start_sdf2: 1080,
			start_sdf3: 1080,
			start_sdf4: 1080,
			end_sdf: 1100
		},{
			start_sdf1: 1100,
			start_sdf2: 1100,
			start_sdf3: 1100,
			start_sdf4: 1100,
			end_sdf: 1120
		},{
			start_sdf1: 1120,
			start_sdf2: 1120,
			start_sdf3: 1120,
			start_sdf4: 1140,
			end_sdf: 1140
		},{
			start_sdf1: 1140,
			start_sdf2: 1140,
			start_sdf3: 1140,
			start_sdf4: 1160,
			end_sdf: 1160
		},{
			start_sdf1: 1160,
			start_sdf2: 1160,
			start_sdf3: 1160,
			start_sdf4: 1160,
			end_sdf: 1180
		},{
			start_sdf1: 1180,
			start_sdf2: 1180,
			start_sdf3: 1180,
			start_sdf4: 1180,
			end_sdf: 1200
		},{
			start_sdf1: 1200,
			start_sdf2: 1200,
			start_sdf3: 1200,
			start_sdf4: 1220,
			end_sdf: 1220
		},{
			start_sdf1: 1220,
			start_sdf2: 1220,
			start_sdf3: 1220,
			start_sdf4: 1240,
			end_sdf: 1240
		},{
			start_sdf1: 1240,
			start_sdf2: 1240,
			start_sdf3: 1240,
			start_sdf4: 1240,
			end_sdf: 1260
		},{
			start_sdf1: 1260,
			start_sdf2: 1260,
			start_sdf3: 1260,
			start_sdf4: 1260,
			end_sdf: 1280
		}]

    const data = new Float32Array( 4 * 1280);
    data[0] = 16.0; data[1] = 0.0; data[2] = 0.0; data[3] = 16.0;
data[4] = 15.0; data[5] = 26.0; data[6] = 11.0; data[7] = 16.0;
data[8] = 15.0; data[9] = 25.0; data[10] = 31.0; data[11] = 16.0;
data[12] = 16.0; data[13] = 10.0; data[14] = 25.0; data[15] = 16.0;
data[16] = 21.0; data[17] = 16.0; data[18] = 0.0; data[19] = 11.0;
data[20] = 10.0; data[21] = 15.0; data[22] = 0.0; data[23] = 11.0;
data[24] = 22.0; data[25] = 11.0; data[26] = 10.0; data[27] = 10.0;
data[28] = 8.0; data[29] = 11.0; data[30] = 11.0; data[31] = 9.0;
data[32] = 24.0; data[33] = 1.0; data[34] = 14.0; data[35] = 8.0;
data[36] = 8.0; data[37] = 1.0; data[38] = 14.0; data[39] = 8.0;
data[40] = 26.0; data[41] = 30.0; data[42] = 0.0; data[43] = 5.0;
data[44] = 27.0; data[45] = 0.0; data[46] = 31.0; data[47] = 5.0;
data[48] = 27.0; data[49] = 21.0; data[50] = 21.0; data[51] = 5.0;
data[52] = 5.0; data[53] = 0.0; data[54] = 31.0; data[55] = 5.0;
data[56] = 4.0; data[57] = 31.0; data[58] = 0.0; data[59] = 5.0;
data[60] = 28.0; data[61] = 17.0; data[62] = 16.0; data[63] = 4.0;
data[64] = 28.0; data[65] = 26.0; data[66] = 21.0; data[67] = 4.0;
data[68] = 28.0; data[69] = 25.0; data[70] = 0.0; data[71] = 4.0;
data[72] = 28.0; data[73] = 0.0; data[74] = 21.0; data[75] = 4.0;
data[76] = 27.0; data[77] = 31.0; data[78] = 21.0; data[79] = 4.0;
data[80] = 16.0; data[81] = 0.0; data[82] = 32.0; data[83] = 16.0;
data[84] = 15.0; data[85] = 26.0; data[86] = 43.0; data[87] = 16.0;
data[88] = 15.0; data[89] = 25.0; data[90] = 63.0; data[91] = 16.0;
data[92] = 16.0; data[93] = 10.0; data[94] = 57.0; data[95] = 16.0;
data[96] = 21.0; data[97] = 16.0; data[98] = 32.0; data[99] = 11.0;
data[100] = 10.0; data[101] = 15.0; data[102] = 32.0; data[103] = 11.0;
data[104] = 22.0; data[105] = 11.0; data[106] = 42.0; data[107] = 10.0;
data[108] = 8.0; data[109] = 11.0; data[110] = 43.0; data[111] = 9.0;
data[112] = 24.0; data[113] = 1.0; data[114] = 46.0; data[115] = 8.0;
data[116] = 8.0; data[117] = 1.0; data[118] = 46.0; data[119] = 8.0;
data[120] = 26.0; data[121] = 30.0; data[122] = 32.0; data[123] = 5.0;
data[124] = 27.0; data[125] = 0.0; data[126] = 63.0; data[127] = 5.0;
data[128] = 27.0; data[129] = 21.0; data[130] = 53.0; data[131] = 5.0;
data[132] = 5.0; data[133] = 0.0; data[134] = 63.0; data[135] = 5.0;
data[136] = 4.0; data[137] = 31.0; data[138] = 32.0; data[139] = 5.0;
data[140] = 28.0; data[141] = 17.0; data[142] = 48.0; data[143] = 4.0;
data[144] = 28.0; data[145] = 26.0; data[146] = 53.0; data[147] = 4.0;
data[148] = 28.0; data[149] = 25.0; data[150] = 32.0; data[151] = 4.0;
data[152] = 28.0; data[153] = 0.0; data[154] = 53.0; data[155] = 4.0;
data[156] = 27.0; data[157] = 31.0; data[158] = 53.0; data[159] = 4.0;
data[160] = 16.0; data[161] = 32.0; data[162] = 0.0; data[163] = 16.0;
data[164] = 15.0; data[165] = 58.0; data[166] = 11.0; data[167] = 16.0;
data[168] = 15.0; data[169] = 57.0; data[170] = 31.0; data[171] = 16.0;
data[172] = 16.0; data[173] = 42.0; data[174] = 25.0; data[175] = 16.0;
data[176] = 21.0; data[177] = 48.0; data[178] = 0.0; data[179] = 11.0;
data[180] = 10.0; data[181] = 47.0; data[182] = 0.0; data[183] = 11.0;
data[184] = 22.0; data[185] = 43.0; data[186] = 10.0; data[187] = 10.0;
data[188] = 8.0; data[189] = 43.0; data[190] = 11.0; data[191] = 9.0;
data[192] = 24.0; data[193] = 33.0; data[194] = 14.0; data[195] = 8.0;
data[196] = 8.0; data[197] = 33.0; data[198] = 14.0; data[199] = 8.0;
data[200] = 26.0; data[201] = 62.0; data[202] = 0.0; data[203] = 5.0;
data[204] = 27.0; data[205] = 32.0; data[206] = 31.0; data[207] = 5.0;
data[208] = 27.0; data[209] = 53.0; data[210] = 21.0; data[211] = 5.0;
data[212] = 5.0; data[213] = 32.0; data[214] = 31.0; data[215] = 5.0;
data[216] = 4.0; data[217] = 63.0; data[218] = 0.0; data[219] = 5.0;
data[220] = 28.0; data[221] = 49.0; data[222] = 16.0; data[223] = 4.0;
data[224] = 28.0; data[225] = 58.0; data[226] = 21.0; data[227] = 4.0;
data[228] = 28.0; data[229] = 57.0; data[230] = 0.0; data[231] = 4.0;
data[232] = 28.0; data[233] = 32.0; data[234] = 21.0; data[235] = 4.0;
data[236] = 27.0; data[237] = 63.0; data[238] = 21.0; data[239] = 4.0;
data[240] = 16.0; data[241] = 32.0; data[242] = 32.0; data[243] = 16.0;
data[244] = 15.0; data[245] = 58.0; data[246] = 43.0; data[247] = 16.0;
data[248] = 15.0; data[249] = 57.0; data[250] = 63.0; data[251] = 16.0;
data[252] = 16.0; data[253] = 42.0; data[254] = 57.0; data[255] = 16.0;
data[256] = 21.0; data[257] = 48.0; data[258] = 32.0; data[259] = 11.0;
data[260] = 10.0; data[261] = 47.0; data[262] = 32.0; data[263] = 11.0;
data[264] = 22.0; data[265] = 43.0; data[266] = 42.0; data[267] = 10.0;
data[268] = 8.0; data[269] = 43.0; data[270] = 43.0; data[271] = 9.0;
data[272] = 24.0; data[273] = 33.0; data[274] = 46.0; data[275] = 8.0;
data[276] = 8.0; data[277] = 33.0; data[278] = 46.0; data[279] = 8.0;
data[280] = 26.0; data[281] = 62.0; data[282] = 32.0; data[283] = 5.0;
data[284] = 27.0; data[285] = 32.0; data[286] = 63.0; data[287] = 5.0;
data[288] = 27.0; data[289] = 53.0; data[290] = 53.0; data[291] = 5.0;
data[292] = 5.0; data[293] = 32.0; data[294] = 63.0; data[295] = 5.0;
data[296] = 4.0; data[297] = 63.0; data[298] = 32.0; data[299] = 5.0;
data[300] = 28.0; data[301] = 49.0; data[302] = 48.0; data[303] = 4.0;
data[304] = 28.0; data[305] = 58.0; data[306] = 53.0; data[307] = 4.0;
data[308] = 28.0; data[309] = 57.0; data[310] = 32.0; data[311] = 4.0;
data[312] = 28.0; data[313] = 32.0; data[314] = 53.0; data[315] = 4.0;
data[316] = 27.0; data[317] = 63.0; data[318] = 53.0; data[319] = 4.0;
data[320] = 48.0; data[321] = 0.0; data[322] = 0.0; data[323] = 16.0;
data[324] = 47.0; data[325] = 26.0; data[326] = 11.0; data[327] = 16.0;
data[328] = 47.0; data[329] = 25.0; data[330] = 31.0; data[331] = 16.0;
data[332] = 48.0; data[333] = 10.0; data[334] = 25.0; data[335] = 16.0;
data[336] = 53.0; data[337] = 16.0; data[338] = 0.0; data[339] = 11.0;
data[340] = 42.0; data[341] = 15.0; data[342] = 0.0; data[343] = 11.0;
data[344] = 54.0; data[345] = 11.0; data[346] = 10.0; data[347] = 10.0;
data[348] = 40.0; data[349] = 11.0; data[350] = 11.0; data[351] = 9.0;
data[352] = 56.0; data[353] = 1.0; data[354] = 14.0; data[355] = 8.0;
data[356] = 40.0; data[357] = 1.0; data[358] = 14.0; data[359] = 8.0;
data[360] = 58.0; data[361] = 30.0; data[362] = 0.0; data[363] = 5.0;
data[364] = 59.0; data[365] = 0.0; data[366] = 31.0; data[367] = 5.0;
data[368] = 59.0; data[369] = 21.0; data[370] = 21.0; data[371] = 5.0;
data[372] = 37.0; data[373] = 0.0; data[374] = 31.0; data[375] = 5.0;
data[376] = 36.0; data[377] = 31.0; data[378] = 0.0; data[379] = 5.0;
data[380] = 60.0; data[381] = 17.0; data[382] = 16.0; data[383] = 4.0;
data[384] = 60.0; data[385] = 26.0; data[386] = 21.0; data[387] = 4.0;
data[388] = 60.0; data[389] = 25.0; data[390] = 0.0; data[391] = 4.0;
data[392] = 60.0; data[393] = 0.0; data[394] = 21.0; data[395] = 4.0;
data[396] = 59.0; data[397] = 31.0; data[398] = 21.0; data[399] = 4.0;
data[400] = 48.0; data[401] = 0.0; data[402] = 32.0; data[403] = 16.0;
data[404] = 47.0; data[405] = 26.0; data[406] = 43.0; data[407] = 16.0;
data[408] = 47.0; data[409] = 25.0; data[410] = 63.0; data[411] = 16.0;
data[412] = 48.0; data[413] = 10.0; data[414] = 57.0; data[415] = 16.0;
data[416] = 53.0; data[417] = 16.0; data[418] = 32.0; data[419] = 11.0;
data[420] = 42.0; data[421] = 15.0; data[422] = 32.0; data[423] = 11.0;
data[424] = 54.0; data[425] = 11.0; data[426] = 42.0; data[427] = 10.0;
data[428] = 40.0; data[429] = 11.0; data[430] = 43.0; data[431] = 9.0;
data[432] = 56.0; data[433] = 1.0; data[434] = 46.0; data[435] = 8.0;
data[436] = 40.0; data[437] = 1.0; data[438] = 46.0; data[439] = 8.0;
data[440] = 58.0; data[441] = 30.0; data[442] = 32.0; data[443] = 5.0;
data[444] = 59.0; data[445] = 0.0; data[446] = 63.0; data[447] = 5.0;
data[448] = 59.0; data[449] = 21.0; data[450] = 53.0; data[451] = 5.0;
data[452] = 37.0; data[453] = 0.0; data[454] = 63.0; data[455] = 5.0;
data[456] = 36.0; data[457] = 31.0; data[458] = 32.0; data[459] = 5.0;
data[460] = 60.0; data[461] = 17.0; data[462] = 48.0; data[463] = 4.0;
data[464] = 60.0; data[465] = 26.0; data[466] = 53.0; data[467] = 4.0;
data[468] = 60.0; data[469] = 25.0; data[470] = 32.0; data[471] = 4.0;
data[472] = 60.0; data[473] = 0.0; data[474] = 53.0; data[475] = 4.0;
data[476] = 59.0; data[477] = 31.0; data[478] = 53.0; data[479] = 4.0;
data[480] = 48.0; data[481] = 32.0; data[482] = 0.0; data[483] = 16.0;
data[484] = 47.0; data[485] = 58.0; data[486] = 11.0; data[487] = 16.0;
data[488] = 47.0; data[489] = 57.0; data[490] = 31.0; data[491] = 16.0;
data[492] = 48.0; data[493] = 42.0; data[494] = 25.0; data[495] = 16.0;
data[496] = 53.0; data[497] = 48.0; data[498] = 0.0; data[499] = 11.0;
data[500] = 42.0; data[501] = 47.0; data[502] = 0.0; data[503] = 11.0;
data[504] = 54.0; data[505] = 43.0; data[506] = 10.0; data[507] = 10.0;
data[508] = 40.0; data[509] = 43.0; data[510] = 11.0; data[511] = 9.0;
data[512] = 56.0; data[513] = 33.0; data[514] = 14.0; data[515] = 8.0;
data[516] = 40.0; data[517] = 33.0; data[518] = 14.0; data[519] = 8.0;
data[520] = 58.0; data[521] = 62.0; data[522] = 0.0; data[523] = 5.0;
data[524] = 59.0; data[525] = 32.0; data[526] = 31.0; data[527] = 5.0;
data[528] = 59.0; data[529] = 53.0; data[530] = 21.0; data[531] = 5.0;
data[532] = 37.0; data[533] = 32.0; data[534] = 31.0; data[535] = 5.0;
data[536] = 36.0; data[537] = 63.0; data[538] = 0.0; data[539] = 5.0;
data[540] = 60.0; data[541] = 49.0; data[542] = 16.0; data[543] = 4.0;
data[544] = 60.0; data[545] = 58.0; data[546] = 21.0; data[547] = 4.0;
data[548] = 60.0; data[549] = 57.0; data[550] = 0.0; data[551] = 4.0;
data[552] = 60.0; data[553] = 32.0; data[554] = 21.0; data[555] = 4.0;
data[556] = 59.0; data[557] = 63.0; data[558] = 21.0; data[559] = 4.0;
data[560] = 48.0; data[561] = 32.0; data[562] = 32.0; data[563] = 16.0;
data[564] = 47.0; data[565] = 58.0; data[566] = 43.0; data[567] = 16.0;
data[568] = 47.0; data[569] = 57.0; data[570] = 63.0; data[571] = 16.0;
data[572] = 48.0; data[573] = 42.0; data[574] = 57.0; data[575] = 16.0;
data[576] = 53.0; data[577] = 48.0; data[578] = 32.0; data[579] = 11.0;
data[580] = 42.0; data[581] = 47.0; data[582] = 32.0; data[583] = 11.0;
data[584] = 54.0; data[585] = 43.0; data[586] = 42.0; data[587] = 10.0;
data[588] = 40.0; data[589] = 43.0; data[590] = 43.0; data[591] = 9.0;
data[592] = 56.0; data[593] = 33.0; data[594] = 46.0; data[595] = 8.0;
data[596] = 40.0; data[597] = 33.0; data[598] = 46.0; data[599] = 8.0;
data[600] = 58.0; data[601] = 62.0; data[602] = 32.0; data[603] = 5.0;
data[604] = 59.0; data[605] = 32.0; data[606] = 63.0; data[607] = 5.0;
data[608] = 59.0; data[609] = 53.0; data[610] = 53.0; data[611] = 5.0;
data[612] = 37.0; data[613] = 32.0; data[614] = 63.0; data[615] = 5.0;
data[616] = 36.0; data[617] = 63.0; data[618] = 32.0; data[619] = 5.0;
data[620] = 60.0; data[621] = 49.0; data[622] = 48.0; data[623] = 4.0;
data[624] = 60.0; data[625] = 58.0; data[626] = 53.0; data[627] = 4.0;
data[628] = 60.0; data[629] = 57.0; data[630] = 32.0; data[631] = 4.0;
data[632] = 60.0; data[633] = 32.0; data[634] = 53.0; data[635] = 4.0;
data[636] = 59.0; data[637] = 63.0; data[638] = 53.0; data[639] = 4.0;
data[640] = 16.0; data[641] = 0.0; data[642] = 64.0; data[643] = 16.0;
data[644] = 15.0; data[645] = 26.0; data[646] = 75.0; data[647] = 16.0;
data[648] = 15.0; data[649] = 25.0; data[650] = 95.0; data[651] = 16.0;
data[652] = 16.0; data[653] = 10.0; data[654] = 89.0; data[655] = 16.0;
data[656] = 21.0; data[657] = 16.0; data[658] = 64.0; data[659] = 11.0;
data[660] = 10.0; data[661] = 15.0; data[662] = 64.0; data[663] = 11.0;
data[664] = 22.0; data[665] = 11.0; data[666] = 74.0; data[667] = 10.0;
data[668] = 8.0; data[669] = 11.0; data[670] = 75.0; data[671] = 9.0;
data[672] = 24.0; data[673] = 1.0; data[674] = 78.0; data[675] = 8.0;
data[676] = 8.0; data[677] = 1.0; data[678] = 78.0; data[679] = 8.0;
data[680] = 26.0; data[681] = 30.0; data[682] = 64.0; data[683] = 5.0;
data[684] = 27.0; data[685] = 0.0; data[686] = 95.0; data[687] = 5.0;
data[688] = 27.0; data[689] = 21.0; data[690] = 85.0; data[691] = 5.0;
data[692] = 5.0; data[693] = 0.0; data[694] = 95.0; data[695] = 5.0;
data[696] = 4.0; data[697] = 31.0; data[698] = 64.0; data[699] = 5.0;
data[700] = 28.0; data[701] = 17.0; data[702] = 80.0; data[703] = 4.0;
data[704] = 28.0; data[705] = 26.0; data[706] = 85.0; data[707] = 4.0;
data[708] = 28.0; data[709] = 25.0; data[710] = 64.0; data[711] = 4.0;
data[712] = 28.0; data[713] = 0.0; data[714] = 85.0; data[715] = 4.0;
data[716] = 27.0; data[717] = 31.0; data[718] = 85.0; data[719] = 4.0;
data[720] = 16.0; data[721] = 0.0; data[722] = 96.0; data[723] = 16.0;
data[724] = 15.0; data[725] = 26.0; data[726] = 107.0; data[727] = 16.0;
data[728] = 15.0; data[729] = 25.0; data[730] = 127.0; data[731] = 16.0;
data[732] = 16.0; data[733] = 10.0; data[734] = 121.0; data[735] = 16.0;
data[736] = 21.0; data[737] = 16.0; data[738] = 96.0; data[739] = 11.0;
data[740] = 10.0; data[741] = 15.0; data[742] = 96.0; data[743] = 11.0;
data[744] = 22.0; data[745] = 11.0; data[746] = 106.0; data[747] = 10.0;
data[748] = 8.0; data[749] = 11.0; data[750] = 107.0; data[751] = 9.0;
data[752] = 24.0; data[753] = 1.0; data[754] = 110.0; data[755] = 8.0;
data[756] = 8.0; data[757] = 1.0; data[758] = 110.0; data[759] = 8.0;
data[760] = 26.0; data[761] = 30.0; data[762] = 96.0; data[763] = 5.0;
data[764] = 27.0; data[765] = 0.0; data[766] = 127.0; data[767] = 5.0;
data[768] = 27.0; data[769] = 21.0; data[770] = 117.0; data[771] = 5.0;
data[772] = 5.0; data[773] = 0.0; data[774] = 127.0; data[775] = 5.0;
data[776] = 4.0; data[777] = 31.0; data[778] = 96.0; data[779] = 5.0;
data[780] = 28.0; data[781] = 17.0; data[782] = 112.0; data[783] = 4.0;
data[784] = 28.0; data[785] = 26.0; data[786] = 117.0; data[787] = 4.0;
data[788] = 28.0; data[789] = 25.0; data[790] = 96.0; data[791] = 4.0;
data[792] = 28.0; data[793] = 0.0; data[794] = 117.0; data[795] = 4.0;
data[796] = 27.0; data[797] = 31.0; data[798] = 117.0; data[799] = 4.0;
data[800] = 16.0; data[801] = 32.0; data[802] = 64.0; data[803] = 16.0;
data[804] = 15.0; data[805] = 58.0; data[806] = 75.0; data[807] = 16.0;
data[808] = 15.0; data[809] = 57.0; data[810] = 95.0; data[811] = 16.0;
data[812] = 16.0; data[813] = 42.0; data[814] = 89.0; data[815] = 16.0;
data[816] = 21.0; data[817] = 48.0; data[818] = 64.0; data[819] = 11.0;
data[820] = 10.0; data[821] = 47.0; data[822] = 64.0; data[823] = 11.0;
data[824] = 22.0; data[825] = 43.0; data[826] = 74.0; data[827] = 10.0;
data[828] = 8.0; data[829] = 43.0; data[830] = 75.0; data[831] = 9.0;
data[832] = 24.0; data[833] = 33.0; data[834] = 78.0; data[835] = 8.0;
data[836] = 8.0; data[837] = 33.0; data[838] = 78.0; data[839] = 8.0;
data[840] = 26.0; data[841] = 62.0; data[842] = 64.0; data[843] = 5.0;
data[844] = 27.0; data[845] = 32.0; data[846] = 95.0; data[847] = 5.0;
data[848] = 27.0; data[849] = 53.0; data[850] = 85.0; data[851] = 5.0;
data[852] = 5.0; data[853] = 32.0; data[854] = 95.0; data[855] = 5.0;
data[856] = 4.0; data[857] = 63.0; data[858] = 64.0; data[859] = 5.0;
data[860] = 28.0; data[861] = 49.0; data[862] = 80.0; data[863] = 4.0;
data[864] = 28.0; data[865] = 58.0; data[866] = 85.0; data[867] = 4.0;
data[868] = 28.0; data[869] = 57.0; data[870] = 64.0; data[871] = 4.0;
data[872] = 28.0; data[873] = 32.0; data[874] = 85.0; data[875] = 4.0;
data[876] = 27.0; data[877] = 63.0; data[878] = 85.0; data[879] = 4.0;
data[880] = 16.0; data[881] = 32.0; data[882] = 96.0; data[883] = 16.0;
data[884] = 15.0; data[885] = 58.0; data[886] = 107.0; data[887] = 16.0;
data[888] = 15.0; data[889] = 57.0; data[890] = 127.0; data[891] = 16.0;
data[892] = 16.0; data[893] = 42.0; data[894] = 121.0; data[895] = 16.0;
data[896] = 21.0; data[897] = 48.0; data[898] = 96.0; data[899] = 11.0;
data[900] = 10.0; data[901] = 47.0; data[902] = 96.0; data[903] = 11.0;
data[904] = 22.0; data[905] = 43.0; data[906] = 106.0; data[907] = 10.0;
data[908] = 8.0; data[909] = 43.0; data[910] = 107.0; data[911] = 9.0;
data[912] = 24.0; data[913] = 33.0; data[914] = 110.0; data[915] = 8.0;
data[916] = 8.0; data[917] = 33.0; data[918] = 110.0; data[919] = 8.0;
data[920] = 26.0; data[921] = 62.0; data[922] = 96.0; data[923] = 5.0;
data[924] = 27.0; data[925] = 32.0; data[926] = 127.0; data[927] = 5.0;
data[928] = 27.0; data[929] = 53.0; data[930] = 117.0; data[931] = 5.0;
data[932] = 5.0; data[933] = 32.0; data[934] = 127.0; data[935] = 5.0;
data[936] = 4.0; data[937] = 63.0; data[938] = 96.0; data[939] = 5.0;
data[940] = 28.0; data[941] = 49.0; data[942] = 112.0; data[943] = 4.0;
data[944] = 28.0; data[945] = 58.0; data[946] = 117.0; data[947] = 4.0;
data[948] = 28.0; data[949] = 57.0; data[950] = 96.0; data[951] = 4.0;
data[952] = 28.0; data[953] = 32.0; data[954] = 117.0; data[955] = 4.0;
data[956] = 27.0; data[957] = 63.0; data[958] = 117.0; data[959] = 4.0;
data[960] = 48.0; data[961] = 0.0; data[962] = 64.0; data[963] = 16.0;
data[964] = 47.0; data[965] = 26.0; data[966] = 75.0; data[967] = 16.0;
data[968] = 47.0; data[969] = 25.0; data[970] = 95.0; data[971] = 16.0;
data[972] = 48.0; data[973] = 10.0; data[974] = 89.0; data[975] = 16.0;
data[976] = 53.0; data[977] = 16.0; data[978] = 64.0; data[979] = 11.0;
data[980] = 42.0; data[981] = 15.0; data[982] = 64.0; data[983] = 11.0;
data[984] = 54.0; data[985] = 11.0; data[986] = 74.0; data[987] = 10.0;
data[988] = 40.0; data[989] = 11.0; data[990] = 75.0; data[991] = 9.0;
data[992] = 56.0; data[993] = 1.0; data[994] = 78.0; data[995] = 8.0;
data[996] = 40.0; data[997] = 1.0; data[998] = 78.0; data[999] = 8.0;
data[1000] = 58.0; data[1001] = 30.0; data[1002] = 64.0; data[1003] = 5.0;
data[1004] = 59.0; data[1005] = 0.0; data[1006] = 95.0; data[1007] = 5.0;
data[1008] = 59.0; data[1009] = 21.0; data[1010] = 85.0; data[1011] = 5.0;
data[1012] = 37.0; data[1013] = 0.0; data[1014] = 95.0; data[1015] = 5.0;
data[1016] = 36.0; data[1017] = 31.0; data[1018] = 64.0; data[1019] = 5.0;
data[1020] = 60.0; data[1021] = 17.0; data[1022] = 80.0; data[1023] = 4.0;
data[1024] = 60.0; data[1025] = 26.0; data[1026] = 85.0; data[1027] = 4.0;
data[1028] = 60.0; data[1029] = 25.0; data[1030] = 64.0; data[1031] = 4.0;
data[1032] = 60.0; data[1033] = 0.0; data[1034] = 85.0; data[1035] = 4.0;
data[1036] = 59.0; data[1037] = 31.0; data[1038] = 85.0; data[1039] = 4.0;
data[1040] = 48.0; data[1041] = 0.0; data[1042] = 96.0; data[1043] = 16.0;
data[1044] = 47.0; data[1045] = 26.0; data[1046] = 107.0; data[1047] = 16.0;
data[1048] = 47.0; data[1049] = 25.0; data[1050] = 127.0; data[1051] = 16.0;
data[1052] = 48.0; data[1053] = 10.0; data[1054] = 121.0; data[1055] = 16.0;
data[1056] = 53.0; data[1057] = 16.0; data[1058] = 96.0; data[1059] = 11.0;
data[1060] = 42.0; data[1061] = 15.0; data[1062] = 96.0; data[1063] = 11.0;
data[1064] = 54.0; data[1065] = 11.0; data[1066] = 106.0; data[1067] = 10.0;
data[1068] = 40.0; data[1069] = 11.0; data[1070] = 107.0; data[1071] = 9.0;
data[1072] = 56.0; data[1073] = 1.0; data[1074] = 110.0; data[1075] = 8.0;
data[1076] = 40.0; data[1077] = 1.0; data[1078] = 110.0; data[1079] = 8.0;
data[1080] = 58.0; data[1081] = 30.0; data[1082] = 96.0; data[1083] = 5.0;
data[1084] = 59.0; data[1085] = 0.0; data[1086] = 127.0; data[1087] = 5.0;
data[1088] = 59.0; data[1089] = 21.0; data[1090] = 117.0; data[1091] = 5.0;
data[1092] = 37.0; data[1093] = 0.0; data[1094] = 127.0; data[1095] = 5.0;
data[1096] = 36.0; data[1097] = 31.0; data[1098] = 96.0; data[1099] = 5.0;
data[1100] = 60.0; data[1101] = 17.0; data[1102] = 112.0; data[1103] = 4.0;
data[1104] = 60.0; data[1105] = 26.0; data[1106] = 117.0; data[1107] = 4.0;
data[1108] = 60.0; data[1109] = 25.0; data[1110] = 96.0; data[1111] = 4.0;
data[1112] = 60.0; data[1113] = 0.0; data[1114] = 117.0; data[1115] = 4.0;
data[1116] = 59.0; data[1117] = 31.0; data[1118] = 117.0; data[1119] = 4.0;
data[1120] = 48.0; data[1121] = 32.0; data[1122] = 64.0; data[1123] = 16.0;
data[1124] = 47.0; data[1125] = 58.0; data[1126] = 75.0; data[1127] = 16.0;
data[1128] = 47.0; data[1129] = 57.0; data[1130] = 95.0; data[1131] = 16.0;
data[1132] = 48.0; data[1133] = 42.0; data[1134] = 89.0; data[1135] = 16.0;
data[1136] = 53.0; data[1137] = 48.0; data[1138] = 64.0; data[1139] = 11.0;
data[1140] = 42.0; data[1141] = 47.0; data[1142] = 64.0; data[1143] = 11.0;
data[1144] = 54.0; data[1145] = 43.0; data[1146] = 74.0; data[1147] = 10.0;
data[1148] = 40.0; data[1149] = 43.0; data[1150] = 75.0; data[1151] = 9.0;
data[1152] = 56.0; data[1153] = 33.0; data[1154] = 78.0; data[1155] = 8.0;
data[1156] = 40.0; data[1157] = 33.0; data[1158] = 78.0; data[1159] = 8.0;
data[1160] = 58.0; data[1161] = 62.0; data[1162] = 64.0; data[1163] = 5.0;
data[1164] = 59.0; data[1165] = 32.0; data[1166] = 95.0; data[1167] = 5.0;
data[1168] = 59.0; data[1169] = 53.0; data[1170] = 85.0; data[1171] = 5.0;
data[1172] = 37.0; data[1173] = 32.0; data[1174] = 95.0; data[1175] = 5.0;
data[1176] = 36.0; data[1177] = 63.0; data[1178] = 64.0; data[1179] = 5.0;
data[1180] = 60.0; data[1181] = 49.0; data[1182] = 80.0; data[1183] = 4.0;
data[1184] = 60.0; data[1185] = 58.0; data[1186] = 85.0; data[1187] = 4.0;
data[1188] = 60.0; data[1189] = 57.0; data[1190] = 64.0; data[1191] = 4.0;
data[1192] = 60.0; data[1193] = 32.0; data[1194] = 85.0; data[1195] = 4.0;
data[1196] = 59.0; data[1197] = 63.0; data[1198] = 85.0; data[1199] = 4.0;
data[1200] = 48.0; data[1201] = 32.0; data[1202] = 96.0; data[1203] = 16.0;
data[1204] = 47.0; data[1205] = 58.0; data[1206] = 107.0; data[1207] = 16.0;
data[1208] = 47.0; data[1209] = 57.0; data[1210] = 127.0; data[1211] = 16.0;
data[1212] = 48.0; data[1213] = 42.0; data[1214] = 121.0; data[1215] = 16.0;
data[1216] = 53.0; data[1217] = 48.0; data[1218] = 96.0; data[1219] = 11.0;
data[1220] = 42.0; data[1221] = 47.0; data[1222] = 96.0; data[1223] = 11.0;
data[1224] = 54.0; data[1225] = 43.0; data[1226] = 106.0; data[1227] = 10.0;
data[1228] = 40.0; data[1229] = 43.0; data[1230] = 107.0; data[1231] = 9.0;
data[1232] = 56.0; data[1233] = 33.0; data[1234] = 110.0; data[1235] = 8.0;
data[1236] = 40.0; data[1237] = 33.0; data[1238] = 110.0; data[1239] = 8.0;
data[1240] = 58.0; data[1241] = 62.0; data[1242] = 96.0; data[1243] = 5.0;
data[1244] = 59.0; data[1245] = 32.0; data[1246] = 127.0; data[1247] = 5.0;
data[1248] = 59.0; data[1249] = 53.0; data[1250] = 117.0; data[1251] = 5.0;
data[1252] = 37.0; data[1253] = 32.0; data[1254] = 127.0; data[1255] = 5.0;
data[1256] = 36.0; data[1257] = 63.0; data[1258] = 96.0; data[1259] = 5.0;
data[1260] = 60.0; data[1261] = 49.0; data[1262] = 112.0; data[1263] = 4.0;
data[1264] = 60.0; data[1265] = 58.0; data[1266] = 117.0; data[1267] = 4.0;
data[1268] = 60.0; data[1269] = 57.0; data[1270] = 96.0; data[1271] = 4.0;
data[1272] = 60.0; data[1273] = 32.0; data[1274] = 117.0; data[1275] = 4.0;
data[1276] = 59.0; data[1277] = 63.0; data[1278] = 117.0; data[1279] = 4.0;
data[1280] = 16.0; data[1281] = 64.0; data[1282] = 0.0; data[1283] = 16.0;
data[1284] = 15.0; data[1285] = 90.0; data[1286] = 11.0; data[1287] = 16.0;
data[1288] = 15.0; data[1289] = 89.0; data[1290] = 31.0; data[1291] = 16.0;
data[1292] = 16.0; data[1293] = 74.0; data[1294] = 25.0; data[1295] = 16.0;
data[1296] = 21.0; data[1297] = 80.0; data[1298] = 0.0; data[1299] = 11.0;
data[1300] = 10.0; data[1301] = 79.0; data[1302] = 0.0; data[1303] = 11.0;
data[1304] = 22.0; data[1305] = 75.0; data[1306] = 10.0; data[1307] = 10.0;
data[1308] = 8.0; data[1309] = 75.0; data[1310] = 11.0; data[1311] = 9.0;
data[1312] = 24.0; data[1313] = 65.0; data[1314] = 14.0; data[1315] = 8.0;
data[1316] = 8.0; data[1317] = 65.0; data[1318] = 14.0; data[1319] = 8.0;
data[1320] = 26.0; data[1321] = 94.0; data[1322] = 0.0; data[1323] = 5.0;
data[1324] = 27.0; data[1325] = 64.0; data[1326] = 31.0; data[1327] = 5.0;
data[1328] = 27.0; data[1329] = 85.0; data[1330] = 21.0; data[1331] = 5.0;
data[1332] = 5.0; data[1333] = 64.0; data[1334] = 31.0; data[1335] = 5.0;
data[1336] = 4.0; data[1337] = 95.0; data[1338] = 0.0; data[1339] = 5.0;
data[1340] = 28.0; data[1341] = 81.0; data[1342] = 16.0; data[1343] = 4.0;
data[1344] = 28.0; data[1345] = 90.0; data[1346] = 21.0; data[1347] = 4.0;
data[1348] = 28.0; data[1349] = 89.0; data[1350] = 0.0; data[1351] = 4.0;
data[1352] = 28.0; data[1353] = 64.0; data[1354] = 21.0; data[1355] = 4.0;
data[1356] = 27.0; data[1357] = 95.0; data[1358] = 21.0; data[1359] = 4.0;
data[1360] = 16.0; data[1361] = 64.0; data[1362] = 32.0; data[1363] = 16.0;
data[1364] = 15.0; data[1365] = 90.0; data[1366] = 43.0; data[1367] = 16.0;
data[1368] = 15.0; data[1369] = 89.0; data[1370] = 63.0; data[1371] = 16.0;
data[1372] = 16.0; data[1373] = 74.0; data[1374] = 57.0; data[1375] = 16.0;
data[1376] = 21.0; data[1377] = 80.0; data[1378] = 32.0; data[1379] = 11.0;
data[1380] = 10.0; data[1381] = 79.0; data[1382] = 32.0; data[1383] = 11.0;
data[1384] = 22.0; data[1385] = 75.0; data[1386] = 42.0; data[1387] = 10.0;
data[1388] = 8.0; data[1389] = 75.0; data[1390] = 43.0; data[1391] = 9.0;
data[1392] = 24.0; data[1393] = 65.0; data[1394] = 46.0; data[1395] = 8.0;
data[1396] = 8.0; data[1397] = 65.0; data[1398] = 46.0; data[1399] = 8.0;
data[1400] = 26.0; data[1401] = 94.0; data[1402] = 32.0; data[1403] = 5.0;
data[1404] = 27.0; data[1405] = 64.0; data[1406] = 63.0; data[1407] = 5.0;
data[1408] = 27.0; data[1409] = 85.0; data[1410] = 53.0; data[1411] = 5.0;
data[1412] = 5.0; data[1413] = 64.0; data[1414] = 63.0; data[1415] = 5.0;
data[1416] = 4.0; data[1417] = 95.0; data[1418] = 32.0; data[1419] = 5.0;
data[1420] = 28.0; data[1421] = 81.0; data[1422] = 48.0; data[1423] = 4.0;
data[1424] = 28.0; data[1425] = 90.0; data[1426] = 53.0; data[1427] = 4.0;
data[1428] = 28.0; data[1429] = 89.0; data[1430] = 32.0; data[1431] = 4.0;
data[1432] = 28.0; data[1433] = 64.0; data[1434] = 53.0; data[1435] = 4.0;
data[1436] = 27.0; data[1437] = 95.0; data[1438] = 53.0; data[1439] = 4.0;
data[1440] = 16.0; data[1441] = 96.0; data[1442] = 0.0; data[1443] = 16.0;
data[1444] = 15.0; data[1445] = 122.0; data[1446] = 11.0; data[1447] = 16.0;
data[1448] = 15.0; data[1449] = 121.0; data[1450] = 31.0; data[1451] = 16.0;
data[1452] = 16.0; data[1453] = 106.0; data[1454] = 25.0; data[1455] = 16.0;
data[1456] = 21.0; data[1457] = 112.0; data[1458] = 0.0; data[1459] = 11.0;
data[1460] = 10.0; data[1461] = 111.0; data[1462] = 0.0; data[1463] = 11.0;
data[1464] = 22.0; data[1465] = 107.0; data[1466] = 10.0; data[1467] = 10.0;
data[1468] = 8.0; data[1469] = 107.0; data[1470] = 11.0; data[1471] = 9.0;
data[1472] = 24.0; data[1473] = 97.0; data[1474] = 14.0; data[1475] = 8.0;
data[1476] = 8.0; data[1477] = 97.0; data[1478] = 14.0; data[1479] = 8.0;
data[1480] = 26.0; data[1481] = 126.0; data[1482] = 0.0; data[1483] = 5.0;
data[1484] = 27.0; data[1485] = 96.0; data[1486] = 31.0; data[1487] = 5.0;
data[1488] = 27.0; data[1489] = 117.0; data[1490] = 21.0; data[1491] = 5.0;
data[1492] = 5.0; data[1493] = 96.0; data[1494] = 31.0; data[1495] = 5.0;
data[1496] = 4.0; data[1497] = 127.0; data[1498] = 0.0; data[1499] = 5.0;
data[1500] = 28.0; data[1501] = 113.0; data[1502] = 16.0; data[1503] = 4.0;
data[1504] = 28.0; data[1505] = 122.0; data[1506] = 21.0; data[1507] = 4.0;
data[1508] = 28.0; data[1509] = 121.0; data[1510] = 0.0; data[1511] = 4.0;
data[1512] = 28.0; data[1513] = 96.0; data[1514] = 21.0; data[1515] = 4.0;
data[1516] = 27.0; data[1517] = 127.0; data[1518] = 21.0; data[1519] = 4.0;
data[1520] = 16.0; data[1521] = 96.0; data[1522] = 32.0; data[1523] = 16.0;
data[1524] = 15.0; data[1525] = 122.0; data[1526] = 43.0; data[1527] = 16.0;
data[1528] = 15.0; data[1529] = 121.0; data[1530] = 63.0; data[1531] = 16.0;
data[1532] = 16.0; data[1533] = 106.0; data[1534] = 57.0; data[1535] = 16.0;
data[1536] = 21.0; data[1537] = 112.0; data[1538] = 32.0; data[1539] = 11.0;
data[1540] = 10.0; data[1541] = 111.0; data[1542] = 32.0; data[1543] = 11.0;
data[1544] = 22.0; data[1545] = 107.0; data[1546] = 42.0; data[1547] = 10.0;
data[1548] = 8.0; data[1549] = 107.0; data[1550] = 43.0; data[1551] = 9.0;
data[1552] = 24.0; data[1553] = 97.0; data[1554] = 46.0; data[1555] = 8.0;
data[1556] = 8.0; data[1557] = 97.0; data[1558] = 46.0; data[1559] = 8.0;
data[1560] = 26.0; data[1561] = 126.0; data[1562] = 32.0; data[1563] = 5.0;
data[1564] = 27.0; data[1565] = 96.0; data[1566] = 63.0; data[1567] = 5.0;
data[1568] = 27.0; data[1569] = 117.0; data[1570] = 53.0; data[1571] = 5.0;
data[1572] = 5.0; data[1573] = 96.0; data[1574] = 63.0; data[1575] = 5.0;
data[1576] = 4.0; data[1577] = 127.0; data[1578] = 32.0; data[1579] = 5.0;
data[1580] = 28.0; data[1581] = 113.0; data[1582] = 48.0; data[1583] = 4.0;
data[1584] = 28.0; data[1585] = 122.0; data[1586] = 53.0; data[1587] = 4.0;
data[1588] = 28.0; data[1589] = 121.0; data[1590] = 32.0; data[1591] = 4.0;
data[1592] = 28.0; data[1593] = 96.0; data[1594] = 53.0; data[1595] = 4.0;
data[1596] = 27.0; data[1597] = 127.0; data[1598] = 53.0; data[1599] = 4.0;
data[1600] = 48.0; data[1601] = 64.0; data[1602] = 0.0; data[1603] = 16.0;
data[1604] = 47.0; data[1605] = 90.0; data[1606] = 11.0; data[1607] = 16.0;
data[1608] = 47.0; data[1609] = 89.0; data[1610] = 31.0; data[1611] = 16.0;
data[1612] = 48.0; data[1613] = 74.0; data[1614] = 25.0; data[1615] = 16.0;
data[1616] = 53.0; data[1617] = 80.0; data[1618] = 0.0; data[1619] = 11.0;
data[1620] = 42.0; data[1621] = 79.0; data[1622] = 0.0; data[1623] = 11.0;
data[1624] = 54.0; data[1625] = 75.0; data[1626] = 10.0; data[1627] = 10.0;
data[1628] = 40.0; data[1629] = 75.0; data[1630] = 11.0; data[1631] = 9.0;
data[1632] = 56.0; data[1633] = 65.0; data[1634] = 14.0; data[1635] = 8.0;
data[1636] = 40.0; data[1637] = 65.0; data[1638] = 14.0; data[1639] = 8.0;
data[1640] = 58.0; data[1641] = 94.0; data[1642] = 0.0; data[1643] = 5.0;
data[1644] = 59.0; data[1645] = 64.0; data[1646] = 31.0; data[1647] = 5.0;
data[1648] = 59.0; data[1649] = 85.0; data[1650] = 21.0; data[1651] = 5.0;
data[1652] = 37.0; data[1653] = 64.0; data[1654] = 31.0; data[1655] = 5.0;
data[1656] = 36.0; data[1657] = 95.0; data[1658] = 0.0; data[1659] = 5.0;
data[1660] = 60.0; data[1661] = 81.0; data[1662] = 16.0; data[1663] = 4.0;
data[1664] = 60.0; data[1665] = 90.0; data[1666] = 21.0; data[1667] = 4.0;
data[1668] = 60.0; data[1669] = 89.0; data[1670] = 0.0; data[1671] = 4.0;
data[1672] = 60.0; data[1673] = 64.0; data[1674] = 21.0; data[1675] = 4.0;
data[1676] = 59.0; data[1677] = 95.0; data[1678] = 21.0; data[1679] = 4.0;
data[1680] = 48.0; data[1681] = 64.0; data[1682] = 32.0; data[1683] = 16.0;
data[1684] = 47.0; data[1685] = 90.0; data[1686] = 43.0; data[1687] = 16.0;
data[1688] = 47.0; data[1689] = 89.0; data[1690] = 63.0; data[1691] = 16.0;
data[1692] = 48.0; data[1693] = 74.0; data[1694] = 57.0; data[1695] = 16.0;
data[1696] = 53.0; data[1697] = 80.0; data[1698] = 32.0; data[1699] = 11.0;
data[1700] = 42.0; data[1701] = 79.0; data[1702] = 32.0; data[1703] = 11.0;
data[1704] = 54.0; data[1705] = 75.0; data[1706] = 42.0; data[1707] = 10.0;
data[1708] = 40.0; data[1709] = 75.0; data[1710] = 43.0; data[1711] = 9.0;
data[1712] = 56.0; data[1713] = 65.0; data[1714] = 46.0; data[1715] = 8.0;
data[1716] = 40.0; data[1717] = 65.0; data[1718] = 46.0; data[1719] = 8.0;
data[1720] = 58.0; data[1721] = 94.0; data[1722] = 32.0; data[1723] = 5.0;
data[1724] = 59.0; data[1725] = 64.0; data[1726] = 63.0; data[1727] = 5.0;
data[1728] = 59.0; data[1729] = 85.0; data[1730] = 53.0; data[1731] = 5.0;
data[1732] = 37.0; data[1733] = 64.0; data[1734] = 63.0; data[1735] = 5.0;
data[1736] = 36.0; data[1737] = 95.0; data[1738] = 32.0; data[1739] = 5.0;
data[1740] = 60.0; data[1741] = 81.0; data[1742] = 48.0; data[1743] = 4.0;
data[1744] = 60.0; data[1745] = 90.0; data[1746] = 53.0; data[1747] = 4.0;
data[1748] = 60.0; data[1749] = 89.0; data[1750] = 32.0; data[1751] = 4.0;
data[1752] = 60.0; data[1753] = 64.0; data[1754] = 53.0; data[1755] = 4.0;
data[1756] = 59.0; data[1757] = 95.0; data[1758] = 53.0; data[1759] = 4.0;
data[1760] = 48.0; data[1761] = 96.0; data[1762] = 0.0; data[1763] = 16.0;
data[1764] = 47.0; data[1765] = 122.0; data[1766] = 11.0; data[1767] = 16.0;
data[1768] = 47.0; data[1769] = 121.0; data[1770] = 31.0; data[1771] = 16.0;
data[1772] = 48.0; data[1773] = 106.0; data[1774] = 25.0; data[1775] = 16.0;
data[1776] = 53.0; data[1777] = 112.0; data[1778] = 0.0; data[1779] = 11.0;
data[1780] = 42.0; data[1781] = 111.0; data[1782] = 0.0; data[1783] = 11.0;
data[1784] = 54.0; data[1785] = 107.0; data[1786] = 10.0; data[1787] = 10.0;
data[1788] = 40.0; data[1789] = 107.0; data[1790] = 11.0; data[1791] = 9.0;
data[1792] = 56.0; data[1793] = 97.0; data[1794] = 14.0; data[1795] = 8.0;
data[1796] = 40.0; data[1797] = 97.0; data[1798] = 14.0; data[1799] = 8.0;
data[1800] = 58.0; data[1801] = 126.0; data[1802] = 0.0; data[1803] = 5.0;
data[1804] = 59.0; data[1805] = 96.0; data[1806] = 31.0; data[1807] = 5.0;
data[1808] = 59.0; data[1809] = 117.0; data[1810] = 21.0; data[1811] = 5.0;
data[1812] = 37.0; data[1813] = 96.0; data[1814] = 31.0; data[1815] = 5.0;
data[1816] = 36.0; data[1817] = 127.0; data[1818] = 0.0; data[1819] = 5.0;
data[1820] = 60.0; data[1821] = 113.0; data[1822] = 16.0; data[1823] = 4.0;
data[1824] = 60.0; data[1825] = 122.0; data[1826] = 21.0; data[1827] = 4.0;
data[1828] = 60.0; data[1829] = 121.0; data[1830] = 0.0; data[1831] = 4.0;
data[1832] = 60.0; data[1833] = 96.0; data[1834] = 21.0; data[1835] = 4.0;
data[1836] = 59.0; data[1837] = 127.0; data[1838] = 21.0; data[1839] = 4.0;
data[1840] = 48.0; data[1841] = 96.0; data[1842] = 32.0; data[1843] = 16.0;
data[1844] = 47.0; data[1845] = 122.0; data[1846] = 43.0; data[1847] = 16.0;
data[1848] = 47.0; data[1849] = 121.0; data[1850] = 63.0; data[1851] = 16.0;
data[1852] = 48.0; data[1853] = 106.0; data[1854] = 57.0; data[1855] = 16.0;
data[1856] = 53.0; data[1857] = 112.0; data[1858] = 32.0; data[1859] = 11.0;
data[1860] = 42.0; data[1861] = 111.0; data[1862] = 32.0; data[1863] = 11.0;
data[1864] = 54.0; data[1865] = 107.0; data[1866] = 42.0; data[1867] = 10.0;
data[1868] = 40.0; data[1869] = 107.0; data[1870] = 43.0; data[1871] = 9.0;
data[1872] = 56.0; data[1873] = 97.0; data[1874] = 46.0; data[1875] = 8.0;
data[1876] = 40.0; data[1877] = 97.0; data[1878] = 46.0; data[1879] = 8.0;
data[1880] = 58.0; data[1881] = 126.0; data[1882] = 32.0; data[1883] = 5.0;
data[1884] = 59.0; data[1885] = 96.0; data[1886] = 63.0; data[1887] = 5.0;
data[1888] = 59.0; data[1889] = 117.0; data[1890] = 53.0; data[1891] = 5.0;
data[1892] = 37.0; data[1893] = 96.0; data[1894] = 63.0; data[1895] = 5.0;
data[1896] = 36.0; data[1897] = 127.0; data[1898] = 32.0; data[1899] = 5.0;
data[1900] = 60.0; data[1901] = 113.0; data[1902] = 48.0; data[1903] = 4.0;
data[1904] = 60.0; data[1905] = 122.0; data[1906] = 53.0; data[1907] = 4.0;
data[1908] = 60.0; data[1909] = 121.0; data[1910] = 32.0; data[1911] = 4.0;
data[1912] = 60.0; data[1913] = 96.0; data[1914] = 53.0; data[1915] = 4.0;
data[1916] = 59.0; data[1917] = 127.0; data[1918] = 53.0; data[1919] = 4.0;
data[1920] = 16.0; data[1921] = 64.0; data[1922] = 64.0; data[1923] = 16.0;
data[1924] = 15.0; data[1925] = 90.0; data[1926] = 75.0; data[1927] = 16.0;
data[1928] = 15.0; data[1929] = 89.0; data[1930] = 95.0; data[1931] = 16.0;
data[1932] = 16.0; data[1933] = 74.0; data[1934] = 89.0; data[1935] = 16.0;
data[1936] = 21.0; data[1937] = 80.0; data[1938] = 64.0; data[1939] = 11.0;
data[1940] = 10.0; data[1941] = 79.0; data[1942] = 64.0; data[1943] = 11.0;
data[1944] = 22.0; data[1945] = 75.0; data[1946] = 74.0; data[1947] = 10.0;
data[1948] = 8.0; data[1949] = 75.0; data[1950] = 75.0; data[1951] = 9.0;
data[1952] = 24.0; data[1953] = 65.0; data[1954] = 78.0; data[1955] = 8.0;
data[1956] = 8.0; data[1957] = 65.0; data[1958] = 78.0; data[1959] = 8.0;
data[1960] = 26.0; data[1961] = 94.0; data[1962] = 64.0; data[1963] = 5.0;
data[1964] = 27.0; data[1965] = 64.0; data[1966] = 95.0; data[1967] = 5.0;
data[1968] = 27.0; data[1969] = 85.0; data[1970] = 85.0; data[1971] = 5.0;
data[1972] = 5.0; data[1973] = 64.0; data[1974] = 95.0; data[1975] = 5.0;
data[1976] = 4.0; data[1977] = 95.0; data[1978] = 64.0; data[1979] = 5.0;
data[1980] = 28.0; data[1981] = 81.0; data[1982] = 80.0; data[1983] = 4.0;
data[1984] = 28.0; data[1985] = 90.0; data[1986] = 85.0; data[1987] = 4.0;
data[1988] = 28.0; data[1989] = 89.0; data[1990] = 64.0; data[1991] = 4.0;
data[1992] = 28.0; data[1993] = 64.0; data[1994] = 85.0; data[1995] = 4.0;
data[1996] = 27.0; data[1997] = 95.0; data[1998] = 85.0; data[1999] = 4.0;
data[2000] = 16.0; data[2001] = 64.0; data[2002] = 96.0; data[2003] = 16.0;
data[2004] = 15.0; data[2005] = 90.0; data[2006] = 107.0; data[2007] = 16.0;
data[2008] = 15.0; data[2009] = 89.0; data[2010] = 127.0; data[2011] = 16.0;
data[2012] = 16.0; data[2013] = 74.0; data[2014] = 121.0; data[2015] = 16.0;
data[2016] = 21.0; data[2017] = 80.0; data[2018] = 96.0; data[2019] = 11.0;
data[2020] = 10.0; data[2021] = 79.0; data[2022] = 96.0; data[2023] = 11.0;
data[2024] = 22.0; data[2025] = 75.0; data[2026] = 106.0; data[2027] = 10.0;
data[2028] = 8.0; data[2029] = 75.0; data[2030] = 107.0; data[2031] = 9.0;
data[2032] = 24.0; data[2033] = 65.0; data[2034] = 110.0; data[2035] = 8.0;
data[2036] = 8.0; data[2037] = 65.0; data[2038] = 110.0; data[2039] = 8.0;
data[2040] = 26.0; data[2041] = 94.0; data[2042] = 96.0; data[2043] = 5.0;
data[2044] = 27.0; data[2045] = 64.0; data[2046] = 127.0; data[2047] = 5.0;
data[2048] = 27.0; data[2049] = 85.0; data[2050] = 117.0; data[2051] = 5.0;
data[2052] = 5.0; data[2053] = 64.0; data[2054] = 127.0; data[2055] = 5.0;
data[2056] = 4.0; data[2057] = 95.0; data[2058] = 96.0; data[2059] = 5.0;
data[2060] = 28.0; data[2061] = 81.0; data[2062] = 112.0; data[2063] = 4.0;
data[2064] = 28.0; data[2065] = 90.0; data[2066] = 117.0; data[2067] = 4.0;
data[2068] = 28.0; data[2069] = 89.0; data[2070] = 96.0; data[2071] = 4.0;
data[2072] = 28.0; data[2073] = 64.0; data[2074] = 117.0; data[2075] = 4.0;
data[2076] = 27.0; data[2077] = 95.0; data[2078] = 117.0; data[2079] = 4.0;
data[2080] = 16.0; data[2081] = 96.0; data[2082] = 64.0; data[2083] = 16.0;
data[2084] = 15.0; data[2085] = 122.0; data[2086] = 75.0; data[2087] = 16.0;
data[2088] = 15.0; data[2089] = 121.0; data[2090] = 95.0; data[2091] = 16.0;
data[2092] = 16.0; data[2093] = 106.0; data[2094] = 89.0; data[2095] = 16.0;
data[2096] = 21.0; data[2097] = 112.0; data[2098] = 64.0; data[2099] = 11.0;
data[2100] = 10.0; data[2101] = 111.0; data[2102] = 64.0; data[2103] = 11.0;
data[2104] = 22.0; data[2105] = 107.0; data[2106] = 74.0; data[2107] = 10.0;
data[2108] = 8.0; data[2109] = 107.0; data[2110] = 75.0; data[2111] = 9.0;
data[2112] = 24.0; data[2113] = 97.0; data[2114] = 78.0; data[2115] = 8.0;
data[2116] = 8.0; data[2117] = 97.0; data[2118] = 78.0; data[2119] = 8.0;
data[2120] = 26.0; data[2121] = 126.0; data[2122] = 64.0; data[2123] = 5.0;
data[2124] = 27.0; data[2125] = 96.0; data[2126] = 95.0; data[2127] = 5.0;
data[2128] = 27.0; data[2129] = 117.0; data[2130] = 85.0; data[2131] = 5.0;
data[2132] = 5.0; data[2133] = 96.0; data[2134] = 95.0; data[2135] = 5.0;
data[2136] = 4.0; data[2137] = 127.0; data[2138] = 64.0; data[2139] = 5.0;
data[2140] = 28.0; data[2141] = 113.0; data[2142] = 80.0; data[2143] = 4.0;
data[2144] = 28.0; data[2145] = 122.0; data[2146] = 85.0; data[2147] = 4.0;
data[2148] = 28.0; data[2149] = 121.0; data[2150] = 64.0; data[2151] = 4.0;
data[2152] = 28.0; data[2153] = 96.0; data[2154] = 85.0; data[2155] = 4.0;
data[2156] = 27.0; data[2157] = 127.0; data[2158] = 85.0; data[2159] = 4.0;
data[2160] = 16.0; data[2161] = 96.0; data[2162] = 96.0; data[2163] = 16.0;
data[2164] = 15.0; data[2165] = 122.0; data[2166] = 107.0; data[2167] = 16.0;
data[2168] = 15.0; data[2169] = 121.0; data[2170] = 127.0; data[2171] = 16.0;
data[2172] = 16.0; data[2173] = 106.0; data[2174] = 121.0; data[2175] = 16.0;
data[2176] = 21.0; data[2177] = 112.0; data[2178] = 96.0; data[2179] = 11.0;
data[2180] = 10.0; data[2181] = 111.0; data[2182] = 96.0; data[2183] = 11.0;
data[2184] = 22.0; data[2185] = 107.0; data[2186] = 106.0; data[2187] = 10.0;
data[2188] = 8.0; data[2189] = 107.0; data[2190] = 107.0; data[2191] = 9.0;
data[2192] = 24.0; data[2193] = 97.0; data[2194] = 110.0; data[2195] = 8.0;
data[2196] = 8.0; data[2197] = 97.0; data[2198] = 110.0; data[2199] = 8.0;
data[2200] = 26.0; data[2201] = 126.0; data[2202] = 96.0; data[2203] = 5.0;
data[2204] = 27.0; data[2205] = 96.0; data[2206] = 127.0; data[2207] = 5.0;
data[2208] = 27.0; data[2209] = 117.0; data[2210] = 117.0; data[2211] = 5.0;
data[2212] = 5.0; data[2213] = 96.0; data[2214] = 127.0; data[2215] = 5.0;
data[2216] = 4.0; data[2217] = 127.0; data[2218] = 96.0; data[2219] = 5.0;
data[2220] = 28.0; data[2221] = 113.0; data[2222] = 112.0; data[2223] = 4.0;
data[2224] = 28.0; data[2225] = 122.0; data[2226] = 117.0; data[2227] = 4.0;
data[2228] = 28.0; data[2229] = 121.0; data[2230] = 96.0; data[2231] = 4.0;
data[2232] = 28.0; data[2233] = 96.0; data[2234] = 117.0; data[2235] = 4.0;
data[2236] = 27.0; data[2237] = 127.0; data[2238] = 117.0; data[2239] = 4.0;
data[2240] = 48.0; data[2241] = 64.0; data[2242] = 64.0; data[2243] = 16.0;
data[2244] = 47.0; data[2245] = 90.0; data[2246] = 75.0; data[2247] = 16.0;
data[2248] = 47.0; data[2249] = 89.0; data[2250] = 95.0; data[2251] = 16.0;
data[2252] = 48.0; data[2253] = 74.0; data[2254] = 89.0; data[2255] = 16.0;
data[2256] = 53.0; data[2257] = 80.0; data[2258] = 64.0; data[2259] = 11.0;
data[2260] = 42.0; data[2261] = 79.0; data[2262] = 64.0; data[2263] = 11.0;
data[2264] = 54.0; data[2265] = 75.0; data[2266] = 74.0; data[2267] = 10.0;
data[2268] = 40.0; data[2269] = 75.0; data[2270] = 75.0; data[2271] = 9.0;
data[2272] = 56.0; data[2273] = 65.0; data[2274] = 78.0; data[2275] = 8.0;
data[2276] = 40.0; data[2277] = 65.0; data[2278] = 78.0; data[2279] = 8.0;
data[2280] = 58.0; data[2281] = 94.0; data[2282] = 64.0; data[2283] = 5.0;
data[2284] = 59.0; data[2285] = 64.0; data[2286] = 95.0; data[2287] = 5.0;
data[2288] = 59.0; data[2289] = 85.0; data[2290] = 85.0; data[2291] = 5.0;
data[2292] = 37.0; data[2293] = 64.0; data[2294] = 95.0; data[2295] = 5.0;
data[2296] = 36.0; data[2297] = 95.0; data[2298] = 64.0; data[2299] = 5.0;
data[2300] = 60.0; data[2301] = 81.0; data[2302] = 80.0; data[2303] = 4.0;
data[2304] = 60.0; data[2305] = 90.0; data[2306] = 85.0; data[2307] = 4.0;
data[2308] = 60.0; data[2309] = 89.0; data[2310] = 64.0; data[2311] = 4.0;
data[2312] = 60.0; data[2313] = 64.0; data[2314] = 85.0; data[2315] = 4.0;
data[2316] = 59.0; data[2317] = 95.0; data[2318] = 85.0; data[2319] = 4.0;
data[2320] = 48.0; data[2321] = 64.0; data[2322] = 96.0; data[2323] = 16.0;
data[2324] = 47.0; data[2325] = 90.0; data[2326] = 107.0; data[2327] = 16.0;
data[2328] = 47.0; data[2329] = 89.0; data[2330] = 127.0; data[2331] = 16.0;
data[2332] = 48.0; data[2333] = 74.0; data[2334] = 121.0; data[2335] = 16.0;
data[2336] = 53.0; data[2337] = 80.0; data[2338] = 96.0; data[2339] = 11.0;
data[2340] = 42.0; data[2341] = 79.0; data[2342] = 96.0; data[2343] = 11.0;
data[2344] = 54.0; data[2345] = 75.0; data[2346] = 106.0; data[2347] = 10.0;
data[2348] = 40.0; data[2349] = 75.0; data[2350] = 107.0; data[2351] = 9.0;
data[2352] = 56.0; data[2353] = 65.0; data[2354] = 110.0; data[2355] = 8.0;
data[2356] = 40.0; data[2357] = 65.0; data[2358] = 110.0; data[2359] = 8.0;
data[2360] = 58.0; data[2361] = 94.0; data[2362] = 96.0; data[2363] = 5.0;
data[2364] = 59.0; data[2365] = 64.0; data[2366] = 127.0; data[2367] = 5.0;
data[2368] = 59.0; data[2369] = 85.0; data[2370] = 117.0; data[2371] = 5.0;
data[2372] = 37.0; data[2373] = 64.0; data[2374] = 127.0; data[2375] = 5.0;
data[2376] = 36.0; data[2377] = 95.0; data[2378] = 96.0; data[2379] = 5.0;
data[2380] = 60.0; data[2381] = 81.0; data[2382] = 112.0; data[2383] = 4.0;
data[2384] = 60.0; data[2385] = 90.0; data[2386] = 117.0; data[2387] = 4.0;
data[2388] = 60.0; data[2389] = 89.0; data[2390] = 96.0; data[2391] = 4.0;
data[2392] = 60.0; data[2393] = 64.0; data[2394] = 117.0; data[2395] = 4.0;
data[2396] = 59.0; data[2397] = 95.0; data[2398] = 117.0; data[2399] = 4.0;
data[2400] = 48.0; data[2401] = 96.0; data[2402] = 64.0; data[2403] = 16.0;
data[2404] = 47.0; data[2405] = 122.0; data[2406] = 75.0; data[2407] = 16.0;
data[2408] = 47.0; data[2409] = 121.0; data[2410] = 95.0; data[2411] = 16.0;
data[2412] = 48.0; data[2413] = 106.0; data[2414] = 89.0; data[2415] = 16.0;
data[2416] = 53.0; data[2417] = 112.0; data[2418] = 64.0; data[2419] = 11.0;
data[2420] = 42.0; data[2421] = 111.0; data[2422] = 64.0; data[2423] = 11.0;
data[2424] = 54.0; data[2425] = 107.0; data[2426] = 74.0; data[2427] = 10.0;
data[2428] = 40.0; data[2429] = 107.0; data[2430] = 75.0; data[2431] = 9.0;
data[2432] = 56.0; data[2433] = 97.0; data[2434] = 78.0; data[2435] = 8.0;
data[2436] = 40.0; data[2437] = 97.0; data[2438] = 78.0; data[2439] = 8.0;
data[2440] = 58.0; data[2441] = 126.0; data[2442] = 64.0; data[2443] = 5.0;
data[2444] = 59.0; data[2445] = 96.0; data[2446] = 95.0; data[2447] = 5.0;
data[2448] = 59.0; data[2449] = 117.0; data[2450] = 85.0; data[2451] = 5.0;
data[2452] = 37.0; data[2453] = 96.0; data[2454] = 95.0; data[2455] = 5.0;
data[2456] = 36.0; data[2457] = 127.0; data[2458] = 64.0; data[2459] = 5.0;
data[2460] = 60.0; data[2461] = 113.0; data[2462] = 80.0; data[2463] = 4.0;
data[2464] = 60.0; data[2465] = 122.0; data[2466] = 85.0; data[2467] = 4.0;
data[2468] = 60.0; data[2469] = 121.0; data[2470] = 64.0; data[2471] = 4.0;
data[2472] = 60.0; data[2473] = 96.0; data[2474] = 85.0; data[2475] = 4.0;
data[2476] = 59.0; data[2477] = 127.0; data[2478] = 85.0; data[2479] = 4.0;
data[2480] = 48.0; data[2481] = 96.0; data[2482] = 96.0; data[2483] = 16.0;
data[2484] = 47.0; data[2485] = 122.0; data[2486] = 107.0; data[2487] = 16.0;
data[2488] = 47.0; data[2489] = 121.0; data[2490] = 127.0; data[2491] = 16.0;
data[2492] = 48.0; data[2493] = 106.0; data[2494] = 121.0; data[2495] = 16.0;
data[2496] = 53.0; data[2497] = 112.0; data[2498] = 96.0; data[2499] = 11.0;
data[2500] = 42.0; data[2501] = 111.0; data[2502] = 96.0; data[2503] = 11.0;
data[2504] = 54.0; data[2505] = 107.0; data[2506] = 106.0; data[2507] = 10.0;
data[2508] = 40.0; data[2509] = 107.0; data[2510] = 107.0; data[2511] = 9.0;
data[2512] = 56.0; data[2513] = 97.0; data[2514] = 110.0; data[2515] = 8.0;
data[2516] = 40.0; data[2517] = 97.0; data[2518] = 110.0; data[2519] = 8.0;
data[2520] = 58.0; data[2521] = 126.0; data[2522] = 96.0; data[2523] = 5.0;
data[2524] = 59.0; data[2525] = 96.0; data[2526] = 127.0; data[2527] = 5.0;
data[2528] = 59.0; data[2529] = 117.0; data[2530] = 117.0; data[2531] = 5.0;
data[2532] = 37.0; data[2533] = 96.0; data[2534] = 127.0; data[2535] = 5.0;
data[2536] = 36.0; data[2537] = 127.0; data[2538] = 96.0; data[2539] = 5.0;
data[2540] = 60.0; data[2541] = 113.0; data[2542] = 112.0; data[2543] = 4.0;
data[2544] = 60.0; data[2545] = 122.0; data[2546] = 117.0; data[2547] = 4.0;
data[2548] = 60.0; data[2549] = 121.0; data[2550] = 96.0; data[2551] = 4.0;
data[2552] = 60.0; data[2553] = 96.0; data[2554] = 117.0; data[2555] = 4.0;
data[2556] = 59.0; data[2557] = 127.0; data[2558] = 117.0; data[2559] = 4.0;
data[2560] = 80.0; data[2561] = 0.0; data[2562] = 0.0; data[2563] = 16.0;
data[2564] = 79.0; data[2565] = 26.0; data[2566] = 11.0; data[2567] = 16.0;
data[2568] = 79.0; data[2569] = 25.0; data[2570] = 31.0; data[2571] = 16.0;
data[2572] = 80.0; data[2573] = 10.0; data[2574] = 25.0; data[2575] = 16.0;
data[2576] = 85.0; data[2577] = 16.0; data[2578] = 0.0; data[2579] = 11.0;
data[2580] = 74.0; data[2581] = 15.0; data[2582] = 0.0; data[2583] = 11.0;
data[2584] = 86.0; data[2585] = 11.0; data[2586] = 10.0; data[2587] = 10.0;
data[2588] = 72.0; data[2589] = 11.0; data[2590] = 11.0; data[2591] = 9.0;
data[2592] = 88.0; data[2593] = 1.0; data[2594] = 14.0; data[2595] = 8.0;
data[2596] = 72.0; data[2597] = 1.0; data[2598] = 14.0; data[2599] = 8.0;
data[2600] = 90.0; data[2601] = 30.0; data[2602] = 0.0; data[2603] = 5.0;
data[2604] = 91.0; data[2605] = 0.0; data[2606] = 31.0; data[2607] = 5.0;
data[2608] = 91.0; data[2609] = 21.0; data[2610] = 21.0; data[2611] = 5.0;
data[2612] = 69.0; data[2613] = 0.0; data[2614] = 31.0; data[2615] = 5.0;
data[2616] = 68.0; data[2617] = 31.0; data[2618] = 0.0; data[2619] = 5.0;
data[2620] = 92.0; data[2621] = 17.0; data[2622] = 16.0; data[2623] = 4.0;
data[2624] = 92.0; data[2625] = 26.0; data[2626] = 21.0; data[2627] = 4.0;
data[2628] = 92.0; data[2629] = 25.0; data[2630] = 0.0; data[2631] = 4.0;
data[2632] = 92.0; data[2633] = 0.0; data[2634] = 21.0; data[2635] = 4.0;
data[2636] = 91.0; data[2637] = 31.0; data[2638] = 21.0; data[2639] = 4.0;
data[2640] = 80.0; data[2641] = 0.0; data[2642] = 32.0; data[2643] = 16.0;
data[2644] = 79.0; data[2645] = 26.0; data[2646] = 43.0; data[2647] = 16.0;
data[2648] = 79.0; data[2649] = 25.0; data[2650] = 63.0; data[2651] = 16.0;
data[2652] = 80.0; data[2653] = 10.0; data[2654] = 57.0; data[2655] = 16.0;
data[2656] = 85.0; data[2657] = 16.0; data[2658] = 32.0; data[2659] = 11.0;
data[2660] = 74.0; data[2661] = 15.0; data[2662] = 32.0; data[2663] = 11.0;
data[2664] = 86.0; data[2665] = 11.0; data[2666] = 42.0; data[2667] = 10.0;
data[2668] = 72.0; data[2669] = 11.0; data[2670] = 43.0; data[2671] = 9.0;
data[2672] = 88.0; data[2673] = 1.0; data[2674] = 46.0; data[2675] = 8.0;
data[2676] = 72.0; data[2677] = 1.0; data[2678] = 46.0; data[2679] = 8.0;
data[2680] = 90.0; data[2681] = 30.0; data[2682] = 32.0; data[2683] = 5.0;
data[2684] = 91.0; data[2685] = 0.0; data[2686] = 63.0; data[2687] = 5.0;
data[2688] = 91.0; data[2689] = 21.0; data[2690] = 53.0; data[2691] = 5.0;
data[2692] = 69.0; data[2693] = 0.0; data[2694] = 63.0; data[2695] = 5.0;
data[2696] = 68.0; data[2697] = 31.0; data[2698] = 32.0; data[2699] = 5.0;
data[2700] = 92.0; data[2701] = 17.0; data[2702] = 48.0; data[2703] = 4.0;
data[2704] = 92.0; data[2705] = 26.0; data[2706] = 53.0; data[2707] = 4.0;
data[2708] = 92.0; data[2709] = 25.0; data[2710] = 32.0; data[2711] = 4.0;
data[2712] = 92.0; data[2713] = 0.0; data[2714] = 53.0; data[2715] = 4.0;
data[2716] = 91.0; data[2717] = 31.0; data[2718] = 53.0; data[2719] = 4.0;
data[2720] = 80.0; data[2721] = 32.0; data[2722] = 0.0; data[2723] = 16.0;
data[2724] = 79.0; data[2725] = 58.0; data[2726] = 11.0; data[2727] = 16.0;
data[2728] = 79.0; data[2729] = 57.0; data[2730] = 31.0; data[2731] = 16.0;
data[2732] = 80.0; data[2733] = 42.0; data[2734] = 25.0; data[2735] = 16.0;
data[2736] = 85.0; data[2737] = 48.0; data[2738] = 0.0; data[2739] = 11.0;
data[2740] = 74.0; data[2741] = 47.0; data[2742] = 0.0; data[2743] = 11.0;
data[2744] = 86.0; data[2745] = 43.0; data[2746] = 10.0; data[2747] = 10.0;
data[2748] = 72.0; data[2749] = 43.0; data[2750] = 11.0; data[2751] = 9.0;
data[2752] = 88.0; data[2753] = 33.0; data[2754] = 14.0; data[2755] = 8.0;
data[2756] = 72.0; data[2757] = 33.0; data[2758] = 14.0; data[2759] = 8.0;
data[2760] = 90.0; data[2761] = 62.0; data[2762] = 0.0; data[2763] = 5.0;
data[2764] = 91.0; data[2765] = 32.0; data[2766] = 31.0; data[2767] = 5.0;
data[2768] = 91.0; data[2769] = 53.0; data[2770] = 21.0; data[2771] = 5.0;
data[2772] = 69.0; data[2773] = 32.0; data[2774] = 31.0; data[2775] = 5.0;
data[2776] = 68.0; data[2777] = 63.0; data[2778] = 0.0; data[2779] = 5.0;
data[2780] = 92.0; data[2781] = 49.0; data[2782] = 16.0; data[2783] = 4.0;
data[2784] = 92.0; data[2785] = 58.0; data[2786] = 21.0; data[2787] = 4.0;
data[2788] = 92.0; data[2789] = 57.0; data[2790] = 0.0; data[2791] = 4.0;
data[2792] = 92.0; data[2793] = 32.0; data[2794] = 21.0; data[2795] = 4.0;
data[2796] = 91.0; data[2797] = 63.0; data[2798] = 21.0; data[2799] = 4.0;
data[2800] = 80.0; data[2801] = 32.0; data[2802] = 32.0; data[2803] = 16.0;
data[2804] = 79.0; data[2805] = 58.0; data[2806] = 43.0; data[2807] = 16.0;
data[2808] = 79.0; data[2809] = 57.0; data[2810] = 63.0; data[2811] = 16.0;
data[2812] = 80.0; data[2813] = 42.0; data[2814] = 57.0; data[2815] = 16.0;
data[2816] = 85.0; data[2817] = 48.0; data[2818] = 32.0; data[2819] = 11.0;
data[2820] = 74.0; data[2821] = 47.0; data[2822] = 32.0; data[2823] = 11.0;
data[2824] = 86.0; data[2825] = 43.0; data[2826] = 42.0; data[2827] = 10.0;
data[2828] = 72.0; data[2829] = 43.0; data[2830] = 43.0; data[2831] = 9.0;
data[2832] = 88.0; data[2833] = 33.0; data[2834] = 46.0; data[2835] = 8.0;
data[2836] = 72.0; data[2837] = 33.0; data[2838] = 46.0; data[2839] = 8.0;
data[2840] = 90.0; data[2841] = 62.0; data[2842] = 32.0; data[2843] = 5.0;
data[2844] = 91.0; data[2845] = 32.0; data[2846] = 63.0; data[2847] = 5.0;
data[2848] = 91.0; data[2849] = 53.0; data[2850] = 53.0; data[2851] = 5.0;
data[2852] = 69.0; data[2853] = 32.0; data[2854] = 63.0; data[2855] = 5.0;
data[2856] = 68.0; data[2857] = 63.0; data[2858] = 32.0; data[2859] = 5.0;
data[2860] = 92.0; data[2861] = 49.0; data[2862] = 48.0; data[2863] = 4.0;
data[2864] = 92.0; data[2865] = 58.0; data[2866] = 53.0; data[2867] = 4.0;
data[2868] = 92.0; data[2869] = 57.0; data[2870] = 32.0; data[2871] = 4.0;
data[2872] = 92.0; data[2873] = 32.0; data[2874] = 53.0; data[2875] = 4.0;
data[2876] = 91.0; data[2877] = 63.0; data[2878] = 53.0; data[2879] = 4.0;
data[2880] = 112.0; data[2881] = 0.0; data[2882] = 0.0; data[2883] = 16.0;
data[2884] = 111.0; data[2885] = 26.0; data[2886] = 11.0; data[2887] = 16.0;
data[2888] = 111.0; data[2889] = 25.0; data[2890] = 31.0; data[2891] = 16.0;
data[2892] = 112.0; data[2893] = 10.0; data[2894] = 25.0; data[2895] = 16.0;
data[2896] = 117.0; data[2897] = 16.0; data[2898] = 0.0; data[2899] = 11.0;
data[2900] = 106.0; data[2901] = 15.0; data[2902] = 0.0; data[2903] = 11.0;
data[2904] = 118.0; data[2905] = 11.0; data[2906] = 10.0; data[2907] = 10.0;
data[2908] = 104.0; data[2909] = 11.0; data[2910] = 11.0; data[2911] = 9.0;
data[2912] = 120.0; data[2913] = 1.0; data[2914] = 14.0; data[2915] = 8.0;
data[2916] = 104.0; data[2917] = 1.0; data[2918] = 14.0; data[2919] = 8.0;
data[2920] = 122.0; data[2921] = 30.0; data[2922] = 0.0; data[2923] = 5.0;
data[2924] = 123.0; data[2925] = 0.0; data[2926] = 31.0; data[2927] = 5.0;
data[2928] = 123.0; data[2929] = 21.0; data[2930] = 21.0; data[2931] = 5.0;
data[2932] = 101.0; data[2933] = 0.0; data[2934] = 31.0; data[2935] = 5.0;
data[2936] = 100.0; data[2937] = 31.0; data[2938] = 0.0; data[2939] = 5.0;
data[2940] = 124.0; data[2941] = 17.0; data[2942] = 16.0; data[2943] = 4.0;
data[2944] = 124.0; data[2945] = 26.0; data[2946] = 21.0; data[2947] = 4.0;
data[2948] = 124.0; data[2949] = 25.0; data[2950] = 0.0; data[2951] = 4.0;
data[2952] = 124.0; data[2953] = 0.0; data[2954] = 21.0; data[2955] = 4.0;
data[2956] = 123.0; data[2957] = 31.0; data[2958] = 21.0; data[2959] = 4.0;
data[2960] = 112.0; data[2961] = 0.0; data[2962] = 32.0; data[2963] = 16.0;
data[2964] = 111.0; data[2965] = 26.0; data[2966] = 43.0; data[2967] = 16.0;
data[2968] = 111.0; data[2969] = 25.0; data[2970] = 63.0; data[2971] = 16.0;
data[2972] = 112.0; data[2973] = 10.0; data[2974] = 57.0; data[2975] = 16.0;
data[2976] = 117.0; data[2977] = 16.0; data[2978] = 32.0; data[2979] = 11.0;
data[2980] = 106.0; data[2981] = 15.0; data[2982] = 32.0; data[2983] = 11.0;
data[2984] = 118.0; data[2985] = 11.0; data[2986] = 42.0; data[2987] = 10.0;
data[2988] = 104.0; data[2989] = 11.0; data[2990] = 43.0; data[2991] = 9.0;
data[2992] = 120.0; data[2993] = 1.0; data[2994] = 46.0; data[2995] = 8.0;
data[2996] = 104.0; data[2997] = 1.0; data[2998] = 46.0; data[2999] = 8.0;
data[3000] = 122.0; data[3001] = 30.0; data[3002] = 32.0; data[3003] = 5.0;
data[3004] = 123.0; data[3005] = 0.0; data[3006] = 63.0; data[3007] = 5.0;
data[3008] = 123.0; data[3009] = 21.0; data[3010] = 53.0; data[3011] = 5.0;
data[3012] = 101.0; data[3013] = 0.0; data[3014] = 63.0; data[3015] = 5.0;
data[3016] = 100.0; data[3017] = 31.0; data[3018] = 32.0; data[3019] = 5.0;
data[3020] = 124.0; data[3021] = 17.0; data[3022] = 48.0; data[3023] = 4.0;
data[3024] = 124.0; data[3025] = 26.0; data[3026] = 53.0; data[3027] = 4.0;
data[3028] = 124.0; data[3029] = 25.0; data[3030] = 32.0; data[3031] = 4.0;
data[3032] = 124.0; data[3033] = 0.0; data[3034] = 53.0; data[3035] = 4.0;
data[3036] = 123.0; data[3037] = 31.0; data[3038] = 53.0; data[3039] = 4.0;
data[3040] = 112.0; data[3041] = 32.0; data[3042] = 0.0; data[3043] = 16.0;
data[3044] = 111.0; data[3045] = 58.0; data[3046] = 11.0; data[3047] = 16.0;
data[3048] = 111.0; data[3049] = 57.0; data[3050] = 31.0; data[3051] = 16.0;
data[3052] = 112.0; data[3053] = 42.0; data[3054] = 25.0; data[3055] = 16.0;
data[3056] = 117.0; data[3057] = 48.0; data[3058] = 0.0; data[3059] = 11.0;
data[3060] = 106.0; data[3061] = 47.0; data[3062] = 0.0; data[3063] = 11.0;
data[3064] = 118.0; data[3065] = 43.0; data[3066] = 10.0; data[3067] = 10.0;
data[3068] = 104.0; data[3069] = 43.0; data[3070] = 11.0; data[3071] = 9.0;
data[3072] = 120.0; data[3073] = 33.0; data[3074] = 14.0; data[3075] = 8.0;
data[3076] = 104.0; data[3077] = 33.0; data[3078] = 14.0; data[3079] = 8.0;
data[3080] = 122.0; data[3081] = 62.0; data[3082] = 0.0; data[3083] = 5.0;
data[3084] = 123.0; data[3085] = 32.0; data[3086] = 31.0; data[3087] = 5.0;
data[3088] = 123.0; data[3089] = 53.0; data[3090] = 21.0; data[3091] = 5.0;
data[3092] = 101.0; data[3093] = 32.0; data[3094] = 31.0; data[3095] = 5.0;
data[3096] = 100.0; data[3097] = 63.0; data[3098] = 0.0; data[3099] = 5.0;
data[3100] = 124.0; data[3101] = 49.0; data[3102] = 16.0; data[3103] = 4.0;
data[3104] = 124.0; data[3105] = 58.0; data[3106] = 21.0; data[3107] = 4.0;
data[3108] = 124.0; data[3109] = 57.0; data[3110] = 0.0; data[3111] = 4.0;
data[3112] = 124.0; data[3113] = 32.0; data[3114] = 21.0; data[3115] = 4.0;
data[3116] = 123.0; data[3117] = 63.0; data[3118] = 21.0; data[3119] = 4.0;
data[3120] = 112.0; data[3121] = 32.0; data[3122] = 32.0; data[3123] = 16.0;
data[3124] = 111.0; data[3125] = 58.0; data[3126] = 43.0; data[3127] = 16.0;
data[3128] = 111.0; data[3129] = 57.0; data[3130] = 63.0; data[3131] = 16.0;
data[3132] = 112.0; data[3133] = 42.0; data[3134] = 57.0; data[3135] = 16.0;
data[3136] = 117.0; data[3137] = 48.0; data[3138] = 32.0; data[3139] = 11.0;
data[3140] = 106.0; data[3141] = 47.0; data[3142] = 32.0; data[3143] = 11.0;
data[3144] = 118.0; data[3145] = 43.0; data[3146] = 42.0; data[3147] = 10.0;
data[3148] = 104.0; data[3149] = 43.0; data[3150] = 43.0; data[3151] = 9.0;
data[3152] = 120.0; data[3153] = 33.0; data[3154] = 46.0; data[3155] = 8.0;
data[3156] = 104.0; data[3157] = 33.0; data[3158] = 46.0; data[3159] = 8.0;
data[3160] = 122.0; data[3161] = 62.0; data[3162] = 32.0; data[3163] = 5.0;
data[3164] = 123.0; data[3165] = 32.0; data[3166] = 63.0; data[3167] = 5.0;
data[3168] = 123.0; data[3169] = 53.0; data[3170] = 53.0; data[3171] = 5.0;
data[3172] = 101.0; data[3173] = 32.0; data[3174] = 63.0; data[3175] = 5.0;
data[3176] = 100.0; data[3177] = 63.0; data[3178] = 32.0; data[3179] = 5.0;
data[3180] = 124.0; data[3181] = 49.0; data[3182] = 48.0; data[3183] = 4.0;
data[3184] = 124.0; data[3185] = 58.0; data[3186] = 53.0; data[3187] = 4.0;
data[3188] = 124.0; data[3189] = 57.0; data[3190] = 32.0; data[3191] = 4.0;
data[3192] = 124.0; data[3193] = 32.0; data[3194] = 53.0; data[3195] = 4.0;
data[3196] = 123.0; data[3197] = 63.0; data[3198] = 53.0; data[3199] = 4.0;
data[3200] = 80.0; data[3201] = 0.0; data[3202] = 64.0; data[3203] = 16.0;
data[3204] = 79.0; data[3205] = 26.0; data[3206] = 75.0; data[3207] = 16.0;
data[3208] = 79.0; data[3209] = 25.0; data[3210] = 95.0; data[3211] = 16.0;
data[3212] = 80.0; data[3213] = 10.0; data[3214] = 89.0; data[3215] = 16.0;
data[3216] = 85.0; data[3217] = 16.0; data[3218] = 64.0; data[3219] = 11.0;
data[3220] = 74.0; data[3221] = 15.0; data[3222] = 64.0; data[3223] = 11.0;
data[3224] = 86.0; data[3225] = 11.0; data[3226] = 74.0; data[3227] = 10.0;
data[3228] = 72.0; data[3229] = 11.0; data[3230] = 75.0; data[3231] = 9.0;
data[3232] = 88.0; data[3233] = 1.0; data[3234] = 78.0; data[3235] = 8.0;
data[3236] = 72.0; data[3237] = 1.0; data[3238] = 78.0; data[3239] = 8.0;
data[3240] = 90.0; data[3241] = 30.0; data[3242] = 64.0; data[3243] = 5.0;
data[3244] = 91.0; data[3245] = 0.0; data[3246] = 95.0; data[3247] = 5.0;
data[3248] = 91.0; data[3249] = 21.0; data[3250] = 85.0; data[3251] = 5.0;
data[3252] = 69.0; data[3253] = 0.0; data[3254] = 95.0; data[3255] = 5.0;
data[3256] = 68.0; data[3257] = 31.0; data[3258] = 64.0; data[3259] = 5.0;
data[3260] = 92.0; data[3261] = 17.0; data[3262] = 80.0; data[3263] = 4.0;
data[3264] = 92.0; data[3265] = 26.0; data[3266] = 85.0; data[3267] = 4.0;
data[3268] = 92.0; data[3269] = 25.0; data[3270] = 64.0; data[3271] = 4.0;
data[3272] = 92.0; data[3273] = 0.0; data[3274] = 85.0; data[3275] = 4.0;
data[3276] = 91.0; data[3277] = 31.0; data[3278] = 85.0; data[3279] = 4.0;
data[3280] = 80.0; data[3281] = 0.0; data[3282] = 96.0; data[3283] = 16.0;
data[3284] = 79.0; data[3285] = 26.0; data[3286] = 107.0; data[3287] = 16.0;
data[3288] = 79.0; data[3289] = 25.0; data[3290] = 127.0; data[3291] = 16.0;
data[3292] = 80.0; data[3293] = 10.0; data[3294] = 121.0; data[3295] = 16.0;
data[3296] = 85.0; data[3297] = 16.0; data[3298] = 96.0; data[3299] = 11.0;
data[3300] = 74.0; data[3301] = 15.0; data[3302] = 96.0; data[3303] = 11.0;
data[3304] = 86.0; data[3305] = 11.0; data[3306] = 106.0; data[3307] = 10.0;
data[3308] = 72.0; data[3309] = 11.0; data[3310] = 107.0; data[3311] = 9.0;
data[3312] = 88.0; data[3313] = 1.0; data[3314] = 110.0; data[3315] = 8.0;
data[3316] = 72.0; data[3317] = 1.0; data[3318] = 110.0; data[3319] = 8.0;
data[3320] = 90.0; data[3321] = 30.0; data[3322] = 96.0; data[3323] = 5.0;
data[3324] = 91.0; data[3325] = 0.0; data[3326] = 127.0; data[3327] = 5.0;
data[3328] = 91.0; data[3329] = 21.0; data[3330] = 117.0; data[3331] = 5.0;
data[3332] = 69.0; data[3333] = 0.0; data[3334] = 127.0; data[3335] = 5.0;
data[3336] = 68.0; data[3337] = 31.0; data[3338] = 96.0; data[3339] = 5.0;
data[3340] = 92.0; data[3341] = 17.0; data[3342] = 112.0; data[3343] = 4.0;
data[3344] = 92.0; data[3345] = 26.0; data[3346] = 117.0; data[3347] = 4.0;
data[3348] = 92.0; data[3349] = 25.0; data[3350] = 96.0; data[3351] = 4.0;
data[3352] = 92.0; data[3353] = 0.0; data[3354] = 117.0; data[3355] = 4.0;
data[3356] = 91.0; data[3357] = 31.0; data[3358] = 117.0; data[3359] = 4.0;
data[3360] = 80.0; data[3361] = 32.0; data[3362] = 64.0; data[3363] = 16.0;
data[3364] = 79.0; data[3365] = 58.0; data[3366] = 75.0; data[3367] = 16.0;
data[3368] = 79.0; data[3369] = 57.0; data[3370] = 95.0; data[3371] = 16.0;
data[3372] = 80.0; data[3373] = 42.0; data[3374] = 89.0; data[3375] = 16.0;
data[3376] = 85.0; data[3377] = 48.0; data[3378] = 64.0; data[3379] = 11.0;
data[3380] = 74.0; data[3381] = 47.0; data[3382] = 64.0; data[3383] = 11.0;
data[3384] = 86.0; data[3385] = 43.0; data[3386] = 74.0; data[3387] = 10.0;
data[3388] = 72.0; data[3389] = 43.0; data[3390] = 75.0; data[3391] = 9.0;
data[3392] = 88.0; data[3393] = 33.0; data[3394] = 78.0; data[3395] = 8.0;
data[3396] = 72.0; data[3397] = 33.0; data[3398] = 78.0; data[3399] = 8.0;
data[3400] = 90.0; data[3401] = 62.0; data[3402] = 64.0; data[3403] = 5.0;
data[3404] = 91.0; data[3405] = 32.0; data[3406] = 95.0; data[3407] = 5.0;
data[3408] = 91.0; data[3409] = 53.0; data[3410] = 85.0; data[3411] = 5.0;
data[3412] = 69.0; data[3413] = 32.0; data[3414] = 95.0; data[3415] = 5.0;
data[3416] = 68.0; data[3417] = 63.0; data[3418] = 64.0; data[3419] = 5.0;
data[3420] = 92.0; data[3421] = 49.0; data[3422] = 80.0; data[3423] = 4.0;
data[3424] = 92.0; data[3425] = 58.0; data[3426] = 85.0; data[3427] = 4.0;
data[3428] = 92.0; data[3429] = 57.0; data[3430] = 64.0; data[3431] = 4.0;
data[3432] = 92.0; data[3433] = 32.0; data[3434] = 85.0; data[3435] = 4.0;
data[3436] = 91.0; data[3437] = 63.0; data[3438] = 85.0; data[3439] = 4.0;
data[3440] = 80.0; data[3441] = 32.0; data[3442] = 96.0; data[3443] = 16.0;
data[3444] = 79.0; data[3445] = 58.0; data[3446] = 107.0; data[3447] = 16.0;
data[3448] = 79.0; data[3449] = 57.0; data[3450] = 127.0; data[3451] = 16.0;
data[3452] = 80.0; data[3453] = 42.0; data[3454] = 121.0; data[3455] = 16.0;
data[3456] = 85.0; data[3457] = 48.0; data[3458] = 96.0; data[3459] = 11.0;
data[3460] = 74.0; data[3461] = 47.0; data[3462] = 96.0; data[3463] = 11.0;
data[3464] = 86.0; data[3465] = 43.0; data[3466] = 106.0; data[3467] = 10.0;
data[3468] = 72.0; data[3469] = 43.0; data[3470] = 107.0; data[3471] = 9.0;
data[3472] = 88.0; data[3473] = 33.0; data[3474] = 110.0; data[3475] = 8.0;
data[3476] = 72.0; data[3477] = 33.0; data[3478] = 110.0; data[3479] = 8.0;
data[3480] = 90.0; data[3481] = 62.0; data[3482] = 96.0; data[3483] = 5.0;
data[3484] = 91.0; data[3485] = 32.0; data[3486] = 127.0; data[3487] = 5.0;
data[3488] = 91.0; data[3489] = 53.0; data[3490] = 117.0; data[3491] = 5.0;
data[3492] = 69.0; data[3493] = 32.0; data[3494] = 127.0; data[3495] = 5.0;
data[3496] = 68.0; data[3497] = 63.0; data[3498] = 96.0; data[3499] = 5.0;
data[3500] = 92.0; data[3501] = 49.0; data[3502] = 112.0; data[3503] = 4.0;
data[3504] = 92.0; data[3505] = 58.0; data[3506] = 117.0; data[3507] = 4.0;
data[3508] = 92.0; data[3509] = 57.0; data[3510] = 96.0; data[3511] = 4.0;
data[3512] = 92.0; data[3513] = 32.0; data[3514] = 117.0; data[3515] = 4.0;
data[3516] = 91.0; data[3517] = 63.0; data[3518] = 117.0; data[3519] = 4.0;
data[3520] = 112.0; data[3521] = 0.0; data[3522] = 64.0; data[3523] = 16.0;
data[3524] = 111.0; data[3525] = 26.0; data[3526] = 75.0; data[3527] = 16.0;
data[3528] = 111.0; data[3529] = 25.0; data[3530] = 95.0; data[3531] = 16.0;
data[3532] = 112.0; data[3533] = 10.0; data[3534] = 89.0; data[3535] = 16.0;
data[3536] = 117.0; data[3537] = 16.0; data[3538] = 64.0; data[3539] = 11.0;
data[3540] = 106.0; data[3541] = 15.0; data[3542] = 64.0; data[3543] = 11.0;
data[3544] = 118.0; data[3545] = 11.0; data[3546] = 74.0; data[3547] = 10.0;
data[3548] = 104.0; data[3549] = 11.0; data[3550] = 75.0; data[3551] = 9.0;
data[3552] = 120.0; data[3553] = 1.0; data[3554] = 78.0; data[3555] = 8.0;
data[3556] = 104.0; data[3557] = 1.0; data[3558] = 78.0; data[3559] = 8.0;
data[3560] = 122.0; data[3561] = 30.0; data[3562] = 64.0; data[3563] = 5.0;
data[3564] = 123.0; data[3565] = 0.0; data[3566] = 95.0; data[3567] = 5.0;
data[3568] = 123.0; data[3569] = 21.0; data[3570] = 85.0; data[3571] = 5.0;
data[3572] = 101.0; data[3573] = 0.0; data[3574] = 95.0; data[3575] = 5.0;
data[3576] = 100.0; data[3577] = 31.0; data[3578] = 64.0; data[3579] = 5.0;
data[3580] = 124.0; data[3581] = 17.0; data[3582] = 80.0; data[3583] = 4.0;
data[3584] = 124.0; data[3585] = 26.0; data[3586] = 85.0; data[3587] = 4.0;
data[3588] = 124.0; data[3589] = 25.0; data[3590] = 64.0; data[3591] = 4.0;
data[3592] = 124.0; data[3593] = 0.0; data[3594] = 85.0; data[3595] = 4.0;
data[3596] = 123.0; data[3597] = 31.0; data[3598] = 85.0; data[3599] = 4.0;
data[3600] = 112.0; data[3601] = 0.0; data[3602] = 96.0; data[3603] = 16.0;
data[3604] = 111.0; data[3605] = 26.0; data[3606] = 107.0; data[3607] = 16.0;
data[3608] = 111.0; data[3609] = 25.0; data[3610] = 127.0; data[3611] = 16.0;
data[3612] = 112.0; data[3613] = 10.0; data[3614] = 121.0; data[3615] = 16.0;
data[3616] = 117.0; data[3617] = 16.0; data[3618] = 96.0; data[3619] = 11.0;
data[3620] = 106.0; data[3621] = 15.0; data[3622] = 96.0; data[3623] = 11.0;
data[3624] = 118.0; data[3625] = 11.0; data[3626] = 106.0; data[3627] = 10.0;
data[3628] = 104.0; data[3629] = 11.0; data[3630] = 107.0; data[3631] = 9.0;
data[3632] = 120.0; data[3633] = 1.0; data[3634] = 110.0; data[3635] = 8.0;
data[3636] = 104.0; data[3637] = 1.0; data[3638] = 110.0; data[3639] = 8.0;
data[3640] = 122.0; data[3641] = 30.0; data[3642] = 96.0; data[3643] = 5.0;
data[3644] = 123.0; data[3645] = 0.0; data[3646] = 127.0; data[3647] = 5.0;
data[3648] = 123.0; data[3649] = 21.0; data[3650] = 117.0; data[3651] = 5.0;
data[3652] = 101.0; data[3653] = 0.0; data[3654] = 127.0; data[3655] = 5.0;
data[3656] = 100.0; data[3657] = 31.0; data[3658] = 96.0; data[3659] = 5.0;
data[3660] = 124.0; data[3661] = 17.0; data[3662] = 112.0; data[3663] = 4.0;
data[3664] = 124.0; data[3665] = 26.0; data[3666] = 117.0; data[3667] = 4.0;
data[3668] = 124.0; data[3669] = 25.0; data[3670] = 96.0; data[3671] = 4.0;
data[3672] = 124.0; data[3673] = 0.0; data[3674] = 117.0; data[3675] = 4.0;
data[3676] = 123.0; data[3677] = 31.0; data[3678] = 117.0; data[3679] = 4.0;
data[3680] = 112.0; data[3681] = 32.0; data[3682] = 64.0; data[3683] = 16.0;
data[3684] = 111.0; data[3685] = 58.0; data[3686] = 75.0; data[3687] = 16.0;
data[3688] = 111.0; data[3689] = 57.0; data[3690] = 95.0; data[3691] = 16.0;
data[3692] = 112.0; data[3693] = 42.0; data[3694] = 89.0; data[3695] = 16.0;
data[3696] = 117.0; data[3697] = 48.0; data[3698] = 64.0; data[3699] = 11.0;
data[3700] = 106.0; data[3701] = 47.0; data[3702] = 64.0; data[3703] = 11.0;
data[3704] = 118.0; data[3705] = 43.0; data[3706] = 74.0; data[3707] = 10.0;
data[3708] = 104.0; data[3709] = 43.0; data[3710] = 75.0; data[3711] = 9.0;
data[3712] = 120.0; data[3713] = 33.0; data[3714] = 78.0; data[3715] = 8.0;
data[3716] = 104.0; data[3717] = 33.0; data[3718] = 78.0; data[3719] = 8.0;
data[3720] = 122.0; data[3721] = 62.0; data[3722] = 64.0; data[3723] = 5.0;
data[3724] = 123.0; data[3725] = 32.0; data[3726] = 95.0; data[3727] = 5.0;
data[3728] = 123.0; data[3729] = 53.0; data[3730] = 85.0; data[3731] = 5.0;
data[3732] = 101.0; data[3733] = 32.0; data[3734] = 95.0; data[3735] = 5.0;
data[3736] = 100.0; data[3737] = 63.0; data[3738] = 64.0; data[3739] = 5.0;
data[3740] = 124.0; data[3741] = 49.0; data[3742] = 80.0; data[3743] = 4.0;
data[3744] = 124.0; data[3745] = 58.0; data[3746] = 85.0; data[3747] = 4.0;
data[3748] = 124.0; data[3749] = 57.0; data[3750] = 64.0; data[3751] = 4.0;
data[3752] = 124.0; data[3753] = 32.0; data[3754] = 85.0; data[3755] = 4.0;
data[3756] = 123.0; data[3757] = 63.0; data[3758] = 85.0; data[3759] = 4.0;
data[3760] = 112.0; data[3761] = 32.0; data[3762] = 96.0; data[3763] = 16.0;
data[3764] = 111.0; data[3765] = 58.0; data[3766] = 107.0; data[3767] = 16.0;
data[3768] = 111.0; data[3769] = 57.0; data[3770] = 127.0; data[3771] = 16.0;
data[3772] = 112.0; data[3773] = 42.0; data[3774] = 121.0; data[3775] = 16.0;
data[3776] = 117.0; data[3777] = 48.0; data[3778] = 96.0; data[3779] = 11.0;
data[3780] = 106.0; data[3781] = 47.0; data[3782] = 96.0; data[3783] = 11.0;
data[3784] = 118.0; data[3785] = 43.0; data[3786] = 106.0; data[3787] = 10.0;
data[3788] = 104.0; data[3789] = 43.0; data[3790] = 107.0; data[3791] = 9.0;
data[3792] = 120.0; data[3793] = 33.0; data[3794] = 110.0; data[3795] = 8.0;
data[3796] = 104.0; data[3797] = 33.0; data[3798] = 110.0; data[3799] = 8.0;
data[3800] = 122.0; data[3801] = 62.0; data[3802] = 96.0; data[3803] = 5.0;
data[3804] = 123.0; data[3805] = 32.0; data[3806] = 127.0; data[3807] = 5.0;
data[3808] = 123.0; data[3809] = 53.0; data[3810] = 117.0; data[3811] = 5.0;
data[3812] = 101.0; data[3813] = 32.0; data[3814] = 127.0; data[3815] = 5.0;
data[3816] = 100.0; data[3817] = 63.0; data[3818] = 96.0; data[3819] = 5.0;
data[3820] = 124.0; data[3821] = 49.0; data[3822] = 112.0; data[3823] = 4.0;
data[3824] = 124.0; data[3825] = 58.0; data[3826] = 117.0; data[3827] = 4.0;
data[3828] = 124.0; data[3829] = 57.0; data[3830] = 96.0; data[3831] = 4.0;
data[3832] = 124.0; data[3833] = 32.0; data[3834] = 117.0; data[3835] = 4.0;
data[3836] = 123.0; data[3837] = 63.0; data[3838] = 117.0; data[3839] = 4.0;
data[3840] = 80.0; data[3841] = 64.0; data[3842] = 0.0; data[3843] = 16.0;
data[3844] = 79.0; data[3845] = 90.0; data[3846] = 11.0; data[3847] = 16.0;
data[3848] = 79.0; data[3849] = 89.0; data[3850] = 31.0; data[3851] = 16.0;
data[3852] = 80.0; data[3853] = 74.0; data[3854] = 25.0; data[3855] = 16.0;
data[3856] = 85.0; data[3857] = 80.0; data[3858] = 0.0; data[3859] = 11.0;
data[3860] = 74.0; data[3861] = 79.0; data[3862] = 0.0; data[3863] = 11.0;
data[3864] = 86.0; data[3865] = 75.0; data[3866] = 10.0; data[3867] = 10.0;
data[3868] = 72.0; data[3869] = 75.0; data[3870] = 11.0; data[3871] = 9.0;
data[3872] = 88.0; data[3873] = 65.0; data[3874] = 14.0; data[3875] = 8.0;
data[3876] = 72.0; data[3877] = 65.0; data[3878] = 14.0; data[3879] = 8.0;
data[3880] = 90.0; data[3881] = 94.0; data[3882] = 0.0; data[3883] = 5.0;
data[3884] = 91.0; data[3885] = 64.0; data[3886] = 31.0; data[3887] = 5.0;
data[3888] = 91.0; data[3889] = 85.0; data[3890] = 21.0; data[3891] = 5.0;
data[3892] = 69.0; data[3893] = 64.0; data[3894] = 31.0; data[3895] = 5.0;
data[3896] = 68.0; data[3897] = 95.0; data[3898] = 0.0; data[3899] = 5.0;
data[3900] = 92.0; data[3901] = 81.0; data[3902] = 16.0; data[3903] = 4.0;
data[3904] = 92.0; data[3905] = 90.0; data[3906] = 21.0; data[3907] = 4.0;
data[3908] = 92.0; data[3909] = 89.0; data[3910] = 0.0; data[3911] = 4.0;
data[3912] = 92.0; data[3913] = 64.0; data[3914] = 21.0; data[3915] = 4.0;
data[3916] = 91.0; data[3917] = 95.0; data[3918] = 21.0; data[3919] = 4.0;
data[3920] = 80.0; data[3921] = 64.0; data[3922] = 32.0; data[3923] = 16.0;
data[3924] = 79.0; data[3925] = 90.0; data[3926] = 43.0; data[3927] = 16.0;
data[3928] = 79.0; data[3929] = 89.0; data[3930] = 63.0; data[3931] = 16.0;
data[3932] = 80.0; data[3933] = 74.0; data[3934] = 57.0; data[3935] = 16.0;
data[3936] = 85.0; data[3937] = 80.0; data[3938] = 32.0; data[3939] = 11.0;
data[3940] = 74.0; data[3941] = 79.0; data[3942] = 32.0; data[3943] = 11.0;
data[3944] = 86.0; data[3945] = 75.0; data[3946] = 42.0; data[3947] = 10.0;
data[3948] = 72.0; data[3949] = 75.0; data[3950] = 43.0; data[3951] = 9.0;
data[3952] = 88.0; data[3953] = 65.0; data[3954] = 46.0; data[3955] = 8.0;
data[3956] = 72.0; data[3957] = 65.0; data[3958] = 46.0; data[3959] = 8.0;
data[3960] = 90.0; data[3961] = 94.0; data[3962] = 32.0; data[3963] = 5.0;
data[3964] = 91.0; data[3965] = 64.0; data[3966] = 63.0; data[3967] = 5.0;
data[3968] = 91.0; data[3969] = 85.0; data[3970] = 53.0; data[3971] = 5.0;
data[3972] = 69.0; data[3973] = 64.0; data[3974] = 63.0; data[3975] = 5.0;
data[3976] = 68.0; data[3977] = 95.0; data[3978] = 32.0; data[3979] = 5.0;
data[3980] = 92.0; data[3981] = 81.0; data[3982] = 48.0; data[3983] = 4.0;
data[3984] = 92.0; data[3985] = 90.0; data[3986] = 53.0; data[3987] = 4.0;
data[3988] = 92.0; data[3989] = 89.0; data[3990] = 32.0; data[3991] = 4.0;
data[3992] = 92.0; data[3993] = 64.0; data[3994] = 53.0; data[3995] = 4.0;
data[3996] = 91.0; data[3997] = 95.0; data[3998] = 53.0; data[3999] = 4.0;
data[4000] = 80.0; data[4001] = 96.0; data[4002] = 0.0; data[4003] = 16.0;
data[4004] = 79.0; data[4005] = 122.0; data[4006] = 11.0; data[4007] = 16.0;
data[4008] = 79.0; data[4009] = 121.0; data[4010] = 31.0; data[4011] = 16.0;
data[4012] = 80.0; data[4013] = 106.0; data[4014] = 25.0; data[4015] = 16.0;
data[4016] = 85.0; data[4017] = 112.0; data[4018] = 0.0; data[4019] = 11.0;
data[4020] = 74.0; data[4021] = 111.0; data[4022] = 0.0; data[4023] = 11.0;
data[4024] = 86.0; data[4025] = 107.0; data[4026] = 10.0; data[4027] = 10.0;
data[4028] = 72.0; data[4029] = 107.0; data[4030] = 11.0; data[4031] = 9.0;
data[4032] = 88.0; data[4033] = 97.0; data[4034] = 14.0; data[4035] = 8.0;
data[4036] = 72.0; data[4037] = 97.0; data[4038] = 14.0; data[4039] = 8.0;
data[4040] = 90.0; data[4041] = 126.0; data[4042] = 0.0; data[4043] = 5.0;
data[4044] = 91.0; data[4045] = 96.0; data[4046] = 31.0; data[4047] = 5.0;
data[4048] = 91.0; data[4049] = 117.0; data[4050] = 21.0; data[4051] = 5.0;
data[4052] = 69.0; data[4053] = 96.0; data[4054] = 31.0; data[4055] = 5.0;
data[4056] = 68.0; data[4057] = 127.0; data[4058] = 0.0; data[4059] = 5.0;
data[4060] = 92.0; data[4061] = 113.0; data[4062] = 16.0; data[4063] = 4.0;
data[4064] = 92.0; data[4065] = 122.0; data[4066] = 21.0; data[4067] = 4.0;
data[4068] = 92.0; data[4069] = 121.0; data[4070] = 0.0; data[4071] = 4.0;
data[4072] = 92.0; data[4073] = 96.0; data[4074] = 21.0; data[4075] = 4.0;
data[4076] = 91.0; data[4077] = 127.0; data[4078] = 21.0; data[4079] = 4.0;
data[4080] = 80.0; data[4081] = 96.0; data[4082] = 32.0; data[4083] = 16.0;
data[4084] = 79.0; data[4085] = 122.0; data[4086] = 43.0; data[4087] = 16.0;
data[4088] = 79.0; data[4089] = 121.0; data[4090] = 63.0; data[4091] = 16.0;
data[4092] = 80.0; data[4093] = 106.0; data[4094] = 57.0; data[4095] = 16.0;
data[4096] = 85.0; data[4097] = 112.0; data[4098] = 32.0; data[4099] = 11.0;
data[4100] = 74.0; data[4101] = 111.0; data[4102] = 32.0; data[4103] = 11.0;
data[4104] = 86.0; data[4105] = 107.0; data[4106] = 42.0; data[4107] = 10.0;
data[4108] = 72.0; data[4109] = 107.0; data[4110] = 43.0; data[4111] = 9.0;
data[4112] = 88.0; data[4113] = 97.0; data[4114] = 46.0; data[4115] = 8.0;
data[4116] = 72.0; data[4117] = 97.0; data[4118] = 46.0; data[4119] = 8.0;
data[4120] = 90.0; data[4121] = 126.0; data[4122] = 32.0; data[4123] = 5.0;
data[4124] = 91.0; data[4125] = 96.0; data[4126] = 63.0; data[4127] = 5.0;
data[4128] = 91.0; data[4129] = 117.0; data[4130] = 53.0; data[4131] = 5.0;
data[4132] = 69.0; data[4133] = 96.0; data[4134] = 63.0; data[4135] = 5.0;
data[4136] = 68.0; data[4137] = 127.0; data[4138] = 32.0; data[4139] = 5.0;
data[4140] = 92.0; data[4141] = 113.0; data[4142] = 48.0; data[4143] = 4.0;
data[4144] = 92.0; data[4145] = 122.0; data[4146] = 53.0; data[4147] = 4.0;
data[4148] = 92.0; data[4149] = 121.0; data[4150] = 32.0; data[4151] = 4.0;
data[4152] = 92.0; data[4153] = 96.0; data[4154] = 53.0; data[4155] = 4.0;
data[4156] = 91.0; data[4157] = 127.0; data[4158] = 53.0; data[4159] = 4.0;
data[4160] = 112.0; data[4161] = 64.0; data[4162] = 0.0; data[4163] = 16.0;
data[4164] = 111.0; data[4165] = 90.0; data[4166] = 11.0; data[4167] = 16.0;
data[4168] = 111.0; data[4169] = 89.0; data[4170] = 31.0; data[4171] = 16.0;
data[4172] = 112.0; data[4173] = 74.0; data[4174] = 25.0; data[4175] = 16.0;
data[4176] = 117.0; data[4177] = 80.0; data[4178] = 0.0; data[4179] = 11.0;
data[4180] = 106.0; data[4181] = 79.0; data[4182] = 0.0; data[4183] = 11.0;
data[4184] = 118.0; data[4185] = 75.0; data[4186] = 10.0; data[4187] = 10.0;
data[4188] = 104.0; data[4189] = 75.0; data[4190] = 11.0; data[4191] = 9.0;
data[4192] = 120.0; data[4193] = 65.0; data[4194] = 14.0; data[4195] = 8.0;
data[4196] = 104.0; data[4197] = 65.0; data[4198] = 14.0; data[4199] = 8.0;
data[4200] = 122.0; data[4201] = 94.0; data[4202] = 0.0; data[4203] = 5.0;
data[4204] = 123.0; data[4205] = 64.0; data[4206] = 31.0; data[4207] = 5.0;
data[4208] = 123.0; data[4209] = 85.0; data[4210] = 21.0; data[4211] = 5.0;
data[4212] = 101.0; data[4213] = 64.0; data[4214] = 31.0; data[4215] = 5.0;
data[4216] = 100.0; data[4217] = 95.0; data[4218] = 0.0; data[4219] = 5.0;
data[4220] = 124.0; data[4221] = 81.0; data[4222] = 16.0; data[4223] = 4.0;
data[4224] = 124.0; data[4225] = 90.0; data[4226] = 21.0; data[4227] = 4.0;
data[4228] = 124.0; data[4229] = 89.0; data[4230] = 0.0; data[4231] = 4.0;
data[4232] = 124.0; data[4233] = 64.0; data[4234] = 21.0; data[4235] = 4.0;
data[4236] = 123.0; data[4237] = 95.0; data[4238] = 21.0; data[4239] = 4.0;
data[4240] = 112.0; data[4241] = 64.0; data[4242] = 32.0; data[4243] = 16.0;
data[4244] = 111.0; data[4245] = 90.0; data[4246] = 43.0; data[4247] = 16.0;
data[4248] = 111.0; data[4249] = 89.0; data[4250] = 63.0; data[4251] = 16.0;
data[4252] = 112.0; data[4253] = 74.0; data[4254] = 57.0; data[4255] = 16.0;
data[4256] = 117.0; data[4257] = 80.0; data[4258] = 32.0; data[4259] = 11.0;
data[4260] = 106.0; data[4261] = 79.0; data[4262] = 32.0; data[4263] = 11.0;
data[4264] = 118.0; data[4265] = 75.0; data[4266] = 42.0; data[4267] = 10.0;
data[4268] = 104.0; data[4269] = 75.0; data[4270] = 43.0; data[4271] = 9.0;
data[4272] = 120.0; data[4273] = 65.0; data[4274] = 46.0; data[4275] = 8.0;
data[4276] = 104.0; data[4277] = 65.0; data[4278] = 46.0; data[4279] = 8.0;
data[4280] = 122.0; data[4281] = 94.0; data[4282] = 32.0; data[4283] = 5.0;
data[4284] = 123.0; data[4285] = 64.0; data[4286] = 63.0; data[4287] = 5.0;
data[4288] = 123.0; data[4289] = 85.0; data[4290] = 53.0; data[4291] = 5.0;
data[4292] = 101.0; data[4293] = 64.0; data[4294] = 63.0; data[4295] = 5.0;
data[4296] = 100.0; data[4297] = 95.0; data[4298] = 32.0; data[4299] = 5.0;
data[4300] = 124.0; data[4301] = 81.0; data[4302] = 48.0; data[4303] = 4.0;
data[4304] = 124.0; data[4305] = 90.0; data[4306] = 53.0; data[4307] = 4.0;
data[4308] = 124.0; data[4309] = 89.0; data[4310] = 32.0; data[4311] = 4.0;
data[4312] = 124.0; data[4313] = 64.0; data[4314] = 53.0; data[4315] = 4.0;
data[4316] = 123.0; data[4317] = 95.0; data[4318] = 53.0; data[4319] = 4.0;
data[4320] = 112.0; data[4321] = 96.0; data[4322] = 0.0; data[4323] = 16.0;
data[4324] = 111.0; data[4325] = 122.0; data[4326] = 11.0; data[4327] = 16.0;
data[4328] = 111.0; data[4329] = 121.0; data[4330] = 31.0; data[4331] = 16.0;
data[4332] = 112.0; data[4333] = 106.0; data[4334] = 25.0; data[4335] = 16.0;
data[4336] = 117.0; data[4337] = 112.0; data[4338] = 0.0; data[4339] = 11.0;
data[4340] = 106.0; data[4341] = 111.0; data[4342] = 0.0; data[4343] = 11.0;
data[4344] = 118.0; data[4345] = 107.0; data[4346] = 10.0; data[4347] = 10.0;
data[4348] = 104.0; data[4349] = 107.0; data[4350] = 11.0; data[4351] = 9.0;
data[4352] = 120.0; data[4353] = 97.0; data[4354] = 14.0; data[4355] = 8.0;
data[4356] = 104.0; data[4357] = 97.0; data[4358] = 14.0; data[4359] = 8.0;
data[4360] = 122.0; data[4361] = 126.0; data[4362] = 0.0; data[4363] = 5.0;
data[4364] = 123.0; data[4365] = 96.0; data[4366] = 31.0; data[4367] = 5.0;
data[4368] = 123.0; data[4369] = 117.0; data[4370] = 21.0; data[4371] = 5.0;
data[4372] = 101.0; data[4373] = 96.0; data[4374] = 31.0; data[4375] = 5.0;
data[4376] = 100.0; data[4377] = 127.0; data[4378] = 0.0; data[4379] = 5.0;
data[4380] = 124.0; data[4381] = 113.0; data[4382] = 16.0; data[4383] = 4.0;
data[4384] = 124.0; data[4385] = 122.0; data[4386] = 21.0; data[4387] = 4.0;
data[4388] = 124.0; data[4389] = 121.0; data[4390] = 0.0; data[4391] = 4.0;
data[4392] = 124.0; data[4393] = 96.0; data[4394] = 21.0; data[4395] = 4.0;
data[4396] = 123.0; data[4397] = 127.0; data[4398] = 21.0; data[4399] = 4.0;
data[4400] = 112.0; data[4401] = 96.0; data[4402] = 32.0; data[4403] = 16.0;
data[4404] = 111.0; data[4405] = 122.0; data[4406] = 43.0; data[4407] = 16.0;
data[4408] = 111.0; data[4409] = 121.0; data[4410] = 63.0; data[4411] = 16.0;
data[4412] = 112.0; data[4413] = 106.0; data[4414] = 57.0; data[4415] = 16.0;
data[4416] = 117.0; data[4417] = 112.0; data[4418] = 32.0; data[4419] = 11.0;
data[4420] = 106.0; data[4421] = 111.0; data[4422] = 32.0; data[4423] = 11.0;
data[4424] = 118.0; data[4425] = 107.0; data[4426] = 42.0; data[4427] = 10.0;
data[4428] = 104.0; data[4429] = 107.0; data[4430] = 43.0; data[4431] = 9.0;
data[4432] = 120.0; data[4433] = 97.0; data[4434] = 46.0; data[4435] = 8.0;
data[4436] = 104.0; data[4437] = 97.0; data[4438] = 46.0; data[4439] = 8.0;
data[4440] = 122.0; data[4441] = 126.0; data[4442] = 32.0; data[4443] = 5.0;
data[4444] = 123.0; data[4445] = 96.0; data[4446] = 63.0; data[4447] = 5.0;
data[4448] = 123.0; data[4449] = 117.0; data[4450] = 53.0; data[4451] = 5.0;
data[4452] = 101.0; data[4453] = 96.0; data[4454] = 63.0; data[4455] = 5.0;
data[4456] = 100.0; data[4457] = 127.0; data[4458] = 32.0; data[4459] = 5.0;
data[4460] = 124.0; data[4461] = 113.0; data[4462] = 48.0; data[4463] = 4.0;
data[4464] = 124.0; data[4465] = 122.0; data[4466] = 53.0; data[4467] = 4.0;
data[4468] = 124.0; data[4469] = 121.0; data[4470] = 32.0; data[4471] = 4.0;
data[4472] = 124.0; data[4473] = 96.0; data[4474] = 53.0; data[4475] = 4.0;
data[4476] = 123.0; data[4477] = 127.0; data[4478] = 53.0; data[4479] = 4.0;
data[4480] = 80.0; data[4481] = 64.0; data[4482] = 64.0; data[4483] = 16.0;
data[4484] = 79.0; data[4485] = 90.0; data[4486] = 75.0; data[4487] = 16.0;
data[4488] = 79.0; data[4489] = 89.0; data[4490] = 95.0; data[4491] = 16.0;
data[4492] = 80.0; data[4493] = 74.0; data[4494] = 89.0; data[4495] = 16.0;
data[4496] = 85.0; data[4497] = 80.0; data[4498] = 64.0; data[4499] = 11.0;
data[4500] = 74.0; data[4501] = 79.0; data[4502] = 64.0; data[4503] = 11.0;
data[4504] = 86.0; data[4505] = 75.0; data[4506] = 74.0; data[4507] = 10.0;
data[4508] = 72.0; data[4509] = 75.0; data[4510] = 75.0; data[4511] = 9.0;
data[4512] = 88.0; data[4513] = 65.0; data[4514] = 78.0; data[4515] = 8.0;
data[4516] = 72.0; data[4517] = 65.0; data[4518] = 78.0; data[4519] = 8.0;
data[4520] = 90.0; data[4521] = 94.0; data[4522] = 64.0; data[4523] = 5.0;
data[4524] = 91.0; data[4525] = 64.0; data[4526] = 95.0; data[4527] = 5.0;
data[4528] = 91.0; data[4529] = 85.0; data[4530] = 85.0; data[4531] = 5.0;
data[4532] = 69.0; data[4533] = 64.0; data[4534] = 95.0; data[4535] = 5.0;
data[4536] = 68.0; data[4537] = 95.0; data[4538] = 64.0; data[4539] = 5.0;
data[4540] = 92.0; data[4541] = 81.0; data[4542] = 80.0; data[4543] = 4.0;
data[4544] = 92.0; data[4545] = 90.0; data[4546] = 85.0; data[4547] = 4.0;
data[4548] = 92.0; data[4549] = 89.0; data[4550] = 64.0; data[4551] = 4.0;
data[4552] = 92.0; data[4553] = 64.0; data[4554] = 85.0; data[4555] = 4.0;
data[4556] = 91.0; data[4557] = 95.0; data[4558] = 85.0; data[4559] = 4.0;
data[4560] = 80.0; data[4561] = 64.0; data[4562] = 96.0; data[4563] = 16.0;
data[4564] = 79.0; data[4565] = 90.0; data[4566] = 107.0; data[4567] = 16.0;
data[4568] = 79.0; data[4569] = 89.0; data[4570] = 127.0; data[4571] = 16.0;
data[4572] = 80.0; data[4573] = 74.0; data[4574] = 121.0; data[4575] = 16.0;
data[4576] = 85.0; data[4577] = 80.0; data[4578] = 96.0; data[4579] = 11.0;
data[4580] = 74.0; data[4581] = 79.0; data[4582] = 96.0; data[4583] = 11.0;
data[4584] = 86.0; data[4585] = 75.0; data[4586] = 106.0; data[4587] = 10.0;
data[4588] = 72.0; data[4589] = 75.0; data[4590] = 107.0; data[4591] = 9.0;
data[4592] = 88.0; data[4593] = 65.0; data[4594] = 110.0; data[4595] = 8.0;
data[4596] = 72.0; data[4597] = 65.0; data[4598] = 110.0; data[4599] = 8.0;
data[4600] = 90.0; data[4601] = 94.0; data[4602] = 96.0; data[4603] = 5.0;
data[4604] = 91.0; data[4605] = 64.0; data[4606] = 127.0; data[4607] = 5.0;
data[4608] = 91.0; data[4609] = 85.0; data[4610] = 117.0; data[4611] = 5.0;
data[4612] = 69.0; data[4613] = 64.0; data[4614] = 127.0; data[4615] = 5.0;
data[4616] = 68.0; data[4617] = 95.0; data[4618] = 96.0; data[4619] = 5.0;
data[4620] = 92.0; data[4621] = 81.0; data[4622] = 112.0; data[4623] = 4.0;
data[4624] = 92.0; data[4625] = 90.0; data[4626] = 117.0; data[4627] = 4.0;
data[4628] = 92.0; data[4629] = 89.0; data[4630] = 96.0; data[4631] = 4.0;
data[4632] = 92.0; data[4633] = 64.0; data[4634] = 117.0; data[4635] = 4.0;
data[4636] = 91.0; data[4637] = 95.0; data[4638] = 117.0; data[4639] = 4.0;
data[4640] = 80.0; data[4641] = 96.0; data[4642] = 64.0; data[4643] = 16.0;
data[4644] = 79.0; data[4645] = 122.0; data[4646] = 75.0; data[4647] = 16.0;
data[4648] = 79.0; data[4649] = 121.0; data[4650] = 95.0; data[4651] = 16.0;
data[4652] = 80.0; data[4653] = 106.0; data[4654] = 89.0; data[4655] = 16.0;
data[4656] = 85.0; data[4657] = 112.0; data[4658] = 64.0; data[4659] = 11.0;
data[4660] = 74.0; data[4661] = 111.0; data[4662] = 64.0; data[4663] = 11.0;
data[4664] = 86.0; data[4665] = 107.0; data[4666] = 74.0; data[4667] = 10.0;
data[4668] = 72.0; data[4669] = 107.0; data[4670] = 75.0; data[4671] = 9.0;
data[4672] = 88.0; data[4673] = 97.0; data[4674] = 78.0; data[4675] = 8.0;
data[4676] = 72.0; data[4677] = 97.0; data[4678] = 78.0; data[4679] = 8.0;
data[4680] = 90.0; data[4681] = 126.0; data[4682] = 64.0; data[4683] = 5.0;
data[4684] = 91.0; data[4685] = 96.0; data[4686] = 95.0; data[4687] = 5.0;
data[4688] = 91.0; data[4689] = 117.0; data[4690] = 85.0; data[4691] = 5.0;
data[4692] = 69.0; data[4693] = 96.0; data[4694] = 95.0; data[4695] = 5.0;
data[4696] = 68.0; data[4697] = 127.0; data[4698] = 64.0; data[4699] = 5.0;
data[4700] = 92.0; data[4701] = 113.0; data[4702] = 80.0; data[4703] = 4.0;
data[4704] = 92.0; data[4705] = 122.0; data[4706] = 85.0; data[4707] = 4.0;
data[4708] = 92.0; data[4709] = 121.0; data[4710] = 64.0; data[4711] = 4.0;
data[4712] = 92.0; data[4713] = 96.0; data[4714] = 85.0; data[4715] = 4.0;
data[4716] = 91.0; data[4717] = 127.0; data[4718] = 85.0; data[4719] = 4.0;
data[4720] = 80.0; data[4721] = 96.0; data[4722] = 96.0; data[4723] = 16.0;
data[4724] = 79.0; data[4725] = 122.0; data[4726] = 107.0; data[4727] = 16.0;
data[4728] = 79.0; data[4729] = 121.0; data[4730] = 127.0; data[4731] = 16.0;
data[4732] = 80.0; data[4733] = 106.0; data[4734] = 121.0; data[4735] = 16.0;
data[4736] = 85.0; data[4737] = 112.0; data[4738] = 96.0; data[4739] = 11.0;
data[4740] = 74.0; data[4741] = 111.0; data[4742] = 96.0; data[4743] = 11.0;
data[4744] = 86.0; data[4745] = 107.0; data[4746] = 106.0; data[4747] = 10.0;
data[4748] = 72.0; data[4749] = 107.0; data[4750] = 107.0; data[4751] = 9.0;
data[4752] = 88.0; data[4753] = 97.0; data[4754] = 110.0; data[4755] = 8.0;
data[4756] = 72.0; data[4757] = 97.0; data[4758] = 110.0; data[4759] = 8.0;
data[4760] = 90.0; data[4761] = 126.0; data[4762] = 96.0; data[4763] = 5.0;
data[4764] = 91.0; data[4765] = 96.0; data[4766] = 127.0; data[4767] = 5.0;
data[4768] = 91.0; data[4769] = 117.0; data[4770] = 117.0; data[4771] = 5.0;
data[4772] = 69.0; data[4773] = 96.0; data[4774] = 127.0; data[4775] = 5.0;
data[4776] = 68.0; data[4777] = 127.0; data[4778] = 96.0; data[4779] = 5.0;
data[4780] = 92.0; data[4781] = 113.0; data[4782] = 112.0; data[4783] = 4.0;
data[4784] = 92.0; data[4785] = 122.0; data[4786] = 117.0; data[4787] = 4.0;
data[4788] = 92.0; data[4789] = 121.0; data[4790] = 96.0; data[4791] = 4.0;
data[4792] = 92.0; data[4793] = 96.0; data[4794] = 117.0; data[4795] = 4.0;
data[4796] = 91.0; data[4797] = 127.0; data[4798] = 117.0; data[4799] = 4.0;
data[4800] = 112.0; data[4801] = 64.0; data[4802] = 64.0; data[4803] = 16.0;
data[4804] = 111.0; data[4805] = 90.0; data[4806] = 75.0; data[4807] = 16.0;
data[4808] = 111.0; data[4809] = 89.0; data[4810] = 95.0; data[4811] = 16.0;
data[4812] = 112.0; data[4813] = 74.0; data[4814] = 89.0; data[4815] = 16.0;
data[4816] = 117.0; data[4817] = 80.0; data[4818] = 64.0; data[4819] = 11.0;
data[4820] = 106.0; data[4821] = 79.0; data[4822] = 64.0; data[4823] = 11.0;
data[4824] = 118.0; data[4825] = 75.0; data[4826] = 74.0; data[4827] = 10.0;
data[4828] = 104.0; data[4829] = 75.0; data[4830] = 75.0; data[4831] = 9.0;
data[4832] = 120.0; data[4833] = 65.0; data[4834] = 78.0; data[4835] = 8.0;
data[4836] = 104.0; data[4837] = 65.0; data[4838] = 78.0; data[4839] = 8.0;
data[4840] = 122.0; data[4841] = 94.0; data[4842] = 64.0; data[4843] = 5.0;
data[4844] = 123.0; data[4845] = 64.0; data[4846] = 95.0; data[4847] = 5.0;
data[4848] = 123.0; data[4849] = 85.0; data[4850] = 85.0; data[4851] = 5.0;
data[4852] = 101.0; data[4853] = 64.0; data[4854] = 95.0; data[4855] = 5.0;
data[4856] = 100.0; data[4857] = 95.0; data[4858] = 64.0; data[4859] = 5.0;
data[4860] = 124.0; data[4861] = 81.0; data[4862] = 80.0; data[4863] = 4.0;
data[4864] = 124.0; data[4865] = 90.0; data[4866] = 85.0; data[4867] = 4.0;
data[4868] = 124.0; data[4869] = 89.0; data[4870] = 64.0; data[4871] = 4.0;
data[4872] = 124.0; data[4873] = 64.0; data[4874] = 85.0; data[4875] = 4.0;
data[4876] = 123.0; data[4877] = 95.0; data[4878] = 85.0; data[4879] = 4.0;
data[4880] = 112.0; data[4881] = 64.0; data[4882] = 96.0; data[4883] = 16.0;
data[4884] = 111.0; data[4885] = 90.0; data[4886] = 107.0; data[4887] = 16.0;
data[4888] = 111.0; data[4889] = 89.0; data[4890] = 127.0; data[4891] = 16.0;
data[4892] = 112.0; data[4893] = 74.0; data[4894] = 121.0; data[4895] = 16.0;
data[4896] = 117.0; data[4897] = 80.0; data[4898] = 96.0; data[4899] = 11.0;
data[4900] = 106.0; data[4901] = 79.0; data[4902] = 96.0; data[4903] = 11.0;
data[4904] = 118.0; data[4905] = 75.0; data[4906] = 106.0; data[4907] = 10.0;
data[4908] = 104.0; data[4909] = 75.0; data[4910] = 107.0; data[4911] = 9.0;
data[4912] = 120.0; data[4913] = 65.0; data[4914] = 110.0; data[4915] = 8.0;
data[4916] = 104.0; data[4917] = 65.0; data[4918] = 110.0; data[4919] = 8.0;
data[4920] = 122.0; data[4921] = 94.0; data[4922] = 96.0; data[4923] = 5.0;
data[4924] = 123.0; data[4925] = 64.0; data[4926] = 127.0; data[4927] = 5.0;
data[4928] = 123.0; data[4929] = 85.0; data[4930] = 117.0; data[4931] = 5.0;
data[4932] = 101.0; data[4933] = 64.0; data[4934] = 127.0; data[4935] = 5.0;
data[4936] = 100.0; data[4937] = 95.0; data[4938] = 96.0; data[4939] = 5.0;
data[4940] = 124.0; data[4941] = 81.0; data[4942] = 112.0; data[4943] = 4.0;
data[4944] = 124.0; data[4945] = 90.0; data[4946] = 117.0; data[4947] = 4.0;
data[4948] = 124.0; data[4949] = 89.0; data[4950] = 96.0; data[4951] = 4.0;
data[4952] = 124.0; data[4953] = 64.0; data[4954] = 117.0; data[4955] = 4.0;
data[4956] = 123.0; data[4957] = 95.0; data[4958] = 117.0; data[4959] = 4.0;
data[4960] = 112.0; data[4961] = 96.0; data[4962] = 64.0; data[4963] = 16.0;
data[4964] = 111.0; data[4965] = 122.0; data[4966] = 75.0; data[4967] = 16.0;
data[4968] = 111.0; data[4969] = 121.0; data[4970] = 95.0; data[4971] = 16.0;
data[4972] = 112.0; data[4973] = 106.0; data[4974] = 89.0; data[4975] = 16.0;
data[4976] = 117.0; data[4977] = 112.0; data[4978] = 64.0; data[4979] = 11.0;
data[4980] = 106.0; data[4981] = 111.0; data[4982] = 64.0; data[4983] = 11.0;
data[4984] = 118.0; data[4985] = 107.0; data[4986] = 74.0; data[4987] = 10.0;
data[4988] = 104.0; data[4989] = 107.0; data[4990] = 75.0; data[4991] = 9.0;
data[4992] = 120.0; data[4993] = 97.0; data[4994] = 78.0; data[4995] = 8.0;
data[4996] = 104.0; data[4997] = 97.0; data[4998] = 78.0; data[4999] = 8.0;
data[5000] = 122.0; data[5001] = 126.0; data[5002] = 64.0; data[5003] = 5.0;
data[5004] = 123.0; data[5005] = 96.0; data[5006] = 95.0; data[5007] = 5.0;
data[5008] = 123.0; data[5009] = 117.0; data[5010] = 85.0; data[5011] = 5.0;
data[5012] = 101.0; data[5013] = 96.0; data[5014] = 95.0; data[5015] = 5.0;
data[5016] = 100.0; data[5017] = 127.0; data[5018] = 64.0; data[5019] = 5.0;
data[5020] = 124.0; data[5021] = 113.0; data[5022] = 80.0; data[5023] = 4.0;
data[5024] = 124.0; data[5025] = 122.0; data[5026] = 85.0; data[5027] = 4.0;
data[5028] = 124.0; data[5029] = 121.0; data[5030] = 64.0; data[5031] = 4.0;
data[5032] = 124.0; data[5033] = 96.0; data[5034] = 85.0; data[5035] = 4.0;
data[5036] = 123.0; data[5037] = 127.0; data[5038] = 85.0; data[5039] = 4.0;
data[5040] = 112.0; data[5041] = 96.0; data[5042] = 96.0; data[5043] = 16.0;
data[5044] = 111.0; data[5045] = 122.0; data[5046] = 107.0; data[5047] = 16.0;
data[5048] = 111.0; data[5049] = 121.0; data[5050] = 127.0; data[5051] = 16.0;
data[5052] = 112.0; data[5053] = 106.0; data[5054] = 121.0; data[5055] = 16.0;
data[5056] = 117.0; data[5057] = 112.0; data[5058] = 96.0; data[5059] = 11.0;
data[5060] = 106.0; data[5061] = 111.0; data[5062] = 96.0; data[5063] = 11.0;
data[5064] = 118.0; data[5065] = 107.0; data[5066] = 106.0; data[5067] = 10.0;
data[5068] = 104.0; data[5069] = 107.0; data[5070] = 107.0; data[5071] = 9.0;
data[5072] = 120.0; data[5073] = 97.0; data[5074] = 110.0; data[5075] = 8.0;
data[5076] = 104.0; data[5077] = 97.0; data[5078] = 110.0; data[5079] = 8.0;
data[5080] = 122.0; data[5081] = 126.0; data[5082] = 96.0; data[5083] = 5.0;
data[5084] = 123.0; data[5085] = 96.0; data[5086] = 127.0; data[5087] = 5.0;
data[5088] = 123.0; data[5089] = 117.0; data[5090] = 117.0; data[5091] = 5.0;
data[5092] = 101.0; data[5093] = 96.0; data[5094] = 127.0; data[5095] = 5.0;
data[5096] = 100.0; data[5097] = 127.0; data[5098] = 96.0; data[5099] = 5.0;
data[5100] = 124.0; data[5101] = 113.0; data[5102] = 112.0; data[5103] = 4.0;
data[5104] = 124.0; data[5105] = 122.0; data[5106] = 117.0; data[5107] = 4.0;
data[5108] = 124.0; data[5109] = 121.0; data[5110] = 96.0; data[5111] = 4.0;
data[5112] = 124.0; data[5113] = 96.0; data[5114] = 117.0; data[5115] = 4.0;
data[5116] = 123.0; data[5117] = 127.0; data[5118] = 117.0; data[5119] = 4.0;
	  let texture = new THREE.DataTexture( data, 1280, 1 , THREE.RGBAFormat, THREE.FloatType);
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