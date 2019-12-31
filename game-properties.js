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
    "white-captures": []
}

function updateBoard(square, piece, color) {
    BOARD_STATE[square] = { 
        "piece": piece,
        "color": color
    };
}

/*
MOVEMENT KEY:
up = n - 1
down = n + 1
left = n + 10
right = n - 10
up-left = n + 9
up-right = n - 11
down-left = n + 11
down-right = n - 9

loops are designed to stop at edge of board, i.e. < 11, multiples of 10, or > 99
*/ 

// function sumStrings(a, b) {
//     return parseInt(a) + parseInt(b);
// }

// function sumCoordinates(coordinates) {
//     return coordinates.split('').reduce(sumStrings);
// }

function fuMoves(color, coordinates) {
    let origin = parseInt(coordinates);
    if(color === 'black') {
        return [
            origin - 1
        ];
    } else {
        return [
            origin + 1
        ];
    }
}

function kakuMoves(coordinates) {
    let origin = parseInt(coordinates);

    let ul = origin + 9, ur = origin - 11;
    let dl = origin + 11, dr = origin - 9;
    let possibleSquares = [];
    while(ul % 10 !== 0 && ul < 99) {
        possibleSquares.push(ul);
        //prevents leaping over pieces
        if(BOARD_STATE[ul].piece) {
            break;
        }
        ul += 9
    }
    while(ur > 10) {
        possibleSquares.push(ur);
        //prevents leaping over pieces
        if(BOARD_STATE[ur].piece) {
            break;
        }
        ur -= 11
    }
    while(dl % 10 !== 0 && dl < 99) {
        possibleSquares.push(dl);
        //prevents leaping over pieces
        if(BOARD_STATE[dl].piece) {
            break;
        }
        dl += 11
    }
    while(dr > 10) {
        possibleSquares.push(dr);
        //prevents leaping over pieces
        if(BOARD_STATE[dr].piece) {
            break;
        }
        dr -= 9
    }
    //more loops
    return possibleSquares;
}

function hiMoves(coordinates) {
    let origin = parseInt(coordinates);

    let u = origin - 1, d = origin + 1;
    let l = origin + 10, r = origin - 10;
    let possibleSquares = [];

    while(u % 10 !== 0) {
        possibleSquares.push(u);
        //prevents leaping over pieces
        if(BOARD_STATE[u].piece) {
            break;
        }
        u--
    }
    while(d % 10 !== 0) {
        possibleSquares.push(d);
        //prevents leaping over pieces
        if(BOARD_STATE[d].piece) {
            break;
        }
        d++
    }
    while(l < 99) {
        possibleSquares.push(l);
        //prevents leaping over pieces
        if(BOARD_STATE[l].piece) {
            break;
        }
        l += 10
    }
    while(r > 10) {
        possibleSquares.push(r);
        //prevents leaping over pieces
        if(BOARD_STATE[r].piece) {
            break;
        }
        r -= 10
    }
    
    //more loops
    return possibleSquares;
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

function keiMoves(color, coordinates) {
    let origin = parseInt(coordinates);
    if(color === 'black') {
        return [
            origin - 12,
            origin + 8
        ];
    } else {
        return [
            origin + 12,
            origin - 8
        ];
    }
}

function ginMoves(color, coordinates) {
    let origin = parseInt(coordinates);
    if(color === 'black') {
        return [
            origin - 1,
            origin - 11,
            origin + 11,
            origin - 9,
            origin + 9
        ];
    } else {
        return [
            origin + 1,
            origin - 11,
            origin + 11,
            origin - 9,
            origin + 9
        ];
    }
}

function kinMoves(color, coordinates) {
    let origin = parseInt(coordinates);
    if(color === 'black') {
        return [
            origin - 1,
            origin + 1,
            origin - 10,
            origin + 10,
            origin - 11,
            origin + 9
        ];
    } else {
        return [
            origin - 1,
            origin + 1,
            origin - 10,
            origin + 10,
            origin + 11,
            origin - 9
        ];
    }
}

function ouMoves(coordinates) {
    let origin = parseInt(coordinates);
    return [
        origin - 1,
        origin + 1,
        origin - 10,
        origin + 10,
        origin - 11,
        origin + 11,
        origin - 9,
        origin + 9
    ]
}