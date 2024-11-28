import './TopInfo.css';
import { useState } from "react";
import './StatCounter';
import StatCounter from './StatCounter';

export default function TopInfo (){
    const [moxie, setMoxie] = useState(0);
    const [stress, setStress] = useState(0);
    const [gumption, setGumption] = useState(0);
    const [rallies, setRallies] = useState(30);

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
                <StatCounter stat={stress} statSetter={setStress} min={-5} max={20} />
            </div>
            <div>
                <label>Moxie:</label>
                <StatCounter stat={moxie} statSetter={setMoxie} min={0} max={10} />
            </div>
            <div>
                <label>Gumption:</label>
                <StatCounter stat={gumption} statSetter={setGumption} min={0} max={20} />
            </div>
            <div>
                <label>Rallies:</label>
                <StatCounter stat={rallies} statSetter={setRallies} min={0} max={30} />
            </div>
        </div>
    </div>)
}