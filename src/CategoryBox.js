import ActionBox from './ActionBox';
import './CategoryBox.css';
import { ActionsContext } from './ActionsContextProvider';
import { useContext, useState, useEffect } from 'react';

function CategoryBox() {
    const {actions: ctxActions, handleRoll: ctxHandleRoll} = useContext(ActionsContext);
    
    const [attacks, setAttacks] = useState([])

    useEffect(()=>{
        setAttacks(ctxActions.allActions.find(category => category.name === "Attack").actions)
        console.log("Attacks set in category")
    }, [])
    useEffect(()=>{
        setAttacks(ctxActions.allActions.find(category => category.name === "Attack").actions)
        console.log("Attacks set in category")
    }, [ctxActions])


    return (
        <div className="category-box">
            <div className="category-box-name">Attacks</div>

            {attacks.map(attack =>(
                <ActionBox 
                key={attack.name}
                name={attack.name} 
                rollResult={attack.roll}
                onRoll={() => ctxHandleRoll(attack.name)}
            />
            ))}

        </div>
    );
}

export default CategoryBox;