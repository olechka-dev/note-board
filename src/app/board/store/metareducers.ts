import { ActionReducer } from '@ngrx/store';

const saveToLocalStorage = (state: any, key: string) => {
    localStorage.setItem(key, JSON.stringify(state));
};
const getFromLocalStorage = (key: string) => {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch (e) {
        return null;
    }

};

const key = 'notes';

export const notesMetaReducer = (reducer: ActionReducer<any>) => {
    let isOnLoad = true;
    return (state, action) => {
        const nextState = reducer(state, action);
        if (isOnLoad) {
            isOnLoad = false;
            const lsState = getFromLocalStorage(key);
            if (lsState) {
                return reducer({ ...state, ...lsState }, action);
            }
            return reducer(state, action);
        }

        saveToLocalStorage(nextState, key);
        return nextState;
    };
};
