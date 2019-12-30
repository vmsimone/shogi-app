function setBoard() {
    //"pawns"
    $('.r3 > .square').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>歩</b>
        </div>`
    );
    $('.r7 > .square').html(
        `<div class="piece">
            <b>歩</b>
        </div>`
    );
    //king
    $('#5九').html(
        `<div class="piece">
            <b>玉</b>
        </div>`
    );
    $('#5一').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>玉</b>
        </div>`
    );
    //"bishop"
    $('#8八').html(
        `<div class="piece">
            <b>角</b>
        </div>`
    );
    $('#2二').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>角</b>
        </div>`
    );
    //"rook"
    $('#2八').html(
        `<div class="piece">
            <b>飛</b>
        </div>`
    );
    $('#8二').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>飛</b>
        </div>`
    );
    //lance
    $('#9九, #1九').html(
        `<div class="piece">
            <b>香</b>
        </div>`
    );
    $('#9一, #1一').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>香</b>
        </div>`
    );
    //"knight"
    $('#8九, #2九').html(
        `<div class="piece">
            <b>桂</b>
        </div>`
    );
    $('#8一, #2一').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>桂</b>
        </div>`
    );
    //silver
    $('#7九, #3九').html(
        `<div class="piece">
            <b>銀</b>
        </div>`
    );
    $('#7一, #3一').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>銀</b>
        </div>`
    );
    //gold
    $('#6九, #4九').html(
        `<div class="piece">
            <b>金</b>
        </div>`
    );
    $('#6一, #4一').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>金</b>
        </div>`
    );
}

function selectPiece() {
    
}

function loadPage() {
    setBoard();
}

$(loadPage);