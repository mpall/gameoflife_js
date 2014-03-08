describe('Grid test', function(){
    it('initialise', function(){
        var grid = gol.createGrid(10);
        var data = grid.getDataArray();

        expect(grid.getHightAndWidth()).toBe(10);
        expect(data.length).toBe(100);
    })

    it('set data', function(){
        var grid = gol.createGrid(10);
        var data = grid.getData();

        grid.setData(5, "Some Data");

        expect(grid.getData(5)).toBe("Some Data");
    })
})