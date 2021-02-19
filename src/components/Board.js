import * as React from 'react';
import {useBoard} from "../services/useBoard";
import BoardCell from "./BoardCell";


const Board = (props) => {
    const {board} = useBoard();
    let drawBoard = () => {
        let ret = [];
        for (let i = 0; i < 8; i++) {
            let retRow = [];
            for (let j = 0; j < 8; j++) {
                retRow.push(
                    <td key={'td' + i + j}><BoardCell row={i} column={j} id={"cell" + i + j}/></td>
                )
            }
            ret.push(
                <tr key={'tr' + i}>{retRow}</tr>
            );
        }
        return ret;
    }
    return (

        <div>
            <table>
                <tbody>
                    {drawBoard(board)}
                </tbody>
            </table>
        </div>
    );
};


export default Board;
