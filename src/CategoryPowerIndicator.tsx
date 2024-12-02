import { MouseEvent } from "react";
import d20 from './d20.png';

export default function CategoryPowerIndicator({rollPower, modifyCategoryPower} : {rollPower: number, modifyCategoryPower: (modifier: MouseEvent) => void}) {

    return (<>
        <span>{rollPower}</span>
        <img id="d20" onClick={modifyCategoryPower} src={d20} alt="d20" />
    </>)

}