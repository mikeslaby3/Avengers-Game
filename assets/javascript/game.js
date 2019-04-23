const HIDE = true;
const SHOW = false;

var thanosHealth = '';
var captainAmericaDamage = '';
var ironmanDamage = '';
var thorDamage = '';
var hulkDamage = '';
var damageTotal = '';
var wins = 0;
var losses = 0;
var isGameStarted;

function setVisibility(id, hide) {
    if (hide === true) {
        $(id).hide();
    } else {
        $(id).show();
    }
}

function initializeVariables() {
    thanosHealth = Math.floor((Math.random() * 101) + 19);

    captainAmericaDamage = Math.floor((Math.random() * 12) + 1);
    ironmanDamage = Math.floor((Math.random() * 12) + 1);
    thorDamage = Math.floor((Math.random() * 12) + 1);
    hulkDamage = Math.floor((Math.random() * 12) + 1);

    damageTotal = 0;

    $('#thanos-health-text').text(thanosHealth);
    $('#total-damage-text').text(damageTotal);
};

function gameOver(isWin) {
    if (isWin === true) {
        console.log("You win: " + damageTotal);
        alert('You win!')
    } else {
        console.log("You lose: " + 'total ' + damageTotal + ' target ' + thanosHealth);
        alert('You Lose :(')
    }
    isGameStarted = false
    setVisibility("#start", SHOW);
    setVisibility("#game-over-message", SHOW);
}

function addDamageValueToTotal(damageValue) {
    if (isGameStarted === true) {
        damageTotal += damageValue;
        if (damageTotal === thanosHealth) {
            wins++;
            $('#wins-text').text(wins);
            gameOver(true);
        } else if (damageTotal > thanosHealth) {
            losses++;
            $('#losses-text').text(losses);
            gameOver(false);
        } else {
            console.log("Still going! " + 'total ' + damageTotal + ' target ' + thanosHealth);
        }

        $('#total-damage-text').text(damageTotal);
    }
}

$(document).ready(function () {

    setVisibility('#instructions-menu', HIDE);
    setVisibility('#game-screen', HIDE);

    $('#instructions-button').on('click', function () {
        setVisibility('#game-menu', HIDE);
        setVisibility('#instructions-menu', SHOW);
    });

    $('#back-button').on('click', function () {
        setVisibility('#game-menu', SHOW);
        setVisibility('#instructions-menu', HIDE);
    });

    $('#start-button').on('click', function () {
        initializeVariables();
        setVisibility("#game-menu", HIDE);
        setVisibility("#game-screen", SHOW);
        isGameStarted = true;
    });

    $('#captain-america-image').on('click', function () {
        addDamageValueToTotal(captainAmericaDamage);
    });

    $('#iron-man-image').on('click', function () {
        addDamageValueToTotal(ironmanDamage);
    });

    $('#thor-image').on('click', function () {
        addDamageValueToTotal(thorDamage);
    });

    $('#hulk-image').on('click', function () {
        addDamageValueToTotal(hulkDamage);
    });

});





