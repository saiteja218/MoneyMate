import { createContext, useState, useEffect, useMemo } from "react";

import { ThemeProvider, createTheme } from '@mui/material/styles';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    useEffect(() => {
        const savedMode = localStorage.getItem('mode');
        if (savedMode) {
            setMode(savedMode)
        }
    },[])

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? "dark" : "light";
                    localStorage.setItem('mode', newMode);
                    return newMode;
                })
            }
        }), []
    )



    const theme = useMemo(() => {
     return createTheme({
            palette: {
                mode,
                ...(
                    mode === 'light' ?
                        {
                            background: {
                                default: "#f4f4f4",
                                paper: "#ffffff"
                            }
                        } : { 
                            background: {
                                default: '#121212',
                                paper: '#1e1e1e',
                            }
                        }
                )
            },
            typography: {
                fontFamily: 'Roboto, sans-serif',
            },
        })
    }, [mode])


    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    )

}