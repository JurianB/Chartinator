import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { LayoutProviderContext } from './LayoutContext';
import Header from '../header/Header';

export interface ILayoutProvider {
    children: React.ReactNode;
}

export function LayoutProvider(props: ILayoutProvider) {
    return (
        <LayoutProviderContext>
            <CssBaseline />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Header />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Header />
                    <Box sx={{ flexGrow: 1, display: 'flex' }}>
                        <Box sx={{ flexGrow: 1 }}>{props.children}</Box>
                    </Box>
                </Box>
            </Box>
        </LayoutProviderContext>
    );
}
