import { createContext, useContext } from "react";

export const UserContext = createContext({
    user: null,
    loginUser: () => { },
    logoutUser: () => { }
});

export const UserProvider = UserContext.Provider;

export default function useUser() {
    return useContext(UserContext);
}