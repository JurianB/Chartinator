import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { DefaultTheme } from './theme/DefaultTheme';
import { ErrorHandler } from './core/ErrorHandler';
import { SessionProvider } from './core/SessionProvider';
import { LayoutProvider } from './components/layout/layoutprovider';
import './App.css';

import HomePage from './pages/HomePage';

function App() {
    return (
        <SessionProvider>
            <ThemeProvider theme={DefaultTheme}>
                <BrowserRouter>
                    <ErrorHandler>
                        <LayoutProvider>
                            <Routes>
                                <Route path='/' element={<HomePage />} />
                            </Routes>
                        </LayoutProvider>
                    </ErrorHandler>
                </BrowserRouter>
            </ThemeProvider>
        </SessionProvider>
    );
}

export default App;
