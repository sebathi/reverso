import {useBoard, black, white} from "../services/useBoard";

const BoardCell = ({row, column, ...props}) => {
    const {board, move, canMove} = useBoard();
    let className = "cellStyle";
    if (board[row][column]===white) {
        className = className + " white";
    }else if(board[row][column]===black){
        className = className + " black";
    }else if (canMove(row, column)){
        className = className + " can-move";
    }
    return (
        <div className={className} onClick={(e)=>move(row, column)}>

        </div>
    )
}


export default BoardCell;
