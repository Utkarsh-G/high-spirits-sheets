import ActionBox from './ActionBox';
import './CategoryBox.css';
import { ActionsContext, ActionsContextType, Action, Category } from './ActionsContextProvider';
import React, { useContext, useState, useEffect } from 'react';

function CategoryBox({categoryName}: {categoryName: string}) {
    const {actions: ctxActions, handleRoll: ctxHandleRoll} = useContext<ActionsContextType>(ActionsContext as React.Context<ActionsContextType>);
    //If ever it becomes an issue that we have to wait for context to load, 
    // then we should add a loading state to our context. loading : actions === null
    // We can then adjust the return of category box based on if loading or not loading.
    
    const [actions, setActions] = useState<Action[]>([])

    useEffect(()=>{
        const category : Category | undefined = ctxActions.allActions.find(category => category.name === categoryName);
        if (category) {
            setActions(category.actions)
        }
    }, [ctxActions, categoryName])
    // if we needed to use the previous value of ctxAction, then we could move this to a reducer.
    // categoryName is not going to change, but I've added it to dependency array to avoid warnings.


    return (
        <div className="category-box">
            <div className="category-box-name">{categoryName}</div>

            {actions.map(action =>(
                <ActionBox 
                key={action.name}
                actionName={action.name} 
                rollResult={action.roll}
                onRoll={() => ctxHandleRoll(action.name)}
            />
            ))}

        </div>
    );
}

export default CategoryBox;