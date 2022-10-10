import React from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { IFolder } from '../../core/interfaces/datastructure/IFolder'
import FolderIcon from '@mui/icons-material/Folder';
import FileStructure from './FileStructure';
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
                <List>
                    {props.folder.files.map((file) => {
                        return <FileStructure key={file.path} file={file} onChange={props.onChange} selectedFiles={props.selectedFiles} />
                    })}
                </List>
            </Collapse>
        </>
    )
}
