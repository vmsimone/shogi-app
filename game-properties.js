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
*/ 

function fuMoves(color, coordinates) {
    coordinates = parseInt(coordinates);
    if(color === 'black') {
        return [
            coordinates - 1
        ];
    } else {
        return [
            coordinates + 1
        ];
    }
}

function kakuMoves(color, coordinates) {
    coordinates = parseInt(coordinates);
    if(color === 'black') {
        return [
        ];
    } else {
        return [
        ];
    }
}

function hiMoves(color, coordinates) {
    coordinates = parseInt(coordinates);
    if(color === 'black') {
        return [
        ];
    } else {
        return [
        ];
    }
}

function kyouMoves(color, coordinates) {
    coordinates = parseInt(coordinates);
    if(color === 'black') {
        return [
        ];
    } else {
        return [
        ];
    }
}

function keiMoves(color, coordinates) {
    coordinates = parseInt(coordinates);
    if(color === 'black') {
        return [
        ];
    } else {
        return [
        ];
    }
}

function ginMoves(color, coordinates) {
    coordinates = parseInt(coordinates);
    if(color === 'black') {
        return [
            coordinates - 1,
            coordinates - 11,
            coordinates + 11,
            coordinates - 9,
            coordinates + 9
        ];
    } else {
        return [
            coordinates + 1,
            coordinates - 11,
            coordinates + 11,
            coordinates - 9,
            coordinates + 9
        ];
    }
}

function kinMoves(color, coordinates) {
    coordinates = parseInt(coordinates);
    if(color === 'black') {
        return [
            coordinates - 1,
            coordinates + 1,
            coordinates - 10,
            coordinates + 10,
            coordinates - 11,
            coordinates + 9
        ];
    } else {
        return [
            coordinates - 1,
            coordinates + 1,
            coordinates - 10,
            coordinates + 10,
            coordinates + 11,
            coordinates - 9
        ];
    }
}

function ouMoves(coordinates) {
    coordinates = parseInt(coordinates);
    return [
        coordinates - 1,
        coordinates + 1,
        coordinates - 10,
        coordinates + 10,
        coordinates - 11,
        coordinates + 11,
        coordinates - 9,
        coordinates + 9
    ]
}