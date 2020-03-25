var indention;
class x2048x{
	constructor(){
		this.colors = ["white", "yellow", "gold", "orange", "red", "magenta", "purple", "blue", "green"];
		/*
		this.game = [
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		];
		this.empties = 16;
		this.nums = [];
		this.score = 0;
		this.getOpportunitiesOfNums = 1;
		this.generateNum();
		*/
	}
	getRandInt(min, max){
		return Math.floor(max*Math.random())+min;
	}
	generateNum(){
		if(this.empties > 0){
			var x = this.getRandInt(0,4), y = this.getRandInt(0,4);
			while(this.game[y][x] != 0){
				x = this.getRandInt(0,4), y = this.getRandInt(0,4);
			}
			var newNum = new Num(x,y);
			this.nums.push(newNum);
			this.game[y][x] = newNum.index;
			this.empties--;
		}
	}
	checkOpportunitiesOfNums(){
		this.getOpportunitiesOfNums = 0;
		for(var i in this.nums){
			this.nums[i].checkOpportunitySteps();
			if(this.nums[i].opportunities > 0)
				this.getOpportunitiesOfNums++;
		}
	}
	start(){
		this.game = [
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0],
			[0,0,0,0]
		];
		this.empties = 16;
		this.nums = [];
		this.score = 0;
		this.getOpportunitiesOfNums = 1;
		this.generateNum();
		for(var i = 0; i < this.nums.length; i++){
			this.nums[i].checkOpportunitySteps();
		}
		this.setupContent();
		document.getElementById("score").innerHTML = "Score: " + this.score;
		document.getElementById("gameover").innerHTML = "";
		document.getElementById("playagain").style.display = "none";
		this.pressKey();
	}
	refresh(){
		this.generateNum();
		document.getElementById("score").innerHTML = "Score: " + this.score;
		var z = document.getElementById("scene").childNodes.length;
		for(var i = 0; i < z; i++){
			document.getElementById("scene").removeChild(document.getElementById("scene").childNodes[0]);
		}
		this.setupContent();
		this.checkOpportunitiesOfNums();
		if(this.empties == 0 && this.getOpportunitiesOfNums == 0){
			this.gameOver();
		}
		this.pressKey();
	}
	moveUp(){
		this.sortUp();
		for(indention = 0; indention < this.nums.length; indention++){
			this.game[this.nums[indention].y][this.nums[indention].x] = 0;
			this.nums[indention].moveUp();
			this.game[this.nums[indention].y][this.nums[indention].x] = this.nums[indention].index;
		}
		this.refresh();
	}
	moveDown(){
		this.sortDown();
		for(indention = 0; indention < this.nums.length; indention++){
			this.game[this.nums[indention].y][this.nums[indention].x] = 0;
			this.nums[indention].moveDown();
			this.game[this.nums[indention].y][this.nums[indention].x] = this.nums[indention].index;
		}
		this.refresh();
	}
	moveLeft(){
		this.sortLeft();
		for(indention = 0; indention < this.nums.length; indention++){
			this.game[this.nums[indention].y][this.nums[indention].x] = 0;
			this.nums[indention].moveLeft();
			this.game[this.nums[indention].y][this.nums[indention].x] = this.nums[indention].index;
		}
		this.refresh();
	}
	moveRight(){
		this.sortRight();
		for(indention = 0; indention < this.nums.length; indention++){
			this.game[this.nums[indention].y][this.nums[indention].x] = 0;
			this.nums[indention].moveRight();
			this.game[this.nums[indention].y][this.nums[indention].x] = this.nums[indention].index;
		}
		this.refresh();
	}
	removeNum(x,y){
		for(var i = 0; i < this.nums.length; i++){
			if(this.nums[i].x == x && this.nums[i].y == y){
				if(i < indention){
					indention--;
				}
				this.nums.splice(i,1);
				this.game[y][x] = 0;
			}
		}
		this.empties++;
	}
	sortUp(){
		var arr = [];
		for(var i = 0; i < 4; i++){
			for(var j in this.nums){
				if(this.nums[j].y == i){ arr.push(this.nums[j])};
				}
			}
		this.nums = arr.slice(0);
	}
	sortDown(){
		var arr = [];
		for(var i = 3; i >= 0; i--){
			for(var j in this.nums){
				if(this.nums[j].y == i){ arr.push(this.nums[j])};
				}
			}
		this.nums = arr.slice(0);
	}
	sortLeft(){
		var arr = [];
		for(var i = 0; i < 4; i++){
			for(var j in this.nums){
				if(this.nums[j].x == i){ arr.push(this.nums[j])};
				}
			}
		this.nums = arr.slice(0);
	}
	sortRight(){
		var arr = [];
		for(var i = 3; i >= 0; i--){
			for(var j in this.nums){
				if(this.nums[j].x == i){ arr.push(this.nums[j])};
				}
			}
		this.nums = arr.slice(0);
	}
	gameOver(){
		document.getElementById("gameover").innerHTML = "Game Over. Your score is "+ this.score;
		document.getElementById("playagain").style.display = "block";
	}
	pressKey(){
		document.onkeydown = function(event){
		switch (event.keyCode){
			case 37:
				myGame.moveLeft();
			break;
			case 38:
				myGame.moveUp();
			break;
			case 39:
				myGame.moveRight();
			break;
			case 40:
				myGame.moveDown();
			break;
			};
		}
	}
	setupContent(){
		var childNodes = document.getElementById("scene").childNodes.length;
		for(var i = 0; i < childNodes; i++){
			document.getElementById("scene").removeChild(document.getElementById("scene").childNodes[0]);
		}
		for(var i = 0; i < 4; i++){
			var row = document.createElement("div"); row.id="row"+(i+1);
			for(var j = 0; j < 4; j++){
				var x = document.createElement("div"); x.id="col"+(j+1);
				var val = (this.game[i][j] == 0) ? " " : this.game[i][j];
				if(this.game[i][j] != 0){
					var z = (Math.log(this.game[i][j])/Math.log(2))%this.colors.length;
					x.style.background = this.colors[z];
				}
				var y = document.createTextNode(val);
				x.appendChild(y);
				row.appendChild(x);
			}
			document.getElementById("scene").appendChild(row);
		}
	}
}
class Num{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.index = 2;
		this.opportunities = 0;
	}
	moveUp(){
		for(var i = this.y; i > 0; i--){
			if((myGame.game[this.y-1][this.x] != 0) && (myGame.game[this.y-1][this.x] != this.index)){
				this.y++;
			}
			if(myGame.game[this.y-1][this.x] == this.index){
				this.index *= 2;
				myGame.score += this.index;
				myGame.removeNum(this.x, this.y - 1);
			}
			this.y--;
		}
	}
	moveDown(){
		for(var i = this.y; i < 3; i++){
			if((myGame.game[this.y+1][this.x] != 0) && (myGame.game[this.y+1][this.x] != this.index)){
				this.y--;
			}
			if(myGame.game[this.y+1][this.x] == this.index){
				this.index *= 2;
				myGame.score += this.index;
				myGame.removeNum(this.x, this.y + 1);
			}
			this.y++;
		}
	}
	moveLeft(){
		for(var i = this.x; i > 0; i--){
			if((myGame.game[this.y][this.x-1] != 0) && (myGame.game[this.y][this.x-1] != this.index)){
				this.x++;
			}
			if(myGame.game[this.y][this.x-1] == this.index){
				this.index *= 2;
				myGame.score += this.index;
				myGame.removeNum(this.x-1, this.y);
			}
			this.x--;
		}
	}
	moveRight(){
		for(var i = this.x; i < 3; i++){
			if((myGame.game[this.y][this.x+1] != 0) && (myGame.game[this.y][this.x+1] != this.index)){
				this.x--;
			}
			if(myGame.game[this.y][this.x+1] == this.index){
				this.index *= 2;
				myGame.score += this.index;
				myGame.removeNum(this.x+1, this.y);
			}
			this.x++;
		}
	}
	checkOpportunitySteps(){
		this.opportunities = 0;
		if(this.x > 0)
			if ((myGame.game[this.y][this.x-1]==0) || (myGame.game[this.y][this.x-1]==this.index)){ this.opportunities++;}
		if(this.x < 3)
			if ((myGame.game[this.y][this.x+1]==0) || (myGame.game[this.y][this.x+1]==this.index)){ this.opportunities++;}
		if(this.y > 0){
			if ((myGame.game[this.y-1][this.x]==0) || (myGame.game[this.y-1][this.x]==this.index)) this.opportunities++;}
		if(this.y < 3){
			if ((myGame.game[this.y+1][this.x]==0) || (myGame.game[this.y+1][this.x]==this.index)) this.opportunities++;}
	}
}

var myGame = new x2048x();
myGame.start();