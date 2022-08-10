// create dark mode context and provider
import React, { createContext, useState } from 'react';
// rewrite line below so that create context has proper type

const DarkModeContext = createContext( {} as any);
// const DarkModeContext = createContext();
// { children }: {children: any}
const DarkModeProvider = (props: any) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode: boolean) => !prevDarkMode);
  };

  return (
    <DarkModeContext.Provider
      value={{ darkMode, toggleDarkMode }}
    >
      {props.children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeProvider };



