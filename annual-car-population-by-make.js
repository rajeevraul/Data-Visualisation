function CarMakeTimeSeries() {

  // Name for the visualisation to appear in the menu bar.
  this.name = 'Car Population By Make: 2005-2017' + [];

  // Each visualisation must have a unique ID with no special
  // characters.
  this.id = 'car-make-timeseries';

  // Title to display above the plot. 
  this.title = 'Annual car population in Singapore by make'   ;

  // Names for each axis.
  this.xAxisLabel = 'Year';
  this.yAxisLabel = 'Number of cars';

  var marginSize = 50;
    
  this.colors = [];
    
  // Layout object to store all common plot layout parameters and methods.
  this.layout = {
    marginSize: marginSize,

    // Locations of margin positions. Left and bottom have double margin
    // size due to axis and tick labels.
    leftMargin: marginSize * 2,
    rightMargin: width - marginSize,
    topMargin: marginSize,
    bottomMargin: height - marginSize * 2,
    pad: 5,

    plotWidth: function() {
      return this.rightMargin - this.leftMargin;
    },

    plotHeight: function() {
      return this.bottomMargin - this.topMargin;
    },

    // Boolean to enable/disable background grid.
    grid: true,

    // Number of axis tick labels to draw so that they are not drawn on
    // top of one another.
    numXTickLabels: 13,
    numYTickLabels: 10,
  };

  // Property to represent whether data has been loaded.
  this.loaded = false;

  // Preload the data. This function is called automatically by the
  // gallery when a visualisation is added.
  this.preload = function() {
    var self = this;
    this.data = loadTable(
      './data/motor-vehicles/annual-car-population-by-make.csv', 'csv', 'header',
      // Callback function to set the value
      // this.loaded to true.
      function(table) {
        self.loaded = true;
      });
    };  
    
    this.setup = function() {
      
    // Font size.
    textSize(18);

    // Setting min and max years
    this.startYear = Number(this.data.columns[1]);
    this.endYear = Number(this.data.columns[this.data.columns.length - 1]);
      
    // Colour of line graph in the figure  
    for(var i = 0; i<this.data.getRowCount(); i++)
    {
            strokeWeight(1.2);
            this.colors.push(0);
    }    
      
      // Creating a dropdown list
      textAlign(CENTER);
      background(200);
      this.sel = createSelect();
      
      // Position of dropdown list
      this.sel.position(1100, 30);
      
      // Generating the array object
      var opt = this.data.rows;

      // Displaying options in dropdown list
      for(var i = 0; i<this.data.getRowCount(); i++)
          {
              // Iterating through the data structure 
              this.sel.option(opt[i].arr[0]);
          }           
    };

    this.destroy = function() {
          // To remove dropdown list DOM
          this.sel.remove();
    };

    this.draw = function() {
        // To be displayed on console if data has not been loaded
        if (!this.loaded) {
          console.log('Data not yet loaded');
          return;
    }

    // Draw the title above the plot.
    this.drawTitle();

    // Draw all y-axis labels.
    drawYAxisTickLabels(this.minAmount,  
                        this.maxAmount,
                        this.layout,
                        this.mapCarNumbers.bind(this),
                        0);

    // Draw x and y axis.
    drawAxis(this.layout);

    // Draw x and y axis labels.
    drawAxisLabels(this.xAxisLabel,
                   this.yAxisLabel,
                   this.layout);

    // Plot all number of cars between startYear and endYear 
    // using the width of the canvas minus margins.  
    var numYears = this.endYear - this.startYear;
      
    // Mapping dropdown list options when clicked on to displaying corresponding data
    // Use of anonymous functions
    // Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions
    var car = this.sel.value()
    let change = () => car = this.sel.value();
    var opt = this.data.rows.map(x => x.arr[0]);
    this.sel.changed(change);  
    var row = this.data.getRow(opt.indexOf(car));

    var previous = null;

    for(var j = 1; j < numYears; j++) {
        // Create an object to store data for the current year.
        var current = {
        // Convert strings to numbers.
        // Convert strings to numbers.
        'year': this.startYear + j - 1,
        'amount': row.getNum(j),
        };

        if (previous != null) {
        // Draw line segment connecting previous year to current
        stroke(this.colors[i]);
        line(this.mapYearToWidth(previous.year),
             this.mapCarNumbers(previous.amount),
             this.mapYearToWidth(current.year),
             this.mapCarNumbers(current.amount));

        // The number of x-axis labels to skip so that only
        // numXTickLabels are drawn.
        var xLabelSkip = ceil(numYears / this.layout.numXTickLabels);

        // Draw the tick label marking the start of the previous year.
        if (i % xLabelSkip == 0) {
          drawXAxisTickLabel(previous.year, this.layout,
                             this.mapYearToWidth.bind(this));
        }
      }
                
      // Assign current year to previous year so that it is available
      // during the next iteration of this loop to give us the start
      // position of the next line segment.
      previous = current;
     }
      
     // Finding the min and max number of cars for mapping to canvas height.
     this.minAmount = 0;
     this.maxAmount = [];

     // Rounding up max value to the nearest 100
     var num = max(row.arr.slice(1));
     this.num = num;    
     this.roundup = Math.ceil(this.num / 100) * 100;
     this.maxAmount.push(this.roundup); 
    };

    this.drawTitle = function(){      
    fill(0);
    noStroke();
    textAlign('center', 'center');
   
    // Drawing title
    text(this.title,
         (this.layout.plotWidth() / 2) + this.layout.leftMargin,
         this.layout.topMargin - (this.layout.marginSize / 2));
    };

    this.mapYearToWidth = function(value) {
    return map(value,
               this.startYear,
               this.endYear,
               this.layout.leftMargin,   // Draw left-to-right from margin.
               this.layout.rightMargin);
    };

    this.mapCarNumbers = function(value) {
    return map(value,
               this.minAmount,
               this.maxAmount,
               this.layout.bottomMargin,
               this.layout.topMargin);
    };
}
