function PublicTransportUsageChart(){
    
    // Name for the visualisation to appear in the menu bar.
    this.name = "Public Transportation Usage";
    
    // Visualisation with a unique ID with no specialcharacters.
    this.id = "public-transport-usage";
    
    // Property to represent whether data has been loaded.
    this.loaded = false;
    
    // Preload the data. This function is called automatically by the
    // gallery when a visualisation is added.
    this.preload = function(){
        var self = this;
        this.data = loadTable('./data/motor-vehicles/public-transport-utilisation-average-public-transport-ridership.csv', 'csv', 'header',
                        // Callback function to set the value
                        // this.loaded to true.
                            function(table) {
                            self.loaded = true;
                            })
    }
    
    // Variables declared for scrolling functionality
    var scaleFactor = 1;
    var x = 0;
    var y = 0;
    
    this.title = "Public Transportation Usage in Singapore " + "(Use scroll to zoom)";
    
    this.layout = {
        
    }
    
    this.setup = function(){
        
        // Iterates through the first column and second column
        // new Set is to filter out duplicate values
        // Source: https://dev.to/soyleninjs/3-ways-to-remove-duplicates-in-an-array-in-javascript-259o 
        this.years = [...new Set(this.data.getColumn([0]))];
        
        this.values = this.data.getColumn([1]);
        
        // Initialising methods for coordiantes
        this.x = 80;
        this.y = 100;
        this.spacing = 50;
        
        this.factor = 10000;
    }
    
    this.destroy = function(){
    
    }
    
    this.draw = function(){
        // To be displayed on console if data has not been loaded
        if(this.loaded == false){
                console.log("Data not yet loaded");
                return;
        }
        
        // Drawing title
        this.drawTitle();
        
        // Initialising zoom functionality variables
        var mx = mouseX;
        var my = mouseY;
        
        // Page moves in directin of the mouse inputted by the user
        translate(mx, my);
        // Use of mouse scroll for zoom
        scale(scaleFactor);
        translate(-mx, -my);
        translate();
        
        // Getting row count
        var numRows = this.data.getRowCount();
        
        // To read average ridership column
        var ridership = this.data.getColumn([2]);
        
        for(var i = 0; i < numRows; i++)
            {
                // X-coordinate and Y-coordinate positioning of bar chart
                var x = this.x + (i * 12);
                // Dividing ridership data by 10000 as numbers in data is large
                var y = (this.y * 5) + this.spacing - ridership[i]/this.factor;
                
                // Width of bar charts
                var w = 10;
                
                // Height of bar charts
                var h = ridership[i]/this.factor;
                
                // Colour for each corresponding bar
                stroke(0);           
                if(this.values[i]=="Bus")
                {
                    fill(188, 80, 144);
                }
                else if(this.values[i]=="LRT")
                {
                    fill(255, 99, 97);
                }
                else if(this.values[i]=="MRT")
                {
                    fill(255, 166, 0);
                }
                else if(this.values[i]=="Taxi")
                {
                    fill(230, 246, 157);
                } 

                // Drawing the bar charts
                rect(x,y,w,h);         
            }  
        
        // Text for years
        for(i = 0;i < this.years.length; i++)
        {   
            fill(0);
            textSize(12);
            stroke(0.5);
            text(this.years[i], 95 + (i * 48), 570);
        }
        
        // Colour coded boxes for identification 
        fill(188, 80, 144);
        rect(this.x, this.y, 20, 20);
        
        fill(255, 99, 97);
        rect(this.x + this.spacing, this.y, 20, 20);
        
        fill(255, 166, 0);
        rect(this.x + (this.spacing * 2), this.y, 20, 20);
        
        fill(230, 246, 157);
        rect(this.x + (this.spacing * 3), this.y, 20, 20);
        
        // new Set to prevent the array being printed out multiple times
        this.values.new = [...new Set(this.data.getColumn([1]))];
        
        // Text for colour coding
        for(i=0;i<this.values.new.length;i++)
        {   
            fill(0);
            noStroke();
            textSize(12);
            this.text = text(this.values.new[i],
                             this.x + (i * this.spacing), this.y - 5);
        }
    };
    
    // Drawing title function
    this.drawTitle = function(){      
    fill(0);
    noStroke();
    textSize(24); 
   
    // Drawing title
    text(this.title,
         (this.x*2) + this.spacing, this.y - this.spacing);
    };
    
    // Adding window event handler property 
    // deltaY represents scrolling vertically 
    // Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event
    window.addEventListener("wheel", function(event){
          if (event.deltaY > 0){
            scaleFactor *= 1.05;
          }else{
            scaleFactor *= 0.95;
          }
        // Adding constrain for the degree of zoom
        //scaleFactor = Math.min(Math.max(.145, scale), 4);
    });
}