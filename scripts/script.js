const D = require('Diagnostics');
const Scene = require('Scene');
const Patches = require('Patches');
const FaceTracking = require('FaceTracking');
const Shaders = require('Shaders');
const R = require('Reactive');
const Patchers = require('Patches');
const face = FaceTracking.face(0);
const rect = Scene.root.find("rectangle0");
const cam = Scene.root.find("Camera");
const canv = Scene.root.find("canvas0");

var focalPlane = cam.focalPlane;
const camCoords = face.cameraTransform.applyTo(face.nose.tip);

// set Canvas to World, place rectangle inside
//canv.transform.x = R.neg(camCoords.x)
//canv.transform.y = camCoords.y;
//canv.transform.z = R.neg(camCoords.z);

var u = R.add(R.div(R.div(camCoords.x, R.div(focalPlane.width,2)),2), 0.5);
var v = R.add(R.div(R.div(camCoords.y, R.div(focalPlane.height,2)),2), 0.5);

Patches.setScalarValue("mu", u);
Patches.setScalarValue("mv", R.sub(1.0,v));

/*



face.nose.tip.monitor().subscribe(function(event) {



    // Canvas is in Camera Space
 //   rect.transform.x = R.mul(R.div(camCoords.x,R.div(focalPlane.width,2)), R.div(canv.width,2));
  //  rect.transform.y = R.mul(R.div(camCoords.y,R.div(focalPlane.height,2)), R.div(canv.height,2));
});

*/