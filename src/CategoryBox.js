import ActionBox from './ActionBox';
import './CategoryBox.css';
import { ActionsContext } from './ActionsContextProvider';
import { useContext, useState, useEffect } from 'react';

function CategoryBox({name: categoryName}) {
    const {actions: ctxActions, handleRoll: ctxHandleRoll} = useContext(ActionsContext);
    
    const [actions, setActions] = useState([])

    useEffect(()=>{
        setActions(ctxActions.allActions.find(category => category.name === categoryName).actions)
        console.log("Initial Actions set in category")
    }, [])
    useEffect(()=>{
        setActions(ctxActions.allActions.find(category => category.name === categoryName).actions)
        console.log("Actions set in category")
    }, [ctxActions])


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