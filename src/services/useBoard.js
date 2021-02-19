import React, {createContext, useContext, useEffect, useState} from "react";
// import axios from 'axios';
// import {AsyncStorage, Platform} from "react-native";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideBoard({children}) {
    const auth = useProvideBoard();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useBoard = () => {
    return useContext(authContext);
};

export const black = 1;
export const white = 0;

const blankBoard = [ // 1 is black, 0 white and null is an empty cell
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, white, black, null, null, null,],
    [null, null, null, black, white, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
    [null, null, null, null, null, null, null, null,],
]
// Provider hook that creates auth object and handles state
export const useProvideBoard = () => {
    const [board, setBoard] = useState(blankBoard);
    const [turn, setTurn] = useState(black);
    const [moves, setMoves] = useState([]);
    const [moveQty, setMoveQty] = useState(2);
    const [whiteQty, setWhiteQty] = useState(2);
    const [blackQty, setBlackQty] = useState(2);

    const toCoordinate = (row, column) => {
        if (row >= 0 && row < 8) {
            if (column >= 0 && column < 8) {
                let letter = String.fromCharCode(column + 97);
                let rowNumber = row + 1;
                return letter + rowNumber;
            }
        }
        return
    }

    const restart = () => {
        setBoard([ // 1 is black, 0 white and null is an empty cell
            [null, null, null, null, null, null, null, null,],
            [null, null, null, null, null, null, null, null,],
            [null, null, null, null, null, null, null, null,],
            [null, null, null, white, black, null, null, null,],
            [null, null, null, black, white, null, null, null,],
            [null, null, null, null, null, null, null, null,],
            [null, null, null, null, null, null, null, null,],
            [null, null, null, null, null, null, null, null,],
        ]);
        setTurn(black);
        setMoveQty(0);
        setWhiteQty(2);
        setBlackQty(2);
        setMoves([]);
    }

    const coordinateToRow = (coordinate) => {
        return coordinate.charAt(1) - 1
    }
    const coordinateToColumn = (coordinate) => {
        return coordinate.charAt(0) - 97
    }
    const moveByCoordinate = (coordinate) => {
        let row = coordinateToRow(coordinate);
        let column = coordinateToColumn(coordinate);
        return move(row, column);
    }

    const inBoundaries = (row, column) => {
        return (row >= 0 && row < 8 && column >= 0 && column < 8);
    }
    const checkDirection = (row, column, dr, dc, forPlayer = null) => {
        if (forPlayer == null) {
            forPlayer = turn;
        }
        if (dr === 0 && dc === 0) {
            return false;
        }
        let i = row + dr;
        let j = column + dc;
        if (inBoundaries(i, j) && board[i][j] === (forPlayer === black ? white : black)) {
            i += dr;
            j += dc;
            while (inBoundaries(i, j)) {
                if (board[i][j] === forPlayer) {
                    return true;
                } else if (board[i][j] === null) {
                    return false;
                }
                i += dr;
                j += dc;
            }
        }
        return false;
    }

    const moveDirection = (row, column, dr, dc, moveBoard) => {
        if (checkDirection(row, column, dr, dc)) {
            console.log(moveBoard);
            let i = row + dr;
            let j = column + dc;
            if (inBoundaries(i, j) && board[i][j] === (turn === black ? white : black)) {
                moveBoard[i][j] = turn;
                i += dr;
                j += dc;
                while (inBoundaries(i, j)) {
                    if (board[i][j] === turn) {
                        return moveBoard;
                    }
                    moveBoard[i][j] = turn;
                    i += dr;
                    j += dc;
                }
            }
        }
        return moveBoard;
    }

    const canMove = (row, column, forPlayer = null) => {
        if (inBoundaries(row, column) && board[row][column] == null) {
            if (checkDirection(row, column, 1, -1, forPlayer)
                || checkDirection(row, column, 1, 0, forPlayer)
                || checkDirection(row, column, 1, 1, forPlayer)
                || checkDirection(row, column, 0, 1, forPlayer)
                || checkDirection(row, column, 0, -1, forPlayer)
                || checkDirection(row, column, -1, -1, forPlayer)
                || checkDirection(row, column, -1, 0, forPlayer)
                || checkDirection(row, column, -1, 1, forPlayer)
            ) {
                return true;
            }


        }
        return false;
    }
    const move = (row, column) => {
        if (canMove(row, column)) {
            let moveBoard = board;
            moveBoard = moveDirection(row, column, -1, -1, moveBoard);
            moveBoard = moveDirection(row, column, -1, 0, moveBoard);
            moveBoard = moveDirection(row, column, -1, 1, moveBoard);
            moveBoard = moveDirection(row, column, 0, -1, moveBoard);
            moveBoard = moveDirection(row, column, 0, 1, moveBoard);
            moveBoard = moveDirection(row, column, 1, -1, moveBoard);
            moveBoard = moveDirection(row, column, 1, 0, moveBoard);
            moveBoard = moveDirection(row, column, 1, 1, moveBoard);

            moveBoard[row][column] = turn;
            setMoveQty(moveQty + 1);
            setBoard(moveBoard);
            moves.push(toCoordinate(row, column));
            setMoves(moves);
            return checkNextTurn();
        }
    }

    const checkNextTurn = () => {
        let nextTurn = turn === black ? white : black;
        if (checkMoves(nextTurn)) {
            setTurn(nextTurn);
        } else if (!checkMoves(turn)) {
            setTurn(null);
        }
    }
    const checkMoves = (player) => {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (canMove(i, j, player)) {
                    return true;
                }
            }
        }
        return false;
    }
    useEffect(
        () => {
            let blackCount = 0;
            let whiteCount = 0;
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (board[i][j] === white) {
                        whiteCount++;
                    } else if (board[i][j] === black) {
                        blackCount++;
                    }
                }
            }
            setBlackQty(blackCount);
            setWhiteQty(whiteCount);
        },
        [moveQty, board]
    )

// Return the user object and auth methods
    return {
        board,
        moves,
        whiteQty,
        blackQty,
        turn,
        restart,
        move,
        moveByCoordinate,
        canMove,
        toCoordinate
    };
}
