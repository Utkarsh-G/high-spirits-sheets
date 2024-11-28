import d20 from './d20.png';
import './StatCounter.css';

const modifyStat = (stat: number, setterFunction: (stat: number) => void, modification: number) => {
    setterFunction(stat + modification);
}

export default function StatCounter({stat, statSetter}: {stat: number, statSetter: (stat: number) => void}){
    
    return (<>
        <span><img id="d20" onClick={(event)=>{ modifyStat(stat, statSetter, -1) }} src={d20} alt="d20" /></span>
        <span>{stat}</span>
        <span><img id="d20" onClick={(event)=>{ modifyStat(stat, statSetter, 1) }} src={d20} alt="d20" /></span>
    </>)
}