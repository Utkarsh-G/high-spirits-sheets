import { MouseEvent } from "react";
import d20 from './d20.png';

export default function CategoryPowerIndicator({rollPower, modifyRollPower} : {rollPower: number, modifyRollPower: (modifier: MouseEvent) => void}) {

    return (<>
        <span>{rollPower}</span>
        <img id="d20" onClick={modifyRollPower} src={d20} alt="d20" />
    </>)

}