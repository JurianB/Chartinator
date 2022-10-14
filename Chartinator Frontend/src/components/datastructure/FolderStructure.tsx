import React from 'react'
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { IFolder } from '../../core/interfaces/datastructure/IFolder'
import FolderIcon from '@mui/icons-material/Folder';
import FileStructure from './FileStructure';
import { IDataStructureInfo } from '../../core/interfaces/datastructure/IDataStructureInfo';

interface IFolderStructureProps {
    folder: IFolder,
    data: IDataStructureInfo;
    onFileClicked: (filePath: string) => void;
    onFileOptionChanged: (filePath: string, label: string, checked: boolean) => void;
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
                        return <FileStructure
                            key={file.path}
                            file={file}
                            onFileClicked={props.onFileClicked}
                            onFileOptionChanged={props.onFileOptionChanged}
                        />
                    })}
                </List>
            </Collapse>
        </>
    )
}
