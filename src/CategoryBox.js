import ActionBox from './ActionBox';
import './CategoryBox.css';
import { ActionsContext } from './ActionsContextProvider';
import { useContext, useState, useEffect } from 'react';

function CategoryBox({name: categoryName}) {
    const {actions: ctxActions, handleRoll: ctxHandleRoll} = useContext(ActionsContext);
    //If ever it becomes an issue that we have to wait for context to load, 
    // then we should add a loading state to our context. loading : actions === null
    // We can then adjust the return of category box based on if loading or not loading.
    
    const [actions, setActions] = useState([])

    useEffect(()=>{
        setActions(ctxActions.allActions.find(category => category.name === categoryName).actions)
    }, [ctxActions, categoryName])
    // if we needed to use the previous value of ctxAction, then we could move this to a reducer.
    // categoryName is not going to change, but I've added it to dependency array to avoid warnings.


    return (
        <div className="category-box">
            <div className="category-box-name">{categoryName}</div>

            {actions.map(action =>(
                <ActionBox 
                key={action.name}
                name={action.name} 
                rollResult={action.roll}
                onRoll={() => ctxHandleRoll(action.name)}
            />
            ))}

        </div>
    );
}

export default CategoryBox;