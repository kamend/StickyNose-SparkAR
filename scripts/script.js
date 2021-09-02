const D = require('Diagnostics');
const Scene = require('Scene');
const Patches = require('Patches');
const FaceTracking = require('FaceTracking');
const Shaders = require('Shaders');
const R = require('Reactive');
const Patchers = require('Patches');
const face = FaceTracking.face(0);
(async () => {
   
    const cam = await Scene.root.findFirst("Camera");
    
    const focalPlane = cam.focalPlane;
    const camCoords = face.cameraTransform.applyToPoint(face.nose.tip);

    const u = R.add(R.div(R.div(camCoords.x, R.div(focalPlane.width, 2)), 2), 0.5);
    const v = R.add(R.div(R.div(camCoords.y, R.div(focalPlane.height, 2)), 2), 0.5);

    Patches.inputs.setScalar("mu", u);
    Patches.inputs.setScalar("mv", R.sub(1.0, v));

})()
