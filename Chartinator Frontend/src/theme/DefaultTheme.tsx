import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }

    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

export const DefaultTheme = createTheme({
    palette: {
        primary: {
            main: '#2471a3',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#DC143C'
        },
        background: {
            default: '#869EB3',
            paper: '#fdfefe '
        },
        text: {
            primary: '#000000'
        }
    },
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920
        },
        unit: 'px'
    },
    status: {
        danger: '#ff0000'
    },
    components: {
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected:hover': {
                        backgroundColor: '#a9cce3',
                        '& .MuiListItemIcon-root': {
                            color: 'white'
                        }
                    },
                    '&:hover': {
                        backgroundColor: '#d6eaf8'
                    },
                    '&.Mui-selected': {
                        backgroundColor: '#a9cce3'
                    },
                    '&.MuiListItemButton-divider': {
                        borderColor: '#e0e0e0'
                    }
                },
                selected: {}
            }
        }
    }
});
