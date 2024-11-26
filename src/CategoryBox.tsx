import ActionBox from './ActionBox';
import './CategoryBox.css';
import { ActionsContext, ActionsContextType, Action } from './ActionsContextProvider';
import React, { useContext, useMemo } from 'react';

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
    const {actions: ctxActions, handleRoll: ctxHandleRoll} = useContext<ActionsContextType>(ActionsContext as React.Context<ActionsContextType>);
    const actions: Action[] | undefined = useMemo(()=> {
        return ctxActions.allActions.find(category => category.name === categoryName)?.actions;
    }, [ctxActions, categoryName]);

    return (
        <div className="category-box">
            <div className="category-box-name">{categoryName}</div>

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