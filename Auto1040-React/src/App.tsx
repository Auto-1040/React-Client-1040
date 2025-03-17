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
          main: mode === 'light' ? '#FF8A80' : '#FF6F61', // Light salmon for light mode, darker salmon for dark mode
        },
        secondary: {
          main: mode === 'light' ? '#FFAB91' : '#FF8A65', // Light salmon for light mode, darker salmon for dark mode
        },
        background: {
          default: mode === 'light' ? '#f5f5f5' : '#121212', // Light gray for light mode, dark gray for dark mode
          paper: mode === 'light' ? '#ffffff' : '#1e1e1e', // White for light mode, black for dark mode
        },
        text: {
          primary: mode === 'light' ? '#000000' : '#ffffff', // Black for light mode, white for dark mode
          secondary: mode === 'light' ? '#000000' : '#FF6F61', // Light gray for light mode, dark gray for dark mode
        },
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