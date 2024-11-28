import d20 from './d20.png';
import './StatCounter.css';

const modifyStat = (stat: number, setterFunction: (stat: number) => void, modification: number, min: number, max: number) => {
    setterFunction(Math.max(Math.min(stat + modification, max), min));
}

export default function StatCounter({stat, statSetter, min, max}: {stat: number, statSetter: (stat: number) => void, min: number, max: number}){
    
    return (<>
        <span><img id="d20" onClick={(event)=>{ modifyStat(stat, statSetter, -1, min, max ) }} src={d20} alt="d20" /></span>
        <span>{stat}</span>
        <span><img id="d20" onClick={(event)=>{ modifyStat(stat, statSetter, 1, min, max) }} src={d20} alt="d20" /></span>
    </>)
}