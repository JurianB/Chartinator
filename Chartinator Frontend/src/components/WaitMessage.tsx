import React from 'react';
import { Box, CircularProgress, Dialog, Typography } from '@mui/material';

interface IWaitMessage {
    show: boolean;
    message: string;
}

export default function WaitMessage(props: IWaitMessage) {
    return (
        <Dialog open={props.show} hideBackdrop aria-labelledby='Wait'>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Box sx={{ backgroundColor: '#f0f0f0', padding: 4, display: 'flex' }}>
                    <CircularProgress size={20} />
                    <Typography sx={{ marginLeft: 2 }}>{props.message}</Typography>
                </Box>
            </Box>
        </Dialog>
    );
}