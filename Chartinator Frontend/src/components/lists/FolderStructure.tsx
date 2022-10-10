import React from 'react'
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { Box, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import { IFolder } from '../../core/interfaces/datastructure/IFolder'
import FolderIcon from '@mui/icons-material/Folder';
interface IFolderStructureProps {
    folder: IFolder,
    selectedFiles: string[];
    onChange: (id: string) => void;
}
export default function FolderStructure(props: IFolderStructureProps) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText primary={props.folder.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto">
                <List component="div" disablePadding>

                    {props.folder.files.map((file) => {
                        return (
                            <ListItemButton
                                sx={{pl: 4, height: 50}}
                                key={file.path}
                                onClick={() => props.onChange(file.path)}
                                selected={props.selectedFiles.findIndex(x => x === file.path) === -1 ? false : true}>
                                <Tooltip title={file.size} arrow placement='right'>
                                    <Typography variant='body2' color='#11111' noWrap>
                                        {file.name}
                                    </Typography>
                                </Tooltip>
                            </ListItemButton>

                        );
                    })}
                </List>
            </Collapse>
        </>
    )
}
