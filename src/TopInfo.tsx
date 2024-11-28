import './TopInfo.css';
import { useState, useContext } from "react";
import './StatCounter';
import StatCounter from './StatCounter';
import { ActionsContext, ActionsContextType } from './ActionsContextProvider';


export default function TopInfo (){
    const [moxie, setMoxie] = useState(0);
    const [stress, setStress] = useState(0);
    const [gumption, setGumption] = useState(0);
    const [rallies, setRallies] = useState(30);

    const {setIsSituationalBoon, setIsSituationalBane, isSituationalBane, isSituationalBoon} = useContext<ActionsContextType>(ActionsContext as React.Context<ActionsContextType>)

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
            <button onClick={(event)=>{setIsSituationalBane(!isSituationalBane)}} > Situational Bane <span className={`dot ${isSituationalBane ? 'filled-bane':''}`}></span> </button>
                {/** TODO: DRY out the dot styling. Also, possibly break up this big component into smaller ones? 
                 * {`dot ${rollPower < -2 ? 'filled-bane':''}`}
                */}
            <button onClick={(event)=>{setIsSituationalBoon(!isSituationalBoon)}} > Situational Boon <span className={`dot ${isSituationalBoon ? 'filled-boon':''}`}></span> </button>
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