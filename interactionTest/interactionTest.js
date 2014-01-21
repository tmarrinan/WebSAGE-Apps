function interactionTest(){
	this.element = null;
	this.ctx = null;
	this.resrcPath = null;
	
	this.minDim = null;
	
	this.centerX = 0.0;
	this.centerY = 0.0;
	this.radius = 50;
	
	this.defaultColor =  "rgba(150, 150, 150, 1.0)";
	this.mouseOverColor = "rgba(255, 0, 0, 1.0 )";
	
	this.drawColor = this.defaultColor; 
	
	this.text = "Hello World:\n";
	
	this.init = function(id, date, resrc) {
		this.element = document.getElementById(id);
		this.ctx = this.element.getContext("2d");
		this.resrcPath = resrc;
		
		this.minDim = Math.min(this.element.width, this.element.height);
		
	}
	
	this.draw = function(date) {
		// clear canvas		
		this.ctx.clearRect(0,0, this.element.width, this.element.height);
		
        this.ctx.fillStyle = "rgba(255, 255, 255, 1.0)"
		this.ctx.fillRect(0,0, this.element.width, this.element.height)
			
		// outside of clock
		this.ctx.lineWidth = (3.0/100.0) * this.minDim;
		this.ctx.strokeStyle = this.drawColor;
		this.ctx.beginPath();
		this.ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI*2);
		this.ctx.closePath();
		this.ctx.stroke();
		
		this.ctx.font="30px Arial";
		this.ctx.fillStyle = "rgba(0,0,0,1.0)";
        this.ctx.fillText(this.text,10,50);
	};
	
	this.resize = function(date) {
		this.minDim = Math.min(this.element.width, this.element.height);
		this.draw(date);
	}
	               // canvasItems[child[0].id].event( event_data.eventType, event_data.ptr_id, event_data.itemRelativeX, event_data.itemRelativeY, event_data.data);  

	this.event = function( type, ptrId, x, y, data , date){
	    if( type == "pointerPress" ){
	       if( data.button == "left" ){
	            //---handle pointer press
	            this.centerX = x;
	            this.centerY = y;
	            this.drawColor = "rgba(255, 0, 0, 1.0 )";
	            this.radius = 75;
	       } 
	       
	       else if( data.button == "right" ){

	       }
	    }
	    else if( type == "pointerRelease" ){
           if( data.button == "left" ){
	            this.radius = 50; 
                this.drawColor = "rgba(125, 125, 125, 1.0 )";

	       } 
	       else if( data.button == "right" ){
	        
	       }
	    }
	    else if( type == "pointerMove" ){
	        if( this.centerX - this.radius <= x &&  this.centerX + this.radius >= x && this.centerY - this.radius <= y && this.centerY + this.radius >= y ){
	            this.drawColor = "rgba(0, 255, 0, 1.0 )";
	        }
	        else{
	            this.drawColor = "rgba(125, 125, 125, 1.0 )";	            
	        }
	    }
        else if( type == "pointerDoubleClick" ){
	        
	    }
	    else if( type == "keyPressed" ) {
	        if( this.code == 16 ) //shift key
	            this.drawColr = "rgba(0, 0, 255, 1.0 )";
	        else
                this.text = this.text.concat( data.key ); 
	        
	    }
	    else if( type == "pointerScroll" ) {
	    
	    }
	    
	    else if( type == "pointerEnter" ){
	    
	    }
	    else if( type == "pointerLeave" ){
	    
	    }

	    else if( type == "close" ){
	    
	    }
	    else if( type == "minimize" ){
	    
	    }
	    
        this.draw( date ); //redraw    
	}
}
