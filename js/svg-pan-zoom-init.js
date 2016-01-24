function initSVGPanZoom() {
  // var svgElement = document.querySelector('svg#graphvis');
  var panZoom = svgPanZoom('svg#graphvis', {
        zoomEnabled: true,
        panEnabled: true,
        controlIconsEnabled: true,
        fit: false,
        center: false,
        minZoom: 0.75,
        maxZoom: 50,
        zoomScaleSensitivity: 0.25,
        dblClickZoomEnabled: true
    });
}
