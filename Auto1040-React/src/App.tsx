import './App.css'
import { createContext, useMemo, useReducer, useState } from 'react';
import UserReducer from './components/user/UserReducer.ts';
import UserContext from './components/user/UserContext.ts';
import { router } from './Router';
import { RouterProvider } from 'react-router';
import { emptyUser } from './components/user/UserContext.ts';
import { createTheme, ThemeProvider, CssBaseline, Theme } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { ModalProvider } from './components/ModalContext.tsx';

export const ColorModeContext = createContext({ toggleColorMode: () => { } });

function App() {

  const [user, userDispatch] = useReducer(UserReducer, emptyUser)
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );


  const theme = useMemo((): Theme =>
    createTheme({
      palette: {
        mode,
        primary: {
          main: '#2E4F7A', // Deep blue from the logo for secondary elements
          contrastText: '#FFFFFF',
         
        },
        secondary: {
          main: '#C62D21', // Bold red from the logo for primary elements
          contrastText: '#FFFFFF', // White text for better readability
        },
        background: {
          default: mode === 'light' ? '#F8F9FA' : '#000000', // Soft neutral background for better contrast
          paper: mode === 'light' ? '#FFFFFF' : '#1C1C1E', // Clean white for light mode, refined dark for dark mode
        },
        text: {
          primary: mode === 'light' ? '#000000' : '#ffffff', 
          secondary: mode === 'light' ? '#4d4b4b' : '#ffffff', 
        },
        success: {
          main: '#4CAF50', // Standard green for success messages
        },
        warning: {
          main: '#F39C12', // Warm orange for warnings
        },
        error: {
          main: '#D32F2F', // Strong red for errors and critical alerts
        },
      },      
      zIndex: {
        appBar: 1200,
        drawer: 1100,
      },
    }),
    [mode],
  );

  return (
    <>
      <ModalProvider>
        <Provider store={store}>
          <ColorModeContext value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <UserContext value={{ user, userDispatch }}>
                <RouterProvider router={router} />
              </UserContext>
            </ThemeProvider>
          </ColorModeContext>
        </Provider>
      </ModalProvider>

    </>
  )
}

export default App