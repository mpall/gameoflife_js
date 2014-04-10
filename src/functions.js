"use strict";
var gol = (function(){
	var Cell = function(nw, n, ne, w, position, e, sw, s, se){
     this.position = position;
    	this.neighbours = [nw,n,ne,w,e,sw,s,se]
    	this.getPosition = function(){
    		return this.position;
    	}
    	this.neighboursIndexes = function(){
    		return neighbours;
    	}
    	this.neighboursCount = function(currentState){
    		var count = 0;
    		for (var i = this.neighbours.length - 1; i >= 0; i--) {
    			if(currentState[this.neighbours[i]]){
    				count++;
    			}
    		};
    		return count;
    	}
    };

    var Ticker = function(){
    	this.tick = function(currentState, indexGrid){
    		var LifeCalc = function(cS, iG){
    			this.currentState = cS;
    			this.indexGrid = iG;
    			this.isAlive = function(index){
		    		return this.currentState[index];
		    	}
		    	this.liveToNextGeneration = function(index){
		    		var count = this.neighboursCount(index);
		    		if(count == 2 || count == 3){
		    			return true;
		    		} else {
		    			return false;
		    		}
		    	}
		    	this.shouldLiveAgain = function(index){
		    		if(this.neighboursCount(index) == 3){
		    			return true;
		    		} else {
		    			return false;
		    		}
		    	}
		    	this.neighboursCount = function(index){
		    		return this.indexGrid.getData(index).neighboursCount(this.currentState);
		    	}
    		}
    		var life = new LifeCalc(currentState, indexGrid);

    		var nextState = new Array(currentState.length);
    		for(var i = 0; i < currentState.length; i++){
    			if(life.isAlive(i)){
    				if(life.liveToNextGeneration(i)){
    					nextState[i] = true;
    				} else {
    					nextState[i] = false;
    				}	
    			} else {
    				if(life.shouldLiveAgain(i)){
    					nextState[i] = true; 
    				} else {
    					nextState[i] = false;		
    				}
    			}
    			
    		}
    		return nextState;
    	}

    	
    }

    var Grid = function(hightAndWidth){
        this.hightAndWidth = hightAndWidth;
        this.data = new Array(hightAndWidth * hightAndWidth);

        

        this.getHightAndWidth = function(){
            return this.hightAndWidth;
        }

        this.getDataArray = function(){
        	return this.data;
        }

        this.setData = function(index, d){
        	this.data[index] = d;
        }

        this.getData = function(index){
        	return this.data[index];
        }

        this.size = function(){
        	return hightAndWidth * hightAndWidth;
        }

        this.initialiseCells = function(){
			for(var i = 0; i < this.data.length; i++){
    	    	this.data[i] = new CellFactoryBuilder(this, i).getCellFactory().getCell();
        	}
        	return this;
	    }

        this.initialiseFalseStateArray = function(){
			var a = new Array(hightAndWidth * hightAndWidth);
			for(var i = 0; i < a.length; i++){		
				a[i] = false;
			}
			return a;
	    }
    };

    var fb = (function(){

	    var CellCalc = function(grid, position){
	    	this.grid = grid;
	    	this.position = position;
	    
	    	this.nw = function(){
	    		return this.position - (this.grid.getHightAndWidth() + 1)
	    	}
	    	this.n = function(){
	    		return this.position - this.grid.getHightAndWidth()
	    	}
	    	this.ne = function(){
	    		return this.position - (this.grid.getHightAndWidth() - 1);
	    	}
	    	this.w = function(){
	    		return this.position - 1;
	    	}
	    	this.e = function(){
	    		return this.position + 1;
	    	}
	    	this.sw = function(){
	    		return this.position + this.grid.getHightAndWidth() - 1;
	    	}
	    	this.s = function(){
	    		return this.position + this.grid.getHightAndWidth();
	    	}
	    	this.se = function(){
	    		return this.position + this.grid.getHightAndWidth() + 1;
	    	}
	    	this.getCell = function(){
	    		var cell = new Cell(this.nw(),
	    							this.n(),
	    							this.ne(),
	    							this.w(),
	    							this.position,
	    							this.e(),
	    							this.sw(),
	    							this.s(),
	    							this.se());
	    		return cell;
	    	}
	    }

	    function extendfunc(base, obj){
			var b = new base;
			var o = new obj;
			for(var x in o){
				b[x]=o[x]	
			}
			return b;
		}
	    
	    var CellFactoryBase = function(grid, position){
	    	this.grid = grid;
	    	this.position = position;
	    }
	    CellFactoryBase.prototype = new CellCalc();

	    var NorthWestCellFactory = function(grid, position){
	    	this.grid = grid;
	    	this.position = position;
	    }
	    NorthWestCellFactory.prototype = extendfunc(CellCalc, function(){
			this.nw = function() {
				return this.grid.size() - 1;
			}
			this.n = function() {
				return this.grid.getHightAndWidth() 
					* (this.grid.getHightAndWidth() - 1);
			}
			this.ne = function() {
				return this.grid.getHightAndWidth() 
					* (this.grid.getHightAndWidth() - 1) + 1;
			}
			this.w = function() {
				return this.grid.getHightAndWidth() - 1;
			}
			this.sw = function() {
				return this.position + 
					(2 * this.grid.getHightAndWidth()) - 1;
			}
		})


		var NorthEastCellFactory = function(grid, position){
	    	this.grid = grid;
	    	this.position = position;
	    }
    	NorthEastCellFactory.prototype = extendfunc(CellCalc, function(){
	 		this.nw = function() {
				return this.grid.size() - 2;
			}
			this.n = function() {
				return this.grid.size() - 1;
			}
			this.ne = function() {
				return this.grid.size() - this.grid.getHightAndWidth();
			}
			this.e = function() {
				return 0;
			}
			this.se = function() {
				return this.position + 1;
			}
		})

		var SouthWestCellFactory = function(grid, position){
	    	this.grid = grid;
	    	this.position = position;
	    }
		SouthWestCellFactory.prototype = extendfunc(CellCalc, function(){
			this.nw = function() {
				return this.position - 1;
			}
			this.w = function() {
				return this.position + 
					this.grid.getHightAndWidth() - 1;
			}
			this.sw = function() {
				return this.position
					- (this.grid.getHightAndWidth() 
						* (this.grid.getHightAndWidth() - 2)) - 1;
			}
			this.s = function() {
				return this.position
					- (this.grid.getHightAndWidth() 
						* (this.grid.getHightAndWidth() - 1));
			}
			this.se = function() {
				return this.position
					- (this.grid.getHightAndWidth() 
						* (this.grid.getHightAndWidth() - 1)) + 1;
			}
		})



			

		var SouthEastCellFactory = function(grid, position){
	    	this.grid = grid;
	    	this.position = position;
	    }
		SouthEastCellFactory.prototype = extendfunc(CellCalc, function(){
			this.ne = function(){
				return this.position - (this.grid.getHightAndWidth() * 2) + 1;
			}
			this.e = function() {
				return this.position - this.grid.getHightAndWidth() + 1;
			}
			this.sw = function() {
				return this.position
					- (this.grid.getHightAndWidth() * (this.grid.getHightAndWidth() - 1)) - 1;
			}
			this.s = function() {
				return this.position
					- (this.grid.getHightAndWidth() * (this.grid.getHightAndWidth() - 1));
			}
			this.se = function() {
				return this.position - (this.grid.getHightAndWidth() * this.grid.getHightAndWidth()) + 1;
			}
		});
		


		var EastCellFactory = function(grid,position){
	    	this.grid = grid;
	    	this.position = position;
	    }
		EastCellFactory.prototype = extendfunc(CellCalc, function(){
			this.ne = function() {
				return this.position 
					- (this.grid.getHightAndWidth() * 2) + 1;
			}
			this.e = function() {
				return this.position 
					- this.grid.getHightAndWidth() + 1;
			}
			this.se = function() {
				return this.position + 1;
			}
		});
		var NorthCellFactory = function(grid, position){
	    	this.grid = grid;
	    	this.position = position;
	    }
		NorthCellFactory.prototype = extendfunc(CellCalc, function(){
			this.nw = function() {
				return this.position 
					+ (this.grid.getHightAndWidth() 
						* (this.grid.getHightAndWidth() - 1))
							- 1;
			}
			this.n = function() {
				return this.position
					+ (this.grid.getHightAndWidth() 
							* (this.grid.getHightAndWidth() - 1));
			}
			this.ne = function() {
				return this.position 
					+ (this.grid.getHightAndWidth() 
						* (this.grid.getHightAndWidth() - 1))
							+ 1;
			}	
		});
		var SouthCellFactory = function(grid, position){
	    	this.grid = grid;
	    	this.position = position;
	    }
		SouthCellFactory.prototype = extendfunc(CellCalc, function(){
			this.sw = function() {
				return this.position
					- (this.grid.getHightAndWidth() 
						* (this.grid.getHightAndWidth() - 1)) - 1;
			}
			this.s = function() {
				return this.position
					- (this.grid.getHightAndWidth() 
						* (this.grid.getHightAndWidth() - 1));
			}
			this.se = function() {
				return this.position
					- (this.grid.getHightAndWidth() 
						* (this.grid.getHightAndWidth() - 1)) + 1;
			}
		});

		var WestCellFactory = function(grid, position){
	    	this.grid = grid;
	    	this.position = position;
	    }
		WestCellFactory.prototype = extendfunc(CellCalc, function(){
			this.nw = function() {
				return this.position - 1;
			}
			this.w = function() {
				return this.position + 
					this.grid.getHightAndWidth() - 1;
			}
			this.sw = function() {
				return this.position + 
					(2 * this.grid.getHightAndWidth()) - 1;
			}
		});
		

		return {
        	createCellFactoryBase: function(grid, position){return new CellFactoryBase(grid, position)},
        	createNorthWestCellFactory: function(grid, position){return new NorthWestCellFactory(grid, position)},
        	createNorthCellFactory: function(grid, position){return new NorthCellFactory(grid, position)},
        	createNorthEastCellFactory: function(grid, position){return new NorthEastCellFactory(grid, position)},
        	createEastCellFactory: function(grid, position){return new EastCellFactory(grid, position)},
        	createSouthWestCellFactory: function(grid, position){return new SouthWestCellFactory(grid, position)},
        	createSouthCellFactory: function(grid, position){return new SouthCellFactory(grid, position)},
        	createSouthEastCellFactory: function(grid, position){return new SouthEastCellFactory(grid, position)},
        	createWestCellFactory: function(grid, position){return new WestCellFactory(grid, position)},
    	};
	})();



    var CellFactoryBuilder = function(grid, position){
		this.grid = grid;
    	this.position = position;

		this.seCorner = function() {
			return (this.grid.size() - 1) == this.position;
		}

		this.swCorner = function() {
			return (this.grid.size() - this.grid.getHightAndWidth()) == this.position;
		}

		this.nwCorner = function() {
			return 0 == this.position;
		}

		this.neCorner = function() {
			return this.position == (this.grid.getHightAndWidth() - 1);
		}

		this.w = function() {
			return (this.position % this.grid.getHightAndWidth()) == 0 && !this.nwCorner()
					&& !this.swCorner();
		}

		this.n = function() {
			return this.position < this.grid.getHightAndWidth() && !this.nwCorner() && !this.seCorner();
		}

		this.e = function() {
			return ((this.position - this.grid.getHightAndWidth() + 1) % this.grid.getHightAndWidth()) == 0
					&& !this.neCorner() && !this.seCorner();
		}

		this.s = function() {
			return this.position > (this.grid.size() - this.grid.getHightAndWidth()) && !this.seCorner()
					&& !this.swCorner();
		}



    	this.getCellFactory = function(){
    		var cellFactory;

			if(this.nwCorner()) {
				cellFactory = fb.createNorthWestCellFactory(grid, position);
			}else if(this.neCorner()) {
				cellFactory = fb.createNorthEastCellFactory(grid, position);
			}else if(this.swCorner()) {
				cellFactory = fb.createSouthWestCellFactory(grid, position);
			}else if(this.seCorner()) {
				cellFactory = fb.createSouthEastCellFactory(grid, position);
			}else if(this.e()) {
				cellFactory = fb.createEastCellFactory(grid,position);
			}else if(this.n()) {
				cellFactory = fb.createNorthCellFactory(grid, position);
			}else if(this.s()) {
				cellFactory = fb.createSouthCellFactory(grid, position);
			}else if(this.w()) {
				cellFactory = fb.createWestCellFactory(grid, position);
			}else {
				cellFactory = fb.createCellFactoryBase(grid,position);
			}



    		return cellFactory;
    	}

    }

    return {
        createGrid: function(hightAndWidth){return new Grid(hightAndWidth)},
        createCellFactory: function(grid, position){return new CellFactoryBuilder(grid, position).getCellFactory()},
        createTicker: function(){return new Ticker()}
    };
})();

var gol2d = (function(){
	var DrawCanvas = function(ctx){
		this.ctx = ctx;

		this.draw = function(hight, width, arr){
			this.ctx.fillStyle = "rgb(200,0,0)";
			for(var i = 0; i < arr.length; i++){
				if(arr[i]){
					var x = i % width;
					var y = parseInt(i / width, 10);
					this.ctx.fillRect (x * 10, y * 10, 10, 10);	
				}
			}
		}
	}

	return {
		createDrawCanvas: function(ctx){return new DrawCanvas(ctx)}
	}
})();

function draw() {
  	var ctx = document.getElementById('canvasid').getContext('2d');
	gol2d.createDrawCanvas(ctx).draw(2, 2, [true, false, false, true]);
}
