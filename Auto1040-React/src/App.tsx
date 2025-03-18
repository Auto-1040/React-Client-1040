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
          main: mode === 'light' ? '#1976d2' : '#0d47a1', // Light blue for light mode, darker blue for dark mode
        },
        secondary: {
          main: mode === 'light' ? '#64b5f6' : '#42a5f5', // Lighter blue for light mode, slightly darker blue for dark mode
        },
        background: {
          default: mode === 'light' ? '#e3f2fd' : '#0d47a1', // Light blue background for light mode, dark blue for dark mode
          paper: mode === 'light' ? '#ffffff' : '#1e1e1e', // White for light mode, dark gray for dark mode
        },
        text: {
          primary: mode === 'light' ? '#000000' : '#ffffff', // Black for light mode, white for dark mode
          secondary: mode === 'light' ? '#1976d2' : '#64b5f6', // Blue for light mode, lighter blue for dark mode
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
              color: mode === 'light' ? '#000000' : '#ffffff', // Apply text color based on mode
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