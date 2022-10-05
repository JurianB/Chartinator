import React, { useEffect } from 'react';
import Box from '@mui/material/Box';

interface IPage {
    title: string;
    centerContents?: boolean;
    diasablePadding?: boolean;
    children: React.ReactNode;
}

export default function Page(props: IPage) {
    useEffect(() => {
        document.title = props.title;
    }, [props.title]);

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f2f3f4',
                alignItems: props.centerContents ? 'center' : 'flex-start',
                position: 'relative',
                padding: props.diasablePadding ? 0 : 2
            }}
        >
            {props.children}
        </Box>
    );
}
