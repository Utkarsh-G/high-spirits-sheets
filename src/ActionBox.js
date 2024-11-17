import './ActionBox.css';
import { useState } from 'react';
import d20 from './d20.png';

function ActionBox({name}) {
    const [assured, setAssured] = useState(false);
    const [capped, setCapped] = useState(false);

    return (
        <div className="action-box">
            <div className="action-box-status">Assured</div>
            <div className="action-box-name">{name}</div>
            <div className="action-box-roll"><img id="d20" src={d20} alt="d20" /></div>
        </div>
    );
}

export default ActionBox;