import { Toolbar, Typography } from '@mui/material';
import React from 'react';

interface IEditorHeader {
    title: string;
}

export default function EditorHeader(props: IEditorHeader) {
    return (
        <Toolbar
            sx={{
                backgroundColor: '#fafafa',
                borderTop: '1px solid #e0e0e0',
                borderLeft: '1px solid #e0e0e0',
                borderRight: '1px solid #e0e0e0'
            }}
        >
            <Typography variant='h6' component='div' sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                {props.title}
            </Typography>
        </Toolbar>
    );
}
