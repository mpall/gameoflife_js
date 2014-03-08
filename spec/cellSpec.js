describe('Cell Factory', function(){
    it('middle', function(){
        var grid = gol.createGrid(4);
        
        var factory = gol.createCellFactory(grid, 5);
        var cell = factory.getCell();
        expect(factory.nw()).toBe(0);
        expect(factory.n()).toBe(1);
        expect(factory.ne()).toBe(2);
        expect(factory.w()).toBe(4);
        expect(factory.e()).toBe(6);
        expect(factory.sw()).toBe(8);
        expect(factory.s()).toBe(9);
        expect(factory.se()).toBe(10);
    })

    it('middle 2', function(){
        var grid = gol.createGrid(4);
        
        var factory = gol.createCellFactory(grid, 10);
        var cell = factory.getCell();
        expect(factory.nw()).toBe(5);
        expect(factory.n()).toBe(6);
        expect(factory.ne()).toBe(7);
        expect(factory.w()).toBe(9);
        expect(factory.e()).toBe(11);
        expect(factory.sw()).toBe(13);
        expect(factory.s()).toBe(14);
        expect(factory.se()).toBe(15);
    })

    parameterized = function(expected, factory){
        describe("position (" + expected[4] + ")", function(){
            it("Cell factory", function(){
                console.log('parameter: ')
                expect(factory.nw()).toBe(expected[0]);
                expect(factory.n()).toBe(expected[1]);
                expect(factory.ne()).toBe(expected[2]);
                expect(factory.w()).toBe(expected[3]);
                expect(factory.position).toBe(expected[4]);
                expect(factory.e()).toBe(expected[5]);
                expect(factory.sw()).toBe(expected[6]);
                expect(factory.s()).toBe(expected[7]);
                expect(factory.se()).toBe(expected[8]);
            })

        })
    }
    parameterized([0,1,2,4,5,6,8,9,10], gol.createCellFactory(gol.createGrid(4), 5));
    parameterized([5,6,7,9,10,11,13,14,15], gol.createCellFactory(gol.createGrid(4), 10));
    
})