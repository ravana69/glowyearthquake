require([
  "esri/WebScene",
  "esri/core/scheduling",
  "esri/views/SceneView",
  "esri/core/watchUtils"
], function(WebScene, scheduling, SceneView, watchUtils) {
  const map = new WebScene({
    portalItem: {
      id: "33906cf2c3e44f2ba2271a245066a92a"
    }
  });

  const view = new SceneView({
    container: "viewDiv",
    qualityProfile: "high",
    map: map,
    alphaCompositingEnabled: true
  });

  function rotate() {
    if (!view.interacting) {
      const camera = view.camera.clone();
      camera.position.longitude -= 0.1;
      view.camera = camera;
      requestAnimationFrame(rotate);
    }
  }

  view.when(function() {
    view.environment.background = {
      type: "color",
      color: [0, 0, 0, 0]
    };

    view.constraints.clipDistance.far = 50000000;

    watchUtils.whenFalseOnce(view, "updating", function() {
      rotate();
    });
  });
});
