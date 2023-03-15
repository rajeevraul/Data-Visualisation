function PieChart(x, y, diameter) {

  // Initialising the global object
  this.x = x-150;
  this.y = y+50;
  this.diameter = diameter;
  this.labelSpace = 50;

  this.get_radians = function(data) {
    var total = sum(data);
    var radians = [];
      
    // Adding a constrain feature 
    for (let i = 0; i < data.length; i++) {
      let angle = (data[i] / total) * TWO_PI;
          angle = constrain(angle,0,TWO_PI*(0.999));
      radians.push(angle);
    }
    return radians;
  };

  this.draw = function(data, labels, colours, title) {

    // Test that data is not empty and that each input array is the
    // same length.
    if (data.length == 0) {
      alert('Data has length zero!');
    } else if (![labels, colours].every((array) => {
      return array.length == data.length;
    })) {
      alert(`Data (length: ${data.length})
    Labels (length: ${labels.length})
    Colours (length: ${colours.length})
    Arrays must be the same length!`);
    }

    // https://p5js.org/examples/form-pie-chart.html

    var angles = this.get_radians(data);
    //console.log(angles);
    var lastAngle = 0;
    var colour;

    for (var i = 0; i < data.length; i++) {
      if (colours) {
        colour = colours[i];
      } else {
        colour = map(i, 0, data.length, 0, 255);
      }

      fill(colour);
      stroke(0);
      strokeWeight(1);

      // Drawing the pie chart circle
      arc(this.x, this.y,
          this.diameter, this.diameter,
          lastAngle, lastAngle + angles[i] + 0.001); // Hack for 0!

      if (labels) {
        this.makeLegendItem(labels[i], i, colour);
      }

      lastAngle += angles[i];
    }
      
    // Creating titles
    if (title) {
      noStroke();
      textAlign('center', 'center');
      textSize(24);
      text(title, this.x, this.y - this.diameter * 0.6);
    }
  };

  // Creating colour coded boxes
  this.makeLegendItem = function(label, i, colour) {
    
    // Initialising rectangle variables 
    var x = this.x + 50 + this.diameter / 2;
    var y = this.y + (this.labelSpace * i) - this.diameter / 3;
    var boxWidth = this.labelSpace / 2;
    var boxHeight = this.labelSpace / 2;

    fill(colour);
      
    // Drawing colour boxes
    rect(x, y, boxWidth, boxHeight);

    fill('black');
    noStroke();
    textAlign('left', 'center');
    textSize(12);
    text(label, x + boxWidth + 10, y + boxWidth / 2);
  };
}
