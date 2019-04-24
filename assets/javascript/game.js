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
        if (wins === 1) {
            setVisibility('#modal-1', SHOW);
        } else if (wins === 2) {
            setVisibility('#modal-2', SHOW);
        } else if (wins === 3) {
            setVisibility('#modal-3', SHOW);
        } else if (wins === 4) {
            setVisibility('#modal-4', SHOW);
        } else if (wins === 5) {
            setVisibility('#modal-5', SHOW);
        } else {
            setVisibility('#modal-6', SHOW);
        }
    } else {
        if (losses < 10) {
            setVisibility('#loss-modal', SHOW);
        } else {
            setVisibility('#game-over-modal', SHOW);
        }
    }
    isGameStarted = false
}

function resetWinsAndLosses() {
    wins = 0;
    losses = 0;
    $('#wins-text').text(wins);
    $('#losses-text').text(losses);

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

function enterAvengersAnimation() {
    $('.hero-image').addClass('animated fadeInLeft').one('webkitAnimationEnd', function(){
        $(this).removeClass('animated fadeInLeft');
    });    
    $('#thanos-image').addClass('animated fadeInUp delay-1s').one('webkitAnimationEnd', function(){
        $(this).removeClass('animated fadeInUp delay-1s');
    });
}

function attackThanosAnimation(avenger) {
    $('#thanos-image').addClass('animated shake').one('webkitAnimationEnd', function(){
        $(this).removeClass('animated shake');
    });
    $('#damage-div').addClass('animated flash').one('webkitAnimationEnd', function(){
        $(this).removeClass('animated flash');
    });
    $('#' + avenger + '-image').addClass('animated tada').one('webkitAnimationEnd', function(){
        $(this).removeClass('animated tada');
    });
}


$(document).ready(function () {
    
    setVisibility('.modal', HIDE);
    setVisibility('#instructions-menu', HIDE);
    setVisibility('#game-screen', HIDE);

    $(document).on('click', '#instructions-button', function () {
        setVisibility('#game-menu', HIDE);
        setVisibility('#instructions-menu', SHOW);
    });

    $(document).on('click', '#menu-back-button', function () {
        setVisibility('#game-menu', SHOW);
        setVisibility('#instructions-menu', HIDE);
    });

    $(document).on('click', '#start-button', function () {
        initializeVariables();
        enterAvengersAnimation();
        setVisibility("#game-menu", HIDE);
        setVisibility("#game-screen", SHOW);
        isGameStarted = true;
    });

    // =====================
    // Modal Buttons
    // =====================

    $(document).on('click', '#continue', function () {
        setVisibility('.modal', HIDE);
        initializeVariables();
        isGameStarted = true;
    });

    $(document).on('click', '.play-again', function () {
        setVisibility('.modal', HIDE);
        enterAvengersAnimation();
        initializeVariables();
        resetWinsAndLosses();
        isGameStarted = true;
    });

    $(document).on('click', '#game-over-back-button', function () {
        setVisibility('#game-menu', SHOW);
        setVisibility('#instructions-menu', HIDE);
        setVisibility('#game-screen', HIDE);
        setVisibility('.modal', HIDE);
        resetWinsAndLosses();
    });

    // =====================
    // Avenger Attacks
    // =====================

    $(document).on('click', '#captain-america-image', function () {
        addDamageValueToTotal(captainAmericaDamage);
        attackThanosAnimation('captain-america');
    });

    $(document).on('click', '#iron-man-image', function () {
        addDamageValueToTotal(ironmanDamage);
        attackThanosAnimation('iron-man');
    });

    $(document).on('click', '#thor-image', function () {
        addDamageValueToTotal(thorDamage);
        attackThanosAnimation('thor');
    });

    $(document).on('click', '#hulk-image', function () {
        addDamageValueToTotal(hulkDamage);
        attackThanosAnimation('hulk');
    });

});





