import { ListItemButton, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { IFile } from '../../core/interfaces/datastructure/IFile';

interface IFileStructure {
    file: IFile,
    selectedFiles: string[];
    onChange: (id: string) => void;
}
export default function FileStructure(props: IFileStructure) {
    return (
        <Tooltip title={props.file.size} arrow placement='right'>
            <ListItemButton
                sx={{ pl: 4, height: 50 }}
                onClick={() => props.onChange(props.file.path)}
                selected={props.selectedFiles.findIndex(x => x === props.file.path) === -1 ? false : true}>

                <Typography variant='body2' color='#11111' noWrap>
                    {props.file.name}
                </Typography>

            </ListItemButton>
        </Tooltip>
    )
}
