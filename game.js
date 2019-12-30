function setBoard() {
    $('.r3 > .square').html(
        `<div class="piece">
            <b>歩</b>
        </div>`
    );
    $('.r7 > .square').html(
        `<div class="piece">
            <b>歩</b>
        </div>`
    );
}

function loadPage() {
    setBoard();
}

$(loadPage);