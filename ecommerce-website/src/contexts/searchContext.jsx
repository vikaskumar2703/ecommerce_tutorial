import { createContext } from "react";
import { useContext, useState } from "react";

export const SearchContext = createContext();
// you can provide with default contetxt within create context or explicitly create using "value

export const SearchContextProvider = ({ children }) => {
  const [values, setValues] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[values, setValues]}>
      {children}
    </SearchContext.Provider>
  );
};

//function for using created context
export default function useSearch() {
  return useContext(SearchContext);
}
