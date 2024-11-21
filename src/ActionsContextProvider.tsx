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

export type Action = {
    name: string;
    rollable: boolean;
    module: string;
    actionCost: number;
    roll: number;
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
            action => ({...action, roll : 0})
        )})
    )}
    return processedActions;
}

const extractCategoriesFromFile = () : CategoryNames => {
    const importedActions : FileActions = actionsFromFile;
    return importedActions.allActions.map(category => category.name)
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
            roll: action.name === rolledName ? Math.floor(Math.random() * 20) + 1 : 0
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