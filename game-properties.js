const BOARD_STATE = {
    "91": '',
    "81": '',
    "71": '',
    "61": '',
    "51": '',
    "41": '',
    "31": '',
    "21": '',
    "11": '',
    "92": '',
    "82": '',
    "72": '',
    "62": '',
    "52": '',
    "42": '',
    "32": '',
    "22": '',
    "12": '',
    "93": '',
    "83": '',
    "73": '',
    "63": '',
    "53": '',
    "43": '',
    "33": '',
    "23": '',
    "13": '',
    "94": '',
    "84": '',
    "74": '',
    "64": '',
    "54": '',
    "44": '',
    "34": '',
    "24": '',
    "14": '',
    "95": '',
    "85": '',
    "75": '',
    "65": '',
    "55": '',
    "45": '',
    "35": '',
    "25": '',
    "15": '',
    "96": '',
    "86": '',
    "76": '',
    "66": '',
    "56": '',
    "46": '',
    "36": '',
    "26": '',
    "16": '',
    "97": '',
    "87": '',
    "77": '',
    "67": '',
    "57": '',
    "47": '',
    "37": '',
    "27": '',
    "17": '',
    "98": '',
    "88": '',
    "78": '',
    "68": '',
    "58": '',
    "48": '',
    "38": '',
    "28": '',
    "18": '',
    "99": '',
    "89": '',
    "79": '',
    "69": '',
    "59": '',
    "49": '',
    "39": '',
    "29": '',
    "19": '',
    "black-captures": [],
    "white-captures": [],
    "player-turn": "black"
}

class Piece {
    constructor(name, startingPositionsBlack, startingPositionsWhite, promotion, moves) {
        this.displayName = name;
        this.startingPositionsBlack = startingPositionsBlack;
        this.startingPositionsWhite = startingPositionsWhite;
        this.promotion = promotion;
        this.validMoves = moves;
    }
}

//fuhyou, "pawn"
const 歩兵 = new Piece(
    "歩", 
    ["17", "27", "37", "47", "57", "67", "77", "87", "97"], 
    ["13", "23", "33", "43", "53", "63", "73", "83", "93"],
    "と",
    function(position) {
        let origin = parseInt(position);

        if(BOARD_STATE["player-turn"] === 'black') {
            return [ moveUp(origin) ];
        } else {
            return [ moveDown(origin) ];
        }
    }
);

//kakugyou, bishop
const 角行 = new Piece(
    "角", 
    ["88"], 
    ["22"],
    "馬",
    function(position) {
        const origin = parseInt(position);
    
        const slideUL = slideUpLeft(origin), slideUR = slideUpRight(origin);
        const slideDL = slideDownLeft(origin), slideDR = slideDownRight(origin);
    
        //slideUL chosen arbitrarily
        const validMoves = slideUL.concat(slideUR, slideDL, slideDR);
        return validMoves;
    }
);

//hisha, rook
const 飛車 = new Piece(
    "飛", 
    ["28"], 
    ["82"],
    "龍",
    null
);

//kyousha, lance
const 香車 = new Piece(
    "香", 
    ["99", "19"],
    ["91", "11"],
    "杏",
    null
);

//keima, "knight"
const 桂馬 = new Piece(
    "桂", 
    ["89", "29"],
    ["81", "21"],
    "圭",
    null
);

//ginshou, "knight"
const 銀將 = new Piece(
    "銀", 
    ["79", "39"],
    ["71", "31"],
    "全",
    null
);

//kinshou, "knight"
const 金將 = new Piece(
    "金", 
    ["69", "49"],
    ["61", "41"],
    null,
    null
);

//oushou, "knight"
const 王將 = new Piece(
    "王", 
    ["59"],
    ["51"],
    null,
    null
);

const PIECES = [ 歩兵, 角行, 飛車, 香車, 桂馬, 銀將, 金將, 王將 ];
const PROMOTED_PIECES = ['と', '馬', '龍', '杏', '圭', '全'];

function moveUp(currentPosition) {
    return currentPosition - 1;
}

function moveDown(currentPosition) {
    return currentPosition + 1;
}

function moveLeft(currentPosition) {
    return currentPosition + 10;
}

function moveRight(currentPosition) {
    return currentPosition - 10;
}

function moveUpLeft(currentPosition) {
    return currentPosition + 9;
}

function moveUpRight(currentPosition) {
    return currentPosition - 11;
}

function moveDownLeft(currentPosition) {
    return currentPosition + 11;
}

function moveDownRight(currentPosition) {
    return currentPosition - 9;
}

function slideUp(currentPosition) {
    let u = moveUp(currentPosition);
    const validMoves = [];
    console.log(currentPosition);
    console.log(u);

    while(u % 10 !== 0) {
        validMoves.push(u);
        //prevents leaping over pieces
        if(BOARD_STATE[u].piece) {
            break;
        }
        u = moveUp(u);
    }
    return validMoves;
}

function slideDown(currentPosition) {
    let d = moveDown(currentPosition);
    const validMoves = [];

    while(d % 10 !== 0) {
        validMoves.push(d);
        //prevents leaping over pieces
        if(BOARD_STATE[d].piece) {
            break;
        }
        d = moveDown(d);
    }
    return validMoves;
}

function slideLeft(currentPosition) {
    let l = moveLeft(currentPosition);
    const validMoves = [];

    while(l < 100) {
        validMoves.push(l);
        //prevents leaping over pieces
        if(BOARD_STATE[l].piece) {
            break;
        }
        l = moveLeft(l);
    }
    return validMoves;
}

function slideRight(currentPosition) {
    let r = moveRight(currentPosition);
    const validMoves = [];

    while(r > 10) {
        validMoves.push(r);
        //prevents leaping over pieces
        if(BOARD_STATE[r].piece) {
            break;
        }
        r = moveRight(r);
    }
    return validMoves;
}

function slideUpLeft(currentPosition) {
    let ul = moveUpLeft(currentPosition);
    const validMoves = [];

    while(ul % 10 !== 0 && ul < 99) {
        validMoves.push(ul);
        //prevents leaping over pieces
        if(BOARD_STATE[ul].piece) {
            break;
        }
        ul = moveUpLeft(ul);
    }
    return validMoves;
}

function slideUpRight(currentPosition) {
    let ur = moveUpRight(currentPosition);
    const validMoves = [];

    while(ur % 10 !== 0 && ur > 10) {
        validMoves.push(ur);
        //prevents leaping over pieces
        if(BOARD_STATE[ur].piece) {
            break;
        }
        ur = moveUpRight(ur);
    }
    return validMoves;
}

function slideDownLeft(currentPosition) {
    let dl = moveDownLeft(currentPosition);
    const validMoves = [];

    while(dl % 10 !== 0 && dl < 100) {
        validMoves.push(dl);
        //prevents leaping over pieces
        if(BOARD_STATE[dl].piece) {
            break;
        }
        dl = moveDownLeft(dl);
    }
    return validMoves;
}

function slideDownRight(currentPosition) {
    let dr = moveDownRight(currentPosition);
    const validMoves = [];

    while(dr % 10 !== 0 && dr > 10) {
        validMoves.push(dr);
        //prevents leaping over pieces
        if(BOARD_STATE[dr].piece) {
            break;
        }
        dr = moveDownRight(dr);
    }
    return validMoves;
}

function fuMoves(position) {
    const origin = parseInt(position);
    if(BOARD_STATE["player-turn"] === 'black') {
        return [
            origin - 1
        ];
    } else {
        return [
            origin + 1
        ];
    }
}

function kakuMoves(position) {
    const origin = parseInt(position);

    const slideUL = slideUpLeft(origin), slideUR = slideUpRight(origin);
    const slideDL = slideDownLeft(origin), slideDR = slideDownRight(origin);

    //slideUL chosen arbitrarily
    const validMoves = slideUL.concat(slideUR, slideDL, slideDR);
    return validMoves;
}

function umaMoves(position) {
    const origin = parseInt(position);
    const validMoves = kakuMoves(position);
    
    validMoves.push(
        moveUp(origin),
        moveDown(origin),
        moveLeft(origin),
        moveRight(origin)
    );
    return validMoves;
}

function hiMoves(position) {
    const origin = parseInt(position);

    const slideU = slideUp(origin), slideD = slideDown(origin);
    const slideL = slideLeft(origin), slideR = slideRight(origin);

    //slideU chosen arbitrarily
    const validMoves = slideU.concat(slideD, slideL, slideR);
    return validMoves;
}

function ryuuMoves(position) {
    const origin = parseInt(position);
    const validMoves = hiMoves(position);
    
    validMoves.push(
        moveUpLeft(origin),
        moveUpRight(origin),
        moveDownLeft(origin),
        moveDownRight(origin)
    );
    return validMoves;
}

function kyouMoves(position) {
    const origin = parseInt(position);

    if(BOARD_STATE["player-turn"] === 'black') {
        return slideUp(origin);
    } else {
        return slideDown(origin);
    }
}

function keiMoves(position) {
    let origin = parseInt(position);
    if(BOARD_STATE["player-turn"] === 'black') {
        //equivalent to moving up, up, left or up, up, right
        return [
            origin - 12,
            origin + 8
        ];
    } else {
        //equivalent to moving down, down, left or down, down, right
        return [
            origin + 12,
            origin - 8
        ];
    }
}

function ginMoves(position) {
    let origin = parseInt(position);
    if(BOARD_STATE["player-turn"] === 'black') {
        return [
            moveUp(origin),
            moveUpLeft(origin),
            moveUpRight(origin),
            moveDownLeft(origin),
            moveDownRight(origin)
        ];
    } else {
        return [
            moveDown(origin),
            moveDownLeft(origin),
            moveDownRight(origin),
            moveUpLeft(origin),
            moveUpRight(origin)
        ];
    }
}

function kinMoves(position) {
    let origin = parseInt(position);
    if(BOARD_STATE["player-turn"] === 'black') {
        return [
            moveUp(origin),
            moveUpLeft(origin),
            moveUpRight(origin),
            moveDown(origin),
            moveLeft(origin),
            moveRight(origin)
        ];
    } else {
        return [
            moveUp(origin),
            moveLeft(origin),
            moveRight(origin),
            moveDown(origin),
            moveDownLeft(origin),
            moveDownRight(origin)
        ];
    }
}

function ouMoves(position) {
    let origin = parseInt(position);
    return [
        moveUp(origin),
        moveDown(origin),
        moveLeft(origin),
        moveRight(origin),
        moveUpLeft(origin),
        moveUpRight(origin),
        moveDownLeft(origin),
        moveDownRight(origin)
    ]
}

function findKingPosition(kingColor) {
    const allBoardSquares = Object.keys(BOARD_STATE);
    for(i=0; i<=allBoardSquares.length; i++) {
        let thisSquare = allBoardSquares[i];
        if(BOARD_STATE[thisSquare].piece === '王' && BOARD_STATE[thisSquare].color === kingColor) {
            return thisSquare;
        }
    }
}

function kingIsInCheck(lastMovedColor, lastMovedPiece, currentPosition) {
    const nextMoves = movementHandler(lastMovedPiece, lastMovedColor, currentPosition);
    const kingColor = (lastMovedColor = 'black' ? 'white' : 'black');
    const kingPosition = parseInt(findKingPosition(kingColor));

    if(nextMoves.indexOf(kingPosition) !== -1) {
        return true;
    } else {
        return false;
    }
}

function isInPromotionZone(position, color) {
    if(BOARD_STATE["player-turn"] === 'black') {
        return (
            position % 10 === 1 || position % 10 === 2 || position % 10 === 3
        )
    } else {
        return (
            position % 10 === 7 || position % 10 === 8 || position % 10 === 9
        )
    }
}

function promote(thisPiece, position) {
    const promoteTo = promotionHandler(thisPiece);

    BOARD_STATE[position].piece = promoteTo;
}

function movementHandler(piece, square) {
    switch(piece) {
        case '歩':
            return fuMoves(square);
        case '角':
            return kakuMoves(square);
        case '飛':
            return hiMoves(square);
        case '香':
            return kyouMoves(square);
        case '桂':
            return keiMoves(square);
        case '銀':
            return ginMoves(square);
        case '金': 
        case 'と': 
        case '杏': 
        case '圭': 
        case '全':
            return kinMoves(square);
        case '王': 
        case '玉':
            return ouMoves(square);
        case '馬':
            return umaMoves(square);
        case '龍':
            return ryuuMoves(square);
    }
}

function promotionHandler(piece) {
    switch(piece) {
        case '歩':
            return 'と';
        case '角':
            return '馬';
        case '飛':
            return '龍';
        case '香':
            return '杏';
        case '桂':
            return '圭';
        case '銀':
            return '全';
        default:
            return piece;
    }
}

function capturePromotedPiece(piece) {
    switch(piece) {
        case 'と':
            return '歩';
        case '馬':
            return '角';
        case '龍':
            return '飛';
        case '杏':
            return '香';
        case '圭':
            return '桂';
        case '全':
            return '銀';
        default:
            return piece;
    }
}