import ActionBox from './ActionBox';
import './CategoryBox.css';
import { ActionsContext, ActionsContextType, Action } from './ActionsContextProvider';
import React, { MouseEvent, useContext, useEffect, useMemo, useState } from 'react';
import CategoryPowerIndicator from './CategoryPowerIndicator';

function CategoryBox({categoryName}: {categoryName: string}) {
    /* Using contextAPI and useMemo for maximum synergy.
    If we just processed the ctxActions in an in-component function, or as part of
    setting initial state, it'd happen on every re-render. And if we passed function
    form when setting initial state, then it'd only be set on initial render.
    
    In the current implementation, it is set at the initial render and then only 
    recalculated when ctxActions changes!

    Honestly, there's probably a way to isolate just the roll changes, and then
    only re-render the roll display by doing some combination of what we are doing now
    + React.memo. We don't need that level of optimization yet, but it's good to know it exists.
     */
    const {actions: ctxActions, handleRoll: ctxHandleRoll, handleRollPowerChange} = useContext<ActionsContextType>(ActionsContext as React.Context<ActionsContextType>);
    const actions: Action[] | undefined = useMemo(()=> {
        return ctxActions.allActions.find(category => category.name === categoryName)?.actions;
    }, [ctxActions, categoryName]);

    const [rollPower, setRollPower] = useState<number>(0)
    const [situationalModifier, setSituationalModifier] = useState<number>(0)

    const modifyRollPower = (e: MouseEvent, modifier: number): void => {
        setRollPower(Math.max(Math.min(rollPower + modifier, 3), -3));
    }

    useEffect(()=>{
        console.log("Changing boon / bane now that roll power is: " + rollPower)
        handleRollPowerChange(rollPower, categoryName);
    }, [rollPower])

    // not missing my chance to curry
    const decreasePower = (event: MouseEvent) => {return modifyRollPower(event, -1);}
    const increasePower = (event: MouseEvent) => {return modifyRollPower(event, 1);}

    return (
        <div className="category-box">
            <div className="category-box-top">
                <CategoryPowerIndicator rollPower={rollPower} modifyRollPower={decreasePower} />
                 {/* Is the notation below confusing? Could it be compressed or clarified?*/}
                <span className={`dot ${rollPower < -2 ? 'filled-bane':''}`}></span>
                <span className={`dot ${rollPower < -1 ? 'filled-bane':''}`}></span>
                <span className={`dot ${rollPower < 0 ? 'filled-bane':''}`}></span>
                <div className="category-box-name">{categoryName} </div>
                <span className={`dot ${rollPower > 0 ? 'filled-boon':''}`}></span>
                <span className={`dot ${rollPower > 1 ? 'filled-boon':''}`}></span>
                <span className={`dot ${rollPower > 2 ? 'filled-boon':''}`}></span>
                <CategoryPowerIndicator rollPower={rollPower} modifyRollPower={increasePower} />
            </div>
            
            {actions && actions.map(action =>(
                <ActionBox 
                key={action.name}
                actionName={action.name} 
                rollResult={action.roll}
                isRollable={action.rollable}
                onRoll={() => ctxHandleRoll(action.name)}
            />
            ))}

        </div>
    );
}

export default CategoryBox;