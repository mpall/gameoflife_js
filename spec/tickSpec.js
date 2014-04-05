describe("Ticking", function(){
	var currentState, indexGrid, ticker;

	beforeEach(function(){
		currentState = gol.createGrid(4).initialiseFalseStateArray();
		indexGrid = gol.createGrid(4).initialiseCells();
		ticker = gol.createTicker();
	})

	it("Initiaise empty array", function(){
		expect(currentState[0]).toBe(false);
		expect(currentState[15]).toBe(false);
		expect(currentState[16]).toBe(undefined);
	});

	it("Start with nothing, end with nothing", function(){
		var nextState = ticker.tick(currentState, indexGrid);
		expect(nextState.length).toBe(16);
		for(var i = 0; i < nextState.length; i++){
			expect(nextState[i]).toBe(false);
		}
	});

	it("Under population results in death. Less than 2 neibouring cells", function(){
		var underTest = 0;	
		var neighbough = 1;
		currentState[underTest] = true;
		currentState[neighbough] = true;
		var nextState = ticker.tick(currentState, indexGrid);		
		expect(nextState[underTest]).toBe(false);
	});

	
	it("Just right. 2 neibouring cells", function(){
		var underTest = 0;	
		var neighbough1 = 1;
		var neighbough2 = 4;
		currentState[underTest] = true;
		currentState[neighbough1] = true;
		currentState[neighbough2] = true;
		var nextState = ticker.tick(currentState, indexGrid);		
		expect(nextState[underTest]).toBe(true);
	});

	it("Just right. 3 neibouring cells", function(){
		var underTest = 0;	
		var neighbough1 = 1;
		var neighbough2 = 4;
		var neighbough3 = 5;
		currentState[underTest] = true;
		currentState[neighbough1] = true;
		currentState[neighbough2] = true;
		currentState[neighbough3] = true;
		var nextState = ticker.tick(currentState, indexGrid);		
		expect(nextState[underTest]).toBe(true);
	});

	it("Overcrowed. > 3 neibouring cells", function(){
		var underTest = 0;	
		var neighbough1 = 1;
		var neighbough2 = 4;
		var neighbough3 = 5;
		var neighbough4 = 7;
		currentState[underTest] = true;
		currentState[neighbough1] = true;
		currentState[neighbough2] = true;
		currentState[neighbough3] = true;
		currentState[neighbough4] = true;
		var nextState = ticker.tick(currentState, indexGrid);		
		expect(nextState[underTest]).toBe(false);
	});

	it("Dead cell with 3 live neighboughs becomes alive", function(){
		var underTest = 0;	
		var neighbough1 = 1;
		var neighbough2 = 4;
		var neighbough3 = 5;
		var neighbough4 = 7;
		currentState[underTest] = false;
		currentState[neighbough1] = true;
		currentState[neighbough2] = true;
		currentState[neighbough3] = true;
		var nextState = ticker.tick(currentState, indexGrid);		
		expect(nextState[underTest]).toBe(true);
	});


///
})

