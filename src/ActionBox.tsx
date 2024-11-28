import './ActionBox.css';
import React, { useState, useContext } from 'react';
import d20 from './d20.png';
import { RollResult, ActionsContext, ActionsContextType } from './ActionsContextProvider';



// another way to do the below is
// type ActionBoxProps = {actionName: string, rollResult: number, onRoll: () => void}
// or
// const ActionBox : React.FC<{actionName: string, rollResult: number, onRoll: () => void}> = ({actionName, rollResult, onRoll})
// or both:
// const ActionBox : React.FC<ActionBoxProps> = ({actionName, rollResult, onRoll})


function ActionBox({actionName, rollResult, isRollable}: {actionName: string, rollResult: RollResult, isRollable: boolean}) {
    const [assured] = useState(false);
    const [capped] = useState(false);
    const [rollable] = useState(isRollable);

    const { handleRoll } = useContext(ActionsContext as React.Context<ActionsContextType>)

    return (
        <div className="action-box">
            <div className="action-box-status">{assured ? "Assured" : ""} {capped ? "Capped" : ""}</div>
            <div className="action-box-name">{actionName}</div>
            <div className="action-box-roll">
            {rollable && <img id="d20" onClick={(event)=>{handleRoll(actionName)}} data-testid={`button ${actionName}`} src={d20} alt="d20" />}
            </div>
            <div className="action-box-roll-result" data-testid={`roll ${actionName}`}>
                {rollResult[2] === 'neutral' && rollResult[0] > 0 ? rollResult[0] : ""}
                {rollResult[2] === 'boon' && rollResult[0] > 0 ? rollResult[0] >= rollResult[1] ? <><span>{rollResult[0]}</span> <span className='struck'>{rollResult[1]}</span> </>  : <><span className='struck'>{rollResult[0]}</span> <span>{rollResult[1]}</span> </> : ""}
                {rollResult[2] === 'bane' && rollResult[0] > 0 ? rollResult[1] >= rollResult[0] ? <><span>{rollResult[0]}</span> <span className='struck'>{rollResult[1]}</span> </>  : <><span className='struck'>{rollResult[0]}</span> <span>{rollResult[1]}</span> </> : ""}
            </div>
        </div>
    );
}

export default ActionBox;