describe("Add shaped to array", function(){
	var addShapesToArray;
	var arr;

	beforeEach(function(){
		var grid = gol.createGrid(5);
		addShapesToArray = gol2d.createAddShapesToArray(grid);
		arr = grid.initialiseFalseStateArray()
	})

	it("Add square to array", function(){
	//|++   |
	//|++   |
	//|     |
	//|     |
		addShapesToArray.square(0,0,arr);

		expect(arr[0]).toBeTruthy();
		expect(arr[1]).toBeTruthy();
		expect(arr[5]).toBeTruthy();
		expect(arr[6]).toBeTruthy();
		expect(arr.length).toBe(25);
	})

	it("Add square to array", function(){
	//|     |
	//|  ++ |
	//|  ++ |
	//|     |
		addShapesToArray.square(2,1,arr);

		expect(arr[7]).toBeTruthy();
		expect(arr[8]).toBeTruthy();
		expect(arr[12]).toBeTruthy();
		expect(arr[13]).toBeTruthy();
		expect(arr.length).toBe(25);

	})

	it("Throw error if shape is outsite of array", function(){
		expect(function(){addShapesToArray.square(5,5,arr)}).toThrow();
	})


	it("Add glider to array", function(){
	//|   + |
	//|+  + |
	//| + + |
	//|     |
		addShapesToArray.glider(0,0,arr);

		expect(arr[5]).toBeTruthy();
		expect(arr[11]).toBeTruthy();
		expect(arr[2]).toBeTruthy();
		expect(arr[7]).toBeTruthy();
		expect(arr[12]).toBeTruthy();
		expect(arr.length).toBe(25);
	})
})