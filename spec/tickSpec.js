describe("Ticking", function(){
	it("Initiaise empty array", function(){
		
		var currentState = gol.createGrid(4).initialiseFalseStateArray();
		expect(currentState[0]).toBe(false);
		expect(currentState[15]).toBe(false);
		expect(currentState[16]).toBe(undefined);

	});

	it("Start with nothing, end with nothing", function(){
	});
})

