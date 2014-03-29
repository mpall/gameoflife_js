var Parent = function(ni){
	this.ni = ni;
	this.name = "From parent"

	this.getAge = function(){
		return 70
	}

	this.getNi = function(){
		return this.ni
	}

	this.getName = function(){
		return this.name;
	}
}

var Child = function(ni,name){
	this.ni = ni;
	this.name = name;
}

Child.prototype = new Parent();
