import { Children, createContext, useContext, useState } from "react";


const StateContext = createContext({
    user: {},
    token: null,
    kinds: null,
    setUser: () => {},
    setToken: () => {},
    setKinds: () => {}
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [kinds, setKinds] = useState([]);
    const [token, _setToken] = useState(localStorage.getItem('TOKEN') || '');
    const [notification, setNotification] = useState(false);
    const [error, setError] = useState(false);
    const [booking, setBooking] = useState({});
    const [triger, setTriger] = useState({
        phase1: true,
        phase2: false,
        phase3: false
    });
    // const [token, _setToken] = useState(376736);

    const setToken = (token) => {
        if (token) {
            localStorage.setItem('TOKEN', token);
        } else {
            localStorage.removeItem('TOKEN');
        }
        _setToken(token);
    }


    return (
        <StateContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            kinds,
            setKinds,
            notification,
            setNotification,
            error,
            setError,
            booking,
            setBooking,
            triger,
            setTriger
        }}>
        {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext) 