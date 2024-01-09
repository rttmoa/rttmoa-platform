import { createContext, useContext, useMemo, useState } from "react";

const defaultTheme = "light";
export interface ThemeContextType {
  myTheme: string;
  setMyTheme: Function;
}
const ThemeContext = createContext<ThemeContextType | null>(null);

const useThemeContext = () => useContext(ThemeContext);

const ThemeContextProvider = ({ children }: any) => {
  const [myTheme, setMyTheme] = useState(defaultTheme);
  // const themeProvider = { myTheme, setMyTheme };
  const themeProvider = useMemo(() => {
    return {
      myTheme,
      setMyTheme
    };
  }, [myTheme, setMyTheme]);
  return <ThemeContext.Provider value={themeProvider}>{children}</ThemeContext.Provider>;
};
export { useThemeContext, ThemeContextProvider };

// USE
// import { useThemeContext } from '@/styles/themeHook';
// const { myTheme, setMyTheme } = useThemeContext();
// const toggleTheme = () => {
//   setMyTheme(myTheme === "light" ? "dark" : "light")
// }
