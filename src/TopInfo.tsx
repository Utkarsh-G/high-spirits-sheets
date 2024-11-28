import './TopInfo.css';
import { useState } from "react";
import './StatCounter';
import StatCounter from './StatCounter';

export default function TopInfo (){
    const [moxie, setMoxie] = useState(0);
    const [stress, setStress] = useState(0);
    const [gumption, setGumption] = useState(0);

    return (<div className="top-info">
        <div className='top-left'>
            <div>
                <label>Name:</label>
                <input></input>
            </div>
            <div>
                <label>Assured:</label>
            </div>
            <div>
                <label>Capped:</label>
            </div>
        </div>
        <div className='top-right'>
            <div>
                <label>Stress:</label>
                <StatCounter stat={stress} statSetter={setStress} />
            </div>
            <div>
                <label>Moxie:</label>
                <StatCounter stat={moxie} statSetter={setMoxie} />
            </div>
            <div>
                <label>Gumption:</label>
                <StatCounter stat={gumption} statSetter={setGumption} />
            </div>
        </div>
    </div>)
}