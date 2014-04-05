describe("Ticking", function(){
	it("Initiaise empty array", function(){
		
		var currentState = gol.createGrid(4).initialiseFalseStateArray();
		expect(currentState[0]).toBe(false);
		expect(currentState[15]).toBe(false);
		expect(currentState[16]).toBe(undefined);

	});

	it("Start with nothing, end with nothing", function(){
		var indexGrid = gol.createGrid(4).initialiseCells();
		var currentState = indexGrid.initialiseFalseStateArray();
		var ticker = gol.createTicker();
		var nextState = ticker.tick(currentState, indexGrid);
		expect(nextState.length).toBe(16);
		for(var i = 0; i < nextState.length; i++){
			expect(nextState[i]).toBe(false);
		}
	});

	it("Under population results in death. Less than 2 neibouring cells", function(){
		var indexGrid = gol.createGrid(4).initialiseCells();
		var currentState = indexGrid.initialiseFalseStateArray();
		ticker = gol.createTicker();
		var underTest = 0;	
		var neighbough = 1;
		currentState[underTest] = true;
		currentState[neighbough] = true;
		var nextState = ticker.tick(currentState, indexGrid);		
		expect(nextState[underTest]).toBe(false);
	});

	it("Just right. 2 neibouring cells", function(){
		var indexGrid = gol.createGrid(4).initialiseCells();
		var currentState = indexGrid.initialiseFalseStateArray();
		ticker = gol.createTicker();
		var underTest = 0;	
		var neighbough1 = 1;
		var neighbough2 = 4;
		currentState[underTest] = true;
		currentState[neighbough1] = true;
		currentState[neighbough2] = true;
		var nextState = ticker.tick(currentState, indexGrid);		
		expect(nextState[underTest]).toBe(true);
	});


///
})

