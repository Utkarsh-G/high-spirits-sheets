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

export type RollType = 'bane' | 'boon' | 'neutral' | 'none';

type d20Roll = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

export type RollResult = [d20Roll, d20Roll, RollType];

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
    categoryPower: number;
}

export type Actions = {
    allActions: Category[];
}

export type CategoryNames = string[];

export type ActionsContextType = {
    actions: Actions;
    categories: CategoryNames;
    handleRoll: (rolledName: string) => void;
    handleCategoryPowerChange: (rollPower: number, categoryName: string) => void;
    isSituationalBane: boolean;
    isSituationalBoon: boolean;
    setIsSituationalBoon: (situation: boolean) => void;
    setIsSituationalBane: (situation: boolean) => void;

}
// May want to split off the situational bane / boon stuff into a different context, right?

export const ActionsContext = createContext<ActionsContextType | null>(null);

const processActionsFromFile = () : Actions => {

    // just to ensure types are correct
    const importedActions : FileActions = actionsFromFile;

    const processedActions = { "allActions" : importedActions.allActions.map(
        category => ({"name": category.name, "categoryPower": 0, "actions": category.actions.map(
            action => ({...action, roll : [1, 1, 'none'] as RollResult, rollType: 'none' as RollType})
        )})
    )}
    console.log(processedActions);
    return processedActions;
}

const extractCategoriesFromFile = () : CategoryNames => {
    const importedActions : FileActions = actionsFromFile;
    return importedActions.allActions.map(category => category.name)
}

const rollD20 = (): d20Roll => Math.floor(Math.random() * 20) + 1 as d20Roll;

const rollDice = (categoryPower: number, isSituationalBane: boolean, isSituationalBoon: boolean) : RollResult => {

    if (categoryPower === 1 && isSituationalBane && !isSituationalBoon) return [rollD20(), 1, 'neutral'];
    if (categoryPower > 0) return [rollD20(), rollD20(), 'boon'];

    if (categoryPower === -1 && !isSituationalBane && isSituationalBoon) return [rollD20(), 1, 'neutral'];
    if (categoryPower < 0) return [rollD20(), rollD20(), 'bane'];

    if (isSituationalBane && !isSituationalBoon) return [rollD20(), rollD20(), 'bane'];
    if (!isSituationalBane && isSituationalBoon) return [rollD20(), rollD20(), 'boon'];

    return [rollD20(), 1, 'neutral'];
}

export const ActionsContextProvider = ({ children } : {children: React.ReactNode}) => {

    const [actions, setActions] = useState<Actions>(() => processActionsFromFile()); // eventually we will want to process it a bit before setting as default
        // Fascinating that you can't do processActions(actionsFromFile) inside useState() as it will try to reprocess it on every state change. it considers a new reference each time...?
        // follow up - try useCallback to avoid multiple reprocessing
    const [categories] = useState<CategoryNames>(()=> extractCategoriesFromFile());
    const [isSituationalBoon, setIsSituationalBoon] = useState<boolean>(false);
    const [isSituationalBane, setIsSituationalBane] = useState<boolean>(false);

    // While we could define handleRoll without useCallback, the hook is useful
    // for turning an unstable reference to function (since it is being declared inside of a component)
    // to a stable function reference with useCallback. A minor bit of optimization.
    const handleRoll = useCallback((rolledName: string) => {
        console.log(`bane: ${isSituationalBane}, boon: ${isSituationalBoon}`)
        const newRolls = actions.allActions.map(category => ({
          name: category.name,
          categoryPower: category.categoryPower,
          actions: category.actions.map(action => ({
            ...action,
            roll: action.name === rolledName ? rollDice(category.categoryPower, isSituationalBane, isSituationalBoon) : [1, 1, 'none'] as RollResult
          }))
        }));
        setActions({"allActions": newRolls});
      },[actions, isSituationalBane, isSituationalBoon]);

      const handleCategoryPowerChange = useCallback((categoryPower: number, categoryName: string) => {
        const newRolls = actions.allActions.map(category => ({
          name: category.name,
          actions: category.actions,
          categoryPower: category.name === categoryName ? categoryPower : category.categoryPower
        }));
        setActions({"allActions": newRolls});
      },[actions]);

    return (
        <ActionsContext.Provider value={{ actions, categories, handleRoll, handleCategoryPowerChange, isSituationalBane, isSituationalBoon, setIsSituationalBane, setIsSituationalBoon }}>
            {children}
        </ActionsContext.Provider>
    );
};