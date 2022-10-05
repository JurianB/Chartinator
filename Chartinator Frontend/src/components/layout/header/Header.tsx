import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BarChartIcon from '@mui/icons-material/BarChart';
export default function Header() {
    return (
        <Box
            sx={{
                display: 'flex',
                minHeight: 60,
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #c0c0c0'
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 2,
                    marginLeft: 2
                }}
            >
                <BarChartIcon fontSize='large' sx={{ marginRight: 2, color: '#444444' }} />
                <Typography variant='h4'>Chartinator 3000</Typography>
            </Box>
        </Box>
    );
}
