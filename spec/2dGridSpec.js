describe("2d grid", function(){
	var ctx;
	beforeEach(function(){
		ctx = jasmine.createSpyObj('ctx',['fillRect']);
	})
	it("Draw empty grid", function(){
		// Grid
		// |   |
		// |   |
		gol2d.createDrawCanvas(ctx).draw(2, 2, [false, false, false, false]);
		expect(ctx.fillRect.argsForCall[0]).toEqual([0, 0, 20, 20]);
		expect(ctx.fillStyle).toBe("rgb(200,0,0)");
		expect(ctx.fillRect.callCount).toBe(1);
	})
	it("Draw array into canvas context", function(){
		// Grid
		// |+  |
		// |  +|
		gol2d.createDrawCanvas(ctx).draw(2, 2, [true, false, false, true]);
		expect(ctx.fillRect).toHaveBeenCalled();
		expect(ctx.fillStyle).toBe("rgb(200,0,0)");
		expect(ctx.fillRect.callCount).toBe(3);
		expect(ctx.fillRect.argsForCall[0]).toEqual([0, 0, 20, 20]);
		expect(ctx.fillRect.argsForCall[1]).toEqual([0, 0, 10, 10]);
		expect(ctx.fillRect.argsForCall[2]).toEqual([10, 10, 10, 10]);
	})
})