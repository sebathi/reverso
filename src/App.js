
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './App.css';
import styled from "styled-components";
// import {useState} from "react";
import Board from "./components/Board";
import {ProvideBoard} from "./services/useBoard";
import MovesList from "./components/MovesList";
import ScoringBoard from "./components/ScoringBoard";
const Button = styled.a`
`;

function App() {
    return (
        <div className="App">
            <ProvideBoard>
                <header className="App-header">

                    <h1>Reverso</h1>
                    <ScoringBoard />
                    <Board/>
                    <MovesList/>
                </header>
            </ProvideBoard>
        </div>
    );
}

export default App;
