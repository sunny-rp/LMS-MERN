import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const currency = import.meta.env.VITE_CURRENCY || '$';

  const navigate = useNavigate()
  const [allcourses, setAllCourses] = useState([]);

  //Fetch all courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses)
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);
  const value = {
    // Define any shared state or functions here
    currency,allcourses,navigate
  };        
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}