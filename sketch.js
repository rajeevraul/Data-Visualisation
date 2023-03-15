// Global variable to store the gallery object. The gallery object is
// A container for all the visualisations.
var gallery;

function setup() {
  // Creating a canvas to fill the content div from index.html.
  canvasContainer = select('#app');
  var c = createCanvas(1024, 576);
  c.parent('app');

  // Create a new gallery object.
  gallery = new Gallery();

  // Add the visualisation objects here.
  gallery.addVisual(new MotorVehicles());
  gallery.addVisual(new CarMakeTimeSeries());   
  gallery.addVisual(new PublicTransportUsageChart());
}

function draw() {
  background(255);

  if (gallery.selectedVisual != null) {
    gallery.selectedVisual.draw();
  }
}
