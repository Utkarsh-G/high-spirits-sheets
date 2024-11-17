import './ActionBox.css';
import { useState } from 'react';
import d20 from './d20.png';

function ActionBox({name}) {
    const [assured, setAssured] = useState(false);
    const [capped, setCapped] = useState(false);
    const [rollResult, setRollResult] = useState(0);

    const onRoll = () => {
        setRollResult(Math.floor(Math.random() * 20) + 1);
    }

    return (
        <div className="action-box">
            <div className="action-box-status">{assured ? "Assured" : ""} {capped ? "Capped" : ""}</div>
            <div className="action-box-name">{name}</div>
            <div className="action-box-roll"><img id="d20" onClick={onRoll} src={d20} alt="d20" /></div>
            <div className="action-box-roll-result">{rollResult > 0 ? rollResult : ""}</div>
        </div>
    );
}

export default ActionBox;