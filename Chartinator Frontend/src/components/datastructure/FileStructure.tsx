import { Collapse, FormGroup, ListItemButton, ListItemText, } from '@mui/material'
import React from 'react'
import { IFile } from '../../core/interfaces/datastructure/IFile';
import FileSettings from './FileSettings';

interface IFileStructure {
    file: IFile,
    onFileClicked: (filePath: string) => void;
    onFileOptionChanged: (filePath: string, label: string, checked: boolean) => void;
}
export default function FileStructure(props: IFileStructure) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
        props.onFileClicked(props.file.path);
    };

    const onFileOptionChanged = (filePath: string, label: string, checked: boolean) => {
        props.onFileOptionChanged(filePath, label, checked);
    }

    return (
        <>
            <ListItemButton
                onClick={handleClick}
                selected={props.file.selected}
            >
                <ListItemText primary={props.file.name} />
            </ListItemButton>
            <Collapse in={open} timeout="auto">
                <FormGroup row sx={{ paddingLeft: 2 }}>
                    {props.file.options.map(option => {
                        return <FileSettings key={`${option.id}-${option.label}`} option={option} onChange={(filePath, label, value) => onFileOptionChanged(filePath, label, value)} />
                    })}
                </FormGroup>
            </Collapse>
        </>
    )
}
