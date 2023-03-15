function MotorVehicles() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Motor Vehicles By Fuel Type';

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'motor-vehicles';

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/motor-vehicles/annual-motor-vehicle-population-by-type-of-fuel-used.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
  };

  this.setup = function() {
    // To be displayed on console if data has not been loaded
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Creating a select DOM element.
    this.select = createSelect();
    this.select.position(350, 40);
      
    // Fill the options with all vehicle types.
    var vehicles = this.data.columns;

    // First entry is empty.
    for(let i = 1; i < vehicles.length; i++){
      this.select.option(vehicles[i]);    
    }  
      
    // Initialising the global object
    this.x = 850;
    this.y = 215;
    this.labelSpace = 50;
  };

  this.destroy = function() {
    // Removes the select DOM element
    this.select.remove();
  };

  // Create a new pie chart object.
  this.pie = new PieChart(width / 2, height / 2, width * 0.4);

  this.draw = function() {
    // To be displayed on console if data has not been loaded
    if (!this.loaded) {
      console.log('Data not yet loaded');
      return;
    }

    // Get the value of the vehicle we're interested in from 
    // select item.
    var vehicleType = this.select.value();
    
    // Get the column of raw data for vehicleType.
    var col = this.data.getColumn(vehicleType);

    // Convert all data strings to numbers.
    col = stringsToNumbers(col);

    // Copy the row labels from the table 
    //(the first item of each row).
    var labels = this.data.getColumn(0);

    // Colour to use for each respective category.
    var colours = [color(88, 80, 141), color(0, 63, 92), 
                   color(188, 80, 144), color(255, 99, 97), 
                   color(255, 166, 0), color(230, 246, 157), 
                   color(170, 222, 167), color(0, 0, 0)];

    // Make a title.
    var title = 'Types of fuel used by: ' + vehicleType;
      
    // Draw the pie chart
    this.pie.draw(col, labels, colours, title);
      
    // Header text
    this.text = text("Amount(%)",this.x,this.y-35);
      
    // Add numbers/percentage to the pie chart to corresponding colour
    for(var i=0;i<col.length;i++)
        {    
            this.text = text(col[i],
                             this.x-this.labelSpace,this.y+(i*this.labelSpace));
            
            this.text = text("("+(col[i]/sum(col)*100).toFixed(2)+"%"+")",
                             this.x+this.labelSpace,this.y+(i*this.labelSpace));      
        }
  };
}

