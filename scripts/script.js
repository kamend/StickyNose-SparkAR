const D = require('Diagnostics');
const Scene = require('Scene');
const Patches = require('Patches');
const FaceTracking = require('FaceTracking');
const Shaders = require('Shaders');
const R = require('Reactive');
const Patchers = require('Patches');
const face = FaceTracking.face(0);
(async () => {
    const rect = await Scene.root.findFirst("rectangle0");
    const cam = await Scene.root.findFirst("Camera");
    const canv = await Scene.root.findFirst("canvas0");

    var focalPlane = cam.focalPlane;
    const camCoords = face.cameraTransform.applyTo(face.nose.tip);


    var u = R.add(R.div(R.div(camCoords.x, R.div(focalPlane.width, 2)), 2), 0.5);
    var v = R.add(R.div(R.div(camCoords.y, R.div(focalPlane.height, 2)), 2), 0.5);

    Patches.inputs.setScalar("mu", u);
    Patches.inputs.setScalar("mv", R.sub(1.0, v));

})()
