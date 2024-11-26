import './ActionBox.css';
import React, { useState } from 'react';
import d20 from './d20.png';



// another way to do the below is
// type ActionBoxProps = {actionName: string, rollResult: number, onRoll: () => void}
// or
// const ActionBox : React.FC<{actionName: string, rollResult: number, onRoll: () => void}> = ({actionName, rollResult, onRoll})
// or both:
// const ActionBox : React.FC<ActionBoxProps> = ({actionName, rollResult, onRoll})


function ActionBox({actionName, rollResult, onRoll, isRollable}: {actionName: string, rollResult: number, onRoll: () => void, isRollable: boolean}) {
    const [assured] = useState(false);
    const [capped] = useState(false);
    const [rollable] = useState(isRollable);

    return (
        <div className="action-box">
            <div className="action-box-status">{assured ? "Assured" : ""} {capped ? "Capped" : ""}</div>
            <div className="action-box-name">{actionName}</div>
            <div className="action-box-roll">
            {rollable && <img id="d20" onClick={onRoll} data-testid={`button ${actionName}`} src={d20} alt="d20" />}
            </div>
            <div className="action-box-roll-result" data-testid={`roll ${actionName}`}>{rollResult > 0 ? rollResult : ""}</div>
        </div>
    );
}

export default ActionBox;