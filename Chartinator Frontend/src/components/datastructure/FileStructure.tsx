import { Collapse, ListItemButton, ListItemText, Tooltip, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import { IFile } from '../../core/interfaces/datastructure/IFile';
import ExcelFileSettings from './ExcelFileSettings';
import TextFileSettings from './TextFileSettings';

interface IFileStructure {
    file: IFile,
    selectedFiles: string[];
    onChange: (id: string) => void;
}
export default function FileStructure(props: IFileStructure) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
        props.onChange(props.file.path);
    };

    const getOptions = () => {
        const script:ReactElement[] = [];

        switch(props.file.type){
            case 1:
                script.push(<ExcelFileSettings />);
                break;
            case 2:
                script.push(<TextFileSettings />);
        }

        return script;
    }

    return (
        <>
            <ListItemButton
                onClick={handleClick}
                selected={props.selectedFiles.findIndex(x => x === props.file.path) === -1 ? false : true}
            >
                <ListItemText primary={props.file.name} />
            </ListItemButton>
            <Collapse in={open} timeout="auto">
                {getOptions()}
            </Collapse>
        </>
    )
}
