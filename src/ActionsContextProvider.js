import { createContext, useState, useEffect } from 'react';
import actionsFromFile from './actions.json';

export const ActionsContext = createContext(null);

const processActions = () => {
    console.log("useState retriggere!");
    const processActions = { "allActions" : actionsFromFile.allActions.map(
        category => ({"name": category.name, "actions": category.actions.map(
            action => ({...action, roll : 0})
        )})
    )}
    return processActions;
}

export const ActionsContextProvider = ({ children }) => {

    const [actions, setActions] = useState(processActions); // eventually we will want to process it a bit before setting as default
        // Fascinating that you can't do processActions(actionsFromFile) inside useState() as it will try to reprocess it on every state change. it considers a new reference each time...?

    const handleRoll = (rolledName) => {
        console.log("ROLLIn")
        console.log(`Roller:${rolledName}`)
        const newRolls = actions.allActions.map(category => ({
          name: category.name,
          actions: category.actions.map(action => ({
            ...action,
            roll: action.name === rolledName ? Math.floor(Math.random() * 20) + 1 : action.roll
          }))
        }));
        console.log("New rolls: ");
        console.log(newRolls);
        setActions({"allActions": newRolls});
      };

    return (
        <ActionsContext.Provider value={{ actions, handleRoll }}>
            {children}
        </ActionsContext.Provider>
    );
};