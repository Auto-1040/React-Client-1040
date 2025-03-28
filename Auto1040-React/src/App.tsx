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
          main: '#4A90E2', // Blue for both light and dark mode
        },
        secondary: {
          main: mode === 'light' ? '#D9D9D9' : '#424242', // Light gray for light mode, dark gray for dark mode
        },
        background: {
          default: mode === 'light' ? '#F5F5F5' : '#1E1E1E', // Light gray background for light mode, dark gray for dark mode
          paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E', // White for light mode, dark gray for dark mode
        },
        text: {
          primary: mode === 'light' ? '#1E3A5F' : '#E0E0E0', // Dark blue for light mode, light gray for dark mode
          secondary: mode === 'light' ? '#2C3E50' : '#B0BEC5', // Dark blue-gray for light mode, blue-gray for dark mode
        },
        success: {
          main: mode === 'light' ? '#4CAF50' : '#81C784', // Green for light mode, calm green for dark mode
        },
      },
      zIndex: {
        appBar: 1200,
        drawer: 1100,
      },
      components: {
        MuiTypography: {
          styleOverrides: {
            root: {
              color: mode === 'light' ? '#1E3A5F' : '#E0E0E0', // Apply text color based on mode
            },
          },
        },
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