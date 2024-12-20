import ActionBox from './ActionBox';
import './CategoryBox.css';
import { ActionsContext, ActionsContextType, Action } from './ActionsContextProvider';
import React, { MouseEvent, useContext, useCallback, useMemo, useState } from 'react';
import CategoryPowerIndicator from './CategoryPowerIndicator';

function CategoryBox({categoryName}: {categoryName: string}) {
    /* Using contextAPI and useMemo for maximum synergy.
    If we just processed the actions in an in-component function, or as part of
    setting initial state, it'd happen on every re-render. And if we passed function
    form when setting initial state, then it'd only be set on initial render.
    
    In the current implementation, it is set at the initial render and then only 
    recalculated when actions changes!

    Honestly, there's probably a way to isolate just the roll changes, and then
    only re-render the roll display by doing some combination of what we are doing now
    + React.memo. We don't need that level of optimization yet, but it's good to know it exists.
     */
    const {actions, handleCategoryPowerChange} = useContext<ActionsContextType>(ActionsContext as React.Context<ActionsContextType>);
    const actionsInCategory: Action[] | undefined = useMemo(()=> {
        return actions.allActions.find(category => category.name === categoryName)?.actions;
    }, [actions, categoryName]);

    const [categoryPower, setCategoryPower] = useState<number>(0)

    const modifyCategoryPower = useCallback((e: MouseEvent, modifier: number): void => {
        const newPower = Math.max(Math.min(categoryPower + modifier, 3), -3);
        setCategoryPower(newPower);
        handleCategoryPowerChange(newPower, categoryName);
    }, [categoryPower, categoryName, handleCategoryPowerChange])

    // not missing my chance to curry
    const decreasePower = (event: MouseEvent) => {return modifyCategoryPower(event, -1);}
    const increasePower = (event: MouseEvent) => {return modifyCategoryPower(event, 1);}

    return (
        <div className="category-box">
            <div className="category-box-top">
                <CategoryPowerIndicator rollPower={categoryPower} modifyCategoryPower={decreasePower} />
                 {/* Is the notation below confusing? Could it be compressed or clarified?*/}
                <span className={`dot ${categoryPower < -2 ? 'filled-bane':''}`}></span>
                <span className={`dot ${categoryPower < -1 ? 'filled-bane':''}`}></span>
                <span className={`dot ${categoryPower < 0 ? 'filled-bane':''}`}></span>
                <div className="category-box-name">{categoryName} </div>
                <span className={`dot ${categoryPower > 0 ? 'filled-boon':''}`}></span>
                <span className={`dot ${categoryPower > 1 ? 'filled-boon':''}`}></span>
                <span className={`dot ${categoryPower > 2 ? 'filled-boon':''}`}></span>
                <CategoryPowerIndicator rollPower={categoryPower} modifyCategoryPower={increasePower} />
            </div>
            
            {actionsInCategory && actionsInCategory.map(action =>(
                <ActionBox 
                key={action.name}
                actionName={action.name} 
                rollResult={action.roll}
                isRollable={action.rollable}
            />
            ))}

        </div>
    );
}

export default CategoryBox;