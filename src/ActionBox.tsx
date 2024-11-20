import './ActionBox.css';
import React, { useState } from 'react';
import d20 from './d20.png';



function ActionBox({actionName, rollResult, onRoll}: {actionName: string, rollResult: number, onRoll: () => void}) {
    const [assured] = useState(false);
    const [capped] = useState(false);

    return (
        <div className="action-box">
            <div className="action-box-status">{assured ? "Assured" : ""} {capped ? "Capped" : ""}</div>
            <div className="action-box-name">{actionName}</div>
            <div className="action-box-roll"><img id="d20" onClick={onRoll} src={d20} alt="d20" /></div>
            <div className="action-box-roll-result">{rollResult > 0 ? rollResult : ""}</div>
        </div>
    );
}

export default ActionBox;