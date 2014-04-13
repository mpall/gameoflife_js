describe("Animate by ticking", function(){
	it("Animate until stopped", function(){
		//runs(function(){
		var state1 = {state: 1};
		var state2 = {state: 2};
		var state3 = {state: 3}; 
		var indexGrid = {hightAndWidth: 2};
		var ticker = {tick: "", desc: "DESC: ticker"};
		var drawCanvas = jasmine.createSpyObj('drawCanvas', ['draw']);

		spyOn(ticker, 'tick').andCallFake(function(currentState, indexGrid){
			if(currentState.state == 1){
				console.log("Called with state 1 returning state 2");
				return state2;
			}else if(currentState.state == 2){
				console.log("Called with state 2 returning state 3");
				return state3;
			}
		});

		var AnimatorController_ExitAfterThreeTicks = function(millisec){
			this.millisec = millisec;
			this.exitState = false;
			this.callCount = 0;

			this.exit = function(){
				this.callCount++;
				return this.callCount > 2;
			}			

			this.timeToExit = function(){
				this.exitState = true;
			}

		}

		var controller = new AnimatorController_ExitAfterThreeTicks(1);

		var animator = gol.createAnimator(controller, 
									state1, 
									indexGrid, 
									ticker,
									drawCanvas);

		runs(function(){
				animator.animate();
		});

		waits(100);

		runs(function(){
				expect(drawCanvas.draw.argsForCall[0]).toEqual([2, 2, state1]);
				expect(ticker.tick.argsForCall[0]).toEqual([state1, indexGrid]);
				expect(drawCanvas.draw.argsForCall[1]).toEqual([2, 2, state2]);
				expect(ticker.tick.argsForCall[1]).toEqual([state2, indexGrid]);
		});

		
		
	})
})