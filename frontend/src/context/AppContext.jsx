import { createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const value = {
    // Define any shared state or functions here
  };        
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}