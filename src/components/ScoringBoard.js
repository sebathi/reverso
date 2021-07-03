import * as React from 'react';
import {black, useBoard, white} from "../services/useBoard";
import { Button } from 'antd';


const ScoringBoard = (props) => {
    const {blackQty, whiteQty, turn, restart} = useBoard();
    const showRestartButton = ()=>{
        // if (turn==null){
            return <Button type="primary" onClick={(e)=>restart()} >Restart</Button>
            // <a href="#" onClick={(e)=>restart()}>Restart</a>
        // }
    }

    return (

        <div>
            <h3>
                <span className="cellStyle white"></span>
                <span className={turn === white ? 'strong' : ''}>{whiteQty}</span> - <span
                className={turn === black ? 'strong' : ''}>{blackQty}</span>
                <span className="cellStyle black"></span>
            </h3>
            {showRestartButton()}
        </div>
    );
};


export default ScoringBoard;
