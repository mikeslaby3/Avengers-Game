$(document).ready(function() {

    var targetNumber = '';
    var blueCrystalNumber = ''; 
    var greenCrystalNumber = ''; 
    var redCrystalNumber = '';
    var purpleCrystalNumber = '';
    var crystalTotal = '';
    var wins = 0;
    var losses = 0;
    var isGameStarted

    function initializeVariables() {
        targetNumber = Math.floor((Math.random() * 101) + 19);
        
        blueCrystalNumber = Math.floor((Math.random() * 12) + 1);
        greenCrystalNumber = Math.floor((Math.random() * 12) + 1);
        redCrystalNumber = Math.floor((Math.random() * 12) + 1);
        purpleCrystalNumber = Math.floor((Math.random() * 12) + 1);
        console.log("Target " + targetNumber + " b: " + blueCrystalNumber + " g: " + greenCrystalNumber + " r: " + redCrystalNumber + " p: " + purpleCrystalNumber); 
        
        crystalTotal = 0;

        $('#target-score-text').text(targetNumber);
        $('#total-score-text').text(crystalTotal);
    };

    function gameOver(isWin) {
        if (isWin === true) {
            console.log("You win: " + crystalTotal);
            $('#game-over-message').text('You win!');
        } else {
            console.log("You lose: " + 'total ' + crystalTotal + ' target ' + targetNumber);
            $('#game-over-message').text('You lose :(');
        }
        isGameStarted = false
        $('#start').show();
        $('#game-over-message').show();
    }

    function addCrystalValueToTotal(crystalNumber) {
        if (isGameStarted === true) {
            crystalTotal += crystalNumber;
            if (crystalTotal === targetNumber) {
                wins++;
                $('#wins-text').text(wins);
                gameOver(true);
            } else if (crystalTotal > targetNumber) {
                losses++;
                $('#losses-text').text(losses);
                gameOver(false);
            } else {
                console.log("Still going! " + 'total ' + crystalTotal + ' target ' + targetNumber);
            }
    
            $('#total-score-text').text(crystalTotal);
        }
    }

    $('#start').on('click', function () {
        initializeVariables();
        $('#start').hide();
        $('#game-over-message').hide();
        isGameStarted = true;
    });

    $('#blue-crystal-image').on('click', function() {
        addCrystalValueToTotal(blueCrystalNumber);
    });

    $('#green-crystal-image').on('click', function() {
        addCrystalValueToTotal(greenCrystalNumber);
    });

    $('#red-crystal-image').on('click', function() {
        addCrystalValueToTotal(redCrystalNumber);
    });

    $('#purple-crystal-image').on('click', function() {
        addCrystalValueToTotal(purpleCrystalNumber);
    });

});



 

