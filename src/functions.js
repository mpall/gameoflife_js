"use strict";
var gol = (function(){
	var Cell = function(nw, n, ne, w, position, e, sw, s, se){
     this.position = position;
    	this.neighbours = [nw,n,ne,w,e,sw,w,se]
    	this.getPosition = function(){
    		return this.position;
    	}
    	this.neighboursIndexes = function(){
    		return neighbours;
    	}
    };

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
    };

    
    var CellFactoryBase = function(grid, position){
    	this.grid = grid;
    	this.position = position;

    	this.nw = function(){
    		return this.position - (grid.getHightAndWidth() + 1)
    	}
    	this.n = function(){
    		return this.position - grid.getHightAndWidth()
    	}
    	this.ne = function(){
    		return this.position - (grid.getHightAndWidth() - 1);
    	}
    	this.w = function(){
    		return this.position - 1;
    	}
    	this.e = function(){
    		return this.position + 1;
    	}
    	this.sw = function(){
    		return this.position + grid.getHightAndWidth() - 1;
    	}
    	this.s = function(){
    		return this.position + grid.getHightAndWidth();
    	}
    	this.se = function(){
    		return this.position + grid.getHightAndWidth() + 1;
    	}
    	this.getCell = function(grid, position){
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

    return {
        createGrid: function(hightAndWidth){return new Grid(hightAndWidth)},
        createCellFactory: function(grid, position){return new CellFactoryBase(grid, position)}
    };
})();