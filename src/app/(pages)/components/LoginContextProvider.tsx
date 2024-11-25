import React, {createContext, type SetStateAction, useState} from "react";
import Cookies from "js-cookie";

const MyContext = createContext({
    loggedIn: false,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
})


export function MyContextProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(Cookies.get("accessToken") !== undefined);

    return (
        <MyContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </MyContext.Provider>
    );
}