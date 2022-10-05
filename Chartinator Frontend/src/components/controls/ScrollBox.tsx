import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface IScrollBox {
    width: number | 'flexGrow';
    heightCorrection: number;
    children: ReactNode;
}

export default function ScrollBox(props: IScrollBox) {
    const generateSx = () => {
        let defaultSx = {
            border: '1px solid #e0e0e0',
            backgroundColor: '#ffffff',
            overflow: 'auto',
            height: `calc(100vh - ${props.heightCorrection}px)`,
            display: 'flex',
            flexDirection: 'column'
        };

        if (props.width === 'flexGrow') {
            Object.assign(defaultSx, { flexGrow: 1 });
        } else {
            Object.assign(defaultSx, { width: props.width });
        }

        return defaultSx;
    };

    return <Box sx={generateSx()}>{props.children}</Box>;
}
