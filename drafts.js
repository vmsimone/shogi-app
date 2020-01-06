function setBoard() {
    //"pawns"
    $('.r3 > .square').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>歩</b>
        </div>`
    );
    $('.r7 > .square').html(
        `<div class="black piece">
            <b>歩</b>
        </div>`
    );
    //king
    $('#59').html(
        `<div class="black piece">
            <b>玉</b>
        </div>`
    );
    $('#51').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>玉</b>
        </div>`
    );
    //"bishop"
    $('#88').html(
        `<div class="black piece">
            <b>角</b>
        </div>`
    );
    $('#22').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>角</b>
        </div>`
    );
    //"rook"
    $('#28').html(
        `<div class="black piece">
            <b>飛</b>
        </div>`
    );
    $('#82').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>飛</b>
        </div>`
    );
    //lance
    $('#99, #19').html(
        `<div class="black piece">
            <b>香</b>
        </div>`
    );
    $('#91, #11').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>香</b>
        </div>`
    );
    //"knight"
    $('#89, #29').html(
        `<div class="black piece">
            <b>桂</b>
        </div>`
    );
    $('#81, #21').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>桂</b>
        </div>`
    );
    //silver
    $('#79, #39').html(
        `<div class="black piece">
            <b>銀</b>
        </div>`
    );
    $('#71, #31').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>銀</b>
        </div>`
    );
    //gold
    $('#69, #49').html(
        `<div class="black piece">
            <b>金</b>
        </div>`
    );
    $('#61, #41').html(
        `<div class="shadow"></div>
        <div class="white piece">
            <b>金</b>
        </div>`
    );
}

function move() {
    $(`#${oldId}`).html('');
    $(`#${newId}`).html(
        `
        <div class="black piece">
            <b>${piece}</b>
        </div>`
    );
}

function sumStrings(a, b) {
    return parseInt(a) + parseInt(b);
}

function sumCoordinates(coordinates) {
    return coordinates.split('').reduce(sumStrings);
}

function kyouMoves(color, coordinates) {
    let origin = parseInt(coordinates);
    if(color === 'black') {
        let i = origin - 1;
        let possibleSquares = [];

        //alternatively, while(i > (Math.ceil((origin - 9) / 10) * 10))
        while(i % 10 !== 0) {
            possibleSquares.push(i);
            //prevents leaping over pieces
            if(BOARD_STATE[i].piece) {
                break;
            }
            i--
        }
        return possibleSquares;
    } else {
        let i = origin + 1;
        let possibleSquares = [];

        //alternatively, while(i < (Math.floor((origin + 9) / 10) * 10))
        while(i % 10 !== 0) {
            possibleSquares.push(i);
            //prevents leaping over pieces
            if(BOARD_STATE[i].piece) {
                break;
            }
            i++
        }
        return possibleSquares;
    }
}