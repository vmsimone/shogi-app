function setBoard() {
    for(i=1; i<=9; i++) {
        updateBoard(`${i}3`, "歩", "white");
        updateBoard(`${i}7`, "歩", "black");
    }
    updateBoard("59", "王", "black");
    updateBoard("51", "王", "white");

    updateBoard("88", "角", "black");
    updateBoard("22", "角", "white");

    updateBoard("28", "飛", "black");
    updateBoard("82", "飛", "white");

    updateBoard("99", "香", "black");
    updateBoard("19", "香", "black");
    updateBoard("91", "香", "white");
    updateBoard("11", "香", "white");

    updateBoard("89", "桂", "black");
    updateBoard("29", "桂", "black");
    updateBoard("81", "桂", "white");
    updateBoard("21", "桂", "white");

    updateBoard("79", "銀", "black");
    updateBoard("39", "銀", "black");
    updateBoard("71", "銀", "white");
    updateBoard("31", "銀", "white");

    updateBoard("69", "金", "black");
    updateBoard("49", "金", "black");
    updateBoard("61", "金", "white");
    updateBoard("41", "金", "white");

    updateHTML();
}

function updateHTML() {
    for (square in BOARD_STATE) {
        let thisSquare = BOARD_STATE[square]
        if (thisSquare.piece) {
            $(`#${square}`).html(
                `${thisSquare.color === 'white' ? '<div class="shadow"></div>' : ''}
                <div class="${thisSquare.color} piece">
                    <b>${thisSquare.piece}</b>
                </div>`
            );
            if(PROMOTED_PIECES.indexOf(thisSquare.piece) !== -1) {
                $(`#${square}`).children().addClass('promoted');
            }
        } else if (square == 'black-captures' || square == 'white-captures') {
            $(`.${square}`).html('');
            thisSquare.forEach(piece => {
                $(`.${square}`).append(
                    `${square === 'white-captures' ? '<div class="shadow"></div>' : ''}
                    <div class="${square === 'white-captures' ? 'white' : 'black'} piece">
                        <b>${piece}</b>
                    </div>`
                );
            });
        } else {
            $(`#${square}`).html('');
        }
    }
}

function findValidMoves(square) {
    let validMoves = [];
    let possibleMoves = [];

    const thisPiece = BOARD_STATE[square].piece;
    const thisColor = BOARD_STATE[square].color;

    validMoves = movementHandler(thisPiece, thisColor, square);

    //make sure pieces are not blocked by own pieces or moving off the board
    validMoves.forEach(move => {
        if(BOARD_STATE[move] !== undefined && BOARD_STATE[move].color !== thisColor) {
            possibleMoves.push(move);
        }
    });
    return possibleMoves;
}

function readyMove(square) {
    const validMoves = findValidMoves(square);
    validMoves.forEach(move => {
        $(`#${move}`).addClass('possible-move');
    });
    if (validMoves) {
        listenMove(square, validMoves);
    } else {
        BOARD_STATE[square].color === 'black' ? listenWhite() : listenBlack();
    }
}

function movePiece(oldSquare, newSquare) {
    $('.square').off('click');

    let thisPiece = BOARD_STATE[oldSquare].piece;
    let thisColor = BOARD_STATE[oldSquare].color;

    $('.previous-move').removeClass('previous-move');
    $('.possible-move').removeClass('possible-move');
    
    $(`#${oldSquare}`).removeClass('selected');
    $(`#${newSquare}`).addClass('previous-move');
    
    if(BOARD_STATE[newSquare].piece) {
        capturePiece(BOARD_STATE[newSquare].piece, thisColor);
    }

    BOARD_STATE[oldSquare] = '';
    updateBoard(newSquare, thisPiece, thisColor);

    if(isInPromotionZone(newSquare, thisColor)) {
        promote(thisPiece, newSquare);
    }

    if(kingIsInCheck(thisColor, thisPiece, newSquare)) {
        check();
    }

    updateHTML();

    thisColor === 'black' ? listenWhite() : listenBlack();
    
    //$('main').toggleClass('flipped');
}

function capturePiece(piece, color) {
    if(PROMOTED_PIECES.indexOf(piece) !== -1) {
        piece = capturePromotedPiece(piece);
    }
    BOARD_STATE[`${color}-captures`].push(piece);
}

function selectPiece(pieceSelector) {
    $('.square').removeClass('selected');
    $('.possible-move').removeClass('possible-move');

    const location = $(pieceSelector).parent();
    const square = $(pieceSelector).parent().attr('id');

    location.addClass('selected');

    readyMove(square);
}

function check() {
    $('body').append(`<div class="prompt">王手</div>`);
    $('.prompt').fadeIn('fast');
    $('.prompt').delay(1000).fadeOut('fast');
}

function confirmPromotion() {
    $('body').append(`<div class="prompt">成りますか？</div>`);
    $('.prompt').fadeIn('fast');
}

//listeners
function listenMove(square, validMoves) {
    $('.square').off('click');
    $('.square').on('click', (e) => {
        const clickedSquare = e.currentTarget.id;
        const validity = validMoves.indexOf(parseInt(clickedSquare));

        if (validity !== -1) {
            movePiece(square, clickedSquare);
        }
    });
}

function listenBlack() {
    $('.white.piece').off('click');
    $('.black.piece').on('click', (e) => {
        selectPiece(e.currentTarget);
    });
}

function listenWhite() {
    $('.black.piece').off('click');
    $('.white.piece').on('click', (e) => {
        selectPiece(e.currentTarget);
    });
}

function loadPage() {
    setBoard();
    listenBlack();
}

$(loadPage);