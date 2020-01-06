//see game-properties.js for globals

function setBoard() {
    PIECES.forEach(piece => {
        piece.startingPositionsBlack.forEach(position => {
            updateBoard(position, piece.displayName, "black");
        });
        piece.startingPositionsWhite.forEach(position => {
            updateBoard(position, piece.displayName, "white");
        });
    });

    updateHTML();
}

function updateBoard(position, piece, color) {
    BOARD_STATE[position] = { 
        "piece": piece,
        "color": color
    };
}

function updateHTML() {
    for (position in BOARD_STATE) {
        const pieceExists = BOARD_STATE[position].piece;
        const pieceIsCaptured = (position == 'black-captures' || position == 'white-captures');

        if (pieceExists) {
            displayPiece(position);
            updatePromotedPiece(position);
        } else if (pieceIsCaptured) {
            displayCaptures(position);
        } else {
            $(`#${position}`).html('');
        }
    }
}

function displayPiece(position) {
    const selector = $(`#${position}`);
    const pieceColor = BOARD_STATE[position].color;
    const pieceName = BOARD_STATE[position].piece;

    selector.html(
        `${pieceColor === 'white' ? '<div class="shadow"></div>' : ''}
        <div class="${pieceColor} piece">
            <b>${pieceName}</b>
        </div>`
    );
}

function updatePromotedPiece(position) {
    const pieceSelector = $(`#${position}`).children();
    const pieceIsPromoted = (PROMOTED_PIECES.indexOf(BOARD_STATE[position].piece) !== -1);

    if(pieceIsPromoted) {
        pieceSelector.addClass('promoted');
    }
}

function displayCaptures(position) {
    const captureArea = $(`.${position}`);

    //clear capture area to avoid duplicates since we're appending
    captureArea.html('');

    BOARD_STATE[position].forEach(piece => {
        captureArea.append(
            `${position === 'white-captures' ? '<div class="shadow"></div>' : ''}
            <div class="${position === 'white-captures' ? 'white' : 'black'} piece">
                <b>${piece}</b>
            </div>`
        );
    });
}

function readyMove(position) {
    const validMoves = findValidMoves(position);
    highlightValidMoves(validMoves);
    
    listenMove(position, validMoves);
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

function highlightValidMoves(movesArray) {
    movesArray.forEach(move => {
        const thisSquare = $(`#${move}`);
        thisSquare.addClass('possible-move');
    });
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
        //need to clean these up first
        //promptPromotion();
        //listenPromotion(thisPiece, newSquare);
        
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

function promptPromotion() {
    $('body').append(`
    <div class="prompt">成りますか？
        <br>
        <button id="confirm">はい</button>
        <button id="cancel">いいえ</button>
    </div>
    `);
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

//needs work
function listenPromotion(piece, square) {
    $('#confirm').off('click');
    $('#cancel').off('click');

    $('#confirm').on('click', () => {
        promote(piece, square);

        if(kingIsInCheck(BOARD_STATE[square].color, piece, square)) {
            check();
        }

        updateHTML();
        BOARD_STATE[square].color === 'black' ? listenWhite() : listenBlack();

        $('.prompt').fadeOut('instant');
    });
    $('#cancel').on('click', () => {
        $('.prompt').fadeOut('instant');
    });
}

function loadPage() {
    setBoard();
    listenBlack();
}

$(loadPage);