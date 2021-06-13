intialWindow();
function intialWindow(){
    document.querySelector('.OTurn_Screen').style.display='none';
    document.querySelector('.XTurn_Screen').style.display='none';
    document.querySelector('#oneP') .style.display='block';   
    document.querySelector('#twoP') .style.display='block'; 
    document.getElementById('main').style.display='none';
    document.querySelector('.endgame').style.display='none';
    var onePlayer = document.getElementById('oneP');
    onePlayer.addEventListener('click', function(){
        document.querySelector('#oneP').style.display='none'; 
        document.querySelector('#twoP').style.display='none';
        document.querySelector('#choosing').style.display='block';
        document.querySelector('#choose_cross').style.display='block'; 
        document.querySelector('#choose_circle').style.display='block';
        var pressedOnCross = document.getElementById('choose_cross');
        pressedOnCross.addEventListener('click', function(){
            document.querySelector('#choosing').style.display='none';
            document.querySelector('#choose_cross').style.display='none'; 
            document.querySelector('#choose_circle').style.display='none';
            document.querySelector('#WhoseFirstTurn').style.display='block'; //from here
            document.querySelector('#Yes').style.display='block';
            document.querySelector('#No').style.display='block';
            var pressedonYes = document.getElementById('Yes');
            pressedonYes.addEventListener('click', function(){
                document.querySelector('#WhoseFirstTurn').style.display='none'; 
                document.querySelector('#Yes').style.display='none';
                document.querySelector('#No').style.display='none';
                one('X','O');
            })
            var pressedonNo = document.getElementById('No');
            pressedonNo.addEventListener('click',function(){
                document.querySelector('#WhoseFirstTurn').style.display='none'; 
                document.querySelector('#Yes').style.display='none';
                document.querySelector('#No').style.display='none';
                oneWithBot('X','O');
            })
        })
        var pressedOnCircle = document.getElementById('choose_circle');
        pressedOnCircle.addEventListener('click', function(){
            document.querySelector('#choosing').style.display='none';
            document.querySelector('#choose_cross').style.display='none'; 
            document.querySelector('#choose_circle').style.display='none';
            document.querySelector('#WhoseFirstTurn').style.display='block'; //from here
            document.querySelector('#Yes').style.display='block';
            document.querySelector('#No').style.display='block';
            var pressedonYes = document.getElementById('Yes');
            pressedonYes.addEventListener('click', function(){
                document.querySelector('#WhoseFirstTurn').style.display='none'; 
                document.querySelector('#Yes').style.display='none';
                document.querySelector('#No').style.display='none';
                one('O','X');
            })
            var pressedonNo = document.getElementById('No');
            pressedonNo.addEventListener('click',function(){
                document.querySelector('#WhoseFirstTurn').style.display='none'; 
                document.querySelector('#Yes').style.display='none';
                document.querySelector('#No').style.display='none';
                oneWithBot('O','X');
            })
        })
        
    });
    var twoPlayer = document.getElementById('twoP');
    twoPlayer.addEventListener('click', function(){
        document.querySelector('#oneP').style.display='none'; 
        document.querySelector('#twoP').style.display='none'; 
        two();
    });

}

function one(string1,string2){
    var BackHandboard; 
    const human = string1;
    const bot = string2;
    const WinCombo=[
                    [0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]
                    ]

    const allbox = document.querySelectorAll('.box');
    // console.log(allbox); // testing
    start();

    function start(){
        document.querySelector('#main').style.display='block';
        document.querySelector('.endgame').style.display='none';
        BackHandboard = [0,1,2,3,4,5,6,7,8];
        for(let i=0; i<9; ++i){
            allbox[i].innerHTML = '';
            allbox[i].style.backgroundImage = "url('try2.jpeg')"; 
        }
        for(let i=0; i<9; ++i){
            allbox[i].addEventListener('click', giveMeId);
        }
    }

    function giveMeId(obj){
        let boxId=obj.target.id;
        if(typeof BackHandboard[boxId] == 'number'){
            whoseTurn(boxId, human);
            // console.log(Tie()) // testingggggg
            if(Tie() == false){
                whoseTurn(bestspot(), bot); 
            } 
        }
    }

    function whoseTurn(boxId, player){
        BackHandboard[boxId] = player;
        document.getElementById(boxId).innerHTML = player;
        var isGameWon = checkWon_YoN(BackHandboard, player);
        // console.log(isGameWon) // testing
        if(isGameWon){
            GameIsOver(isGameWon);
        }
    }

    function checkWon_YoN(BackHandboard, player){
        var movedone = []; 
        for(let i=0; i<9; ++i){
            if(BackHandboard[i] == player){
                movedone.push(i);
            }
        }
        // console.log(movedone) // testing
        let gameWon = null;
        for(let[i,w] of WinCombo.entries()){
            if(w.every(elem => movedone.indexOf(elem) > -1)){
                gameWon = {WinComboIndex:i, player: player};
                break;
            }
        }
        return gameWon;
    }

    function GameIsOver(object){
        var ComboToColor = WinCombo[object.WinComboIndex];
        var reqcolor;
        if(object.player == 'O') reqcolor = 'rgba(39, 143, 192, 0.51)'; // background
        else reqcolor = 'rgba(255, 0, 0, 0.6)'; // background
        for(let i=0;i<3;++i){
            allbox[ComboToColor[i]].style.background = reqcolor;
        }
        for(let i=0; i<9; ++i){
            allbox[i].removeEventListener('click', giveMeId);
        }
        winner(object.player == human ? "You Win!" : "You lost!");
    }

    function emptyBox(){
        ArrayOfEmptyBox = [];
        for(let i=0;i<9;++i){
            if(typeof BackHandboard[i] == 'number'){
            ArrayOfEmptyBox.push(i); 
            }
        }
        return ArrayOfEmptyBox;
    }

    function bestspot(){
        return minimax(BackHandboard, bot).index;
    }

    function Tie(){
        if(emptyBox().length == 0){
            for(let i=0; i<9; ++i){
                allbox[i].style.background = 'rgba(45, 255, 58, 0.47)'; // background
                allbox[i].removeEventListener('click', giveMeId);
            }
            winner("Game Tied!");
            return true;
        }
        else return false;
    }

    function winner(Whowon){
        document.querySelector(".endgame").style.display = "block";
        document.querySelector(".endgame .text").innerHTML = Whowon;
    }

    function minimax(newboard, player){
        var emptyboxes = emptyBox();

        if(checkWon_YoN(newboard, human)) return {score: -10};
        else if (checkWon_YoN(newboard, bot)) return {score: 10};
        else if (emptyboxes.length === 0) return {score: 0};

        var moves = [];
        for(let i=0; i<emptyboxes.length; ++i){
            var temp = {};
            temp.index = newboard[emptyboxes[i]];
            newboard[emptyboxes[i]] = player;
            if(player == bot){
                var result = minimax(newboard, human);
                temp.score = result.score;
            }
            else{
                var result = minimax(newboard, bot);
                temp.score = result.score;
            }
            newboard[emptyboxes[i]] = temp.index;
            moves.push(temp);
        }
        var bestMove;
        if(player == bot){
            var bestScore = -1000000;
            for(let i=0; i<moves.length; ++i){
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        else{
            var bestScore = 1000000;
            for(let i=0; i<moves.length; ++i){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }
}

function oneWithBot(string1,string2){
    var count2=1;
    var BackHandboard; 
    const human = string1;
    const bot = string2;
    const WinCombo=[
                    [0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]
                    ]

    const allbox = document.querySelectorAll('.box');
    // console.log(allbox); // testing
    start();

    function start(){
        document.querySelector('#main').style.display='block';
        document.querySelector('.endgame').style.display='none';
        BackHandboard = [0,1,2,3,4,5,6,7,8];
        for(let i=0; i<9; ++i){
            allbox[i].innerHTML = '';
            allbox[i].style.backgroundImage = "url('try2.jpeg')"; 
        }
        if(Tie() == false){
            whoseTurn(bestspot(), bot); 
        } 
        for(let i=0; i<9; ++i){
            allbox[i].addEventListener('click', giveMeId);
        }
    }

    function giveMeId(obj){
        let boxId=obj.target.id;
        if(typeof BackHandboard[boxId] == 'number'){
            whoseTurn(boxId, human);
            // console.log(Tie()) // testingggggg
            if(Tie() == false){
                whoseTurn(bestspot(), bot); 
            } 
        }
    }

    function whoseTurn(boxId, player){
        BackHandboard[boxId] = player;
        document.getElementById(boxId).innerHTML = player;
        var isGameWon = checkWon_YoN(BackHandboard, player);
        // console.log(isGameWon) // testing
        if(isGameWon){
            GameIsOver(isGameWon);
        }
    }

    function checkWon_YoN(BackHandboard, player){
        var movedone = []; 
        for(let i=0; i<9; ++i){
            if(BackHandboard[i] == player){
                movedone.push(i);
            }
        }
        // console.log(movedone) // testing
        let gameWon = null;
        for(let[i,w] of WinCombo.entries()){
            if(w.every(elem => movedone.indexOf(elem) > -1)){
                gameWon = {WinComboIndex:i, player: player};
                break;
            }
        }
        return gameWon;
    }

    function GameIsOver(object){
        var ComboToColor = WinCombo[object.WinComboIndex];
        var reqcolor;
        if(object.player == 'O') reqcolor = 'rgba(39, 143, 192, 0.51)'; // background
        else reqcolor = 'rgba(255, 0, 0, 0.6)'; // background
        for(let i=0;i<3;++i){
            allbox[ComboToColor[i]].style.background = reqcolor;
        }
        for(let i=0; i<9; ++i){
            allbox[i].removeEventListener('click', giveMeId);
        }
        winner(object.player == human ? "You Win!" : "You lost!");
    }

    function emptyBox(){
        ArrayOfEmptyBox = [];
        for(let i=0;i<9;++i){
            if(typeof BackHandboard[i] == 'number'){
            ArrayOfEmptyBox.push(i); 
            }
        }
        return ArrayOfEmptyBox;
    }

    function bestspot(){
        return minimax(BackHandboard, bot).index;
    }

    function Tie(){
        if(emptyBox().length == 0){
            for(let i=0; i<9; ++i){
                allbox[i].style.background = 'rgba(45, 255, 58, 0.47)'; // background
                allbox[i].removeEventListener('click', giveMeId);
            }
            winner("Game Tied!");
            return true;
        }
        else return false;
    }

    function winner(Whowon){
        document.querySelector(".endgame").style.display = "block";
        document.querySelector(".endgame .text").innerHTML = Whowon;
    }

    function minimax(newboard, player){
        var emptyboxes = emptyBox();

        if(checkWon_YoN(newboard, human)) return {score: -10};
        else if (checkWon_YoN(newboard, bot)) return {score: 10};
        else if (emptyboxes.length === 0) return {score: 0};

        var moves = [];
        for(let i=0; i<emptyboxes.length; ++i){
            var temp = {};
            temp.index = newboard[emptyboxes[i]];
            newboard[emptyboxes[i]] = player;
            if(player == bot){
                var result = minimax(newboard, human);
                temp.score = result.score;
            }
            else{
                var result = minimax(newboard, bot);
                temp.score = result.score;
            }
            newboard[emptyboxes[i]] = temp.index;
            moves.push(temp);
        }
        var bestMove;
        if(player == bot){
            var bestScore = -1000000;
            for(let i=0; i<moves.length; ++i){
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        else{
            var bestScore = 1000000;
            for(let i=0; i<moves.length; ++i){
                if(moves[i].score < bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        return moves[bestMove];
    }
}

function two(){
    var count=1;
    var BackHandboard; 
    const player1 = 'O';  
    const player2 = 'X'; 
    const WinCombo=[
                    [0,1,2],
                    [3,4,5],
                    [6,7,8],
                    [0,3,6],
                    [1,4,7],
                    [2,5,8],
                    [0,4,8],
                    [2,4,6]
                    ]

    const allbox = document.querySelectorAll('.box');
    // console.log(allbox); // testing
    start();

    function start(){
        document.querySelector('.OTurn_Screen').style.display='block';
        document.querySelector('#main').style.display='block';
        document.querySelector('.endgame').style.display='none';
        BackHandboard = [0,1,2,3,4,5,6,7,8];
        for(let i=0; i<9; ++i){
            allbox[i].innerHTML = '';
            allbox[i].style.background = "url('try2.jpeg')"; //background.
        }
        for(let i=0; i<9; ++i){
            allbox[i].addEventListener('click', giveMeId);
        }
    }

    function giveMeId(obj){
        let boxId=obj.target.id;
        if(typeof BackHandboard[boxId] == 'number'){
            if(count%2 != 0){
                player_to_move = player1;
            }
            else{
                player_to_move = player2;
            }
            if(player_to_move == 'X'){
                document.querySelector('.XTurn_Screen').style.display='none';
                document.querySelector('.OTurn_Screen').style.display='block';
            }
            if(player_to_move == 'O'){
                document.querySelector('.XTurn_Screen').style.display='block';
                document.querySelector('.OTurn_Screen').style.display='none';
            }
            whoseTurn(boxId, player_to_move);
            if(Tie() == false) count=count+1;
        }
    }

    function whoseTurn(boxId, player){
        BackHandboard[boxId] = player;
        document.getElementById(boxId).innerHTML = player;
        var isGameWon = checkWon_YoN(BackHandboard, player);
        // console.log(isGameWon) // testing
        if(isGameWon){
            GameIsOver(isGameWon);
        }
    }

    function checkWon_YoN(BackHandboard, player){
        var movedone = []; 
        for(let i=0; i<9; ++i){
            if(BackHandboard[i] == player){
                movedone.push(i);
            }
        }
        // console.log(movedone) // testing
        let gameWon = null;
        for(let[i,w] of WinCombo.entries()){
            if(w.every(elem => movedone.indexOf(elem) > -1)){
                gameWon = {WinComboIndex:i, player: player};
                break;
            }
        }
        return gameWon;
    }

    function GameIsOver(object){
        var ComboToColor = WinCombo[object.WinComboIndex];
        var reqcolor;

        if(object.player == 'O') reqcolor = 'rgba(39, 143, 192, 0.51)'; // background
        else reqcolor = 'rgba(255, 0, 0, 0.6)'; // background

        for(let i=0;i<3;++i){
            allbox[ComboToColor[i]].style.background = reqcolor;
        }
        for(let i=0; i<9; ++i){
            allbox[i].removeEventListener('click', giveMeId);
        }
        document.querySelector('.OTurn_Screen').style.display='none'; 
        document.querySelector('.XTurn_Screen').style.display='none';
        winner(object.player == player1 ? "Player-1 ('O') Won!" : "Player-2 ('X') Won!");
    }

    function emptyBox(){
        ArrayOfEmptyBox = [];
        for(let i=0;i<9;++i){
            if(typeof BackHandboard[i] == 'number'){
            ArrayOfEmptyBox.push(i); 
            }
        }
        return ArrayOfEmptyBox;
    }

    function Tie(){
        if(emptyBox().length == 0){
            for(let i=0; i<9; ++i){
                allbox[i].style.background = 'rgba(45, 255, 58, 0.47)'; // background
                allbox[i].removeEventListener('click', giveMeId);
            }
            document.querySelector('.OTurn_Screen').style.display='none'; 
            document.querySelector('.XTurn_Screen').style.display='none'; 
            winner("Game Tied!");
            return true;
        }
        else return false;
    }

    function winner(Whowon){
        document.querySelector(".endgame").style.display = "block";
        document.querySelector(".endgame .text").innerHTML = Whowon;
    }
}