import React, { createContext, useState, useCallback } from 'react';
import actionsFromFile from './actions.json';

type FileAction = {
    name: string;
    rollable: boolean;
    module: string;
    actionCost: number;
}

type FileCategory = {
    name: string;
    actions: FileAction[];
}

type FileActions = {
    allActions: FileCategory[];
}

export type RollType = 'bane' | 'boon' | 'neutral';

export type RollResult = [number, number, RollType];

export type Action = {
    name: string;
    rollable: boolean;
    module: string;
    actionCost: number;
    roll: RollResult;
    rollType: RollType;
}

export type Category = {
    name: string;
    actions: Action[];
}

export type Actions = {
    allActions: Category[];
}

export type CategoryNames = string[];

export type ActionsContextType = {
    actions: Actions;
    categories: CategoryNames;
    handleRoll: (rolledName: string) => void;
}

export const ActionsContext = createContext<ActionsContextType | null>(null);

const processActionsFromFile = () : Actions => {

    // just to ensure types are correct
    const importedActions : FileActions = actionsFromFile;

    const processedActions = { "allActions" : importedActions.allActions.map(
        category => ({"name": category.name, "actions": category.actions.map(
            action => ({...action, roll : [0, 0, 'neutral'] as RollResult, rollType: 'bane' as RollType})
        )})
    )}
    console.log(processedActions);
    return processedActions;
}

const extractCategoriesFromFile = () : CategoryNames => {
    const importedActions : FileActions = actionsFromFile;
    return importedActions.allActions.map(category => category.name)
}

const rollD20 = () => Math.floor(Math.random() * 20) + 1;

const rollDice = (rollType: RollType) : RollResult => {
    let rolledValue: RollResult = [0, 0, 'neutral'];
    switch(rollType){
        case 'bane':
            rolledValue = [rollD20(), rollD20(), 'bane'];
            break;
        case 'boon':
            rolledValue = [rollD20(), rollD20(), 'boon'];
            break;
        case 'neutral':
            rolledValue = [rollD20(), 0, 'neutral']
            break;
        default:
            rolledValue = [888, 0, 'neutral']
    }
    return rolledValue;
}

export const ActionsContextProvider = ({ children } : {children: React.ReactNode}) => {

    const [actions, setActions] = useState<Actions>(() => processActionsFromFile()); // eventually we will want to process it a bit before setting as default
        // Fascinating that you can't do processActions(actionsFromFile) inside useState() as it will try to reprocess it on every state change. it considers a new reference each time...?
        // follow up - try useCallback to avoid multiple reprocessing
    const [categories] = useState<CategoryNames>(()=> extractCategoriesFromFile());

    // While we could define handleRoll without useCallback, the hook is useful
    // for turning an unstable reference to function (since it is being declared inside of a component)
    // to a stable function reference with useCallback. A minor bit of optimization.
    const handleRoll = useCallback((rolledName: string) => {
        const newRolls = actions.allActions.map(category => ({
          name: category.name,
          actions: category.actions.map(action => ({
            ...action,
            roll: action.name === rolledName ? rollDice(action.rollType) : [0, 0, 'neutral'] as RollResult
          }))
        }));
        setActions({"allActions": newRolls});
      },[actions]);

    return (
        <ActionsContext.Provider value={{ actions, categories, handleRoll }}>
            {children}
        </ActionsContext.Provider>
    );
};