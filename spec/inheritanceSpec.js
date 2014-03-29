describe("Inheritance", function(){
	it("Straight inheritace", function(){
		var p = new Parent(10);
		expect(p.getName()).toBe("From parent")
		expect(p.getAge()).toBe(70)
		expect(p.getNi()).toBe(10)

		var c = new Child(20, "testName");
		expect(c.getAge()).toBe(70)
		expect(c.getName()).toBe("testName")
		expect(c.getNi()).toBe(20)

		var Sub = function(){
			this.title = "TITLE";
		}
		var s = new Sub();

		for(x in s){
			c[x]=s[x]
		}

		expect(c.title).toBe("TITLE");


	})

	
})