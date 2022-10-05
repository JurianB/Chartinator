import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface IViewBox {
    width: number | 'flexGrow';
    heightCorrection: number;
    children: ReactNode;
}

export default function ViewBox(props: IViewBox) {
    const generateSx = () => {
        let defaultSx = {
            border: '1px solid #e0e0e0',
            backgroundColor: '#ffffff',
            height: `calc(100vh - ${props.heightCorrection}px)`,
            position: 'relative'
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
