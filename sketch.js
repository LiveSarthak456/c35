var ball;
var database;

var position;

function setup(){
    createCanvas(500,500);

    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";


    //reading the values from database
    //camel casing
    var ballPositionRef = database.ref('ball/position');
    ballPositionRef.on("value",readPosition,showError);//polling/hawking

}

//read the balls position
//update(write) the balls position

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(updatex,updatey){

    database.ref('ball/position').set({
        x : ball.x + updatex,
        y : ball.y +updatey
    }
    );
   
}


function readPosition(databaseValues){

    position = databaseValues.val();
    console.log(position);
    ball.x =  position.x;
    ball.y = position.y;


}

function showError(){

    console.log("error");
}
