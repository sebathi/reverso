import {useBoard} from "../services/useBoard";

const MovesList = (props)=>{
    const {moves} = useBoard();

    return (
        <div>
            <h4>Moves</h4>
            <div className="small-text">{moves.join(" ")}</div>
        </div>
    )
}
export default MovesList;
