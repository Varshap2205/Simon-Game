let buttonColors=["red","blue","green","yellow"]
let gamePattern=[];
let userClickedPattern=[];
let level=0;
let started=false;

$(document).keydown(function(){
    if(started==false){
    $("#level-title").html("Level "+level)
    nextSequence();
    started=true;
    }
})

function nextSequence(){
    userClickedPattern=[]
    level++;
    $("#level-title").html("Level "+level)
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playsound(randomChosenColor);

    
}

function playsound(name){
    let audio=new Audio("/sounds/"+name+".mp3");
    audio.play();
}

$(".btn").click(function(){
    
    let userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
})

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $(".btn").removeClass("pressed");
    },100)
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        
    
    
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
    }
}
    else{
        playsound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        $("#level-title").html("Game Over ,Press any key to Restart ")
        restart();

    }
}

function restart(){
    level=0;
    gamePattern=[];
    started=false;
}