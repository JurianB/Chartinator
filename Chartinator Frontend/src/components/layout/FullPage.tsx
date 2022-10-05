import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

interface IFullPage {
    title: string;
    centerContents?: boolean;
    children: React.ReactNode;
}

export default function FullPage(props: IFullPage) {
    useEffect(() => {
        document.title = props.title;
    }, [props.title]);

    return (
        <Box
            sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                alignItems: props.centerContents ? 'center' : 'flex-start',
                justifyContent: 'center',
                backgroundColor: '#000000'
            }}
        >
            {props.children}
        </Box>
    );
}
