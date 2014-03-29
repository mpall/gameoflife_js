describe('Cell Factory', function(){
    parameterized = function(desc, expected, factory){
        describe("Testing (" + desc + ") position (" + expected[4] + ")", function(){
            it("Cell factory", function(){
                console.log("XXXXXXXXXXX" + gol.createGrid(4).getHightAndWidth())
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
    parameterized("middle", [0,1,2,4,5,6,8,9,10], gol.createCellFactory(gol.createGrid(4), 5));
    parameterized("middle", [5,6,7,9,10,11,13,14,15], gol.createCellFactory(gol.createGrid(4), 10));
    parameterized("south east", [10,11,8,14,15,12,2,3,0], gol.createCellFactory(gol.createGrid(4), 15));
    parameterized("south west", [11,8,9,15,12,13,3,0,1], gol.createCellFactory(gol.createGrid(4), 12));
    parameterized("north west", [15,12,13,3,0,1,7,4,5], gol.createCellFactory(gol.createGrid(4), 0));
    parameterized("north east", [14,15,12,2,3,0,6,7,4], gol.createCellFactory(gol.createGrid(4), 3));
    parameterized("west", [3,0,1,7,4,5,11,8,9], gol.createCellFactory(gol.createGrid(4), 4));
    parameterized("north", [12,13,14,0,1,2,4,5,6], gol.createCellFactory(gol.createGrid(4), 1));
    parameterized("east", [2,3,0,6,7,4,10,11,8], gol.createCellFactory(gol.createGrid(4), 7));
    parameterized("south", [8,9,10,12,13,14,0,1,2], gol.createCellFactory(gol.createGrid(4), 13));

})