import React from 'react';
import { Box, Button } from '@mui/material';
import { useSession } from '../../core/SessionProvider';
import { defaultError } from '../../core/defaults/SessionDefaults';
import { useNavigate } from 'react-router';
import FullPage from '../../components/layout/FullPage';

export default function ErrorPage() {
    const session = useSession();
    const navigate = useNavigate();

    const handleReset = () => {
        session.setError(defaultError);
        navigate('/');
    };

    return (
        <FullPage title='Error - Chartinator' centerContents={true}>
            <Box sx={{ color: '#00ff00', padding: 4, backgroundColor: '#000000', maxWidth: '80%' }}>
                <Box sx={{ display: 'flex', fontFamily: 'Cascadia Mono', fontSize: 30, marginBottom: 2 }}>
                    Chartinator Debug
                </Box>
                <Box sx={{ display: 'flex', fontFamily: 'Cascadia Mono' }}>
                    <Box sx={{ width: 120 }}>Caller: </Box>
                    <Box sx={{ marginLeft: 1 }}>{session.error.caller}</Box>
                </Box>
                <Box sx={{ display: 'flex', fontFamily: 'Cascadia Mono' }}>
                    <Box sx={{ width: 120 }}>Code: </Box>
                    <Box sx={{ marginLeft: 1 }}>{session.error.codeText}</Box>
                </Box>
                <Box sx={{ display: 'flex', fontFamily: 'Cascadia Mono' }}>
                    <Box sx={{ width: 120 }}>Description: </Box>
                    <Box sx={{ marginLeft: 1 }}>{session.error.description}</Box>
                </Box>
                <Box sx={{ display: 'flex', fontFamily: 'Cascadia Mono' }}>
                    <Box sx={{ width: 120, minWidth: 120 }}>Exception: </Box>
                    <Box sx={{ marginLeft: 1 }}>{session.error.exception}</Box>
                </Box>
                <Box sx={{ width: 120 }}>
                    <Button
                        variant='outlined'
                        sx={{ marginTop: 4, color: '#00ff00', borderColor: '#00ff00' }}
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                </Box>
            </Box>
        </FullPage>
    );
}
