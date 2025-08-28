//variables
let scoreFood = 0;
let gemscore = 0;
let start = false;
let foodif = false;
let currid;
let textid;
let cells = [];
let snake = [ {x:12,y:12},{x:12,y:13},{x:12,y:14},{x:12,y:15}];

//Creating Cells (We can also use Canvas tag)
for(let i=1;i<=24;i++){
    let row = [];
    for(let j= 1;j<=24;j++){
        let cell = document.createElement("div");
        cell.setAttribute("class" , "cell");
        document.querySelector(".game-screen").appendChild(cell);
        row.push(cell);
    }
    cells.push(row);
}
//initial text blink
 textid = setInterval(() => {
    document.querySelector(".cover-text").classList.toggle("blink");
   }, 700); 
//track the start of the game (Keyboard key)
document.addEventListener("keydown",()=>{
 if(start == false){
   start = true;
   document.querySelector(".cover").style.display = "none"; 
  document.querySelector(".cover-text").classList.add("blink"); 
  clearInterval(textid);

   //Create a initial snake
cells[12][12].setAttribute("class","snake-head");
cells[12][13].setAttribute("class","snake-body");
cells[12][14].setAttribute("class","snake-body");
cells[12][15].setAttribute("class","snake-tail");

  currid = loopgame(); //starts the game

 }
})
// track the start of the game (mouse-click)
document.querySelector(".game-screen").addEventListener("click",()=>{
 if(start == false){
   start = true;
   document.querySelector(".cover").style.display = "none"; 
   document.querySelector(".cover-text").classList.add("blink");
    clearInterval(textid);


   //Create a initial snake
cells[12][12].setAttribute("class","snake-head");
cells[12][13].setAttribute("class","snake-body");
cells[12][14].setAttribute("class","snake-body");
cells[12][15].setAttribute("class","snake-tail");

  currid = loopgame(); //starts the game

 }
})

//gameover
function gameover(){
  console.log("game over, id is" , currid);
   scoreFood = 0;
    document.querySelector(".text-score").textContent = `${scoreFood}`; //Score = 0
  clearInterval(currid); //stops the game
  document.querySelector(".gameover-text").style.display = "block"; //gameover text visible
  setTimeout(()=>{ //gameover text disappers
    document.querySelector(".gameover-text").style.display = "none";
     start = false; //bug fix
  },1000);
setTimeout(()=>{ //cover visible
    document.querySelector(".cover").style.display = "block"; 
  textid = setInterval(() => {
    document.querySelector(".cover-text").classList.toggle("blink"); //texts blinks
   }, 1000); 
},1000);

     for (const e of snake) { //removes old snake
      cells[e.x][e.y].removeAttribute("class");
      cells[e.x][e.y].setAttribute("class","cell");
     }
    snake = [ {x:12,y:12},{x:12,y:13},{x:12,y:14},{x:12,y:15}]; //reset snake position
  }

// loop
function loopgame(){
let id = setInterval(() => {
  work();
}, 250);
return id;
}

// Movement Tracker
let currentmove = {x:-1,y:0};
document.addEventListener("keydown",(e)=>{
    console.log(e)
if(e.key == "ArrowUp"){
 currentmove = {x:-1,y:0};
} else if(e.key == "ArrowDown"){
 currentmove = {x:1,y:0};
} else if(e.key == "ArrowLeft"){
 currentmove = {x:0,y:-1};
} else if(e.key == "ArrowRight"){
 currentmove = {x:0,y:1};
}
})
console.log(currentmove)
console.log("before", snake);

//Main logic (How snake moves)
function work(){
    for(let i=snake.length-1;i>=0;i--){
     if(i==0){ //heads
       snake[0].x = snake[0].x + currentmove.x;
       snake[0].y = snake[0].y + currentmove.y;

      cells[snake[0].x][snake[0].y].setAttribute("class","snake-head");
    } else if(i==snake.length-1){ //tail control
                if(foodif == true){ //if food eaten, then tail will..
                  foodif = false;
                 let newtail = { x: snake[i].x, y: snake[i].y };
                snake.push(newtail);

                 
                cells[snake[i].x][snake[i].y].setAttribute("class","snake-body");
                snake[i].x = snake[i-1].x;
                snake[i].y = snake[i-1].y;
               cells[snake[i].x][snake[i].y].setAttribute("class","snake-tail");
                }
                else { //if food not eaten, then tail will...
                  cells[snake[i].x][snake[i].y].removeAttribute("class");
                   cells[snake[i].x][snake[i].y].setAttribute("class","cell");
                  
    
                    snake[i].x = snake[i-1].x;
                     snake[i].y = snake[i-1].y;

                  cells[snake[i].x][snake[i].y].setAttribute("class","snake-tail");
                }

    }else { //rest body parts
     snake[i].x = snake[i-1].x;
     snake[i].y = snake[i-1].y;

     cells[snake[i].x][snake[i].y].classList.add("snake-body");
    }
   }
      
  if (snake[0].x == foodX && snake[0].y == foodY){ //generates food when snake eats food
     if (food == "gemblock"){
      document.querySelector(".text-gem").textContent = `${++gemscore}`;
     } else{
      document.querySelector(".text-score").textContent = `${++scoreFood}`;
     }
     foodController();
     foodif = true;
    
   
  }
  if(snake[0].x == 0 || snake[0].x == 23 || snake[0].y == 0|| snake[0].y == 23){
     gameover();
   
  }if(checkbite()){
      gameover();
  }
console.log("after:", snake);
}


// Food Spawn Controller
//Variables
let foodX = 17;
let foodY = 18;
let food = "apple";
// Generate a initial Food
cells[17][18].setAttribute("class","apple cell");
//Main food Spawn Function
function foodController(){
  cells[foodX][foodY].classList.remove(`${food}`); //Remove old Food

  //picks a food between Apple, cherry and banana
    let num1 = Math.floor((Math.random() * 100)+1);
    if (num1 > 70){
    food = "apple";
    } else if (num1 <70 && num1 > 40){
        food = "banana";
    } else if(num1 <40 && num1 > 10){
        food = "cherry";
    } else{
      food = "gemblock";
    }
  
   foodCoordinate(); // Generates co-ordinates

  //Controls whether food generates on map (not on snake)
   for (let i=0;true;i++){
        if(foodCheck() == false){
         break;
     } else {
       foodCoordinate();
      }
    }
  console.log(foodX,foodY);
  cells[foodX][foodY].classList.add(`${food}`); //Spawn food on map
  //Some food controller functions,
  function foodCoordinate(){ //Co-ordinate generator
   foodX =  Math.floor((Math.random() * 22)+1);
   foodY =  Math.floor((Math.random() * 22)+1);
  }
  function foodCheck(){ //check if food generated on snake
   for(let i = 0; i < snake.length; i++) {
      if(foodX == snake[i].x && foodY == snake[i].y) {
         return true;
      }
   }
   return false;
}
}

function checkbite(){
  for(let i=1; i<snake.length; i++){
    if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
      return true;
    }
  }
  return false;
}




