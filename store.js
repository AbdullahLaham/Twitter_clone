import Cookies from 'js-cookie';
import {createContext, useReducer} from 'react';
export const Store = createContext();
const initialState = {
    user: Cookies.get('user') ? Cookies.get('user') : {},
}
const reducer = (state, action) => {
    switch(action.type) {
        case 'SIGN_IN':
            Cookies.set('videos', action.payload)
            return {...state, user: action.payload};
        case 'SIGN_OUT':
            Cookies.set('videos', {})
            return {...state, user: {}};
        
        default: 
        return state;
    }
}
export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch};
    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    );
}