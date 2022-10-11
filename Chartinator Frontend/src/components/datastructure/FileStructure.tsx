import { Collapse, ListItemButton, ListItemText, Tooltip, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import { IFile } from '../../core/interfaces/datastructure/IFile';

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
                script.push(<div>options</div>);
                break;
            case 2:
                script.push(<div>options</div>);
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
