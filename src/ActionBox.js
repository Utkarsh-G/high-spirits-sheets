import './ActionBox.css';
import { useState } from 'react';
import d20 from './d20.png';

function ActionBox({name, rollResult, onRoll}) {
    const [assured, setAssured] = useState(false);
    const [capped, setCapped] = useState(false);

    return (
        <div className="action-box">
            <div className="action-box-status">{assured ? "Assured" : ""} {capped ? "Capped" : ""}</div>
            <div className="action-box-name">{name}</div>
            <div className="action-box-roll"><img id="d20" onClick={onRoll} src={d20} alt="d20" /></div>
            <div className="action-box-roll-result">{rollResult/*rollResult > 0 ? rollResult : ""*/}</div>
        </div>
    );
}

export default ActionBox;